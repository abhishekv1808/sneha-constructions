import Image from 'next/image'
import Link from 'next/link'
import {
  Phone,
  MessageSquare,
  ShieldCheck,
  Compass,
  CheckCircle2,
  Sparkles,
  Home,
  Users,
  ChevronRight,
  ArrowRight,
} from 'lucide-react'
import { Container } from '@/components/ui'
import { contact } from '@/content'
import type { ServiceDetail } from '@/content/services-data'

interface ResidentialHeroProps {
  service: ServiceDetail
}

export function ResidentialHero({ service }: ResidentialHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FDFBF7] via-white to-[#F8F6F0] pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 border-b border-slate-200">
      {/* Architectural subtle dot grid pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#CE1C730A_1px,transparent_1px)] [background-size:24px_24px]"
      />
      {/* Soft warm architectural ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-10 h-[30rem] w-[30rem] rounded-full bg-pink-100/35 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -left-20 h-96 w-96 rounded-full bg-amber-100/30 blur-3xl"
      />

      <Container className="relative z-10">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 font-secondary"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-[#CE1C73]"
          >
            <Home size={14} className="text-[#CE1C73]" />
            <span>Home</span>
          </Link>
          <ChevronRight size={14} className="text-slate-400" />
          <Link href="/services" className="transition-colors hover:text-[#CE1C73]">
            Services
          </Link>
          <ChevronRight size={14} className="text-slate-400" />
          <span className="text-[#CE1C73] font-bold">Residential Construction</span>
        </nav>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16">
          {/* Left Column: Emotional Family-First Architecture */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-6">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-pink-200/80 bg-pink-50/90 px-4 py-1.5 text-xs font-bold text-[#CE1C73] shadow-xs font-secondary">
              <Sparkles className="h-3.5 w-3.5 text-[#CE1C73]" />
              <span className="tracking-wide uppercase">Tumkur Residential Home Builders</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-slate-900 leading-[1.16]">
              {service.emotionalTitle}
            </h1>

            {/* Supporting Lead */}
            <p className="font-secondary text-base sm:text-lg text-slate-600 leading-relaxed">
              {service.emotionalSubtitle}
            </p>

            {/* 3-Card Trust Metrics Strip */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              <div className="rounded-2xl border border-slate-200/90 bg-white/90 p-3.5 shadow-sm backdrop-blur-xs transition-all hover:border-[#CE1C73]/40">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#CE1C73] mb-1 font-secondary">
                  <Users className="h-4 w-4 shrink-0" />
                  <span>250+ Homes</span>
                </div>
                <p className="text-[11px] font-medium text-slate-600 leading-tight">
                  Handed over in Tumkur
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/90 bg-white/90 p-3.5 shadow-sm backdrop-blur-xs transition-all hover:border-[#CE1C73]/40">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 mb-1 font-secondary">
                  <Compass className="h-4 w-4 shrink-0" />
                  <span>100% Vastu</span>
                </div>
                <p className="text-[11px] font-medium text-slate-600 leading-tight">
                  Bhoomi Pooja to Pravesha
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/90 bg-white/90 p-3.5 shadow-sm backdrop-blur-xs transition-all hover:border-[#CE1C73]/40">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 mb-1 font-secondary">
                  <ShieldCheck className="h-4 w-4 shrink-0" />
                  <span>10-Yr Warranty</span>
                </div>
                <p className="text-[11px] font-medium text-slate-600 leading-tight">
                  Tata Tiscon Fe550D TMT
                </p>
              </div>
            </div>

            {/* Highlighted Price Banner */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-pink-200 bg-gradient-to-r from-pink-50/60 via-white to-amber-50/40 p-4 shadow-xs">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#CE1C73] opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#CE1C73]" />
                </span>
                <div>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 font-secondary">
                    Transparent Turnkey Rate
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display text-2xl sm:text-3xl font-black text-[#CE1C73] leading-none">
                      {service.rateHighlight}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 font-secondary">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>Zero Hidden Escalation</span>
              </div>
            </div>

            {/* Action Row */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/contact"
                className="group inline-flex items-center rounded-full bg-[#CE1C73] py-2 pr-2 pl-6 text-sm sm:text-base font-bold text-white shadow-lg shadow-[#CE1C73]/25 transition-all duration-200 hover:bg-[#B81564] hover:shadow-xl font-secondary"
              >
                <span>Plan Your Family Home</span>
                <span className="ml-3.5 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#CE1C73] transition-transform duration-200 group-hover:translate-x-1">
                  <ArrowRight size={16} strokeWidth={2.5} />
                </span>
              </Link>

              <a
                href={contact.phoneHref}
                className="inline-flex items-center gap-2.5 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 shadow-sm transition-colors hover:border-[#CE1C73] hover:text-[#CE1C73] font-secondary"
              >
                <Phone size={17} className="text-[#CE1C73]" />
                <span>Call Us: {contact.phoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Architectural Luxury Villa Showcase */}
          <div className="lg:col-span-6 xl:col-span-6">
            <div className="relative mx-auto max-w-xl lg:max-w-none">
              {/* Soft decorative blur glow behind card */}
              <div className="pointer-events-none absolute -inset-3 rounded-[32px] bg-gradient-to-tr from-pink-200/40 via-amber-100/30 to-slate-100 blur-2xl opacity-70" />

              {/* Main Luxury Villa Image Card */}
              <div className="relative overflow-hidden rounded-[26px] border border-slate-200/90 bg-white shadow-2xl shadow-slate-900/10">
                {/* Photo Frame */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={service.heroBuildingImage}
                    alt="Luxury Modern Duplex Residence Built by Sneha Construction in Tumkur"
                    fill
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/15 to-transparent" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-md px-3.5 py-1.5 text-xs font-bold text-slate-900 shadow-md font-secondary">
                    <Home className="h-3.5 w-3.5 text-[#CE1C73]" />
                    <span>Dr. Srinivas Modern Duplex Villa • SS Puram</span>
                  </div>

                  {/* Bottom Text Over Photo */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="font-secondary text-[11px] font-bold uppercase tracking-wider text-pink-300 block">
                      Real Completed Project • Tumkur
                    </span>
                    <p className="font-display text-sm sm:text-base font-bold text-white drop-shadow-sm mt-0.5">
                      3,600 sq.ft contemporary living with private courtyard & puja mandir
                    </p>
                  </div>
                </div>

                {/* Sub-Card: Indian Chief Architect Site Supervision */}
                <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-50/50 via-white to-pink-50/30 border-t border-slate-200/80 flex items-center gap-4">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-amber-300 shadow-sm">
                    <Image
                      src={service.teamImage}
                      alt="Indian Senior Architect Supervising Residential Site in Tumkur"
                      fill
                      sizes="56px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 font-secondary block">
                      On-Site Engineering Rigor
                    </span>
                    <p className="font-display text-sm font-bold text-slate-900 truncate">
                      Er. Anand Kumar, B.E. Civil & Chief Architect
                    </p>
                    <p className="text-xs text-slate-600 line-clamp-1 font-secondary">
                      Daily structural tolerances, concrete curing & Vastu orientation verified on site
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Emotional Trust Card */}
              <div className="absolute -bottom-6 -left-4 sm:left-4 rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-md p-3.5 shadow-xl sm:max-w-xs font-secondary">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 shrink-0">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      Griha Pravesha on Promised Date
                    </p>
                    <p className="text-[11px] text-slate-600">
                      100% On-time delivery guarantee for your family
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
