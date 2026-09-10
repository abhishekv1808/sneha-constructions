'use client'

import { Check } from 'lucide-react'
import { useId, useRef, useState } from 'react'

import { Container, SectionHeading } from '@/components/ui'

import { buildingTypes } from './commercial-data'

/**
 * A real tablist — unlike the residential gallery's picture buttons, each tab
 * here genuinely controls a panel, so it gets the full roving-tabindex
 * keyboard contract that pattern requires.
 */
export function CommercialTypologies() {
  const [active, setActive] = useState(0)
  const baseId = useId()
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([])

  const move = (next: number) => {
    const index = (next + buildingTypes.length) % buildingTypes.length
    setActive(index)
    tabsRef.current[index]?.focus()
  }

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault()
      move(active + 1)
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault()
      move(active - 1)
    } else if (event.key === 'Home') {
      event.preventDefault()
      move(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      move(buildingTypes.length - 1)
    }
  }

  const current = buildingTypes[active] as (typeof buildingTypes)[number]

  return (
    <section className="relative bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="What you're building">
          Six typologies, <em>six sets of rules</em>
        </SectionHeading>

        <div className="mt-10">
          <div
            role="tablist"
            aria-label="Commercial building typologies"
            onKeyDown={onKeyDown}
            className="-mx-5 flex gap-1.5 overflow-x-auto px-5 pb-1 lg:mx-0 lg:grid lg:grid-cols-6 lg:px-0"
          >
            {buildingTypes.map((type, index) => {
              const isActive = index === active
              const Icon = type.icon
              return (
                <button
                  key={type.id}
                  ref={(el) => {
                    tabsRef.current[index] = el
                  }}
                  role="tab"
                  id={`${baseId}-tab-${type.id}`}
                  aria-selected={isActive}
                  aria-controls={`${baseId}-panel-${type.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActive(index)}
                  className={`flex shrink-0 flex-col items-center gap-2 rounded-[2px] border-b-2 px-4 py-3.5 font-secondary text-xs font-bold transition-colors duration-150 lg:shrink ${
                    isActive
                      ? 'border-brand-500 bg-plaster-50 text-brand-500'
                      : 'border-plaster-200 text-slate-500 hover:bg-plaster-50 hover:text-slate-900'
                  }`}
                >
                  <Icon size={20} strokeWidth={1.5} />
                  <span>{type.label}</span>
                </button>
              )
            })}
          </div>

          <div
            role="tabpanel"
            id={`${baseId}-panel-${current.id}`}
            aria-labelledby={`${baseId}-tab-${current.id}`}
            tabIndex={0}
            className="mt-6 rounded-[16px] border border-plaster-200 bg-plaster-50 p-6 sm:p-8"
          >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-5">
                <p className="font-secondary text-[0.6875rem] font-bold tracking-[0.14em] text-brand-500 uppercase">
                  Defining constraint
                </p>
                <p className="mt-2 font-display text-xl leading-snug font-semibold text-slate-900">
                  {current.signature}
                </p>
                <p className="mt-3 font-secondary text-sm leading-relaxed text-slate-600">
                  {current.description}
                </p>

                <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-plaster-200 pt-5">
                  <div>
                    <dt className="font-secondary text-[0.6875rem] font-bold tracking-[0.12em] text-slate-500 uppercase">
                      Carpet efficiency
                    </dt>
                    <dd
                      data-numeral
                      className="mt-1 font-display text-xl font-semibold text-slate-900"
                    >
                      {Math.round(current.efficiency * 100)}%
                    </dd>
                  </div>
                  <div>
                    <dt className="font-secondary text-[0.6875rem] font-bold tracking-[0.12em] text-slate-500 uppercase">
                      Indicative rate
                    </dt>
                    <dd
                      data-numeral
                      className="mt-1 font-display text-xl font-semibold text-slate-900"
                    >
                      ₹{current.rate.toLocaleString('en-IN')}
                      <span className="font-secondary text-xs font-medium text-slate-500">
                        {' '}
                        / sq ft
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="lg:col-span-7">
                <p className="font-secondary text-[0.6875rem] font-bold tracking-[0.14em] text-slate-500 uppercase">
                  Engineered into the frame
                </p>
                <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                  {current.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5">
                      <Check size={15} strokeWidth={2.4} className="mt-0.5 shrink-0 text-brand-500" />
                      <span className="font-secondary text-sm leading-snug text-slate-700">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
