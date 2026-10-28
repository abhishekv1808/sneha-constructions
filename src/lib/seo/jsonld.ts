// Structured data — CLAUDE.md §12. One builder per schema type so every page
// that describes the business says exactly the same thing (Google cross-checks
// NAP across pages and against the Google Business Profile).

import { contact, serviceAreas, site, socialLinks } from '@/content'
import { frontElevations } from '@/content/front-elevations'
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

/** Absolute URL for a site-relative path (static image imports are site-relative). */
const absolute = (path: string) => new URL(path, env.NEXT_PUBLIC_SITE_URL).href

/**
 * `ImageGallery` of the front elevation designs on the home page. Credits the
 * business as creator so Google Images can attribute them (and show the
 * credit line) instead of treating them as anonymous stock.
 */
export function frontElevationGalleryJsonLd() {
  const business = { '@id': `${env.NEXT_PUBLIC_SITE_URL}/#business` }
  const year = new Date().getFullYear()

  return {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: `Front elevation designs by ${site.name}`,
    description:
      '3D front elevation designs for duplex, narrow-plot and multi-storey homes, created by the in-house design team at Sneha Construction & Developers, Tumkur.',
    url: env.NEXT_PUBLIC_SITE_URL,
    creator: business,
    associatedMedia: frontElevations.map((elevation) => ({
      '@type': 'ImageObject',
      name: elevation.title,
      description: elevation.alt,
      contentUrl: absolute(elevation.image.src),
      width: elevation.image.width,
      height: elevation.image.height,
      encodingFormat: 'image/webp',
      creator: business,
      creditText: site.name,
      copyrightHolder: business,
      copyrightNotice: `© ${year} ${site.name}`,
    })),
  }
}

/**
 * Serialises for a `<script type="application/ld+json">`. Escaping `<` stops
 * any string in the data from closing the script tag early.
 */
export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}
