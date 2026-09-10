'use client'

import { ArrowRight, Check } from 'lucide-react'
import { useId, useState } from 'react'

import { useQuoteModal } from '@/components/providers/QuoteModalProvider'
import { Container } from '@/components/ui'
import { formatINR, formatSqft } from '@/lib/utils/format'

import { packageTiers, type PackageTier } from './residential-data'

const MIN_AREA = 600
const MAX_AREA = 6000
const STEP = 50

/**
 * Three packages against one area figure. The slider and the number input are
 * equal-status controls (§6) and the totals are plain arithmetic, so the
 * section produces a correct figure with no JS animation at all.
 */
export function ResidentialPackages() {
  const { openQuoteModal } = useQuoteModal()
  const [area, setArea] = useState(2400)
  const sliderId = useId()
  const inputId = useId()

  const clamp = (value: number) => Math.min(MAX_AREA, Math.max(MIN_AREA, value))
  const fill = ((area - MIN_AREA) / (MAX_AREA - MIN_AREA)) * 100

  return (
    <section id="packages" className="relative bg-white py-20 sm:py-28">
      <Container>
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 font-secondary text-xs font-bold tracking-[0.16em] text-brand-500 uppercase sm:text-[0.8125rem]">
            <span aria-hidden className="inline-block h-2 w-2 rounded-[2px] bg-brand-500" />
            Packages
          </p>
          <h2 className="mt-4 font-display text-3xl leading-[1.12] font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
            Three packages, <span className="font-playfair italic">one locked rate</span>
          </h2>
        </div>

        {/* Area control — drives all three cards at once. */}
        <div className="mt-10 rounded-[16px] border border-plaster-200 bg-plaster-50 p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <label
                htmlFor={sliderId}
                className="font-secondary text-xs font-bold tracking-[0.14em] text-slate-500 uppercase"
              >
                Built-up area
              </label>
              <p
                data-numeral
                className="mt-1 font-display text-3xl leading-none font-semibold text-slate-900"
              >
                {formatSqft(area)}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <label
                htmlFor={inputId}
                className="font-secondary text-xs font-medium text-slate-500"
              >
                Or type it
              </label>
              <input
                id={inputId}
                type="number"
                min={MIN_AREA}
                max={MAX_AREA}
                step={STEP}
                value={area}
                onChange={(event) => setArea(clamp(Number(event.target.value) || MIN_AREA))}
                className="w-28 rounded-[2px] border border-plaster-300 bg-white px-3 py-2 font-secondary text-sm font-semibold text-slate-900 tabular"
              />
            </div>
          </div>

          <input
            id={sliderId}
            type="range"
            min={MIN_AREA}
            max={MAX_AREA}
            step={STEP}
            value={area}
            onChange={(event) => setArea(Number(event.target.value))}
            aria-label="Built-up area in square feet"
            className="residential-slider mt-5 w-full"
            style={{ ['--fill' as string]: `${fill}%` }}
          />

          <div className="mt-2 flex justify-between font-secondary text-xs text-slate-400 tabular">
            <span>{formatSqft(MIN_AREA)}</span>
            <span>{formatSqft(MAX_AREA)}</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
          {packageTiers.map((tier) => (
            <TierCard
              key={tier.id}
              tier={tier}
              area={area}
              onPick={() =>
                openQuoteModal({
                  serviceType: 'Residential',
                  builtUpArea: area,
                  packageTier: tier.name,
                  estimatedCost: formatINR(area * tier.rate),
                  source: 'Residential packages',
                  message: `${formatSqft(area)} on the ${tier.name} package (₹${tier.rate}/sq ft). Indicative total ${formatINR(area * tier.rate)}.`,
                })
              }
            />
          ))}
        </div>

        <p className="mt-6 max-w-[70ch] font-secondary text-xs leading-relaxed text-slate-500">
          Indicative only. Your final quote depends on soil, site access and the design — we confirm
          it after a free site visit.
        </p>
      </Container>
    </section>
  )
}

function TierCard({
  tier,
  area,
  onPick,
}: {
  tier: PackageTier
  area: number
  onPick: () => void
}) {
  const total = area * tier.rate

  return (
    <div
      className={`relative flex flex-col rounded-[16px] border p-6 transition-colors duration-150 ${
        tier.popular
          ? 'border-brand-500 bg-ink-950'
          : 'border-plaster-200 bg-white hover:border-plaster-300'
      }`}
    >
      {tier.popular && (
        <span className="absolute -top-2.5 left-6 rounded-full bg-brand-500 px-3 py-0.5 font-secondary text-[0.6875rem] font-bold text-white">
          Most chosen
        </span>
      )}

      <p
        className={`font-display text-xl font-semibold ${
          tier.popular ? 'text-white' : 'text-slate-900'
        }`}
      >
        {tier.name}
      </p>
      <p
        className={`mt-0.5 font-secondary text-xs font-medium tabular ${
          tier.popular ? 'text-brand-300' : 'text-brand-500'
        }`}
      >
        ₹{tier.rate.toLocaleString('en-IN')} / sq ft
      </p>

      <p
        data-numeral
        className={`mt-5 font-display text-[2rem] leading-none font-semibold ${
          tier.popular ? 'text-white' : 'text-slate-900'
        }`}
      >
        {formatINR(total)}
      </p>
      <p
        className={`mt-1 font-secondary text-xs ${
          tier.popular ? 'text-slate-400' : 'text-slate-500'
        }`}
      >
        for {formatSqft(area)}
      </p>

      <ul className="mt-6 flex-1 space-y-2.5">
        {tier.includes.map((item) => (
          <li key={item} className="flex gap-2.5">
            <Check
              size={15}
              strokeWidth={2.4}
              className={`mt-0.5 shrink-0 ${tier.popular ? 'text-brand-300' : 'text-brand-500'}`}
            />
            <span
              className={`font-secondary text-sm leading-snug ${
                tier.popular ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onPick}
        className={`group mt-7 inline-flex items-center justify-between gap-3 rounded-[6px] px-5 py-3 font-secondary text-sm font-bold transition-colors duration-150 ${
          tier.popular
            ? 'bg-brand-500 text-white hover:bg-brand-600'
            : 'bg-slate-900 text-white hover:bg-slate-800'
        }`}
      >
        <span>Get this quoted</span>
        <ArrowRight
          size={16}
          strokeWidth={2.4}
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </button>
    </div>
  )
}
