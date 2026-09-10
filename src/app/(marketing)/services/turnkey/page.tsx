import { ArrowRight, MessageCircle, Phone, Quote } from 'lucide-react'
import type { Metadata } from 'next'

import {
  TurnkeyInclusions,
  TurnkeyPayments,
  TurnkeyRateHero,
  TurnkeyRemoteOwner,
  TurnkeySingleContract,
} from '@/components/sections/turnkey'
import { Container, SectionHeading } from '@/components/ui'
import { contact, servicesData, site, whatsappUrl } from '@/content'

const service = servicesData.turnkey

export const metadata: Metadata = {
  title: `${service.metaTitle} | ${site.name}`,
  description: service.metaDescription,
  alternates: { canonical: '/services/turnkey' },
  openGraph: {
    title: service.metaTitle,
    description: service.metaDescription,
    url: '/services/turnkey',
    siteName: site.name,
    locale: 'en_IN',
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: service.name,
  serviceType: 'Turnkey house construction',
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

export default function TurnkeyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. The rate, unpacked */}
      <TurnkeyRateHero />

      {/* 2. Included and, more importantly, not included */}
      <TurnkeyInclusions />

      {/* 3. The remote owner's weekly record */}
      <TurnkeyRemoteOwner />

      {/* 4. Milestone payment ladder */}
      <TurnkeyPayments />

      {/* 5. Twelve trades into one agreement, plus the handover audit */}
      <TurnkeySingleContract />

      {/* 6. Proof — the NRI owner, quoted plainly */}
      <section className="relative bg-plaster-50 py-20 sm:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <SectionHeading eyebrow="Proof">
                An owner <em>who was 3,000 km away</em>
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

      {/* 7. CTA — WhatsApp-first. This audience is often on a different clock. */}
      <section className="relative bg-ink-950 py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl leading-[1.12] font-semibold tracking-tight text-white sm:text-4xl">
              Tell us the plot size.{' '}
              <span className="font-playfair italic">We&apos;ll send the BOQ.</span>
            </h2>
            <p className="mt-4 font-secondary text-base text-slate-300">
              Line by line, before you commit to anything.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={whatsappUrl(
                  `Hi ${site.shortName}, I have a plot in Tumkur and I'd like the itemised turnkey BOQ at ₹${site.baseRateSqft}/sq ft. My plot size is: `,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center rounded-full bg-brand-500 py-2 pr-2 pl-6 font-secondary text-sm font-bold text-white transition-colors duration-150 hover:bg-brand-600"
              >
                <span>Send plot size on WhatsApp</span>
                <span className="ml-3.5 flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-500 transition-transform duration-200 group-hover:translate-x-1">
                  <MessageCircle size={16} strokeWidth={2.5} />
                </span>
              </a>

              <a
                href={contact.phoneHref}
                className="inline-flex items-center gap-2.5 rounded-full border border-white/25 px-5 py-3 font-secondary text-sm font-bold text-white transition-colors duration-150 hover:border-white/60 hover:bg-white/10"
              >
                <Phone size={16} />
                <span>{contact.phoneDisplay}</span>
              </a>
            </div>

            <p className="mt-6 font-secondary text-xs text-slate-500">
              {contact.hoursShort} · we reply within one working day
            </p>
          </div>
        </Container>
      </section>

      {/* Cross-link, since turnkey and residential answer different questions */}
      <section className="border-t border-plaster-200 bg-white py-10">
        <Container>
          <a
            href="/services/residential"
            className="group flex flex-wrap items-center justify-center gap-3 text-center font-secondary text-sm text-slate-600"
          >
            <span>Want to see the homes themselves?</span>
            <span className="inline-flex items-center gap-1.5 font-bold text-brand-500">
              Residential work
              <ArrowRight
                size={15}
                strokeWidth={2.4}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </span>
          </a>
        </Container>
      </section>
    </>
  )
}
