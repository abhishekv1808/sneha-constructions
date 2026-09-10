'use client'

import { ArrowRight, ArrowUpRight, Play, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import heroIndianDuplex from '@/assets/hero/hero-indian-duplex.jpg'
import showcasePavilion from '@/assets/hero/showcase-pavilion.jpg'
import avatar1 from '@/assets/hero/avatars/avatar-1.jpg'
import avatar2 from '@/assets/hero/avatars/avatar-2.jpg'
import avatar3 from '@/assets/hero/avatars/avatar-3.jpg'
import avatar4 from '@/assets/hero/avatars/avatar-4.jpg'
import avatar5 from '@/assets/hero/avatars/avatar-5.jpg'
import { Container } from '@/components/ui'
import { useQuoteModal } from '@/components/providers/QuoteModalProvider'
import { serviceAreas } from '@/content'

export function Hero() {
  const { openQuoteModal } = useQuoteModal()
  const [videoOpen, setVideoOpen] = useState(false)

  return (
    <>
      <section className="relative isolate overflow-hidden bg-slate-50">
        {/* Full-bleed Indian Duplex Architectural Background Image (Daylight) */}
        <Image
          src={heroIndianDuplex}
          alt="Luxury modern Indian duplex house in Tumkur"
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover object-center"
        />

        {/* Black Overlay: Slight dark tint across the background image + soft directional gradient behind text */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-black/40"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent sm:w-[90%] lg:w-[65%]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/60 via-black/25 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent"
        />

        {/* Floating Rotating Experience Badge */}
        <div className="pointer-events-none absolute top-1/4 right-8 z-20 hidden md:right-16 md:block lg:right-24 xl:right-32">
          <RotatingExperienceBadge />
        </div>

        {/* Main Hero Copy Stack */}
        <Container className="relative z-10 pt-28 pb-36 sm:pt-32 sm:pb-40 lg:pt-36 lg:pb-44">
          <div className="max-w-4xl lg:max-w-[48rem]">
            {/* Eyebrow — §4: sentence case, and only where it adds information.
                The service area is that information: it is the strongest trust
                signal for this audience (§2) and it earns the local-SEO terms
                at the same time. Read from content so it cannot drift from the
                footer and the area pages. */}
            <p className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-brand-300/30 bg-ink-950/45 px-3.5 py-1.5 font-secondary text-xs font-semibold text-brand-300 backdrop-blur-md sm:text-[0.8125rem]">
              <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-brand-300" />
              {serviceAreas.map((area) => area.name).join(' · ')}
            </p>

            {/* Display Headline */}
            <h1 className="mt-4 max-w-[36ch] font-display text-[1.75rem] leading-[1.2] font-bold tracking-tight text-white drop-shadow-sm sm:text-[2.25rem] lg:text-[2.65rem]">
              Where innovative design meets precision construction to{' '}
              <span className="font-playfair italic">create spaces that inspire and
              endure</span>
            </h1>

            {/* Supporting Lead */}
            <p className="mt-5 max-w-[50ch] font-secondary text-[0.9375rem] leading-relaxed font-normal text-slate-200 sm:text-base">
              Over 25 years designing and constructing landmark duplexes, contemporary family homes,
              and commercial structures across Tumkur district. Built with earthquake-resistant
              structural mastery and 100% Vastu compliance.
            </p>

            {/* Action Row */}
            <div className="mt-8 flex flex-wrap items-center gap-5 sm:gap-7">
              {/* Primary Signature CTA Button */}
              <button
                type="button"
                onClick={() => openQuoteModal({ source: 'Hero Main CTA' })}
                className="group inline-flex items-center rounded-full bg-[#CE1C73] py-2 pr-2 pl-6 text-[0.875rem] font-bold text-white shadow-lg shadow-[#CE1C73]/25 transition-all duration-200 hover:bg-[#B81564] hover:shadow-xl sm:text-[0.9375rem]"
              >
                <span>Get Free Estimate</span>
                <span className="ml-3.5 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#CE1C73] transition-transform duration-200 group-hover:translate-x-1 sm:h-10 sm:w-10">
                  <ArrowRight size={17} strokeWidth={2.5} />
                </span>
              </button>

              {/* Secondary Video Button */}
              <button
                type="button"
                onClick={() => setVideoOpen(true)}
                className="group inline-flex items-center gap-3 text-[0.875rem] font-semibold text-white transition-[color] duration-150 hover:text-[#FF65A8] sm:text-[0.9375rem]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition-all duration-200 group-hover:scale-105 group-hover:border-[#CE1C73] group-hover:bg-[#CE1C73] group-hover:text-white sm:h-12 sm:w-12">
                  <Play size={16} className="ml-0.5 fill-current" />
                </span>
                <span>Watch Our Video</span>
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* Three Feature Cards: Half inside Hero section, half outside on white background */}
      <div className="relative z-20 -mt-24 sm:-mt-28 lg:-mt-32">
        <Container>
          <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-12">
            {/* Card 1: Turnkey Construction Rate Card Starting From ₹1,875/sq.ft */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <RateCard />
            </div>

            {/* Card 2: Architectural Showcase Card */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <ShowcaseCard />
            </div>

            {/* Card 3: Social Proof / Stat Card */}
            <div className="col-span-12 md:col-span-12 lg:col-span-4">
              <StatCard />
            </div>
          </div>
        </Container>
      </div>

      {/* Video Modal Preview */}
      {videoOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-ink-900 p-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 text-white">
              <h3 className="font-display text-lg font-semibold">
                Sneha Construction Architectural Showcase
              </h3>
              <button
                type="button"
                onClick={() => setVideoOpen(false)}
                className="rounded-full p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-ink-950">
              <Image
                src={heroIndianDuplex}
                alt="Video showcase preview"
                fill
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-ink-950/40 p-6 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#CE1C73] text-white shadow-xl">
                  <Play size={28} className="ml-1 fill-current" />
                </div>
                <p className="text-xl font-bold text-white">
                  Architectural Film &amp; Project Walkthrough
                </p>
                <p className="mt-1 text-sm text-slate-300">
                  High-definition drone tour and client handover stories
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

/**
 * Floating circular badge with rotating circular text ring and yellow center emblem
 */
function RotatingExperienceBadge() {
  return (
    <div className="relative flex items-center justify-center rounded-full bg-black/35 p-2 shadow-2xl ring-1 ring-white/20 backdrop-blur-md">
      {/* Outer rotating text ring */}
      <div className="animate-spin-slow">
        <svg viewBox="0 0 160 160" className="h-32 w-32 lg:h-36 lg:w-36">
          <path
            id="experienceRingPath"
            d="M 80, 80 m -58, 0 a 58,58 0 1,1 116,0 a 58,58 0 1,1 -116,0"
            fill="none"
          />
          <text className="fill-white font-secondary text-[11px] font-extrabold tracking-[0.22em] uppercase">
            <textPath href="#experienceRingPath" startOffset="0%">
              • 25+ Years Experience • 25+ Years Experience •
            </textPath>
          </text>
        </svg>
      </div>

      {/* Inner solid emblem in Sneha Magenta */}
      <div className="absolute flex h-14 w-14 items-center justify-center rounded-full bg-[#CE1C73] text-white shadow-xl ring-4 ring-white lg:h-16 lg:w-16">
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      </div>
    </div>
  )
}

/**
 * Card 1: Turnkey Construction Rate Card Starting From ₹1,875/sq.ft
 */
function RateCard() {
  return (
    <div className="group relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden rounded-[20px] border border-slate-200/90 bg-white p-6 shadow-2xl shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl lg:min-h-[235px]">
      {/* Subtle ambient decorative magenta glow */}
      <div className="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full bg-pink-100/60 blur-xl" />

      <div>
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-pink-200/80 bg-pink-50 px-3 py-1 font-secondary text-xs font-bold text-[#CE1C73]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#CE1C73] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#CE1C73]" />
            </span>
            Turnkey Package
          </span>
          <span className="rounded-md bg-emerald-50 px-2 py-0.5 font-secondary text-[11px] font-bold text-emerald-700">
            Locked Price
          </span>
        </div>

        <p className="mt-4 font-secondary text-xs font-bold tracking-wider text-slate-500 uppercase">
          Construction Starting From
        </p>

        <div className="mt-1 flex items-baseline gap-1.5">
          <span className="font-display text-3xl leading-none font-extrabold tracking-tight text-[#CE1C73] sm:text-4xl">
            <span className="font-playfair italic">₹</span>1,875
          </span>
          <span className="font-display text-sm font-semibold text-slate-700 sm:text-base">
            / sq.ft.
          </span>
        </div>

        <p className="mt-2 font-secondary text-xs leading-relaxed text-slate-600">
          100% Vastu 3D plan, Tata Tiscon Fe550D TMT &amp; UltraTech cement included.
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
        <Link
          href="/estimate"
          className="group/link inline-flex items-center gap-2 font-secondary text-xs font-bold text-slate-900 transition-colors hover:text-[#CE1C73]"
        >
          <span>Calculate Your Cost</span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#CE1C73] text-white transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
            <ArrowUpRight size={13} strokeWidth={2.5} />
          </span>
        </Link>

        <span className="font-secondary text-[11px] font-medium text-slate-400">
          Zero Escalation
        </span>
      </div>
    </div>
  )
}

/**
 * Card 2: Full Architectural Showcase Pavilion Card
 */
function ShowcaseCard() {
  return (
    <div className="group relative h-full min-h-[220px] overflow-hidden rounded-[20px] shadow-2xl shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-black/20 lg:min-h-[235px]">
      <Image
        src={showcasePavilion}
        alt="Sculptural luxury modern residential pavilion"
        fill
        sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  )
}

/**
 * Card 3: Social Proof / Satisfied Customers Stat Card
 */
function StatCard() {
  return (
    <div className="relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden rounded-[20px] border border-slate-200/90 bg-white p-6 text-slate-900 shadow-2xl shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl lg:min-h-[235px]">
      {/* Subtle overlapping wireframe circles watermark in bottom right corner */}
      <div
        className="pointer-events-none absolute -right-8 -bottom-8 text-slate-200 opacity-60"
        aria-hidden="true"
      >
        <svg
          width="180"
          height="180"
          viewBox="0 0 200 200"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <circle cx="100" cy="100" r="50" />
          <circle cx="125" cy="100" r="50" />
          <circle cx="100" cy="125" r="50" />
          <circle cx="125" cy="125" r="50" />
        </svg>
      </div>

      {/* Top Row: Sneha Magenta badge icon left, 5 circular homeowner avatars right */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#CE1C73] text-white shadow-md">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m4.93 4.93 4.24 4.24" />
            <path d="m14.83 9.17 4.24-4.24" />
            <path d="m14.83 14.83 4.24 4.24" />
            <path d="m9.17 14.83-4.24 4.24" />
            <circle cx="12" cy="12" r="4" />
          </svg>
        </div>

        {/* Overlapping homeowner avatars */}
        <div className="flex -space-x-2.5 overflow-hidden">
          {[avatar1, avatar2, avatar3, avatar4, avatar5].map((avatar, idx) => (
            <div
              key={idx}
              className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full shadow-sm ring-2 ring-white"
            >
              <Image
                src={avatar}
                alt={`Satisfied homeowner ${idx + 1}`}
                fill
                sizes="36px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Row: Customer label and stat count */}
      <div className="relative z-10 mt-8">
        <p className="font-secondary text-[0.8125rem] font-medium tracking-wide text-slate-500">
          Happy Satisfied Customers
        </p>
        <p className="mt-1 font-display text-[2.75rem] leading-none font-bold tracking-tight text-slate-900">
          <span className="font-playfair italic">15K</span>+
        </p>
      </div>
    </div>
  )
}
