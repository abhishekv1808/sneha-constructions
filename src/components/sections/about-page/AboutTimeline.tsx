import { Container } from '@/components/ui'

const milestones = [
  {
    year: '1999',
    tag: 'FOUNDATION',
    title: 'Artisanal Roots in Tumkur',
    description:
      'Sneha Construction was established in Tumkur with a commitment to uncompromised structural masonry, ethical billing, and personalized contractor attention for local families.',
  },
  {
    year: '2008',
    tag: 'EXPANSION',
    title: 'Multi-Floor Duplex & Commercial Scaling',
    description:
      'Expanded our civil engineering fleet to execute heavy RCC frame commercial complexes, institutional facilities, and multi-tier residential duplexes across the district.',
  },
  {
    year: '2016',
    tag: 'INNOVATION',
    title: 'Turnkey 3D Architectural Ecosystem',
    description:
      'Pioneered in-house 3D Vastu planning and full-scope turnkey build packages, eliminating third-party contractor markups and delivering locked ₹/sq ft cost certainty.',
  },
  {
    year: '2021',
    tag: 'MILESTONE',
    title: '200+ Completed Family Residences',
    description:
      'Crossed the milestone of 200+ delivered homes spanning Tumkur, Gubbi, Kunigal, and Sira with zero structural defect disputes and continuous client referrals.',
  },
  {
    year: 'Present',
    tag: 'LEADERSHIP',
    title: 'The Benchmark for Luxury Villas',
    description:
      'Leading Tumkur in modern parametric architecture, sustainable materials, smart home automation, and luxury turnkey villa development for distinguished families.',
  },
]

export function AboutTimeline() {
  return (
    <section className="relative bg-[#FAFAF8] py-24 sm:py-32">
      <Container>
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 font-secondary text-xs sm:text-[0.8125rem] font-bold tracking-[0.18em] text-[#CE1C73] uppercase">
            <span
              aria-hidden="true"
              className="inline-block h-2 w-2 rounded-[2px] bg-[#CE1C73]"
            />
            OUR 25-YEAR JOURNEY
          </div>

          <h2 className="mt-4 font-display text-3xl font-bold leading-[1.18] tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
            A quarter-century of building trust, brick by brick
          </h2>

          <p className="mt-4 text-base text-slate-600 sm:text-lg">
            From humble foundations to landmark architectural villas, trace the evolution of
            Tumkur’s most trusted residential construction partner.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative mt-20">
          {/* Vertical Center Line (Desktop) */}
          <div
            aria-hidden="true"
            className="absolute left-4 top-4 bottom-4 w-0.5 bg-slate-200 md:left-1/2 md:-ml-0.5"
          />

          <div className="space-y-12 md:space-y-16">
            {milestones.map((m, i) => {
              const isEven = i % 2 === 0

              return (
                <div
                  key={i}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Center Node */}
                  <div className="absolute left-4 top-1.5 -ml-3 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#CE1C73] shadow-md md:left-1/2 md:-ml-3">
                    <span className="h-2 w-2 rounded-full bg-white" />
                  </div>

                  {/* Content Card */}
                  <div
                    className={`ml-12 w-[calc(100%-3rem)] md:ml-0 md:w-1/2 ${
                      isEven ? 'md:pl-12' : 'md:pr-12 md:text-right'
                    }`}
                  >
                    <div
                      className={`inline-block rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-[#CE1C73]/50 ${
                        isEven ? 'text-left' : 'md:text-right text-left'
                      }`}
                    >
                      {/* Year & Tag */}
                      <div
                        className={`flex items-center gap-3 ${
                          isEven ? 'justify-start' : 'md:justify-end justify-start'
                        }`}
                      >
                        <span className="font-display text-2xl font-black text-ink-950 sm:text-3xl">
                          {m.year}
                        </span>
                        <span className="rounded-full bg-[#CE1C73]/15 px-3 py-0.5 font-mono text-[0.6875rem] font-bold text-[#CE1C73] uppercase tracking-wider">
                          {m.tag}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h3 className="mt-3 font-display text-lg font-bold text-slate-900">
                        {m.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">
                        {m.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
