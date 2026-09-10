import { ArrowRight, Phone, Quote } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

import {
  CommercialCapability,
  CommercialCompliance,
  CommercialProgramme,
  CommercialTypologies,
  CommercialYieldHero,
} from '@/components/sections/commercial'
import { Container, SectionHeading } from '@/components/ui'
import { contact, servicesData, site } from '@/content'

const service = servicesData.commercial

export const metadata: Metadata = {
  title: `${service.metaTitle} | ${site.name}`,
  description: service.metaDescription,
  alternates: { canonical: '/services/commercial' },
  openGraph: {
    title: service.metaTitle,
    description: service.metaDescription,
    url: '/services/commercial',
    siteName: site.name,
    locale: 'en_IN',
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: service.name,
  serviceType: 'Commercial construction',
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
}

export default function CommercialPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. The yield configurator is the hero */}
      <CommercialYieldHero />

      {/* 2. Six typologies, six sets of rules */}
      <CommercialTypologies />

      {/* 3. The sanction path */}
      <CommercialCompliance />

      {/* 4. Structural capability table */}
      <CommercialCapability />

      {/* 5. Parallel programme */}
      <CommercialProgramme />

      {/* 6. Proof — one client, quoted plainly. No project gallery until the
             client supplies genuine commercial photography (§14 Phase 0). */}
      <section className="relative bg-white py-20 sm:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <SectionHeading eyebrow="Proof">
                A landlord <em>who leased it out</em>
              </SectionHeading>
            </div>

            <figure className="lg:col-span-8">
              <Quote size={28} className="text-brand-500" strokeWidth={1.5} aria-hidden />
              <blockquote className="mt-4 font-display text-xl leading-[1.5] font-medium text-slate-900 sm:text-2xl">
                {service.clientFamilyStory.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-plaster-200 pt-4 font-secondary text-sm">
                <span className="font-bold text-slate-900">{service.clientFamilyStory.name}</span>
                <span className="mt-0.5 block text-slate-500">
                  {service.clientFamilyStory.location} · {service.clientFamilyStory.year}
                </span>
              </figcaption>
            </figure>
          </div>
        </Container>
      </section>

      {/* 7. CTA — form-first. Commercial enquiries arrive with documents. */}
      <section className="relative bg-ink-950 py-20 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <h2 className="font-display text-3xl leading-[1.12] font-semibold tracking-tight text-white sm:text-4xl">
                Send us your plot dimensions{' '}
                <span className="font-playfair italic">and intended use.</span>
              </h2>
              <p className="mt-4 max-w-lg font-secondary text-base text-slate-300">
                You get a written feasibility note back — FAR, buildable area, and where the
                approvals will take time.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 lg:col-span-5 lg:justify-end">
              <Link
                href="/contact"
                className="group inline-flex items-center rounded-full bg-brand-500 py-2 pr-2 pl-6 font-secondary text-sm font-bold text-white transition-colors duration-150 hover:bg-brand-600"
              >
                <span>Request feasibility note</span>
                <span className="ml-3.5 flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-500 transition-transform duration-200 group-hover:translate-x-1">
                  <ArrowRight size={16} strokeWidth={2.5} />
                </span>
              </Link>

              <a
                href={contact.phoneHref}
                className="inline-flex items-center gap-2.5 rounded-full border border-white/25 px-5 py-3 font-secondary text-sm font-bold text-white transition-colors duration-150 hover:border-white/60 hover:bg-white/10"
              >
                <Phone size={16} />
                <span>{contact.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
