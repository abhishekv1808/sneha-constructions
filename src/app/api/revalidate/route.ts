import { createHash, timingSafeEqual } from 'node:crypto'
import { revalidateTag } from 'next/cache'
import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'

import { env } from '@/lib/env'
import { TABLE_TAGS } from '@/lib/supabase/queries'

// node:crypto — this cannot run on the edge runtime.
export const runtime = 'nodejs'

/**
 * Supabase database webhook target — CLAUDE.md §10 "Caching & revalidation".
 *
 * A row changes in Postgres, the webhook POSTs here, and the matching cache tag
 * is invalidated. Content is therefore statically served and still updates
 * within seconds of an edit.
 *
 * ---------------------------------------------------------------------------
 * DASHBOARD SETUP
 * ---------------------------------------------------------------------------
 * Supabase database webhooks are per-table, so this needs EIGHT hooks — one for
 * each table in TABLE_TAGS. They are otherwise identical.
 *
 *   Dashboard → Database → Webhooks → "Create a new hook"
 *
 *     Name          revalidate_<table>        e.g. revalidate_projects
 *     Table         public.<table>
 *     Events        ☑ Insert  ☑ Update  ☑ Delete
 *     Type          HTTP Request
 *     Method        POST
 *     URL           https://snehaconstruction.com/api/revalidate
 *     Timeout       5000 ms
 *
 *     HTTP Headers
 *       Content-Type       application/json
 *       x-revalidate-secret  <the REVALIDATE_SECRET value from .env.local>
 *
 * Create one for each of:
 *   services · material_categories · projects · project_images
 *   testimonials · faqs · service_areas · site_settings
 *
 * Notes
 *   - The URL must be publicly reachable. The hook fires from Postgres via
 *     pg_net, inside Supabase's network — it cannot reach localhost or a
 *     Vercel preview behind deployment protection. Point it at the production
 *     domain, or at a tunnel while developing.
 *   - REVALIDATE_SECRET must match on both sides. Rotating it means editing all
 *     eight hooks; until then they will 401 and content will go stale until the
 *     one-hour backstop in queries.ts expires.
 *   - pg_net fires and forgets. A failed delivery is not retried, so treat that
 *     backstop as the real safety net, not an optimisation.
 *   - Deletes: `record` is null and `old_record` carries the row. This route
 *     only needs the table name, so it treats all three events the same.
 *
 * Manual test:
 *   curl -i -X POST https://snehaconstruction.com/api/revalidate \
 *     -H 'Content-Type: application/json' \
 *     -H 'x-revalidate-secret: <secret>' \
 *     -d '{"type":"UPDATE","table":"projects","schema":"public","record":{},"old_record":{}}'
 * ---------------------------------------------------------------------------
 */

const SECRET_HEADER = 'x-revalidate-secret'

/** The Supabase database webhook envelope. */
const webhookPayloadSchema = z.object({
  type: z.enum(['INSERT', 'UPDATE', 'DELETE']),
  table: z.string().min(1),
  schema: z.string().min(1),
  record: z.unknown().nullable().optional(),
  old_record: z.unknown().nullable().optional(),
})

/**
 * Compares SHA-256 digests rather than the raw strings: timingSafeEqual throws
 * on a length mismatch, and hashing first makes both sides a fixed 32 bytes, so
 * the comparison never leaks the secret's length either.
 */
function secretMatches(provided: string | null): boolean {
  if (!provided) return false

  const a = createHash('sha256').update(provided).digest()
  const b = createHash('sha256').update(env.REVALIDATE_SECRET).digest()

  return timingSafeEqual(a, b)
}

export async function POST(request: NextRequest) {
  // Same response whether the header is absent or wrong — no oracle for probing.
  if (!secretMatches(request.headers.get(SECRET_HEADER))) {
    return NextResponse.json({ revalidated: false, error: 'Unauthorized' }, { status: 401 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { revalidated: false, error: 'Body is not valid JSON' },
      { status: 400 },
    )
  }

  const parsed = webhookPayloadSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { revalidated: false, error: 'Unrecognised webhook payload' },
      { status: 400 },
    )
  }

  const { type, table, schema } = parsed.data
  const tag = TABLE_TAGS[table]

  // 400 rather than a silent 200: an unmapped table means a hook is pointed at
  // something this route does not cache, and that should be noticed rather than
  // swallowed. pg_net does not retry, so this cannot become a retry storm.
  if (!tag) {
    return NextResponse.json(
      { revalidated: false, error: `No cache tag registered for table "${schema}.${table}"` },
      { status: 400 },
    )
  }

  revalidateTag(tag)

  return NextResponse.json({ revalidated: true, tag, table, type })
}

export function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. This endpoint accepts POST from a Supabase database webhook.' },
    { status: 405, headers: { Allow: 'POST' } },
  )
}
