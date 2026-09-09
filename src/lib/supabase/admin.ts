import { createClient } from '@supabase/supabase-js'

import { env } from '@/lib/env'

import type { Database } from './types'

// This module holds the service-role key, which bypasses every RLS policy in
// the database. It must never reach the browser.
//
// Two things already stop that, and this guard is the third:
//   1. Next only inlines NEXT_PUBLIC_* into client bundles, so the key resolves
//      to undefined there rather than being embedded.
//   2. lib/env.ts validates the whole environment at module load, so a client
//      component that pulled this in would throw on the missing key at build.
//   3. The check below, which turns a subtle failure into an obvious one.
//
// Consider adding the `server-only` package if you want the same guarantee as a
// build error rather than a runtime throw.
if (typeof window !== 'undefined') {
  throw new Error(
    'lib/supabase/admin.ts was imported into client code. It carries the service-role key — move the call into a Route Handler or Server Action.',
  )
}

/**
 * Privileged client. RLS does not apply. Reserved for:
 *   - inserting into `leads` from /api/leads, after zod validation and rate
 *     limiting (§10, §11) — this is the only write path that table has;
 *   - reading leads for the client's inbox, which cannot use a user session
 *     because `leads` has no select policy;
 *   - writing to the `media` storage bucket;
 *   - managing the `admins` roster.
 *
 * Never hand this client a value that came from a request body without
 * validating it first — there is no second line of defence behind it.
 */
export function createSupabaseAdminClient() {
  return createClient<Database>(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  })
}
