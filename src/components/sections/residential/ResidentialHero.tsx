'use client'

import {
  ArrowRight,
  CalendarClock,
  Home,
  IndianRupee,
  MapPin,
  Phone,
  ShieldCheck,
} from 'lucide-react'
import Image from 'next/image'

import heroHouse from '@/assets/front-elevations/front-elevation-modern-duplex-white-grey-wood-accent.webp'
import { useQuoteModal } from '@/components/providers/QuoteModalProvider'
import { contact, serviceAreas, site } from '@/content'
import { cn } from '@/lib/utils/cn'

import { proofFigures } from './residential-data'

/** One icon per proof figure, in the order of `proofFigures`. */
const FIGURE_ICONS = [Home, IndianRupee, CalendarClock, ShieldCheck] as const

/**
 * The sky behind the copy: near-white at the top, easing to #dbedfe — the
 * photograph's own sky colour along its top edge (sampled). The photo is
 * pulled up underneath and fades in over that colour, so the CSS sky and the
 * photographed sky read as one. Dark text on it is well above 4.5:1.
 */
const SKY = 'bg-[linear-gradient(180deg,#f7fafe_0%,#eaf3fe_50%,#dbedfe_100%)]'

const HERO_ALT =
  '3D front elevation of a modern duplex with white and grey cladding, wooden accents and a terrace garden, designed by Sneha Construction'

/**
 * Residential hero, built on the home hero's layout: centred copy on a sky,
 * the house rising out of it, and the proof figures overlapping the fade.
 * Light rather than the home page's deep blue, because this photo's sky is
 * pale — the sky gradient is matched to it instead of fighting it.
 */
export function ResidentialHero() {
  const { openQuoteModal } = useQuoteModal()

  return (
    <section
      data-track-location="residential-hero"
      className="relative isolate overflow-hidden bg-plaster-50"
    >
      {/* ── Sky + copy ───────────────────────────────────────────────────── */}
      <div className={SKY}>
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-5 pt-28 pb-8 text-center sm:pt-36 lg:pb-10">
          <p className="flex items-center gap-2 font-secondary text-[0.8125rem] font-medium text-slate-600">
            <MapPin aria-hidden="true" size={14} className="text-brand-500" />
            <span className="hidden sm:inline">Residential construction ·</span>
            {serviceAreas.map((area) => area.name).join(' · ')}
          </p>

          <h1 className="mt-5 font-display text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.05] font-semibold tracking-[-0.035em] text-slate-900">
            Homes built for
            <br />
            families like yours
          </h1>

          <p className="mt-5 max-w-[50ch] text-[0.9375rem] leading-relaxed text-slate-600 sm:mt-6 sm:text-lg">
            Duplexes, villas and bungalows, turnkey from{' '}
            <strong className="font-semibold text-slate-900 tabular-nums">
              ₹{site.baseRateSqft.toLocaleString('en-IN')}/sq ft
            </strong>{' '}
            — one team from the first drawing to the day you get your keys.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
            <button
              type="button"
              onClick={() =>
                openQuoteModal({ serviceType: 'Residential', source: 'Residential Hero CTA' })
              }
              className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-ink-950 py-1.5 pr-1.5 pl-6 font-secondary text-[0.9375rem] font-semibold text-white shadow-[0_12px_32px_-8px_rgb(3_20_36/0.45)] transition-colors duration-150 hover:bg-ink-900"
            >
              Get a free quote
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 transition-colors duration-150 group-hover:bg-brand-400">
                <ArrowRight aria-hidden="true" size={17} strokeWidth={2.25} />
              </span>
            </button>
            <a
              href={contact.phoneHref}
              className="inline-flex min-h-12 items-center gap-2 font-secondary text-[0.9375rem] font-semibold text-slate-900 underline-offset-4 transition-colors duration-150 hover:underline"
            >
              <Phone aria-hidden="true" size={17} strokeWidth={1.75} className="text-brand-500" />
              <span className="tabular-nums">{contact.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── The house ──────────────────────────────────────────────────── */}
      {/* The wrapper carries the sky's end colour, so wherever the photo's
          top is faded out the sky continues behind it — no lighter band at the
          seam. Pulled up only slightly on sm+: the roof railing sits in the
          photo's top tenth and must land below the buttons. The photo is the
          LCP element, so it loads with priority and nothing animates it. */}
      <div className="bg-[#dbedfe]">
        <div className="relative aspect-video w-full [mask-image:linear-gradient(to_bottom,transparent,black_20%)] sm:-mt-8">
          <Image
            src={heroHouse}
            alt={HERO_ALT}
            fill
            priority
            sizes="100vw"
            quality={85}
            placeholder="blur"
            className="object-cover object-bottom"
          />
          {/* Bottom fade into the page, so the proof card rises out of it */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[18%] bg-gradient-to-b from-transparent via-plaster-50/70 to-plaster-50"
          />
        </div>
      </div>

      {/* ── Proof figures, rising out of the fade ──────────────────────── */}
      <div className="relative z-10 mx-auto -mt-10 max-w-5xl px-4 pb-6 sm:-mt-14 lg:-mt-16">
        <dl className="grid grid-cols-2 overflow-hidden rounded-2xl bg-white/90 shadow-[0_24px_60px_-24px_rgb(3_20_36/0.3)] ring-1 ring-plaster-200 backdrop-blur-md md:grid-cols-4">
          {proofFigures.map((figure, i) => {
            const Icon = FIGURE_ICONS[i] ?? Home
            return (
              <div
                key={figure.label}
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
                  <dt className="order-2 mt-1 font-secondary text-xs font-medium text-slate-600 sm:text-[0.8125rem]">
                    {figure.label}
                  </dt>
                  <dd className="order-1 font-display text-3xl leading-none font-bold tracking-tight text-slate-900 tabular-nums sm:text-[2.25rem]">
                    {figure.value}
                  </dd>
                </div>
              </div>
            )
          })}
        </dl>
      </div>
    </section>
  )
}
