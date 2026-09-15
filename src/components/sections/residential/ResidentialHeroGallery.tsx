'use client'

import { ArrowRight, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

import { useReducedMotion } from '@/components/motion'
import { useQuoteModal } from '@/components/providers/QuoteModalProvider'
import { Container } from '@/components/ui'
import { contact } from '@/content'

import { homes } from './residential-data'

const ADVANCE_MS = 6000

export function ResidentialHeroGallery() {
  const { openQuoteModal } = useQuoteModal()
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const railRef = useRef<HTMLDivElement>(null)

  const go = useCallback((next: number) => {
    setActive((next + homes.length) % homes.length)
  }, [])

  // Auto-advance. Held while the visitor is hovering or keyboard-focused inside
  // the rail, and switched off entirely under reduced motion — the gallery then
  // only moves when someone asks it to.
  useEffect(() => {
    if (paused || reduced) return
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % homes.length)
    }, ADVANCE_MS)
    return () => window.clearInterval(id)
  }, [paused, reduced])

  const onRailKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault()
      go(active + 1)
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault()
      go(active - 1)
    }
  }

  const current = homes[active] as (typeof homes)[number]

  return (
    <section
      aria-label="Homes completed by Sneha Construction"
      className="relative isolate min-h-[42rem] overflow-hidden bg-ink-950 lg:min-h-[46rem]"
    >
      {/* Stage — every frame is mounted and cross-faded, so switching never
          triggers a fresh network request mid-interaction. */}
      <div className="absolute inset-0">
        {homes.map((home, index) => (
          <div
            key={home.id}
            aria-hidden={index !== active}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              index === active ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={home.image}
              alt={`${home.name}, a ${home.typologyLabel.toLowerCase()} completed at ${home.town}`}
              fill
              priority={index === 0}
              quality={90}
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        ))}
      </div>

      {/* Scrims: one flat tint for legibility, one directional wash behind the
          copy column, one at the foot for the caption row. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-ink-950/45" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink-950/92 via-ink-950/60 to-transparent lg:w-[72%]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-ink-950/90 to-transparent"
      />

      <Container className="relative z-10 flex min-h-[42rem] flex-col justify-between pt-28 pb-8 sm:pt-32 lg:min-h-[46rem] lg:pt-36 lg:pb-10">
        {/* Copy stack — deliberately short. The photographs carry this page. */}
        <div className="max-w-xl pt-6 lg:pt-10">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-300/35 bg-brand-900/40 px-3.5 py-1 font-secondary text-xs font-bold tracking-[0.14em] text-brand-300 uppercase backdrop-blur-md">
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-brand-300" />
            Residential · Tumkur district
          </p>

          <h1 className="mt-5 font-display text-4xl leading-[1.05] font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
            Homes we built{' '}
            <span className="font-playfair italic">for families like yours</span>
          </h1>

          <p className="mt-5 max-w-md font-secondary text-base leading-relaxed text-slate-200/90">
            Duplexes, villas and bungalows across Tumkur, Gubbi, Kunigal, Sira and Tiptur.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => openQuoteModal({ serviceType: 'Residential', source: 'Residential hero' })}
              className="group inline-flex items-center rounded-full bg-brand-500 py-2 pr-2 pl-6 font-secondary text-sm font-bold text-white shadow-lg shadow-brand-500/25 transition-colors duration-150 hover:bg-brand-600"
            >
              <span>Get a free quote</span>
              <span className="ml-3.5 flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-500 transition-transform duration-200 group-hover:translate-x-1">
                <ArrowRight size={16} strokeWidth={2.5} />
              </span>
            </button>

            <a
              href={contact.phoneHref}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-5 py-3 font-secondary text-sm font-bold text-white backdrop-blur-md transition-colors duration-150 hover:border-white/50 hover:bg-white/20"
            >
              <Phone size={16} />
              <span>{contact.phoneDisplay}</span>
            </a>
          </div>
        </div>

        {/* Caption + thumbnail rail */}
        <div
          ref={railRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          className="mt-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-10"
        >
          {/* Which home you are looking at */}
          <div aria-live="polite" className="min-w-0">
            <p className="font-secondary text-[0.6875rem] font-bold tracking-[0.18em] text-brand-300 uppercase">
              {current.typologyLabel} · {current.year}
            </p>
            <p className="mt-1.5 font-display text-2xl font-semibold text-white sm:text-[1.75rem]">
              {current.name}
            </p>
            <p className="mt-1 inline-flex items-center gap-1.5 font-secondary text-sm text-slate-300">
              <MapPin size={14} className="shrink-0 text-brand-300" />
              <span className="truncate">
                {current.town} · {current.area}
              </span>
            </p>
          </div>

          {/* Thumbnails. A tablist would imply panels; these are picture buttons,
              so they stay plain buttons with an aria-current. */}
          <div
            role="group"
            aria-label="Choose a completed home"
            onKeyDown={onRailKeyDown}
            className="-mx-5 flex gap-2.5 overflow-x-auto px-5 pb-1 sm:gap-3 lg:mx-0 lg:overflow-visible lg:px-0"
          >
            {homes.map((home, index) => {
              const isActive = index === active
              return (
                <button
                  key={home.id}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-current={isActive}
                  aria-label={`${home.name}, ${home.town}`}
                  className={`group relative h-16 w-24 shrink-0 overflow-hidden rounded-[10px] border transition-all duration-300 sm:h-[4.5rem] sm:w-28 ${
                    isActive
                      ? 'border-brand-500 opacity-100'
                      : 'border-white/20 opacity-55 hover:opacity-90'
                  }`}
                >
                  <Image
                    src={home.image}
                    alt=""
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                  {/* Advance progress. Keyed on `active` so the bar restarts
                      with each slide rather than resuming mid-sweep. */}
                  {isActive && !reduced && !paused && (
                    <span
                      key={active}
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-brand-500"
                      style={{ animation: `residential-progress ${ADVANCE_MS}ms linear both` }}
                    />
                  )}
                  {isActive && (reduced || paused) && (
                    <span aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] bg-brand-500" />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
