'use client'

import { useState } from 'react'

import { Container, SectionHeading } from '@/components/ui'

import { programmeTracks } from './commercial-data'

const UNITS = 12

/**
 * Parallel workstreams as a programme strip. Bars are proportions of the
 * contract period rather than months, so the page shows that facade and MEP
 * overlap the structure without claiming a duration it cannot honour.
 */
export function CommercialProgramme() {
  const [active, setActive] = useState<string | null>(null)
  const current = programmeTracks.find((track) => track.id === active)

  return (
    <section className="relative bg-plaster-50 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Programme"
          lead="Idle capital is the real cost on a commercial build, so the trades overlap instead of queueing."
        >
          Five trades, <em>one timeline</em>
        </SectionHeading>

        <div className="mt-10 rounded-[16px] border border-plaster-200 bg-white p-5 sm:p-7">
          {/* Scale */}
          <div className="flex items-center justify-between border-b border-plaster-200 pb-2.5 font-secondary text-[0.6875rem] font-bold tracking-[0.12em] text-slate-400 uppercase">
            <span>Contract start</span>
            <span>Handover</span>
          </div>

          <div className="mt-5 space-y-2.5">
            {programmeTracks.map((track) => {
              const isActive = active === track.id
              return (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => setActive(isActive ? null : track.id)}
                  onMouseEnter={() => setActive(track.id)}
                  onFocus={() => setActive(track.id)}
                  aria-pressed={isActive}
                  className="group grid w-full grid-cols-[5.5rem_1fr] items-center gap-3 text-left sm:grid-cols-[7rem_1fr] sm:gap-4"
                >
                  <span
                    className={`font-secondary text-xs font-bold transition-colors duration-150 ${
                      isActive ? 'text-brand-500' : 'text-slate-600'
                    }`}
                  >
                    {track.label}
                  </span>

                  <span className="relative block h-9 rounded-[2px] bg-plaster-100">
                    {/* Twelfth markers */}
                    <span aria-hidden className="absolute inset-0 flex">
                      {Array.from({ length: UNITS - 1 }, (_, i) => (
                        <span
                          key={i}
                          className="flex-1 border-r border-white"
                          style={{ flexBasis: `${100 / UNITS}%` }}
                        />
                      ))}
                    </span>

                    <span
                      className={`absolute inset-y-1 rounded-[2px] transition-colors duration-150 ${
                        isActive ? 'bg-brand-500' : 'bg-ink-800 group-hover:bg-ink-700'
                      }`}
                      style={{
                        left: `${(track.start / UNITS) * 100}%`,
                        width: `${(track.span / UNITS) * 100}%`,
                      }}
                    />
                  </span>
                </button>
              )
            })}
          </div>

          {/* Note area holds its height so hovering the bars never shifts layout. */}
          <p
            aria-live="polite"
            className="mt-5 min-h-[2.75rem] border-t border-plaster-200 pt-4 font-secondary text-sm leading-relaxed text-slate-600"
          >
            {current ? current.note : 'Hover or tap a trade to see what happens in that window.'}
          </p>
        </div>
      </Container>
    </section>
  )
}
