'use client'

import { FileCheck2, Paperclip } from 'lucide-react'
import { useState } from 'react'

import { Container, SectionHeading } from '@/components/ui'

import { siteLog } from './turnkey-data'

/**
 * The page's signature interaction, aimed at the owner who is in Dubai or in
 * clinic all day: step the weeks and watch what actually arrives. Device UI
 * rather than architectural photography, which is why it needs no new images.
 */
export function TurnkeyRemoteOwner() {
  const [week, setWeek] = useState(0)
  const current = siteLog[week] as (typeof siteLog)[number]

  return (
    <section className="relative bg-ink-950 py-20 sm:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading
              tone="dark"
              eyebrow="If you're not here"
              lead="Most of our turnkey owners are working, or abroad. You should not have to stand on the plot to know what happened this week."
            >
              You&apos;ll still <em>know what happened</em>
            </SectionHeading>

            {/* Week rail — the control */}
            <ol className="mt-10 space-y-0">
              {siteLog.map((entry, index) => {
                const isActive = index === week
                return (
                  <li key={entry.week}>
                    <button
                      type="button"
                      onClick={() => setWeek(index)}
                      aria-current={isActive ? 'true' : undefined}
                      className={`flex w-full items-baseline gap-4 border-l-2 py-3 pl-4 text-left transition-colors duration-150 ${
                        isActive
                          ? 'border-brand-500 bg-ink-900'
                          : 'border-ink-700 hover:bg-ink-900/60'
                      }`}
                    >
                      <span
                        data-numeral
                        className={`shrink-0 font-secondary text-xs font-bold ${
                          isActive ? 'text-brand-300' : 'text-slate-500'
                        }`}
                      >
                        {entry.week}
                      </span>
                      <span
                        className={`font-display text-[0.9375rem] font-semibold ${
                          isActive ? 'text-white' : 'text-slate-400'
                        }`}
                      >
                        {entry.title}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>
          </div>

          {/* The phone */}
          <div className="flex justify-center lg:col-span-6">
            <div className="w-full max-w-[19rem]">
              <div className="rounded-[2rem] border border-ink-600 bg-ink-900 p-2.5 shadow-2xl">
                <div className="overflow-hidden rounded-[1.6rem] bg-ink-950">
                  {/* Header */}
                  <div className="flex items-center gap-3 border-b border-ink-700 bg-ink-900 px-4 py-3.5">
                    <span
                      aria-hidden
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 font-display text-sm font-bold text-white"
                    >
                      S
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-secondary text-sm font-bold text-white">
                        Sneha · Site Engineer
                      </span>
                      <span className="block font-secondary text-[0.6875rem] text-slate-400">
                        Your project group
                      </span>
                    </span>
                  </div>

                  {/* Thread */}
                  <div className="min-h-[19rem] space-y-3 p-4" aria-live="polite">
                    <p className="text-center font-secondary text-[0.6875rem] font-bold tracking-wide text-slate-500">
                      {current.week}
                    </p>

                    <div className="max-w-[85%] rounded-[12px] rounded-tl-[3px] bg-ink-800 px-3.5 py-2.5">
                      <p className="font-secondary text-[0.8125rem] font-bold text-brand-300">
                        {current.title}
                      </p>
                      <p className="mt-1 font-secondary text-[0.8125rem] leading-relaxed text-slate-200">
                        {current.message}
                      </p>
                    </div>

                    <div className="flex max-w-[85%] items-center gap-2.5 rounded-[12px] rounded-tl-[3px] border border-ink-700 bg-ink-900 px-3.5 py-2.5">
                      <Paperclip size={14} className="shrink-0 text-slate-400" />
                      <span className="font-secondary text-xs text-slate-300">
                        {current.attachment}
                      </span>
                    </div>

                    <div className="flex max-w-[85%] items-center gap-2.5 rounded-[12px] rounded-tl-[3px] bg-brand-500/15 px-3.5 py-2.5">
                      <FileCheck2 size={14} className="shrink-0 text-brand-300" />
                      <span className="font-secondary text-xs text-brand-300">
                        Milestone signed off by site engineer
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-center font-secondary text-xs text-slate-500">
                Illustrative of the weekly update — not a real client thread.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
