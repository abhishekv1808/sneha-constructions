import Image from 'next/image'
import Link from 'next/link'
import {
  Phone,
  KeyRound,
  Video,
  ArrowRight,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  FileText,
} from 'lucide-react'
import { Container } from '@/components/ui'
import { contact } from '@/content'
import type { ServiceDetail } from '@/content/services-data'

interface TurnkeyHeroProps {
  service: ServiceDetail
}

export function TurnkeyHero({ service }: TurnkeyHeroProps) {
  const steps = [
    { num: '01', name: 'Soil & 3D Vastu Plan', desc: 'Lab soil test & 3D walkthrough' },
    { num: '02', name: 'TUDA Approvals', desc: 'Gram Panchayat & municipal plan sanction' },
    { num: '03', name: 'RCC & Brickwork', desc: 'Tata Tiscon Fe550D & UltraTech cement' },
    { num: '04', name: 'Interiors & Keys', desc: 'Modular kitchen, lighting & Griha Pravesha' },
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-white to-[#F5F1EA] pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 border-b border-amber-200/60">
      {/* Warm gentle radial ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/3 h-[30rem] w-[30rem] rounded-full bg-pink-100/35 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-10 h-80 w-80 rounded-full bg-amber-100/35 blur-3xl"
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
            <KeyRound size={14} className="text-[#CE1C73]" />
            <span>Home</span>
          </Link>
          <ChevronRight size={14} className="text-slate-400" />
          <Link href="/services" className="transition-colors hover:text-[#CE1C73]">
            Services
          </Link>
          <ChevronRight size={14} className="text-slate-400" />
          <span className="text-[#CE1C73] font-bold">Turnkey Construction</span>
        </nav>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16">
          {/* Left Column: Reassurance, Single-Window & 4-Step Roadmap */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-6">
            {/* Single Window Reassurance Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50/90 px-4 py-1.5 text-xs font-bold text-amber-900 shadow-xs font-secondary">
              <KeyRound className="h-3.5 w-3.5 text-[#CE1C73]" />
              <span className="tracking-wide uppercase">One Single Point of Contact • Zero Stress</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-slate-900 leading-[1.14]">
              {service.emotionalTitle}
            </h1>

            {/* Reassurance Subtitle */}
            <p className="font-secondary text-base sm:text-lg text-slate-600 leading-relaxed">
              {service.emotionalSubtitle}
            </p>

            {/* 4-Step Visual Roadmap */}
            <div className="rounded-2xl border border-amber-200/90 bg-white/95 p-4 shadow-sm backdrop-blur-xs">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-secondary">
                  Guaranteed Turnkey Milestone Workflow
                </span>
                <span className="text-xs font-bold text-[#CE1C73] font-secondary">
                  Fixed Milestone Contract
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {steps.map((step) => (
                  <div
                    key={step.num}
                    className="rounded-xl border border-slate-200/90 bg-slate-50/80 p-2.5 text-left transition-colors hover:border-[#CE1C73]/40 hover:bg-white"
                  >
                    <span className="font-display text-xs font-black text-[#CE1C73] block">
                      {step.num}
                    </span>
                    <span className="font-display text-xs font-bold text-slate-900 leading-snug block mt-0.5">
                      {step.name}
                    </span>
                    <span className="font-secondary text-[10px] text-slate-500 leading-tight block mt-1">
                      {step.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Locked Rate Showcase Card */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border-2 border-[#CE1C73]/30 bg-gradient-to-r from-pink-50/70 via-white to-amber-50/50 p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#CE1C73] opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#CE1C73]" />
                </span>
                <div>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 font-secondary">
                    All-Inclusive Turnkey Package
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display text-2xl sm:text-3xl font-black text-[#CE1C73] leading-none">
                      {service.rateHighlight}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 font-secondary">
                <Video className="h-4 w-4 text-blue-600" />
                <span>Weekly WhatsApp Drone Updates</span>
              </div>
            </div>

            {/* Action Row */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/contact"
                className="group inline-flex items-center rounded-full bg-[#CE1C73] py-2 pr-2 pl-6 text-sm sm:text-base font-bold text-white shadow-lg shadow-[#CE1C73]/25 transition-all duration-200 hover:bg-[#B81564] hover:shadow-xl font-secondary"
              >
                <span>Book Free Site Inspection</span>
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

          {/* Right Column: Turnkey Completed Designer Villa with Toran */}
          <div className="lg:col-span-6 xl:col-span-6">
            <div className="relative mx-auto max-w-xl lg:max-w-none">
              {/* Outer Glow */}
              <div className="pointer-events-none absolute -inset-3 rounded-[32px] bg-gradient-to-tr from-amber-200/40 via-pink-100/30 to-white blur-2xl opacity-75" />

              {/* Main Turnkey Designer Home Card */}
              <div className="relative overflow-hidden rounded-[26px] border border-amber-200/90 bg-white shadow-2xl shadow-slate-900/10">
                {/* Photo Frame */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={service.heroBuildingImage}
                    alt="Pristine Turnkey Designer Villa Ready for Griha Pravesha Handover in Tumkur"
                    fill
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/15 to-transparent" />

                  {/* Griha Pravesha Ready Tag */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-amber-500/95 backdrop-blur-md px-3.5 py-1.5 text-xs font-bold text-white shadow-md font-secondary">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Sri Mahalaxmi Villa • Griha Pravesha Ready</span>
                  </div>

                  {/* Bottom Text Over Building */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="font-secondary text-[11px] font-bold uppercase tracking-wider text-amber-200 block">
                      100% Turnkey Handover • SIT Main Road, Tumkur
                    </span>
                    <p className="font-display text-sm sm:text-base font-bold text-white drop-shadow-sm mt-0.5">
                      Delivered with modular kitchen, designer lighting, wardrobes &amp; garden gate
                    </p>
                  </div>
                </div>

                {/* Sub-Card: Indian Engineering Team Planning Site */}
                <div className="p-4 sm:p-5 bg-gradient-to-r from-pink-50/40 via-white to-amber-50/40 border-t border-slate-200/80 flex items-center gap-4">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-[#CE1C73] shadow-sm">
                    <Image
                      src={service.teamImage}
                      alt="Indian Civil Engineers Reviewing Blueprints on Site in Tumkur"
                      fill
                      sizes="56px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#CE1C73] font-secondary block">
                      All-Inclusive Engineering Team
                    </span>
                    <p className="font-display text-sm font-bold text-slate-900 truncate">
                      Civil Engineers, Architects &amp; Structural Auditors
                    </p>
                    <p className="text-xs text-slate-600 line-clamp-1 font-secondary">
                      Continuous on-site supervision so you never have to micromanage workers
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Golden Key Badge */}
              <div className="absolute -bottom-6 -left-4 sm:left-4 rounded-2xl border border-amber-200 bg-white/95 backdrop-blur-md p-3.5 shadow-xl sm:max-w-xs font-secondary">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700 border border-amber-200 shrink-0">
                    <KeyRound className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      Brass Key in Hand on Time
                    </p>
                    <p className="text-[11px] text-slate-600">
                      Contractual penalty clause for delivery delays
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
