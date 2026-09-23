'use client'

import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Home,
  MapPin,
  Phone,
  ShieldCheck,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import heroIndianDuplex from '@/assets/hero/hero-indian-duplex.jpg'
import { useQuoteModal } from '@/components/providers/QuoteModalProvider'
import { contact, site, trustStats } from '@/content'
import { cn } from '@/lib/utils/cn'

/**
 * Counts up from zero once the figure scrolls into view. The server renders the
 * final number, so no-JS visitors, crawlers and reduced-motion visitors all get
 * the real figure. Plain rAF — no motion library for four integers.
 */
function StatNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const node = ref.current
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const duration = 1400
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - t, 3)
          setDisplay(Math.round(eased * value))
          if (t < 1) frame = requestAnimationFrame(tick)
        }
        setDisplay(0)
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.6 },
    )
    observer.observe(node)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [value])

  return (
    <span ref={ref} className="tabular-nums">
      {display.toLocaleString('en-IN')}
    </span>
  )
}

/** One icon per trust figure, in the order of `trustStats`. */
const STAT_ICONS = [Home, ShieldCheck, MapPin, BadgeCheck] as const

export function Hero() {
  const { openQuoteModal } = useQuoteModal()

  return (
    <section data-track-location="hero" className="bg-plaster-50 px-2.5 pt-[5.5rem] pb-4 sm:px-4 sm:pt-24 lg:px-5 lg:pt-[6.5rem]">
      {/* ------------------------------------------------------------ Framed photo */}
      <div className="relative isolate flex flex-col overflow-hidden rounded-[24px] bg-gradient-to-b from-white to-plaster-100 ring-1 ring-plaster-200 sm:rounded-[32px] lg:h-[calc(100svh-7.5rem)] lg:max-h-[880px] lg:min-h-[720px]">
        {/* Copy — centred on a clean sky, like a caption above the building */}
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-5 pt-12 text-center sm:pt-16 lg:pt-16">
          <p className="flex items-center gap-3 font-secondary text-xs font-bold tracking-[0.2em] text-brand-500 uppercase sm:text-[0.8125rem]">
            <span aria-hidden="true" className="hidden h-px w-12 bg-brand-500/40 sm:block" />
            {site.tagline}
            <span aria-hidden="true" className="hidden h-px w-12 bg-brand-500/40 sm:block" />
          </p>

          <h1 className="mt-4 font-display text-[clamp(2.25rem,5.4vw,4.75rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-slate-900">
            Your Dream Home,
            <br />
            Built to Last
          </h1>

          <p className="mt-5 max-w-[46ch] animate-hero-support text-base leading-relaxed text-slate-700 sm:text-lg">
            Residential, commercial and turnkey construction across Tumkur — premium materials,
            transparent pricing and on-time handover.
          </p>

          <div className="mt-8 flex animate-hero-support flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => openQuoteModal({ source: 'Hero Main CTA' })}
              className="inline-flex min-h-12 items-center gap-3 rounded-full bg-brand-500 py-1.5 pr-1.5 pl-6 font-secondary text-[0.9375rem] font-semibold text-white shadow-lg shadow-brand-500/30 transition-colors duration-150 hover:bg-brand-600"
            >
              Get a free quote
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-500">
                <ArrowRight aria-hidden="true" size={17} strokeWidth={2.25} />
              </span>
            </button>
            <a
              href={contact.phoneHref}
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-slate-900/15 bg-white/80 px-6 font-secondary text-[0.9375rem] font-semibold text-slate-900 backdrop-blur-md transition-colors duration-150 hover:bg-white"
            >
              <Phone aria-hidden="true" size={17} strokeWidth={1.75} />
              <span className="tabular-nums">{contact.phoneDisplay}</span>
            </a>
          </div>
        </div>

        {/* The house: anchored to the bottom, its sky fading into the frame's */}
        <div className="relative -mt-8 h-[340px] [mask-image:linear-gradient(to_bottom,transparent,black_32%)] sm:-mt-12 sm:h-[440px] lg:-mt-24 lg:h-auto lg:flex-1">
          <Image
            src={heroIndianDuplex}
            alt="Modern duplex house with a garden and pool, built by Sneha Construction in Tumkur"
            fill
            priority
            sizes="100vw"
            quality={90}
            placeholder="blur"
            className="object-cover object-[center_62%]"
          />
        </div>

        {/* Floating rate card — bottom-right, over the garden */}
        <Link
          href="/estimate"
          className="group absolute right-4 bottom-20 hidden w-64 animate-hero-card items-center gap-4 rounded-2xl bg-white/95 p-4 shadow-2xl shadow-ink-950/25 backdrop-blur-md transition-colors duration-150 hover:bg-white md:flex lg:right-6 lg:bottom-24"
        >
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-50 font-display text-2xl font-bold text-brand-500">
            ₹
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-secondary text-xs font-medium text-slate-600">
              Turnkey from
            </span>
            <span className="block font-display text-2xl leading-tight font-bold text-slate-900 tabular-nums">
              ₹{site.baseRateSqft.toLocaleString('en-IN')}
              <span className="ml-1 font-secondary text-xs font-medium text-slate-600">
                / sq ft
              </span>
            </span>
            <span className="mt-0.5 block font-secondary text-xs font-semibold text-brand-500">
              Estimate your cost
            </span>
          </span>
          <ArrowUpRight
            aria-hidden="true"
            size={18}
            className="shrink-0 text-slate-400 transition-colors duration-150 group-hover:text-brand-500"
          />
        </Link>
      </div>

      {/* --------------------------------------------- Trust bar, overlapping the frame */}
      <div className="relative z-10 mx-auto -mt-14 max-w-5xl px-3 sm:-mt-16">
        <ul className="grid animate-hero-card grid-cols-2 overflow-hidden rounded-2xl bg-white shadow-[0_24px_60px_-20px_rgb(3_20_36/0.25)] ring-1 ring-plaster-200 md:grid-cols-4">
          {trustStats.map((stat, i) => {
            const Icon = STAT_ICONS[i] ?? BadgeCheck
            return (
              <li
                key={stat.label}
                className={cn(
                  'flex flex-col items-center justify-center gap-3 px-4 py-6 text-center sm:py-7 lg:flex-row lg:gap-4 lg:text-left',
                  i % 2 === 1 && 'border-l border-plaster-200',
                  i >= 2 && 'border-t border-plaster-200 md:border-t-0',
                  i === 2 && 'md:border-l',
                )}
              >
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-500"
                >
                  <Icon size={20} strokeWidth={1.75} />
                </span>
                <div className="flex flex-col">
                  <p className="order-2 mt-1 font-secondary text-xs font-medium text-slate-600 sm:text-[0.8125rem]">
                    {stat.label}
                  </p>
                  <p className="order-1 font-display text-3xl leading-none font-bold tracking-tight text-slate-900 sm:text-[2.25rem]">
                    <StatNumber value={stat.value} />
                    <span className="text-brand-500">{stat.suffix}</span>
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
