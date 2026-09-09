import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Building2,
  CheckCircle2,
  ChevronRight,
  Hammer,
  Home,
  Layers,
  Phone,
  ShieldCheck,
} from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/ui'
import { contact, getAllServices, site } from '@/content'

export const metadata: Metadata = {
  title: 'Construction Services in Tumkur | Residential, Commercial & Turnkey',
  description:
    'Explore civil construction services by Sneha Construction in Tumkur: Luxury residential duplexes & villas, commercial complexes, and turnkey builds starting at ₹1,875/sq ft.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Civil Construction Services | Sneha Construction, Tumkur',
    description:
      'Turnkey house construction, residential duplexes, and commercial civil engineering in Tumkur district.',
    url: '/services',
    type: 'website',
  },
}

export default function ServicesOverviewPage() {
  const allServices = getAllServices()

  return (
    <>
      {/* 1. Services Hero Section */}
      <section className="relative isolate overflow-hidden bg-slate-50 pt-32 pb-20 sm:pt-40 sm:pb-24 border-b border-slate-200">
        <Container className="relative z-10">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-[#CE1C73]"
            >
              <Home size={14} className="text-[#CE1C73]" />
              <span>Home</span>
            </Link>
            <ChevronRight size={14} className="text-slate-400" />
            <span className="text-[#CE1C73]">Services</span>
          </nav>

          <div className="mt-8 max-w-3xl">
            <div className="inline-flex items-center gap-2 font-secondary text-xs sm:text-[0.8125rem] font-bold tracking-[0.18em] text-[#CE1C73] uppercase">
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 rounded-[2px] bg-[#CE1C73]"
              />
              COMPREHENSIVE CONSTRUCTION SOLUTIONS
            </div>

            <h1 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15] tracking-tight text-slate-900">
              Civil engineering and architectural mastery for Tumkur
            </h1>

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-600">
              Whether you are constructing a dream family duplex, a modern villa, a multi-storey
              commercial hub, or need turnkey delivery at ₹1,875/sq ft, we provide end-to-end
              architectural planning, municipal approvals, and structural execution.
            </p>

            {/* 4 Trust Metrics */}
            <div className="mt-10 grid grid-cols-2 gap-4 border-t border-slate-200 pt-8 sm:grid-cols-4">
              <div>
                <p className="font-display text-3xl font-extrabold text-[#CE1C73]">₹1,875</p>
                <p className="mt-1 text-xs text-slate-500 font-medium">Starting Turnkey Rate / sq ft</p>
              </div>
              <div>
                <p className="font-display text-3xl font-extrabold text-slate-900">250+</p>
                <p className="mt-1 text-xs text-slate-500 font-medium">Residences Handed Over</p>
              </div>
              <div>
                <p className="font-display text-3xl font-extrabold text-slate-900">100%</p>
                <p className="mt-1 text-xs text-slate-500 font-medium">Vastu &amp; Safety Compliance</p>
              </div>
              <div>
                <p className="font-display text-3xl font-extrabold text-slate-900">25+ Yrs</p>
                <p className="mt-1 text-xs text-slate-500 font-medium">Proven Civil Track Record</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Three Main Pillars Cards Grid */}
      <section className="relative bg-white py-20 sm:py-28">
        <Container>
          <div className="space-y-16">
            {allServices.map((service, index) => (
              <div
                key={service.slug}
                className="group flex flex-col overflow-hidden rounded-[26px] border border-slate-200 bg-[#F8F9FA] shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-xl lg:flex-row"
              >
                {/* Visual Image Block */}
                <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-slate-100 lg:w-[45%]">
                  <Image
                    src={service.heroImage}
                    alt={service.name}
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-5 left-5">
                    <span className="rounded-full bg-slate-900/80 px-3.5 py-1 text-xs font-bold text-white backdrop-blur-md">
                      Pillar 0{index + 1}
                    </span>
                  </div>
                </div>

                {/* Content Block */}
                <div className="flex flex-1 flex-col justify-between p-8 sm:p-10">
                  <div>
                    <div className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#CE1C73]">
                      <span>{service.rateHighlight}</span>
                    </div>

                    <h2 className="mt-3 font-display text-2xl sm:text-3xl font-bold text-slate-900 transition-colors group-hover:text-[#CE1C73]">
                      {service.name}
                    </h2>

                    <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600">
                      {service.heroLead}
                    </p>

                    {/* Sub-services Pills */}
                    <div className="mt-6 flex flex-wrap items-center gap-2">
                      {service.subServices.map((sub, sIdx) => (
                        <span
                          key={sIdx}
                          className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-xs"
                        >
                          {sub.title}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200/80 pt-6">
                    <div className="text-xs text-slate-500">
                      <span>{service.timelineHighlight}</span> ·{' '}
                      <span className="text-emerald-700 font-semibold">
                        {service.complianceHighlight}
                      </span>
                    </div>

                    <Link
                      href={`/services/${service.canonicalSlug}`}
                      className="inline-flex items-center gap-2 rounded-full bg-[#CE1C73] px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md transition-all duration-200 hover:bg-[#B81564] hover:scale-105"
                    >
                      <span>Explore {service.shortName} Specs</span>
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. The Sneha Construction Standards */}
      <section className="relative bg-[#FAFAF8] py-20 sm:py-28 border-y border-slate-200">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 font-secondary text-xs sm:text-[0.8125rem] font-bold tracking-[0.18em] text-[#CE1C73] uppercase">
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 rounded-[2px] bg-[#CE1C73]"
              />
              OUR CORE GUARANTEES
            </div>

            <h2 className="mt-4 font-display text-3xl font-bold leading-[1.18] tracking-tight text-slate-900 sm:text-4xl">
              Why Tumkur families trust Sneha Construction
            </h2>

            <p className="mt-4 text-base text-slate-600 sm:text-lg">
              We eliminate contractor stress through scientific engineering, fixed contracts, and
              uncompromising structural discipline.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#CE1C73]/15 text-[#CE1C73]">
                <ShieldCheck size={22} />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-slate-900">
                Zero Cost Creep Guarantee
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Itemized BOQ contracts with locked material brands and square-foot pricing from day
                one until key handover.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#CE1C73]/15 text-[#CE1C73]">
                <Layers size={22} />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-slate-900">
                100% Primary Steel &amp; Cement
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Only certified Tata Tiscon Fe-550D TMT rebars and UltraTech 53-grade cement delivered
                with factory test certificates.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#CE1C73]/15 text-[#CE1C73]">
                <Building2 size={22} />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-slate-900">
                Vastu &amp; Municipal Sanctions
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                In-house architectural drawings conforming to directional Vastu Shastra and local
                TUDA sanction bylaws.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#CE1C73]/15 text-[#CE1C73]">
                <Hammer size={22} />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-slate-900">
                Daily Civil Site Supervision
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Full-time civil engineers on-site daily checking rebar alignment, slump cones, and
                21-day structural water curing.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. Free Consultation CTA Banner */}
      <section className="relative bg-gradient-to-r from-slate-50 via-white to-pink-50/40 py-20 sm:py-24 border-t border-slate-200">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 font-secondary text-xs sm:text-[0.8125rem] font-bold tracking-[0.16em] text-[#CE1C73] uppercase">
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 rounded-[2px] bg-[#CE1C73]"
              />
              GET STARTED TODAY
            </div>

            <h2 className="mt-4 font-display text-3xl font-bold leading-[1.18] tracking-tight text-slate-900 sm:text-4xl">
              Discuss your construction project with our lead engineer
            </h2>

            <p className="mt-4 text-base text-slate-600 sm:text-lg">
              Book a complimentary on-site inspection and get a customized 3D plan &amp; BOQ cost
              breakdown.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <Link
                href="/contact"
                className="group inline-flex items-center rounded-full bg-[#CE1C73] py-2 pr-2 pl-6 text-sm sm:text-base font-bold text-white shadow-xl shadow-[#CE1C73]/25 transition-all duration-200 hover:bg-[#B81564]"
              >
                <span>Request Free Consultation</span>
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
