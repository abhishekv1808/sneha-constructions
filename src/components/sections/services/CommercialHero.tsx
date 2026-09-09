import Image from 'next/image'
import Link from 'next/link'
import {
  Phone,
  Building2,
  TrendingUp,
  Award,
  Layers,
  ShieldAlert,
  ChevronRight,
  ArrowRight,
  FileSpreadsheet,
} from 'lucide-react'
import { Container } from '@/components/ui'
import { contact } from '@/content'
import type { ServiceDetail } from '@/content/services-data'

interface CommercialHeroProps {
  service: ServiceDetail
}

export function CommercialHero({ service }: CommercialHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F6F8FB] via-white to-[#EFF3F8] pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 border-b border-slate-200">
      {/* Precision Blueprint Architectural Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#0F172A08_1px,transparent_1px),linear-gradient(to_bottom,#0F172A08_1px,transparent_1px)] bg-[size:3rem_3rem]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-1/4 h-[30rem] w-[30rem] rounded-full bg-blue-100/30 blur-3xl"
      />

      <Container className="relative z-10">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 font-secondary"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-[#CE1C73]"
          >
            <Building2 size={14} className="text-[#CE1C73]" />
            <span>Home</span>
          </Link>
          <ChevronRight size={14} className="text-slate-400" />
          <Link href="/services" className="transition-colors hover:text-[#CE1C73]">
            Services
          </Link>
          <ChevronRight size={14} className="text-slate-400" />
          <span className="text-[#CE1C73] font-bold">Commercial Construction</span>
        </nav>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16">
          {/* Left Column: High-Yield Commercial Asset Strategy */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-6">
            {/* Pillar Badge */}
            <div className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white/95 px-3.5 py-1.5 text-xs font-bold text-slate-800 shadow-xs font-secondary">
              <Building2 className="h-3.5 w-3.5 text-[#CE1C73]" />
              <span className="tracking-wide uppercase">Commercial Real Estate &amp; Retail Landmarks</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-slate-900 leading-[1.14]">
              {service.emotionalTitle}
            </h1>

            {/* Strategic Subtitle */}
            <p className="font-secondary text-base sm:text-lg text-slate-600 leading-relaxed">
              {service.emotionalSubtitle}
            </p>

            {/* 2x2 High-Impact Commercial Specifications Matrix */}
            <div className="grid grid-cols-2 gap-3.5 pt-1">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-[#CE1C73]/50">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-display text-sm font-bold text-slate-900">
                    Maximum FAR Yield
                  </span>
                  <TrendingUp className="h-4 w-4 text-emerald-600 shrink-0" />
                </div>
                <p className="font-secondary text-xs text-slate-600 leading-relaxed">
                  Optimized rentable floor plans &amp; column-free clear spans
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-[#CE1C73]/50">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-display text-sm font-bold text-slate-900">
                    100% By-Law Clear
                  </span>
                  <ShieldAlert className="h-4 w-4 text-[#CE1C73] shrink-0" />
                </div>
                <p className="font-secondary text-xs text-slate-600 leading-relaxed">
                  TUDA sanctions, setback clearances &amp; Fire NOC ready
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-[#CE1C73]/50">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-display text-sm font-bold text-slate-900">
                    High-Load Concrete
                  </span>
                  <Layers className="h-4 w-4 text-blue-600 shrink-0" />
                </div>
                <p className="font-secondary text-xs text-slate-600 leading-relaxed">
                  M30 design mix with Tata Tiscon Fe550D TMT framing
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-[#CE1C73]/50">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-display text-sm font-bold text-slate-900">
                    45+ Built Landmarks
                  </span>
                  <Award className="h-4 w-4 text-amber-600 shrink-0" />
                </div>
                <p className="font-secondary text-xs text-slate-600 leading-relaxed">
                  Retail showrooms, office plazas &amp; healthcare hubs
                </p>
              </div>
            </div>

            {/* Action Row */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/contact"
                className="group inline-flex items-center rounded-full bg-[#CE1C73] py-2 pr-2 pl-6 text-sm sm:text-base font-bold text-white shadow-lg shadow-[#CE1C73]/25 transition-all duration-200 hover:bg-[#B81564] hover:shadow-xl font-secondary"
              >
                <span>Commercial Project Inquiry</span>
                <span className="ml-3.5 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#CE1C73] transition-transform duration-200 group-hover:translate-x-1">
                  <ArrowRight size={16} strokeWidth={2.5} />
                </span>
              </Link>

              <a
                href="#commercial-specs"
                className="inline-flex items-center gap-2.5 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 shadow-sm transition-colors hover:border-[#CE1C73] hover:text-[#CE1C73] font-secondary"
              >
                <FileSpreadsheet size={16} className="text-slate-500" />
                <span>Download Structural BOQ</span>
              </a>
            </div>
          </div>

          {/* Right Column: 5-Storey Commercial Plaza Building */}
          <div className="lg:col-span-6 xl:col-span-6">
            <div className="relative mx-auto max-w-xl lg:max-w-none">
              {/* Outer Shadow & Architectural Card */}
              <div className="relative overflow-hidden rounded-[26px] border border-slate-300 bg-white shadow-2xl shadow-slate-900/10">
                {/* Photo Frame */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={service.heroBuildingImage}
                    alt="5-Storey Commercial Retail and Corporate Plaza Built in Tumkur"
                    fill
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent" />

                  {/* Top ROI Pill Badge */}
                  <div className="absolute top-4 right-4 inline-flex items-center gap-2 rounded-full bg-emerald-600/95 backdrop-blur-md px-3.5 py-1.5 text-xs font-bold text-white shadow-md font-secondary">
                    <TrendingUp className="h-3.5 w-3.5" />
                    <span>8.8% Avg. Tumkur Rental Yield</span>
                  </div>

                  {/* Bottom Text Over Building */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="font-secondary text-[11px] font-bold uppercase tracking-wider text-pink-300 block">
                      Completed Commercial Asset • B.H. Road, Tumkur
                    </span>
                    <p className="font-display text-sm sm:text-base font-bold text-white drop-shadow-sm mt-0.5">
                      18,500 sq.ft G+4 Commercial Plaza • 100% Leased to High-Value Retail
                    </p>
                  </div>
                </div>

                {/* Sub-Card: Indian Site Engineer Quality Certification */}
                <div className="p-4 sm:p-5 bg-white border-t border-slate-200 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-slate-300 shadow-xs">
                      <Image
                        src={service.teamImage}
                        alt="Indian Civil Engineer on Commercial Site in Tumkur"
                        fill
                        sizes="56px"
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#CE1C73] font-secondary block">
                        Civil Engineering Lead
                      </span>
                      <p className="font-display text-sm font-bold text-slate-900 truncate">
                        Er. Chetan Gowda, M.Tech Structural
                      </p>
                      <p className="text-xs text-slate-600 line-clamp-1 font-secondary">
                        Rigorous seismic tolerance &amp; fire safety compliance sign-offs
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Asset Badge */}
              <div className="absolute -bottom-6 -right-4 sm:right-4 rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-md p-3.5 shadow-xl sm:max-w-xs font-secondary">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-200 shrink-0">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      Zero Cost Escalation Contract
                    </p>
                    <p className="text-[11px] text-slate-600">
                      Locked BOQ pricing protects your capital return
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
