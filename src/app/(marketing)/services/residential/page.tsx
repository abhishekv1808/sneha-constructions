import type { Metadata } from 'next'

import { BuildBenefits, CtaBand, SiteProgress, Testimonials } from '@/components/sections'
import {
  ResidentialHero,
  ResidentialJourney,
  ResidentialPackages,
  ResidentialWork,
} from '@/components/sections/residential'
import { ServiceFaqAccordion } from '@/components/sections/ServiceFaqAccordion'
import { Container, SectionHeading } from '@/components/ui'
import { contact, servicesData, site } from '@/content'

const service = servicesData.residential

export const metadata: Metadata = {
  title: `${service.metaTitle} | ${site.name}`,
  description: service.metaDescription,
  alternates: { canonical: '/services/residential' },
  openGraph: {
    title: service.metaTitle,
    description: service.metaDescription,
    url: '/services/residential',
    siteName: site.name,
    locale: 'en_IN',
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: service.name,
  serviceType: 'Residential construction',
  description: service.metaDescription,
  provider: {
    '@type': 'HomeAndConstructionBusiness',
    name: site.name,
    telephone: contact.phoneDisplay,
    email: contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact.address.street,
      addressLocality: contact.address.locality,
      addressRegion: contact.address.region,
      postalCode: contact.address.postalCode,
      addressCountry: contact.address.country,
    },
  },
  areaServed: ['Tumkur', 'Gubbi', 'Kunigal', 'Sira', 'Tiptur'].map((name) => ({
    '@type': 'City',
    name,
  })),
  offers: {
    '@type': 'Offer',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: site.baseRateSqft,
      priceCurrency: 'INR',
      unitText: 'per square foot',
    },
  },
}

/** FAQPage for the questions shown on the page (§12). */
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: service.faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
}

export default function ResidentialPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Same visual language as the home page: light sections, the house
          rising out of a sky in the hero, proof figures overlapping it. */}

      {/* 1. Hero — offer, quote, phone and the proof figures */}
      <ResidentialHero />

      {/* 2. The work itself, filterable by typology */}
      <ResidentialWork />

      {/* 3. Real sites mid-build — the same on-site photos as the home page */}
      <SiteProgress />

      {/* 4. Paper to keys */}
      <ResidentialJourney />

      {/* 5. Staged payments, one site engineer, WhatsApp updates */}
      <BuildBenefits />

      {/* 6. Packages against a live area figure */}
      <ResidentialPackages />

      {/* 7. Families who built with us */}
      <Testimonials />

      {/* 8. Residential questions */}
      <section className="bg-white py-16 sm:py-24 lg:py-28">
        <Container>
          <SectionHeading
            eyebrow="Questions"
            className="mx-auto text-center"
            lead="What families ask us most before they build a home with us."
          >
            Building a home, <em>answered</em>
          </SectionHeading>
          <ServiceFaqAccordion faqs={service.faqs} />
        </Container>
      </section>

      {/* 9. Closing call to action */}
      <CtaBand />
    </>
  )
}
