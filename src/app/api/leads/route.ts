import { NextResponse, type NextRequest } from 'next/server'
import { Resend } from 'resend'

import { env } from '@/lib/env'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'
import { leadFormSchema } from '@/lib/validation'

// node:crypto is used by the admin client — this cannot run on the edge.
export const runtime = 'nodejs'

// ---------------------------------------------------------------------------
// Rate limiting — §11: 5 per 10 minutes per IP.
// ---------------------------------------------------------------------------

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX = 5

/**
 * In-memory map is adequate for a single Vercel serverless instance at this
 * traffic volume. Entries expire after the window closes. If the site ever
 * scales to multiple regions with sustained spam, swap this for Vercel KV or
 * Upstash Redis — but that is not this site's problem today.
 */
const ipHits = new Map<string, { count: number; windowStart: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = ipHits.get(ip)

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    ipHits.set(ip, { count: 1, windowStart: now })
    return false
  }

  entry.count += 1
  return entry.count > RATE_LIMIT_MAX
}

// Periodically prune stale entries so the map does not grow without bound in
// long-lived serverless instances.
function pruneStaleEntries() {
  const now = Date.now()
  for (const [ip, entry] of ipHits) {
    if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
      ipHits.delete(ip)
    }
  }
}

// ---------------------------------------------------------------------------
// Anti-spam — §11.
// ---------------------------------------------------------------------------

/** §11: submissions under 2 seconds are dropped. */
const MIN_SUBMIT_TIME_MS = 2_000

// ---------------------------------------------------------------------------
// Resend — transactional email for lead notifications.
// ---------------------------------------------------------------------------

const resend = new Resend(env.RESEND_API_KEY)

function formatLeadEmail(data: {
  fullName: string
  phone: string
  email: string
  serviceType?: string
  message: string
  source: string
  pagePath: string
  plotDimensions?: string
  builtUpArea?: string | number
  estimatedCost?: string
  packageTier?: string
  floors?: string
  locality?: string
  vastuFacing?: string
}): { subject: string; text: string } {
  const lines = [
    `New lead from ${data.source || 'Website'}`,
    '',
    `Name:            ${data.fullName}`,
    `Phone:           ${data.phone}`,
    `Email:           ${data.email || '—'}`,
    `Service:         ${data.serviceType || '—'}`,
    `Plot / Size:     ${data.plotDimensions || '—'}`,
    `Built-up Area:   ${data.builtUpArea ? `${data.builtUpArea} sq ft` : '—'}`,
    `Estimated Cost:  ${data.estimatedCost || '—'}`,
    `Package Tier:    ${data.packageTier || '—'}`,
    `Floors:          ${data.floors || '—'}`,
    `Locality:        ${data.locality || '—'}`,
    `Vastu Facing:    ${data.vastuFacing || '—'}`,
    `Source:          ${data.source || '—'}`,
    `Page:            ${data.pagePath}`,
    '',
    'Message / Requirements:',
    data.message || '(no message)',
  ]

  return {
    subject: `New enquiry from ${data.fullName} (${data.phone}) — ${data.source || 'Sneha Construction'}`,
    text: lines.join('\n'),
  }
}

// ---------------------------------------------------------------------------
// POST handler
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  // § 11 rate limit.
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: 'Too many requests. Please try again in a few minutes.' },
      { status: 429 },
    )
  }

  // Prune after the check so the hot path is not blocked.
  pruneStaleEntries()

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body.' },
      { status: 400 },
    )
  }

  // §11: the same zod schema re-validates on the server. Never trust the client.
  const parsed = leadFormSchema.safeParse(body)
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]
    return NextResponse.json(
      {
        success: false,
        error: firstIssue
          ? `${firstIssue.path.join('.')}: ${firstIssue.message}`
          : 'Invalid form data.',
      },
      { status: 400 },
    )
  }

  const {
    fullName,
    phone,
    email,
    serviceType,
    message,
    plotDimensions,
    builtUpArea,
    estimatedCost,
    packageTier,
    floors,
    locality,
    vastuFacing,
    source,
    honeypot,
    loadedAt,
  } = parsed.data

  // §11: honeypot field — bots fill it, humans never see it.
  if (honeypot) {
    // Return success to the bot so it does not retry.
    return NextResponse.json({ success: true })
  }

  // §11: submissions under 2 seconds are dropped.
  if (Date.now() - loadedAt < MIN_SUBMIT_TIME_MS) {
    return NextResponse.json({ success: true })
  }

  const pagePath = request.headers.get('referer') ?? '/contact'

  // Construct a summary note if tool fields were provided
  const toolDetailsSummary = [
    plotDimensions ? `Plot: ${plotDimensions}` : '',
    builtUpArea ? `Area: ${builtUpArea} sq ft` : '',
    estimatedCost ? `Est. Cost: ${estimatedCost}` : '',
    packageTier ? `Tier: ${packageTier}` : '',
    floors ? `Floors: ${floors}` : '',
    locality ? `Locality: ${locality}` : '',
    vastuFacing ? `Vastu: ${vastuFacing}` : '',
  ]
    .filter(Boolean)
    .join(' | ')

  const compositeMessage = toolDetailsSummary
    ? `[${toolDetailsSummary}] ${message || ''}`.trim()
    : message || null

  // Insert into the leads table via the service-role client. The leads table
  // has no anon insert policy — inserts go through the service-role key only,
  // after server-side validation and rate limiting (§10, §11).
  try {
    const supabase = createSupabaseAdminClient()

    const { error: dbError } = await supabase.from('leads').insert({
      full_name: fullName,
      phone,
      email: email || null,
      service_type: serviceType || null,
      message: compositeMessage,
      source: source || 'contact',
      page_path: pagePath,
      status: 'new',
    })

    if (dbError) {
      console.error('Failed to insert lead:', dbError)
      return NextResponse.json(
        {
          success: false,
          error: "Couldn't send that — check your phone number, or call us on +91 80014 80064.",
        },
        { status: 500 },
      )
    }
  } catch (err) {
    console.error('Supabase insert threw:', err)
    return NextResponse.json(
      {
        success: false,
        error: "Couldn't send that — check your phone number, or call us on +91 80014 80064.",
      },
      { status: 500 },
    )
  }

  // Fire a Resend notification to the client's inbox — §11.
  // Best-effort: a failed email does not fail the lead capture.
  try {
    const { subject, text } = formatLeadEmail({
      fullName,
      phone,
      email: email || '',
      serviceType,
      message: message || '',
      source: source || 'Website',
      pagePath,
      plotDimensions,
      builtUpArea,
      estimatedCost,
      packageTier,
      floors,
      locality,
      vastuFacing,
    })

    await resend.emails.send({
      from: 'Sneha Construction <leads@snehaconstruction.com>',
      to: env.LEAD_NOTIFY_EMAIL,
      subject,
      text,
    })
  } catch (err) {
    // Log but do not fail the request — the lead is already saved.
    console.error('Resend notification failed:', err)
  }

  return NextResponse.json({ success: true })
}

export function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to submit a lead.' },
    { status: 405, headers: { Allow: 'POST' } },
  )
}
