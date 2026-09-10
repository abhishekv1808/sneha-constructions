import { Check } from 'lucide-react'

import { Container, SectionHeading } from '@/components/ui'

import { complianceSteps } from './commercial-data'

/**
 * The sanction path as a document checklist. No state, no handlers — a server
 * component, per the 'use client' discipline in §9.
 */
export function CommercialCompliance() {
  return (
    <section className="relative bg-ink-950 py-20 sm:py-28">
      <Container>
        <SectionHeading
          tone="dark"
          eyebrow="Approvals"
          lead="The commercial projects that stall in Tumkur stall on paperwork, not on concrete."
        >
          Sanctioned, <em>not stalled</em>
        </SectionHeading>

        <ol className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-[16px] border border-ink-700 bg-ink-700 sm:grid-cols-2 lg:grid-cols-3">
          {complianceSteps.map((step, index) => (
            <li key={step.title} className="flex gap-4 bg-ink-950 p-6">
              <span
                aria-hidden
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-brand-500/40 bg-brand-500/10 text-brand-300"
              >
                <Check size={14} strokeWidth={2.6} />
              </span>
              <div>
                <p className="flex items-baseline gap-2">
                  <span
                    data-numeral
                    className="font-secondary text-[0.6875rem] font-bold text-slate-500"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-base font-semibold text-white">
                    {step.title}
                  </span>
                </p>
                <p className="mt-1.5 font-secondary text-sm leading-relaxed text-slate-400">
                  {step.line}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
