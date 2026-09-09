import { Container } from '@/components/ui'
import { processSteps } from '@/content'

import { ProcessLine } from './ProcessLine'

/**
 * §8.5 "How we build" — ink-900 with the faint blueprint grid.
 *
 * This is the one place numerals belong on this page: six steps that genuinely
 * are a sequence (§4). The services cards above carry none, because they are not.
 *
 * Six steps as a horizontal timeline on desktop and a vertical rail on mobile,
 * connected by a 1px ink-600 line that draws in on scroll — a single pathLength
 * animation, once (§8.5, §6).
 *
 * Steps come from the static content module rather than Supabase: they describe
 * how the company works, not client-editable catalogue content, and §10 defines
 * no table for them.
 */
export function Process() {
  return (
    <section className="relative isolate overflow-hidden bg-[#FAFAF8] py-24 md:py-32 lg:py-40 border-t border-slate-200">
      <Container className="relative">
        <div className="grid grid-cols-12 gap-6 lg:gap-8">
          <div className="col-span-12 lg:col-span-6">
            <h2 className="max-w-[18ch] text-display-2 text-slate-900">How we build</h2>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <p className="max-w-[52ch] text-body-lg text-slate-600">
              Six stages, in this order, on every project. You will know which one your build is in
              whenever you ask.
            </p>
          </div>
        </div>

        {/* One list, two layouts. The steps are not duplicated per breakpoint
            — that would put six extra headings in the DOM — only the connecting
            rule is, because its orientation genuinely differs. */}
        <div className="relative mt-16 lg:mt-20">
          {/* Vertical rail below lg. */}
          <ProcessLine
            orientation="vertical"
            className="absolute top-3 bottom-3 left-3 w-px lg:hidden"
          />

          {/* Horizontal rule at lg and up, spanning centre-of-first-numeral to
              centre-of-last. The right inset is one grid track minus half a
              numeral slot, derived from the grid below (6 columns, gap-8 =
              5 x 2rem); keep the two in step if either changes. */}
          <ProcessLine
            orientation="horizontal"
            className="absolute top-3 right-[calc((100%-10rem)/6-0.75rem)] left-3 hidden h-px lg:block"
          />

          <ol className="relative flex list-none flex-col gap-10 lg:grid lg:grid-cols-6 lg:gap-8">
            {processSteps.map((step, index) => (
              <li key={step.title} className="flex gap-6 lg:block">
                {/* Fixed 24px slot so the rule can be centred on a token value
                    rather than a measured one. Carries the section background
                    so the vertical rail breaks cleanly behind it. */}
                <p className="tabular z-10 flex h-6 w-6 shrink-0 items-center justify-center bg-[#FAFAF8] text-meta text-[#CE1C73] font-bold lg:bg-transparent">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <div className="lg:mt-6">
                  <h3 className="text-heading-4 text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-body-sm text-slate-600 lg:mt-3">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}
