import { Container, SectionHeading } from '@/components/ui'

import { capabilitySpecs } from './commercial-data'

/**
 * A genuine table, because this genuinely is tabular data — the residential
 * page has nothing like it, and a commercial buyer reads specs by scanning a
 * column rather than by reading cards.
 */
export function CommercialCapability() {
  return (
    <section className="relative bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Structural capability"
          lead="Every load delivered to site arrives with its manufacturer test certificate."
        >
          What goes into <em>the frame</em>
        </SectionHeading>

        {/* Wide content scrolls inside its own container, never the page body. */}
        <div className="mt-10 overflow-x-auto rounded-[16px] border border-plaster-200">
          <table className="w-full min-w-[42rem] border-collapse text-left">
            <caption className="sr-only">
              Structural materials and specifications used on commercial projects
            </caption>
            <thead>
              <tr className="border-b border-plaster-200 bg-plaster-50">
                <th
                  scope="col"
                  className="px-5 py-3.5 font-secondary text-[0.6875rem] font-bold tracking-[0.14em] text-slate-500 uppercase"
                >
                  Component
                </th>
                <th
                  scope="col"
                  className="px-5 py-3.5 font-secondary text-[0.6875rem] font-bold tracking-[0.14em] text-slate-500 uppercase"
                >
                  Grade / brand
                </th>
                <th
                  scope="col"
                  className="px-5 py-3.5 font-secondary text-[0.6875rem] font-bold tracking-[0.14em] text-slate-500 uppercase"
                >
                  Specification
                </th>
              </tr>
            </thead>
            <tbody>
              {capabilitySpecs.map((spec) => (
                <tr
                  key={spec.component}
                  className="border-b border-plaster-200 last:border-b-0 hover:bg-plaster-50"
                >
                  <th
                    scope="row"
                    className="px-5 py-4 align-top font-display text-sm font-semibold text-slate-900"
                  >
                    {spec.component}
                  </th>
                  <td className="px-5 py-4 align-top font-secondary text-sm font-medium text-brand-500">
                    {spec.brand}
                  </td>
                  <td className="px-5 py-4 align-top font-secondary text-sm leading-relaxed text-slate-600">
                    {spec.specification}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  )
}
