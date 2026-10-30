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
    <section className="relative bg-[#FAFAF8] py-16 sm:py-24 lg:py-32">
      <Container>
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 font-secondary text-xs font-bold tracking-[0.18em] text-[#CE1C73] uppercase sm:text-[0.8125rem]">
            <span aria-hidden="true" className="inline-block h-2 w-2 rounded-[2px] bg-[#CE1C73]" />
            OUR 25-YEAR JOURNEY
          </div>

          <h2 className="mt-4 font-display text-[1.625rem] leading-[1.18] font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
            A quarter-century of building trust, brick by brick
          </h2>

          <p className="mt-4 text-[0.9375rem] text-slate-600 sm:text-lg">
            From humble foundations to landmark architectural villas, trace the evolution of
            Tumkur’s most trusted residential construction partner.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative mt-10 sm:mt-20">
          {/* Vertical Center Line (Desktop) */}
          <div
            aria-hidden="true"
            className="absolute top-4 bottom-4 left-4 w-0.5 bg-slate-200 md:left-1/2 md:-ml-0.5"
          />

          <div className="space-y-5 sm:space-y-12 md:space-y-16">
            {milestones.map((m, i) => {
              const isEven = i % 2 === 0

              return (
                <div
                  key={i}
                  className={`relative flex flex-col items-start md:flex-row ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Center Node */}
                  <div className="absolute top-1.5 left-4 -ml-3 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#CE1C73] shadow-md md:left-1/2 md:-ml-3">
                    <span className="h-2 w-2 rounded-full bg-white" />
                  </div>

                  {/* Content Card */}
                  <div
                    className={`ml-10 w-[calc(100%-2.5rem)] sm:ml-12 sm:w-[calc(100%-3rem)] md:ml-0 md:w-1/2 ${
                      isEven ? 'md:pl-12' : 'md:pr-12 md:text-right'
                    }`}
                  >
                    <div
                      className={`inline-block rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all duration-300 hover:border-[#CE1C73]/50 hover:shadow-lg sm:p-6 ${
                        isEven ? 'text-left' : 'text-left md:text-right'
                      }`}
                    >
                      {/* Year & Tag */}
                      <div
                        className={`flex items-center gap-3 ${
                          isEven ? 'justify-start' : 'justify-start md:justify-end'
                        }`}
                      >
                        <span className="font-display text-xl font-black text-ink-950 sm:text-3xl">
                          {m.year}
                        </span>
                        <span className="rounded-full bg-[#CE1C73]/15 px-3 py-0.5 font-mono text-[0.6875rem] font-bold tracking-wider text-[#CE1C73] uppercase">
                          {m.tag}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h3 className="mt-2 font-display text-base font-bold text-slate-900 sm:mt-3 sm:text-lg">
                        {m.title}
                      </h3>
                      <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-slate-600 sm:mt-2 sm:text-sm">
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
