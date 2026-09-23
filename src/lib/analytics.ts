// Conversion tracking — the site's primary KPI (CLAUDE.md §1) is quote-form
// submissions and tel: taps per 100 sessions, so these are the events that
// matter. Provider: Google Analytics 4 via gtag.js, loaded by
// components/analytics/Analytics.tsx only when a measurement ID is configured.
//
// Every function here is a safe no-op when GA is absent (no ID, blocked by an
// ad blocker, or during SSR) — tracking must never break a form.

import { markLeadCaptured } from '@/lib/utils/lead-memory'

type EventParams = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

/**
 * Event names, in one place so reports stay consistent.
 * In GA4, mark `generate_lead`, `click_to_call` and `whatsapp_click` as key
 * events (Admin → Events) — those three are the conversions.
 */
export const AnalyticsEvent = {
  /** A lead reached /api/leads successfully. GA4 recommended event name. */
  Lead: 'generate_lead',
  /** Any tap on a tel: link. */
  PhoneClick: 'click_to_call',
  /** Any tap on a wa.me link. */
  WhatsAppClick: 'whatsapp_click',
  /** The quick-quote modal opened — top of the quote funnel. */
  QuoteFormOpen: 'quote_form_open',
  /** The exit-intent popup was shown. */
  ExitIntentShown: 'exit_intent_shown',
} as const

export function trackEvent(name: string, params: EventParams = {}): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  try {
    window.gtag('event', name, { page_path: window.location.pathname, ...params })
  } catch {
    // Analytics must never throw into UI code.
  }
}

/**
 * Call once, right after /api/leads confirms success. Records the conversion
 * and remembers the visitor as a lead (so the exit popup never asks them again).
 *
 * @param source Where the lead came from — use the same string sent as `source`
 *               in the lead payload, so GA and the leads table agree.
 */
export function recordLeadConversion(source: string): void {
  markLeadCaptured()
  trackEvent(AnalyticsEvent.Lead, { lead_source: source })
}
