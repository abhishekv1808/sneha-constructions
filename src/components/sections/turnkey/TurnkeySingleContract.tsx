import { Container, SectionHeading } from '@/components/ui'

import { auditCategories, auditTotal, tradesHandled } from './turnkey-data'

/**
 * Two answers in one band: why turnkey beats self-managing (twelve trades
 * collapsing into one agreement), and what the handover audit actually checks.
 * Both are drawn, not photographed.
 */
export function TurnkeySingleContract() {
  return (
    <section className="relative bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Why turnkey"
          lead="Managing it yourself means twelve separate people, twelve separate arguments, and every gap between them is yours."
        >
          Twelve trades, <em>one agreement</em>
        </SectionHeading>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Convergence diagram */}
          <div className="lg:col-span-7">
            <div className="rounded-[16px] border border-plaster-200 bg-plaster-50 p-6 sm:p-8">
              {/* items-stretch plus a non-preserving viewBox lets the rules span
                  exactly the list's height, so each one leaves its own row. */}
              <div className="flex items-stretch justify-center gap-0">
                {/* Right-aligned so every label ends flush against the curves. */}
                <ul className="flex shrink-0 flex-col justify-between py-0.5">
                  {tradesHandled.map((trade) => (
                    <li
                      key={trade}
                      className="flex items-center justify-end gap-2 font-secondary text-xs text-slate-600"
                    >
                      <span>{trade}</span>
                      <span aria-hidden className="h-px w-3 shrink-0 bg-plaster-300" />
                    </li>
                  ))}
                </ul>

                <svg
                  viewBox="0 0 64 240"
                  preserveAspectRatio="none"
                  className="w-12 shrink-0 self-stretch sm:w-16"
                  aria-hidden
                >
                  {tradesHandled.map((_, i) => {
                    const y = 6 + i * (228 / (tradesHandled.length - 1))
                    return (
                      <path
                        key={i}
                        d={`M0 ${y} C 34 ${y}, 30 120, 64 120`}
                        fill="none"
                        stroke="var(--color-plaster-300)"
                        strokeWidth="1"
                        vectorEffect="non-scaling-stroke"
                      />
                    )
                  })}
                </svg>

                <div className="flex shrink-0 items-center">
                  <div className="rounded-[12px] bg-brand-500 px-4 py-5 text-center sm:px-5">
                    <p className="font-display text-sm leading-tight font-bold text-white sm:text-base">
                      One
                      <br />
                      agreement
                    </p>
                    <p className="mt-1.5 font-secondary text-[0.6875rem] text-white/80">
                      One contact
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Audit */}
          <div className="lg:col-span-5">
            <div className="flex h-full flex-col rounded-[16px] border border-plaster-200 bg-ink-950 p-6 sm:p-8">
              <p className="font-secondary text-xs font-bold tracking-[0.14em] text-brand-300 uppercase">
                Before you get the keys
              </p>
              <p
                data-numeral
                className="mt-3 font-display text-5xl leading-none font-semibold text-white"
              >
                {auditTotal}
              </p>
              <p className="mt-1.5 font-secondary text-sm text-slate-400">
                checks, signed off one by one
              </p>

              <dl className="mt-7 flex-1 space-y-2.5">
                {auditCategories.map((category) => (
                  <div
                    key={category.label}
                    className="flex items-baseline justify-between gap-3 border-b border-ink-700 pb-2.5 last:border-b-0"
                  >
                    <dt className="font-secondary text-xs text-slate-300">{category.label}</dt>
                    <dd
                      data-numeral
                      className="shrink-0 font-secondary text-xs font-bold text-white"
                    >
                      {category.count}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
