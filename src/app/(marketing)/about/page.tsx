import type { Metadata } from 'next'

import {
  AboutHero,
  AboutPartners,
  AboutStory,
  AboutTeam,
  AboutTimeline,
  AboutValues,
} from '@/components/sections/about-page'
import { CtaBand, Marquee } from '@/components/sections'
import { contact, site } from '@/content'

export const metadata: Metadata = {
  title: 'About Us | 25+ Years of Structural Mastery in Tumkur',
  description:
    'Discover Sneha Construction & Developers — 25+ years of trusted civil engineering, turnkey luxury residential builds, and 3D architectural design in Tumkur, Karnataka.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Us | Sneha Construction & Developers, Tumkur',
    description:
      '25+ years of trusted civil engineering, turnkey residential construction, and modern 3D architecture across Tumkur district.',
    url: '/about',
    type: 'website',
  },
}

export default function AboutPage() {
  return (
    <>
      {/* Schema.org Organization Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': ['Organization', 'GeneralContractor'],
            name: site.name,
            alternateName: site.shortName,
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
            logo: `${process.env.NEXT_PUBLIC_SITE_URL}/icon.png`,
            foundingDate: '1999',
            description:
              'Premier turnkey residential construction, 3D architectural design, and civil engineering firm based in Tumkur, Karnataka.',
            address: {
              '@type': 'PostalAddress',
              streetAddress: contact.address.street,
              addressLocality: contact.address.locality,
              addressRegion: contact.address.region,
              postalCode: contact.address.postalCode,
              addressCountry: 'IN',
            },
            telephone: contact.phoneDisplay,
            email: contact.email,
          }),
        }}
      />

      {/* 1. Dark Luxury Page Header with Breadcrumbs & Key Metrics */}
      <AboutHero />

      {/* 2. Detailed Company Story, Origins & Philosophy */}
      <AboutStory />

      {/* 3. Golden Marquee Ribbon */}
      <Marquee />

      {/* 4. 6 Core Engineering & Design Value Pillars */}
      <AboutValues />

      {/* 5. 25-Year Milestone Journey Timeline (1999 to Present) */}
      <AboutTimeline />

      {/* 6. Executive Leadership & Senior Engineering Team Profiles */}
      <AboutTeam />

      {/* 7. Certified Tier-1 Material Sourcing & Brand Partners */}
      <AboutPartners />

      {/* 8. Closing High-Impact Call to Action Band */}
      <CtaBand />
    </>
  )
}
