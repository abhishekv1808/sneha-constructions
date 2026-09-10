import { ArrowRight, Phone } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'

import {
  proofFigures,
  ResidentialHeroGallery,
  ResidentialJourney,
  ResidentialPackages,
  ResidentialSiteReel,
  ResidentialWork,
} from '@/components/sections/residential'
import { Container } from '@/components/ui'
import { contact, servicesData, site } from '@/content'

import ctaBackdrop from '@/assets/services/bespoke/residential-hero-villa.jpg'

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

export default function ResidentialPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Interactive gallery of completed homes */}
      <ResidentialHeroGallery />

      {/* 2. Proof ribbon — four figures, no prose */}
      <section className="border-b border-plaster-200 bg-plaster-50">
        <Container>
          <dl className="grid grid-cols-2 divide-plaster-200 lg:grid-cols-4 lg:divide-x">
            {proofFigures.map((figure) => (
              <div
                key={figure.label}
                className="border-b border-plaster-200 px-1 py-6 lg:border-b-0 lg:px-8 lg:first:pl-0 lg:last:pr-0"
              >
                <dd
                  data-numeral
                  className="font-display text-[1.75rem] leading-none font-semibold text-slate-900 sm:text-[2rem]"
                >
                  {figure.value}
                </dd>
                <dt className="mt-1.5 font-secondary text-xs text-slate-500 sm:text-[0.8125rem]">
                  {figure.label}
                </dt>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* 3. The work itself */}
      <ResidentialWork />

      {/* 4. What a build actually looks like */}
      <ResidentialSiteReel />

      {/* 5. Paper to keys */}
      <ResidentialJourney />

      {/* 6. Packages against a live area figure */}
      <ResidentialPackages />

      {/* 7. Closing CTA */}
      <section className="relative isolate overflow-hidden bg-ink-950">
        <Image
          src={ctaBackdrop}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div aria-hidden className="absolute inset-0 bg-ink-950/80" />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/80 to-transparent lg:w-[75%]"
        />

        <Container className="relative z-10 py-20 sm:py-24">
          <div className="max-w-lg">
            <h2 className="font-display text-3xl leading-[1.12] font-semibold tracking-tight text-white sm:text-4xl">
              Bring us your plot. <span className="font-playfair italic">We&apos;ll bring the plan.</span>
            </h2>
            <p className="mt-4 font-secondary text-base text-slate-300">
              Free site visit anywhere in Tumkur district.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={contact.phoneHref}
                className="group inline-flex items-center rounded-full bg-brand-500 py-2 pr-2 pl-6 font-secondary text-sm font-bold text-white transition-colors duration-150 hover:bg-brand-600"
              >
                <span>Call {contact.phoneDisplay}</span>
                <span className="ml-3.5 flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-500 transition-transform duration-200 group-hover:translate-x-1">
                  <Phone size={15} strokeWidth={2.5} />
                </span>
              </a>

              <a
                href="/contact"
                className="inline-flex items-center gap-2.5 rounded-full border border-white/25 px-5 py-3 font-secondary text-sm font-bold text-white transition-colors duration-150 hover:border-white/60 hover:bg-white/10"
              >
                <span>Send your plot details</span>
                <ArrowRight size={16} strokeWidth={2.4} />
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
