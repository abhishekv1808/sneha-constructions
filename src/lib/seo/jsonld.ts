// Structured data — CLAUDE.md §12. One builder per schema type so every page
// that describes the business says exactly the same thing (Google cross-checks
// NAP across pages and against the Google Business Profile).

import { contact, serviceAreas, site, socialLinks } from '@/content'
import { env } from '@/lib/env'

/**
 * Office location. APPROXIMATE — Tumkur city centre. Replace with the exact
 * pin from the client's Google Business Profile (§14 Phase 0 input).
 */
const OFFICE_GEO = { latitude: 13.3379, longitude: 77.1173 } as const

/** `LocalBusiness` + `GeneralContractor` with full NAP — home and contact pages. */
export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'GeneralContractor'],
    '@id': `${env.NEXT_PUBLIC_SITE_URL}/#business`,
    name: site.name,
    slogan: site.tagline,
    description: site.positioning,
    url: env.NEXT_PUBLIC_SITE_URL,
    logo: `${env.NEXT_PUBLIC_SITE_URL}/sneha-constructions-logo.png`,
    image: `${env.NEXT_PUBLIC_SITE_URL}/opengraph-image`,
    // E.164 form, not the spaced display form.
    telephone: contact.phoneHref.replace('tel:', ''),
    email: contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact.address.street,
      addressLocality: contact.address.locality,
      addressRegion: contact.address.region,
      postalCode: contact.address.postalCode,
      addressCountry: contact.address.country,
    },
    geo: { '@type': 'GeoCoordinates', ...OFFICE_GEO },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '21:00',
    },
    areaServed: serviceAreas.map((area) => ({ '@type': 'City', name: area.name })),
    priceRange: `From ₹${site.baseRateSqft.toLocaleString('en-IN')}/sq ft`,
    // Empty until the client supplies real profiles (§2) — never placeholders.
    ...(socialLinks.length > 0 && { sameAs: socialLinks.map((link) => link.href) }),
  }
}

/**
 * Serialises for a `<script type="application/ld+json">`. Escaping `<` stops
 * any string in the data from closing the script tag early.
 */
export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}
