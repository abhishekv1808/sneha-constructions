import { Container, SectionHeading } from '@/components/ui'

import { PAYMENT_STAGES } from './turnkey-data'

/**
 * The payment ladder as a ledger. Nothing here animates and nothing is hidden
 * behind an interaction — an owner reading this is checking it against a
 * contract, so it renders as a static, scannable list.
 */
export function TurnkeyPayments() {
  let cumulative = 0

  return (
    <section className="relative bg-plaster-50 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Payments"
          lead="Each release is tied to work you can stand in front of, not to a calendar date."
        >
          You pay <em>as it rises</em>
        </SectionHeading>

        <ol className="mt-10 overflow-hidden rounded-[16px] border border-plaster-200 bg-white">
          {PAYMENT_STAGES.map((stage, index) => {
            cumulative += stage.share
            const runningTotal = Math.round(cumulative * 100)

            return (
              <li
                key={stage.label}
                className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 border-b border-plaster-200 px-5 py-4 last:border-b-0 sm:grid-cols-[3rem_1fr_8rem_auto] sm:px-6"
              >
                <span
                  data-numeral
                  className="font-secondary text-xs font-bold text-slate-400"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                <span className="min-w-0">
                  <span className="block font-display text-base font-semibold text-slate-900">
                    {stage.label}
                  </span>
                  <span className="mt-0.5 block font-secondary text-xs text-slate-500">
                    {stage.precondition}
                  </span>
                </span>

                {/* Cumulative rail — shows how much of the contract is spent by
                    this point, which is the number owners actually track. */}
                <span
                  aria-hidden
                  className="hidden h-1.5 overflow-hidden rounded-full bg-plaster-200 sm:block"
                >
                  <span
                    className="block h-full rounded-full bg-brand-500"
                    style={{ width: `${runningTotal}%` }}
                  />
                </span>

                <span className="text-right">
                  <span
                    data-numeral
                    className="block font-display text-lg font-semibold text-slate-900"
                  >
                    {Math.round(stage.share * 100)}%
                  </span>
                  <span
                    data-numeral
                    className="block font-secondary text-[0.6875rem] text-slate-400"
                  >
                    {runningTotal}% paid
                  </span>
                </span>
              </li>
            )
          })}
        </ol>
      </Container>
    </section>
  )
}
