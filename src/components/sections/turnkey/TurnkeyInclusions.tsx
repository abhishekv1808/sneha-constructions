import { Check, X } from 'lucide-react'

import { Container, SectionHeading } from '@/components/ui'

import { excluded, included } from './turnkey-data'

/**
 * Published exclusions. Local builders quote a rate and leave this list in a
 * drawer, which is where handover disputes come from — so it goes on the page,
 * in the same weight as the inclusions, not in small print beneath them.
 */
export function TurnkeyInclusions() {
  return (
    <section className="relative bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="The contract"
          lead="Both columns matter. The second one is where most turnkey arguments start."
        >
          What&apos;s in, <em>and what isn&apos;t</em>
        </SectionHeading>

        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-[16px] border border-plaster-200 bg-plaster-200 lg:grid-cols-2">
          <div className="bg-white p-6 sm:p-8">
            <p className="flex items-center gap-2.5 font-secondary text-xs font-bold tracking-[0.14em] text-slate-900 uppercase">
              <span
                aria-hidden
                className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-white"
              >
                <Check size={13} strokeWidth={3} />
              </span>
              Included in ₹1,875
            </p>

            <ul className="mt-6 space-y-3">
              {included.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 border-b border-plaster-200 pb-3 last:border-b-0 last:pb-0"
                >
                  <Check size={15} strokeWidth={2.4} className="mt-0.5 shrink-0 text-brand-500" />
                  <span className="font-secondary text-sm leading-snug text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-plaster-50 p-6 sm:p-8">
            <p className="flex items-center gap-2.5 font-secondary text-xs font-bold tracking-[0.14em] text-slate-900 uppercase">
              <span
                aria-hidden
                className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-400 text-white"
              >
                <X size={13} strokeWidth={3} />
              </span>
              Not included
            </p>

            <ul className="mt-6 space-y-3">
              {excluded.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 border-b border-plaster-200 pb-3 last:border-b-0 last:pb-0"
                >
                  <X size={15} strokeWidth={2.4} className="mt-0.5 shrink-0 text-slate-400" />
                  <span className="font-secondary text-sm leading-snug text-slate-600">{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 font-secondary text-xs leading-relaxed text-slate-500">
              Any of these can be added to your BOQ as a priced line item — they are simply not
              inside the base rate.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
