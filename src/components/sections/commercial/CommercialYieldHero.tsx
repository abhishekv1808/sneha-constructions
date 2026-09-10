'use client'

import { ArrowRight, Info, Phone } from 'lucide-react'
import { useId, useMemo, useState } from 'react'

import { useQuoteModal } from '@/components/providers/QuoteModalProvider'
import { Container } from '@/components/ui'
import { contact } from '@/content'
import { formatINR, formatSqft } from '@/lib/utils/format'

import {
  buildingTypes,
  calculateFeasibility,
  FEASIBILITY,
  floorOptions,
  heroProof,
  type BuildingType,
} from './commercial-data'
import { MassingDiagram } from './MassingDiagram'

const MIN_PLOT = 1200
const MAX_PLOT = 40000
const STEP = 100

/**
 * The hero *is* the tool. A commercial buyer opens this page asking what their
 * plot can yield, so the first thing on it answers that — no photograph, and
 * nothing to scroll past first.
 */
export function CommercialYieldHero() {
  const { openQuoteModal } = useQuoteModal()
  const [plot, setPlot] = useState(6000)
  const [roadId, setRoadId] = useState<string>('15')
  const [typeId, setTypeId] = useState<string>('retail')
  const [floorId, setFloorId] = useState<string>('G+2')

  const plotId = useId()
  const plotNumberId = useId()

  const road = FEASIBILITY.roadWidths.find((r) => r.id === roadId) ?? FEASIBILITY.roadWidths[1]
  const type = (buildingTypes.find((t) => t.id === typeId) ?? buildingTypes[0]) as BuildingType
  const floor = floorOptions.find((f) => f.id === floorId) ?? floorOptions[2]

  const result = useMemo(
    () =>
      calculateFeasibility({
        plotSqft: plot,
        far: road.far,
        levels: floor.levels,
        efficiency: type.efficiency,
        rate: type.rate,
      }),
    [plot, road, floor, type],
  )

  const fill = ((plot - MIN_PLOT) / (MAX_PLOT - MIN_PLOT)) * 100

  return (
    <section className="relative isolate overflow-hidden bg-plaster-50 pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-20">
      {/* Blueprint grid — this page's one decorative instance (§5.3). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.55] [background-image:repeating-linear-gradient(to_right,var(--color-plaster-200)_0_1px,transparent_1px_64px),repeating-linear-gradient(to_bottom,var(--color-plaster-200)_0_1px,transparent_1px_64px)]"
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Copy — short. The tool does the talking. */}
          <div className="lg:col-span-5">
            <p className="inline-flex items-center gap-2 rounded-full border border-plaster-200 bg-white px-3.5 py-1 font-secondary text-xs font-bold tracking-[0.14em] text-brand-500 uppercase">
              <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-[2px] bg-brand-500" />
              Commercial · Tumkur district
            </p>

            <h1 className="mt-5 font-display text-4xl leading-[1.06] font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem]">
              What can your plot <span className="font-playfair italic">actually yield?</span>
            </h1>

            <p className="mt-5 max-w-md font-secondary text-base leading-relaxed text-slate-600">
              Offices, retail plazas, schools, clinics and warehouses across Tumkur, Gubbi and
              Kunigal.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() =>
                  openQuoteModal({
                    serviceType: 'Commercial',
                    builtUpArea: result.builtUp,
                    source: 'Commercial yield hero',
                    message: `Plot ${formatSqft(plot)} on a ${road.label}, ${floor.label}, ${type.label}. Indicative built-up ${formatSqft(result.builtUp)}, usable carpet ${formatSqft(result.usableCarpet)}.`,
                  })
                }
                className="group inline-flex items-center rounded-full bg-brand-500 py-2 pr-2 pl-6 font-secondary text-sm font-bold text-white transition-colors duration-150 hover:bg-brand-600"
              >
                <span>Get a feasibility review</span>
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

            {/* Credibility line, filling the column beside the tall configurator. */}
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-plaster-200 pt-6">
              {heroProof.map((item) => (
                <div key={item.label}>
                  <dd
                    data-numeral
                    className="font-display text-2xl leading-none font-semibold text-slate-900"
                  >
                    {item.value}
                  </dd>
                  <dt className="mt-1.5 font-secondary text-xs leading-snug text-slate-500">
                    {item.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>

          {/* The configurator */}
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-[16px] border border-plaster-200 bg-white">
              <div className="grid grid-cols-1 sm:grid-cols-5">
                {/* Controls */}
                <div className="space-y-5 border-plaster-200 p-5 sm:col-span-3 sm:border-r sm:p-6">
                  <div>
                    <div className="flex items-end justify-between gap-3">
                      <label
                        htmlFor={plotId}
                        className="font-secondary text-xs font-bold tracking-[0.14em] text-slate-500 uppercase"
                      >
                        Plot area
                      </label>
                      <input
                        id={plotNumberId}
                        type="number"
                        min={MIN_PLOT}
                        max={MAX_PLOT}
                        step={STEP}
                        value={plot}
                        aria-label="Plot area in square feet"
                        onChange={(e) =>
                          setPlot(
                            Math.min(MAX_PLOT, Math.max(MIN_PLOT, Number(e.target.value) || MIN_PLOT)),
                          )
                        }
                        className="w-24 rounded-[2px] border border-plaster-300 px-2.5 py-1.5 text-right font-secondary text-sm font-semibold text-slate-900 tabular"
                      />
                    </div>
                    <input
                      id={plotId}
                      type="range"
                      min={MIN_PLOT}
                      max={MAX_PLOT}
                      step={STEP}
                      value={plot}
                      aria-label="Plot area in square feet"
                      onChange={(e) => setPlot(Number(e.target.value))}
                      className="residential-slider mt-3 w-full"
                      style={{ ['--fill' as string]: `${fill}%` }}
                    />
                  </div>

                  <Choice
                    legend="Road width in front"
                    options={FEASIBILITY.roadWidths.map((r) => ({
                      id: r.id,
                      label: r.label,
                      sub: r.sub,
                    }))}
                    value={roadId}
                    onChange={setRoadId}
                    cols="grid-cols-2"
                  />

                  <Choice
                    legend="Floors"
                    options={floorOptions.map((f) => ({ id: f.id, label: f.label }))}
                    value={floorId}
                    onChange={setFloorId}
                    cols="grid-cols-5"
                  />

                  <Choice
                    legend="Building type"
                    options={buildingTypes.map((t) => ({ id: t.id, label: t.label }))}
                    value={typeId}
                    onChange={setTypeId}
                    cols="grid-cols-3"
                  />
                </div>

                {/* Massing + read-out */}
                <div className="flex flex-col sm:col-span-2">
                  <div className="relative border-b border-plaster-200 bg-plaster-50 p-3">
                    <div className="aspect-square w-full">
                      <MassingDiagram levels={floor.levels} />
                    </div>
                    <span className="absolute top-3 right-3 rounded-[2px] bg-white px-2 py-0.5 font-secondary text-[0.6875rem] font-bold text-slate-500 tabular">
                      FAR {road.far.toFixed(2)}
                    </span>
                  </div>

                  <dl className="flex-1 divide-y divide-plaster-200">
                    <Readout label="Built-up" value={formatSqft(result.builtUp)} emphasis />
                    <Readout label="Usable carpet" value={formatSqft(result.usableCarpet)} />
                    <Readout label="Indicative civil cost" value={formatINR(result.indicativeCost)} />
                  </dl>
                </div>
              </div>

              {/* Honest framing. Never a quote. */}
              <p className="flex items-start gap-2 border-t border-plaster-200 bg-plaster-50 px-5 py-3 font-secondary text-xs leading-relaxed text-slate-500 sm:px-6">
                <Info size={14} className="mt-0.5 shrink-0 text-slate-400" />
                <span>
                  {result.limitedByFloors
                    ? 'Your floor count is the limit here, not FAR — more storeys would still be permitted. '
                    : 'FAR is the limit here, not your floor count. '}
                  Indicative only. Final FAR depends on road width, zone and TUDA sanction; we confirm
                  it in a written feasibility review.
                </span>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function Choice({
  legend,
  options,
  value,
  onChange,
  cols,
}: {
  legend: string
  options: { id: string; label: string; sub?: string }[]
  value: string
  onChange: (id: string) => void
  cols: string
}) {
  return (
    <fieldset>
      <legend className="font-secondary text-xs font-bold tracking-[0.14em] text-slate-500 uppercase">
        {legend}
      </legend>
      <div className={`mt-2.5 grid gap-1.5 ${cols}`}>
        {options.map((option) => {
          const active = option.id === value
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              aria-pressed={active}
              className={`rounded-[2px] border px-2 py-2 text-center font-secondary text-xs font-semibold transition-colors duration-150 ${
                active
                  ? 'border-brand-500 bg-brand-500 text-white'
                  : 'border-plaster-200 bg-white text-slate-600 hover:border-plaster-300 hover:text-slate-900'
              }`}
            >
              <span className="block">{option.label}</span>
              {option.sub && (
                <span
                  className={`block text-[0.625rem] font-medium ${active ? 'text-white/75' : 'text-slate-400'}`}
                >
                  {option.sub}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

function Readout({
  label,
  value,
  emphasis,
}: {
  label: string
  value: string
  emphasis?: boolean
}) {
  return (
    <div className="px-4 py-3">
      <dt className="font-secondary text-[0.6875rem] font-bold tracking-[0.12em] text-slate-500 uppercase">
        {label}
      </dt>
      <dd
        data-numeral
        className={`mt-0.5 font-display font-semibold ${
          emphasis ? 'text-2xl text-brand-500' : 'text-lg text-slate-900'
        }`}
      >
        {value}
      </dd>
    </div>
  )
}
