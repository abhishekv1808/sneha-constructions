'use client'

import { ArrowRight, Phone } from 'lucide-react'
import { useState } from 'react'

import { useQuoteModal } from '@/components/providers/QuoteModalProvider'
import { Container } from '@/components/ui'
import { contact } from '@/content'

import { BASE_RATE, COST_SPLIT } from './turnkey-data'

/**
 * The rate is the hero object. A turnkey buyer's only real question is what
 * ₹1,875 actually buys, so the number unpacks into its stages instead of
 * sitting next to a photograph of somebody else's house.
 *
 * Composition is deliberately centred and horizontal — residential leads with a
 * left-aligned photo stage, commercial with a left/right split, and this with a
 * single column running down the middle.
 */
export function TurnkeyRateHero() {
  const { openQuoteModal } = useQuoteModal()
  const [active, setActive] = useState<string | null>(null)

  const current = COST_SPLIT.find((stage) => stage.id === active)

  return (
    <section className="relative overflow-hidden bg-plaster-50 pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-plaster-200 bg-white px-3.5 py-1 font-secondary text-xs font-bold tracking-[0.14em] text-brand-500 uppercase">
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-[2px] bg-brand-500" />
            Turnkey · one contract
          </p>

          <h1 className="mt-6 font-display text-4xl leading-[1.06] font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Where every rupee <span className="font-playfair italic">actually goes</span>
          </h1>

          <p className="mx-auto mt-5 max-w-lg font-secondary text-base leading-relaxed text-slate-600">
            One agreement, one company, one locked rate — from soil test to the day you turn the key.
          </p>
        </div>

        {/* The number */}
        <div className="mt-12 text-center">
          {/* The ₹ stays in the display face. Playfair's rupee sits on a much
              larger optical body and collides with the digits at this size. */}
          <p
            data-numeral
            className="font-display text-[5rem] leading-[0.9] font-semibold tracking-tight text-slate-900 sm:text-[7rem] lg:text-[8.5rem]"
          >
            <span className="align-baseline text-[0.5em] font-normal text-slate-400">₹</span>
            {BASE_RATE.toLocaleString('en-IN')}
          </p>
          <p className="mt-2 font-secondary text-sm font-bold tracking-[0.16em] text-slate-500 uppercase">
            per sq ft, built-up
          </p>
        </div>

        {/* The split. One bar, six segments, each a button. */}
        <div className="mx-auto mt-10 max-w-4xl">
          <div
            role="group"
            aria-label="Breakdown of the per square foot rate"
            onMouseLeave={() => setActive(null)}
            className="flex h-14 w-full overflow-hidden rounded-[6px] border border-plaster-200 bg-white"
          >
            {COST_SPLIT.map((stage, index) => {
              const isActive = active === stage.id
              const dimmed = active !== null && !isActive
              return (
                <button
                  key={stage.id}
                  type="button"
                  // Select rather than toggle: on a mouse, hover has already set
                  // this segment, so a toggle would clear it on the very click
                  // meant to choose it.
                  onClick={() => setActive(stage.id)}
                  onMouseEnter={() => setActive(stage.id)}
                  onFocus={() => setActive(stage.id)}
                  aria-pressed={isActive}
                  aria-label={`${stage.label}, ${Math.round(stage.share * 100)} percent`}
                  style={{ width: `${stage.share * 100}%` }}
                  className={`relative h-full border-r border-white/60 transition-opacity duration-200 last:border-r-0 ${
                    index % 2 === 0 ? 'bg-ink-800' : 'bg-brand-500'
                  } ${dimmed ? 'opacity-55' : 'opacity-100'}`}
                >
                  <span className="font-secondary text-[0.6875rem] font-bold text-white tabular">
                    {Math.round(stage.share * 100)}%
                  </span>
                </button>
              )
            })}
          </div>

          {/* Legend. Doubles as the read-out — the detail line below swaps with
              the hovered segment and holds its height so nothing jumps. */}
          <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
            {COST_SPLIT.map((stage, index) => {
              const isActive = active === stage.id
              return (
                <div key={stage.id} className="flex items-baseline gap-2.5">
                  <span
                    aria-hidden
                    className={`mt-1 inline-block h-2.5 w-2.5 shrink-0 rounded-[2px] ${
                      index % 2 === 0 ? 'bg-ink-800' : 'bg-brand-500'
                    } ${active !== null && !isActive ? 'opacity-30' : ''}`}
                  />
                  <span className="min-w-0">
                    <span
                      className={`block font-secondary text-xs font-semibold ${
                        isActive ? 'text-brand-500' : 'text-slate-700'
                      }`}
                    >
                      {stage.label}
                    </span>
                    <span
                      data-numeral
                      className="block font-secondary text-xs text-slate-500"
                    >
                      ₹{Math.round(stage.share * BASE_RATE).toLocaleString('en-IN')} / sq ft
                    </span>
                  </span>
                </div>
              )
            })}
          </div>

          <p
            aria-live="polite"
            className="mt-6 min-h-[3rem] rounded-[6px] border border-plaster-200 bg-white px-4 py-3 text-center font-secondary text-sm leading-relaxed text-slate-600"
          >
            {current
              ? current.detail
              : 'Hover or tap a band to see what that share of the rate pays for.'}
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() =>
              openQuoteModal({
                serviceType: 'Turnkey',
                source: 'Turnkey rate hero',
                message: 'Please send the itemised turnkey BOQ for my plot.',
              })
            }
            className="group inline-flex items-center rounded-full bg-brand-500 py-2 pr-2 pl-6 font-secondary text-sm font-bold text-white transition-colors duration-150 hover:bg-brand-600"
          >
            <span>Get your itemised BOQ</span>
            <span className="ml-3.5 flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-500 transition-transform duration-200 group-hover:translate-x-1">
              <ArrowRight size={16} strokeWidth={2.5} />
            </span>
          </button>

          <a
            href={contact.phoneHref}
            className="inline-flex items-center gap-2.5 rounded-full border border-plaster-300 bg-white px-5 py-3 font-secondary text-sm font-bold text-slate-900 transition-colors duration-150 hover:border-brand-500 hover:text-brand-500"
          >
            <Phone size={16} className="text-brand-500" />
            <span>{contact.phoneDisplay}</span>
          </a>
        </div>
      </Container>
    </section>
  )
}
