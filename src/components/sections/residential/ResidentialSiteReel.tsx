'use client'

import Image from 'next/image'
import { useState } from 'react'

import { Container } from '@/components/ui'

import { reelPanels } from './residential-data'

/**
 * The construction imagery a visitor already pictures — rebar, brick courses,
 * plaster, joinery — as an accordion of photographs. One word per panel; the
 * open panel adds a single line. Below `lg` every panel is simply stacked open,
 * because a flex-basis accordion is a mouse gesture.
 */
export function ResidentialSiteReel() {
  const [open, setOpen] = useState(0)

  return (
    <section className="relative bg-ink-950 py-20 sm:py-28">
      <Container>
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 font-secondary text-xs font-bold tracking-[0.16em] text-brand-300 uppercase sm:text-[0.8125rem]">
            <span aria-hidden className="inline-block h-2 w-2 rounded-[2px] bg-brand-300" />
            On site
          </p>
          <h2 className="mt-4 font-display text-3xl leading-[1.12] font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
            What it looks like{' '}
            <span className="font-playfair italic">while we build</span>
          </h2>
        </div>

        {/* Desktop: flex-basis accordion. Mobile: a plain stacked list. */}
        <div className="mt-12 flex flex-col gap-3 lg:h-[30rem] lg:flex-row lg:gap-3">
          {reelPanels.map((panel, index) => {
            const isOpen = index === open
            return (
              <button
                key={panel.id}
                type="button"
                onClick={() => setOpen(index)}
                onMouseEnter={() => setOpen(index)}
                onFocus={() => setOpen(index)}
                aria-expanded={isOpen}
                className={`group relative h-56 w-full shrink-0 overflow-hidden rounded-[16px] text-left transition-[flex-grow] duration-500 ease-out sm:h-64 lg:h-full lg:w-auto lg:shrink ${
                  isOpen ? 'lg:grow-[4]' : 'lg:grow'
                } lg:basis-0`}
              >
                <Image
                  src={panel.image}
                  alt={panel.alt}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className={`object-cover transition-all duration-700 ease-out ${
                    isOpen ? 'scale-100' : 'scale-105 lg:grayscale'
                  }`}
                />

                <div
                  aria-hidden
                  className={`absolute inset-0 transition-colors duration-500 ${
                    isOpen ? 'bg-ink-950/35' : 'bg-ink-950/65'
                  }`}
                />
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_top,rgb(3_20_36/0.92)_0%,rgb(3_20_36/0.4)_45%,transparent_100%)]"
                />

                {/* Stacked label. Always on below lg; on lg it belongs to the
                    open panel only — a collapsed panel is far too narrow to set
                    a word like "Supervision" horizontally. */}
                <div
                  className={`absolute inset-x-0 bottom-0 p-5 ${isOpen ? '' : 'lg:hidden'}`}
                >
                  <span
                    aria-hidden
                    className={`block h-[2px] w-8 transition-colors duration-500 ${
                      isOpen ? 'bg-brand-500' : 'bg-white/40'
                    }`}
                  />
                  <p className="mt-3 font-display text-xl font-semibold text-white lg:text-[1.375rem]">
                    {panel.word}
                  </p>
                  <p className="mt-1.5 max-w-[34ch] font-secondary text-sm leading-relaxed text-slate-300 lg:mt-2">
                    {panel.line}
                  </p>
                </div>

                {/* Collapsed on lg: the word runs up the panel instead. */}
                <div
                  className={`absolute inset-0 hidden items-end justify-center pb-6 ${
                    isOpen ? '' : 'lg:flex'
                  }`}
                >
                  <p className="font-display text-lg font-semibold tracking-wide text-white/85 [writing-mode:vertical-rl] rotate-180">
                    {panel.word}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
