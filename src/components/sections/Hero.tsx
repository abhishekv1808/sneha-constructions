'use client'

import { ArrowRight, BadgeCheck, Home, MapPin, Phone, ShieldCheck } from 'lucide-react'
import { getImageProps } from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { preload } from 'react-dom'

import heroVilla from '@/assets/hero/hero-villa-clear-sky.webp'
import heroVillaPortrait from '@/assets/hero/hero-villa-clear-sky-portrait.webp'
import { useQuoteModal } from '@/components/providers/QuoteModalProvider'
import { contact, serviceAreas, site, trustStats } from '@/content'
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

/**
 * The sky behind the copy. Deep blue where the white text sits (≥4.5:1, WCAG
 * AA), easing to #5c87b0 — the photograph's own sky colour along its top edge.
 * The photo is pulled up underneath this and fades in over that colour, so the
 * CSS sky and the photographed sky read as one.
 */
const SKY = 'bg-[linear-gradient(180deg,#163f6b_0%,#1f4f80_45%,#2a5c8c_100%)]'

const HERO_ALT =
  '3D front elevation of a modern two-storey villa with wood-panelled bays, glass balconies and a landscaped front garden, designed by Sneha Construction'

/** Breakpoint where the wide (16:9) photo takes over from the portrait (9:16) one. */
const WIDE_MEDIA = '(min-width: 640px)'
const PORTRAIT_MEDIA = '(max-width: 639px)'

/*
 * Art direction: one <img> inside a <picture>, so each device downloads only
 * its own image — a CSS-hidden second <img> would still be fetched. Computed
 * once at module level; the inputs are static imports.
 */
const imageBase = { alt: HERO_ALT, fill: true, sizes: '100vw', quality: 85 } as const
const { props: wideImg } = getImageProps({ ...imageBase, src: heroVilla })
const { props: portraitImg } = getImageProps({
  ...imageBase,
  src: heroVillaPortrait,
  loading: 'eager',
  fetchPriority: 'high',
})

export function Hero() {
  const { openQuoteModal } = useQuoteModal()

  // The hero photo is the LCP element. getImageProps emits no preload, so
  // preload each variant for its own breakpoint only (React hoists these
  // into <head> during SSR).
  preload(wideImg.src, {
    as: 'image',
    imageSrcSet: wideImg.srcSet,
    imageSizes: wideImg.sizes,
    media: WIDE_MEDIA,
    fetchPriority: 'high',
  })
  preload(portraitImg.src, {
    as: 'image',
    imageSrcSet: portraitImg.srcSet,
    imageSizes: portraitImg.sizes,
    media: PORTRAIT_MEDIA,
    fetchPriority: 'high',
  })

  return (
    <section data-track-location="hero" className="relative isolate overflow-hidden bg-plaster-50">
      {/* Phones: one full-height frame with the portrait photo behind the copy
          (the copy sits on the photo's own sky). sm+: the wide photo is pulled
          up under a CSS sky, see below. */}
      <div className="relative min-h-[max(760px,100svh)] sm:min-h-0">
        {/* ── Sky + copy ─────────────────────────────────────────────────── */}
        {/* Paint order: sky (this wrapper's background, sm+ only) → photo (next
          sibling) → copy (z-10, above both). */}
        <div className={cn('relative', 'max-sm:bg-none', SKY)}>
          <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-5 pt-28 pb-10 text-center sm:pt-36 lg:pt-36 lg:pb-12">
            <p className="flex items-center gap-2 font-secondary text-[0.8125rem] font-medium text-white/85">
              <MapPin aria-hidden="true" size={14} className="text-white/70" />
              {serviceAreas.map((area) => area.name).join(' · ')}
            </p>

            <h1 className="mt-5 font-display text-[clamp(2.5rem,5.4vw,4.75rem)] leading-[1.04] font-medium tracking-[-0.035em] text-white">
              Your dream home,
              <br />
              built to last
            </h1>

            <p className="mt-6 max-w-[48ch] animate-hero-support text-base leading-relaxed text-white sm:text-lg">
              Turnkey construction from{' '}
              <strong className="font-semibold text-white tabular-nums">
                ₹{site.baseRateSqft.toLocaleString('en-IN')}/sq ft
              </strong>{' '}
              — premium materials, transparent pricing and on-time handover, by one team.
            </p>

            <div className="mt-8 flex animate-hero-support flex-wrap items-center justify-center gap-x-6 gap-y-4">
              <button
                type="button"
                onClick={() => openQuoteModal({ source: 'Hero Main CTA' })}
                className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-ink-950 py-1.5 pr-1.5 pl-6 font-secondary text-[0.9375rem] font-semibold text-white shadow-[0_12px_32px_-8px_rgb(3_20_36/0.55)] transition-colors duration-150 hover:bg-ink-900"
              >
                Get a free quote
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 transition-colors duration-150 group-hover:bg-brand-400">
                  <ArrowRight aria-hidden="true" size={17} strokeWidth={2.25} />
                </span>
              </button>

              {/* Hidden on phones: the header call button and the mobile action
                  bar already put "Call" one tap away, and here it would sit on
                  the portrait's pale lower sky. */}
              <a
                href={contact.phoneHref}
                className="hidden min-h-12 items-center gap-2 font-secondary text-[0.9375rem] font-semibold text-white underline-offset-4 transition-colors duration-150 hover:underline sm:inline-flex"
              >
                <Phone aria-hidden="true" size={17} strokeWidth={1.75} />
                <span className="tabular-nums">{contact.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>

        {/* ── The house ──────────────────────────────────────────────────── */}
        {/* Phones: fills the frame behind the copy, anchored to the bottom so the
          sky crops first and the villa (roof at ~60% of the portrait) stays whole.
          sm+: pulled up under the copy so the roofline lands ~110px below the
          buttons — the roof is ~42% down the 16:9 photo, i.e. 23.6vw at full
          width — its top fading in over the matching CSS sky. */}
        <div className="absolute inset-0 sm:relative sm:inset-auto sm:-mt-[calc(23.6vw-110px)] sm:aspect-video sm:[mask-image:linear-gradient(to_bottom,transparent,black_22%)]">
          <picture>
            <source media={WIDE_MEDIA} srcSet={wideImg.srcSet} sizes={wideImg.sizes} />
            <img
              {...portraitImg}
              alt={HERO_ALT}
              className="object-cover object-[50%_100%] sm:object-[44%_100%]"
            />
          </picture>
          {/* Sky tint: keeps the photo's pale upper sky deep blue behind the copy
            (white text stays ≥4.5:1), clearing before the roofline. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[58%] bg-[linear-gradient(180deg,rgb(31_79_128)_0%,rgb(42_92_140/0.92)_70%,rgb(42_92_140/0.45)_88%,transparent_100%)] sm:h-[40%] sm:bg-[linear-gradient(180deg,rgb(42_92_140)_0%,rgb(42_92_140/0.95)_60%,rgb(42_92_140/0.55)_85%,transparent_100%)]"
          />
          {/* Bottom fade into the page — the house dissolving into the content */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[14%] bg-gradient-to-b from-transparent via-plaster-50/70 to-plaster-50 sm:h-[18%]"
          />
        </div>
      </div>

      {/* ── Trust figures, rising out of the fade ──────────────────────── */}
      <div className="relative z-10 mx-auto -mt-10 max-w-5xl px-4 pb-6 sm:-mt-14 lg:-mt-16">
        <ul className="grid animate-hero-card grid-cols-2 overflow-hidden rounded-2xl bg-white/90 shadow-[0_24px_60px_-24px_rgb(3_20_36/0.3)] ring-1 ring-plaster-200 backdrop-blur-md md:grid-cols-4">
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
