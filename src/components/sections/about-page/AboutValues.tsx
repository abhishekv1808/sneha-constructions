import {
  Clock,
  Compass,
  FileCheck2,
  HardHat,
  Layers,
  ShieldCheck,
} from 'lucide-react'

import { Container } from '@/components/ui'

const values = [
  {
    icon: Compass,
    number: '01',
    title: 'Architectural & Vastu Synergy',
    description:
      'We merge progressive modern aesthetics with authentic Vastu Shastra principles, optimizing natural sunlight, positive cross-ventilation, and functional flow.',
  },
  {
    icon: ShieldCheck,
    number: '02',
    title: 'Certified Tier-1 Materials',
    description:
      'Strict quality audit of every raw material delivered to site — Tata Tiscon FE-550D steel, Ultratech cement, kiln-burned red bricks, and Astral plumbing.',
  },
  {
    icon: Layers,
    number: '03',
    title: 'Zero-Escalation Pricing',
    description:
      'Fixed square-foot turnkey rates locked at contract signing. Every door, tile, wire, and pipe is transparently documented in a detailed Bill of Quantities (BOQ).',
  },
  {
    icon: HardHat,
    number: '04',
    title: 'Daily In-House Site Supervision',
    description:
      'We never sub-contract your structural integrity to unvetted third parties. Dedicated full-time site engineers supervise slump tests, curing times, and alignment daily.',
  },
  {
    icon: FileCheck2,
    number: '05',
    title: '3D BIM & Elevation Rendering',
    description:
      'Experience your future residence in photorealistic 3D detail before a single shovel enters the dirt. Walk through elevations, room volumes, and lighting layouts.',
  },
  {
    icon: Clock,
    number: '06',
    title: 'Contractual On-Time Handover',
    description:
      'Milestone-tracked execution schedules ensure your dream home is delivered ready for Griha Pravesha on the agreed date with all TUDA completion documentation.',
  },
]

export function AboutValues() {
  return (
    <section className="relative bg-[#FAFAF8] py-24 sm:py-32 text-slate-900 border-t border-slate-200">
      <Container className="relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 font-secondary text-xs sm:text-[0.8125rem] font-bold tracking-[0.18em] text-[#CE1C73] uppercase">
            <span
              aria-hidden="true"
              className="inline-block h-2 w-2 rounded-[2px] bg-[#CE1C73]"
            />
            OUR ENGINEERING PILLARS
          </div>

          <h2 className="mt-4 font-display text-3xl font-bold leading-[1.18] tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
            Built on non-negotiable principles of quality and trust
          </h2>

          <p className="mt-4 text-base text-slate-600 sm:text-lg">
            Every home we build in Tumkur is supported by six structural commitments that protect
            your investment for generations.
          </p>
        </div>

        {/* Values 6-Card Grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => {
            const Icon = v.icon
            return (
              <div
                key={i}
                className="group relative rounded-[22px] border border-slate-200/90 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#CE1C73]/50 hover:shadow-xl"
              >
                {/* Top Row: Icon + Number */}
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#CE1C73]/15 text-[#CE1C73] transition-colors duration-300 group-hover:bg-[#CE1C73] group-hover:text-white">
                    <Icon size={24} strokeWidth={2} />
                  </div>
                  <span className="font-mono text-xs font-bold tracking-widest text-slate-400">
                    {v.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="mt-6 font-display text-lg font-bold text-slate-900 transition-colors group-hover:text-[#CE1C73]">
                  {v.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {v.description}
                </p>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
