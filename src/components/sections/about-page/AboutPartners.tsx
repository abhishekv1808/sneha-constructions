import { CheckCircle2, Shield } from 'lucide-react'

import { Container } from '@/components/ui'

const partners = [
  {
    name: 'Tata Tiscon',
    category: 'Structural Steel',
    spec: 'FE-550D Super Ductile TMT Rebars',
    description: 'High seismic resistance, zero re-rolled scrap, certified tensile load tolerance.',
  },
  {
    name: 'Ultratech Cement',
    category: 'Concrete & Masonry',
    spec: '53-Grade & Super OPC/PPC',
    description:
      'Engineered compressive strength, consistent setting time, superior curing resilience.',
  },
  {
    name: 'Astral Pipes',
    category: 'Plumbing & Drainage',
    spec: 'Lead-Free CPVC & SWR Systems',
    description: 'Zero scale buildup, high pressure and heat resistance, 50-year longevity rating.',
  },
  {
    name: 'Asian Paints Royale',
    category: 'Finishes & Paints',
    spec: 'Luxury Emulsions & Weather-Shield Exterior',
    description: 'Teflon-protected washable surfaces, anti-fungal formulation, UV color lock.',
  },
  {
    name: 'Saint-Gobain',
    category: 'Architectural Glazing',
    spec: 'Acoustic & Solar-Control Glass',
    description:
      'Curbs heat transmission while delivering clear natural illumination and sound dampening.',
  },
  {
    name: 'Schneider Electric',
    category: 'Electrical Systems',
    spec: 'Modular Switches & MCB Distribution',
    description: 'Fire-retardant switchgear, surge suppression, and child-safe shuttered sockets.',
  },
]

export function AboutPartners() {
  return (
    <section className="relative bg-white py-24 text-slate-900 sm:py-32 border-t border-slate-200">
      <Container>
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 font-secondary text-xs font-bold tracking-[0.18em] text-[#CE1C73] uppercase sm:text-[0.8125rem]">
            <span aria-hidden="true" className="inline-block h-2 w-2 rounded-[2px] bg-[#CE1C73]" />
            CERTIFIED MATERIAL PARTNERS
          </div>

          <h2 className="mt-4 font-display text-3xl leading-[1.18] font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
            Built with India’s most trusted structural brands
          </h2>

          <p className="mt-4 text-base text-slate-600 sm:text-lg">
            We never cut corners with unbranded or commercial-grade substitutes. Every consignment
            is inspected on arrival with manufacturer test certificates.
          </p>
        </div>

        {/* Brand Grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-slate-200/90 bg-[#F8F9FA] p-7 transition-all duration-300 hover:border-[#CE1C73]/50 hover:bg-white hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold tracking-wider text-[#CE1C73] uppercase">
                  {partner.category}
                </span>
                <Shield
                  size={18}
                  className="text-slate-400 transition-colors group-hover:text-[#CE1C73]"
                />
              </div>

              <h3 className="mt-3 font-display text-xl font-bold text-slate-900 transition-colors group-hover:text-[#CE1C73]">
                {partner.name}
              </h3>

              <p className="mt-1 text-xs font-medium text-slate-700">{partner.spec}</p>

              <p className="mt-3 text-xs leading-relaxed text-slate-600">{partner.description}</p>

              <div className="mt-5 flex items-center gap-2 border-t border-slate-200 pt-4 text-[0.6875rem] text-slate-500">
                <CheckCircle2 size={13} className="text-[#CE1C73]" />
                <span>Verified Factory Test Certificate</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
