'use client'

import Script from 'next/script'
import { useEffect } from 'react'

import { AnalyticsEvent, trackEvent } from '@/lib/analytics'

/**
 * Names the part of the page a click came from, so reports can say "the
 * mobile action bar drives 60% of calls" rather than just "calls happened".
 * An explicit data-track-location wins; otherwise fall back to landmarks.
 */
function clickLocation(el: Element): string {
  const tagged = el.closest<HTMLElement>('[data-track-location]')
  if (tagged?.dataset.trackLocation) return tagged.dataset.trackLocation
  if (el.closest('header')) return 'header'
  if (el.closest('footer')) return 'footer'
  if (el.closest('[role="dialog"]')) return 'modal'
  const labelled = el.closest('nav[aria-label], [aria-label]:not(a):not(button)')
  if (labelled) return labelled.getAttribute('aria-label') ?? 'labelled-region'
  const section = el.closest('section[id]')
  if (section) return section.id
  return 'page'
}

/**
 * GA4 loader plus one delegated click listener for every tel: and wa.me link
 * on the site — no per-link wiring, so a new call button is tracked the day
 * it ships. Renders nothing when no measurement ID is configured (local dev,
 * previews), and loads after hydration so it never touches LCP (§13).
 */
export function Analytics({ measurementId }: { measurementId?: string }) {
  useEffect(() => {
    if (!measurementId) return

    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href]')
      if (!link) return
      const href = link.getAttribute('href') ?? ''

      if (href.startsWith('tel:')) {
        trackEvent(AnalyticsEvent.PhoneClick, { link_location: clickLocation(link) })
      } else if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) {
        trackEvent(AnalyticsEvent.WhatsAppClick, { link_location: clickLocation(link) })
      }
    }

    // Capture phase: runs even if a handler further down stops propagation.
    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [measurementId])

  if (!measurementId) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${measurementId}');`}
      </Script>
    </>
  )
}
