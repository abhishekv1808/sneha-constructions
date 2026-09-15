'use client'

import Image from 'next/image'
import { useState } from 'react'

import { Container } from '@/components/ui'

import { journeyStages } from './residential-data'

/**
 * Paper to keys. The stage rail drives a single image frame taken from the
 * timelapse already in /public/frames, so the sequence is shown rather than
 * described — one short line per stage is all the copy it needs.
 */
export function ResidentialJourney() {
  const [stage, setStage] = useState(0)
  const current = journeyStages[stage] as (typeof journeyStages)[number]

  return (
    <section className="relative bg-plaster-100 py-20 sm:py-28">
      <Container>
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 font-secondary text-xs font-bold tracking-[0.16em] text-brand-500 uppercase sm:text-[0.8125rem]">
            <span aria-hidden className="inline-block h-2 w-2 rounded-[2px] bg-brand-500" />
            The build
          </p>
          <h2 className="mt-4 font-display text-3xl leading-[1.12] font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
            From paper <span className="font-playfair italic">to keys</span>
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Frame */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[18px] bg-slate-200">
              {journeyStages.map((item, index) => (
                <Image
                  key={item.id}
                  src={item.frame}
                  alt={item.alt}
                  fill
                  quality={80}
                  sizes="(min-width: 1024px) 62vw, 100vw"
                  aria-hidden={index !== stage}
                  className={`object-cover transition-opacity duration-500 ease-out ${
                    index === stage ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}

              {/* Stage marker over the frame */}
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(to_top,rgb(3_20_36/0.85)_0%,transparent_100%)]"
              />
              <div className="absolute bottom-5 left-5 flex items-baseline gap-3">
                <span
                  data-numeral
                  className="font-display text-3xl leading-none font-semibold text-brand-300"
                >
                  {String(stage + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-lg font-semibold text-white sm:text-xl">
                  {current.title}
                </span>
              </div>
            </div>
          </div>

          {/* Stage rail */}
          <div className="lg:col-span-5 xl:col-span-4">
            <ol className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0">
              {journeyStages.map((item, index) => {
                const isActive = index === stage
                return (
                  <li key={item.id} className="shrink-0 lg:shrink">
                    <button
                      type="button"
                      onClick={() => setStage(index)}
                      aria-current={isActive ? 'step' : undefined}
                      className={`flex h-full w-44 flex-col gap-1 rounded-[10px] border-l-2 px-4 py-3.5 text-left transition-colors duration-150 lg:w-full lg:rounded-none ${
                        isActive
                          ? 'border-brand-500 bg-white'
                          : 'border-plaster-300 bg-transparent hover:bg-white/60'
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span
                          data-numeral
                          className={`font-secondary text-xs font-bold ${
                            isActive ? 'text-brand-500' : 'text-slate-400'
                          }`}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span
                          className={`font-display text-[0.9375rem] font-semibold ${
                            isActive ? 'text-slate-900' : 'text-slate-600'
                          }`}
                        >
                          {item.title}
                        </span>
                      </span>

                      <span
                        className={`font-secondary text-xs leading-relaxed ${
                          isActive ? 'text-slate-600' : 'text-slate-400 lg:hidden'
                        }`}
                      >
                        {item.line}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  )
}
