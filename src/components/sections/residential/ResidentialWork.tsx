'use client'

import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { Container } from '@/components/ui'

import { homes, typologyFilters, type ResidentialHome } from './residential-data'

/** Bento spans, by position in the list. Deliberately uneven so the grid never
 *  reads as the three-up card row on the home page. */
const bentoSpans = [
  'lg:col-span-7 lg:row-span-2',
  'lg:col-span-5',
  'lg:col-span-5',
  'lg:col-span-4',
  'lg:col-span-4',
  'lg:col-span-4',
]

/**
 * The tall first tile only pays off when there are enough cards beside it to
 * fill the second row; a filter that returns two would otherwise leave a hole
 * under the short one. Small result sets get an even grid instead.
 */
function spansFor(count: number): string[] {
  if (count >= 5) return bentoSpans
  if (count === 1) return ['lg:col-span-12']
  if (count === 3) return Array<string>(3).fill('lg:col-span-4')
  return Array<string>(count).fill('lg:col-span-6')
}

export function ResidentialWork() {
  const [filter, setFilter] = useState<string>('all')

  const shown =
    filter === 'all' ? [...homes] : homes.filter((home) => home.typology === filter)
  const spans = spansFor(shown.length)

  return (
    <section id="work" className="relative bg-white py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 font-secondary text-xs font-bold tracking-[0.16em] text-brand-500 uppercase sm:text-[0.8125rem]">
              <span aria-hidden className="inline-block h-2 w-2 rounded-[2px] bg-brand-500" />
              Recent handovers
            </p>
            <h2 className="mt-4 max-w-[16ch] font-display text-3xl leading-[1.12] font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
              Look at the <span className="font-playfair italic">work</span>, not the words.
            </h2>
          </div>

          <div role="group" aria-label="Filter by home type" className="flex flex-wrap gap-2">
            {typologyFilters.map((option) => {
              const isActive = filter === option.key
              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setFilter(option.key)}
                  aria-pressed={isActive}
                  className={`rounded-full px-4 py-2 font-secondary text-xs font-bold transition-colors duration-150 ${
                    isActive
                      ? 'bg-brand-500 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {option.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-12 grid auto-rows-[15rem] grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-12 lg:auto-rows-[13.5rem]">
          {shown.map((home, index) => (
            <WorkCard key={home.id} home={home} span={spans[index % spans.length] as string} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2.5 rounded-full border border-slate-300 px-6 py-3 font-secondary text-sm font-bold text-slate-900 transition-colors duration-150 hover:border-brand-500 hover:text-brand-500"
          >
            <span>See every project</span>
            <ArrowUpRight
              size={16}
              strokeWidth={2.4}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </Container>
    </section>
  )
}

function WorkCard({ home, span }: { home: ResidentialHome; span: string }) {
  return (
    <Link
      href="/projects"
      className={`group relative col-span-1 overflow-hidden rounded-[18px] bg-slate-100 sm:col-span-1 ${span}`}
    >
      <Image
        src={home.image}
        alt={`${home.name} — completed ${home.typologyLabel.toLowerCase()} at ${home.town}`}
        fill
        sizes="(min-width: 1024px) 45vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* §5.1's one permitted gradient: the bottom scrim on a photographic card. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_top,rgb(3_20_36/0.94)_0%,rgb(3_20_36/0.62)_38%,transparent_78%)]"
      />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
        <div className="min-w-0">
          <p className="font-secondary text-[0.6875rem] font-bold tracking-[0.16em] text-brand-300 uppercase">
            {home.typologyLabel}
          </p>
          <p className="mt-1 truncate font-display text-lg font-semibold text-white">
            {home.name}
          </p>
          <p className="mt-0.5 truncate font-secondary text-xs text-slate-300">
            {home.town} · {home.area}
          </p>
        </div>

        <span
          aria-hidden
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-colors duration-150 group-hover:bg-brand-500"
        >
          <ArrowUpRight size={16} strokeWidth={2.4} />
        </span>
      </div>
    </Link>
  )
}
