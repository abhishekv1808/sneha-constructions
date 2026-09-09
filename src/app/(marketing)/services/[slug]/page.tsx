import {
  ArrowRight,
  Award,
  Building,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Home,
  MapPin,
  Phone,
  Shield,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ServiceFaqAccordion } from '@/components/sections/ServiceFaqAccordion'
import { ResidentialHero } from '@/components/sections/services/ResidentialHero'
import { CommercialHero } from '@/components/sections/services/CommercialHero'
import { TurnkeyHero } from '@/components/sections/services/TurnkeyHero'
import { TeamCraftsmanshipSection } from '@/components/sections/services/TeamCraftsmanshipSection'
import { Container } from '@/components/ui'
import { contact, getServiceBySlug, serviceAliases, site } from '@/content'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return Object.keys(serviceAliases).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    return {
      title: 'Service Not Found | Sneha Construction',
    }
  }

  return {
    title: `${service.metaTitle} | Sneha Construction & Developers`,
    description: service.metaDescription,
    alternates: {
      canonical: `/services/${service.canonicalSlug}`,
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `/services/${service.canonicalSlug}`,
      siteName: site.name,
      locale: 'en_IN',
      type: 'article',
    },
  }
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  // Schema.org Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.metaDescription,
    provider: {
      '@type': 'HomeAndConstructionBusiness',
      name: site.name,
      telephone: contact.phoneDisplay,
      address: {
        '@type': 'PostalAddress',
        streetAddress: contact.address.street,
        addressLocality: contact.address.locality,
        addressRegion: contact.address.region,
        postalCode: contact.address.postalCode,
        addressCountry: 'IN',
      },
    },
    offers: {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '1875',
        priceCurrency: 'INR',
        unitText: 'per square foot',
      },
    },
    areaServed: {
      '@type': 'City',
      name: 'Tumkur',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Bespoke Distinct Hero Layouts with Beautiful Building Photos on Right */}
      {service.slug === 'residential' && <ResidentialHero service={service} />}
      {service.slug === 'commercial' && <CommercialHero service={service} />}
      {service.slug === 'turnkey' && <TurnkeyHero service={service} />}

      {/* 2. Deep-Dive Overview & What We Build (Sub-Services Grid) */}
      <section className="relative bg-white py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 font-secondary text-xs sm:text-[0.8125rem] font-bold tracking-[0.16em] text-[#CE1C73] uppercase">
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 rounded-[2px] bg-[#CE1C73]"
              />
              PROJECT SCOPE &amp; TYPOLOGIES
            </div>

            <h2 className="mt-4 font-display text-3xl font-bold leading-[1.18] tracking-tight text-slate-900 sm:text-4xl">
              Specialized solutions tailored to your requirements
            </h2>

            <div className="mt-6 space-y-4 text-left text-slate-600 sm:text-base leading-relaxed">
              {service.overview.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* Sub-Services 6 Cards Grid */}
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.subServices.map((sub, idx) => (
              <div
                key={idx}
                className="group flex flex-col justify-between rounded-[22px] border border-slate-200/90 bg-[#F8F9FA] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#CE1C73]/50 hover:bg-white hover:shadow-xl"
              >
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#CE1C73]/15 text-[#CE1C73] transition-colors duration-300 group-hover:bg-[#CE1C73] group-hover:text-white">
                    <Building size={22} />
                  </div>

                  <h3 className="mt-5 font-display text-lg font-bold text-slate-900 transition-colors group-hover:text-[#CE1C73]">
                    {sub.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                    {sub.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-slate-200/80 pt-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                    Highlights:
                  </p>
                  <ul className="space-y-1.5">
                    {sub.features.map((feat, fIdx) => (
                      <li
                        key={fIdx}
                        className="flex items-center gap-2 text-xs text-slate-700"
                      >
                        <CheckCircle2
                          size={14}
                          className="shrink-0 text-[#CE1C73]"
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 2.5 Dedicated Indian Engineering Team & Craftsmanship Section */}
      <TeamCraftsmanshipSection service={service} />

      {/* 3. Certified Branded Materials & Standard Specs */}
      <section className="relative bg-[#FAFAF8] py-20 sm:py-28 border-y border-slate-200">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 font-secondary text-xs sm:text-[0.8125rem] font-bold tracking-[0.16em] text-[#CE1C73] uppercase">
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 rounded-[2px] bg-[#CE1C73]"
              />
              UNCOMPROMISING QUALITY
            </div>

            <h2 className="mt-4 font-display text-3xl font-bold leading-[1.18] tracking-tight text-slate-900 sm:text-4xl">
              Structural specifications &amp; certified materials
            </h2>

            <p className="mt-4 text-base text-slate-600 sm:text-lg">
              We never cut corners with unbranded materials. Every supply load delivered to your site
              is accompanied by manufacturer test certificates.
            </p>
          </div>

          {/* Specs Grid */}
          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {service.specs.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#CE1C73]/40 hover:shadow-md"
              >
                <div className="flex items-center gap-2 text-[#CE1C73]">
                  <Shield size={18} />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
                    {item.component}
                  </span>
                </div>

                <h4 className="mt-3 font-display text-base font-bold text-slate-900">
                  {item.brand}
                </h4>

                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  {item.specification}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Step-by-Step Construction Process Roadmap */}
      <section className="relative bg-white py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 font-secondary text-xs sm:text-[0.8125rem] font-bold tracking-[0.16em] text-[#CE1C73] uppercase">
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 rounded-[2px] bg-[#CE1C73]"
              />
              EXECUTION MILESTONES
            </div>

            <h2 className="mt-4 font-display text-3xl font-bold leading-[1.18] tracking-tight text-slate-900 sm:text-4xl">
              How we take your project from blueprint to reality
            </h2>

            <p className="mt-4 text-base text-slate-600 sm:text-lg">
              A transparent, milestone-linked workflow so you know the exact status of your build at
              every moment.
            </p>
          </div>

          {/* Process Steps */}
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {service.processSteps.map((step, idx) => (
              <div
                key={idx}
                className="relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-[#F8F9FA] p-7 transition-all duration-300 hover:border-[#CE1C73]/50 hover:bg-white hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#CE1C73] text-sm font-extrabold text-white shadow-sm">
                      {idx + 1}
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest">
                      STAGE 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-lg font-bold text-slate-900">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. Featured Completed Projects Showcase */}
      <section className="relative bg-[#FAFAF8] py-20 sm:py-28 border-y border-slate-200">
        <Container>
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="inline-flex items-center gap-2 font-secondary text-xs sm:text-[0.8125rem] font-bold tracking-[0.16em] text-[#CE1C73] uppercase">
                <span
                  aria-hidden="true"
                  className="inline-block h-2 w-2 rounded-[2px] bg-[#CE1C73]"
                />
                PORTFOLIO SHOWCASE
              </div>
              <h2 className="mt-4 font-display text-3xl font-bold leading-[1.18] tracking-tight text-slate-900 sm:text-4xl">
                Recent {service.shortName} builds in Tumkur
              </h2>
            </div>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2 text-xs sm:text-sm font-bold text-slate-800 shadow-sm transition-all hover:border-[#CE1C73] hover:text-[#CE1C73]"
            >
              <span>View All Projects</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {service.projects.map((proj, pIdx) => (
              <div
                key={pIdx}
                className="group flex flex-col overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              >
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="rounded-full bg-slate-900/80 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-md">
                      {proj.type}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="font-display text-lg font-bold text-slate-900 transition-colors group-hover:text-[#CE1C73]">
                      {proj.title}
                    </h3>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin size={13} className="text-[#CE1C73]" />
                      <span>{proj.location} · {proj.area}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. Frequently Asked Questions Specific to this Service */}
      <section className="relative bg-white py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 font-secondary text-xs sm:text-[0.8125rem] font-bold tracking-[0.16em] text-[#CE1C73] uppercase">
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 rounded-[2px] bg-[#CE1C73]"
              />
              COMMON QUESTIONS
            </div>

            <h2 className="mt-4 font-display text-3xl font-bold leading-[1.18] tracking-tight text-slate-900 sm:text-4xl">
              Frequently asked questions about {service.shortName.toLowerCase()} construction
            </h2>

            <p className="mt-4 text-base text-slate-600 sm:text-lg">
              Everything you need to know about timelines, approvals, and quality guarantees.
            </p>
          </div>

          <ServiceFaqAccordion faqs={service.faqs} />
        </Container>
      </section>

      {/* 7. Call to Action Banner */}
      <section className="relative bg-gradient-to-r from-slate-50 via-white to-pink-50/40 py-20 sm:py-24 border-t border-slate-200">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 font-secondary text-xs sm:text-[0.8125rem] font-bold tracking-[0.16em] text-[#CE1C73] uppercase">
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 rounded-[2px] bg-[#CE1C73]"
              />
              READY TO BUILD?
            </div>

            <h2 className="mt-4 font-display text-3xl font-bold leading-[1.18] tracking-tight text-slate-900 sm:text-4xl">
              Schedule a free site visit and 3D layout consultation
            </h2>

            <p className="mt-4 text-base text-slate-600 sm:text-lg">
              Our civil engineers in Tumkur are ready to inspect your plot, evaluate soil &amp; road
              access, and provide a fixed-price itemized estimate.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <Link
                href="/contact"
                className="group inline-flex items-center rounded-full bg-[#CE1C73] py-2 pr-2 pl-6 text-sm sm:text-base font-bold text-white shadow-xl shadow-[#CE1C73]/25 transition-all duration-200 hover:bg-[#B81564]"
              >
                <span>Book Free Site Consultation</span>
                <span className="ml-3.5 flex h-9 w-9 items-center justify-center rounded-[8px] bg-white text-[#CE1C73] transition-transform duration-200 group-hover:translate-x-1">
                  <ArrowRight size={16} strokeWidth={2.5} />
                </span>
              </Link>

              <a
                href={contact.phoneHref}
                className="inline-flex items-center gap-2.5 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-800 shadow-sm transition-colors hover:border-[#CE1C73] hover:text-[#CE1C73]"
              >
                <Phone size={18} className="text-[#CE1C73]" />
                <span>Call {contact.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
