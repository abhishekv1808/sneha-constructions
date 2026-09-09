import { ArrowRight, Award, CheckCircle2, ShieldCheck, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import aboutImage from '@/assets/about/about-engineers.jpg'
import { Container } from '@/components/ui'

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Image Collage & Experience Badge */}
          <div className="relative lg:col-span-6">
            <div className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-[24px] shadow-2xl lg:max-w-none">
              <Image
                src={aboutImage}
                alt="Sneha Construction engineers reviewing architectural blueprints on site"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 via-transparent to-transparent" />
            </div>

            {/* Overlapping Floating Stat Badge */}
            <div className="absolute -bottom-6 -right-2 sm:-bottom-8 sm:right-6 flex items-center gap-4 rounded-[18px] bg-white p-5 text-slate-900 shadow-2xl border border-slate-200/90">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#CE1C73] text-white shadow-md">
                <Award size={24} strokeWidth={2.2} />
              </div>
              <div>
                <p className="font-display text-2xl font-bold leading-none text-slate-900">25+ Years</p>
                <p className="mt-1 text-xs text-slate-500 font-medium">Of Proven Construction Mastery</p>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Key Value Points */}
          <div className="lg:col-span-6">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 font-secondary text-xs sm:text-[0.8125rem] font-bold tracking-[0.16em] text-[#CE1C73] uppercase">
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 rounded-[2px] bg-[#CE1C73]"
              />
              ABOUT US
            </div>

            {/* Heading */}
            <h2 className="mt-4 font-display text-3xl font-bold leading-[1.18] tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
              Redefining the future of construction through design excellence
            </h2>

            {/* Lead Narrative */}
            <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg">
              Based in Tumkur, Sneha Construction &amp; Developers unites visionary residential
              architecture with rigorous engineering standards. From modern duplexes and sprawling
              villas to turnkey family estates, we craft homes that stand the test of time.
            </p>

            {/* 3 Pillars Checkpoints */}
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#CE1C73]/15 text-[#CE1C73]">
                  <CheckCircle2 size={18} className="text-[#CE1C73]" />
                </div>
                <div>
                  <h4 className="font-display text-base font-bold text-slate-900">
                    Architectural Precision &amp; 3D Modeling
                  </h4>
                  <p className="text-sm text-slate-600">
                    Comprehensive site planning, vastu-compliant layouts, and realistic 3D
                    visualizations before breaking ground.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#CE1C73]/15 text-[#CE1C73]">
                  <ShieldCheck size={18} className="text-[#CE1C73]" />
                </div>
                <div>
                  <h4 className="font-display text-base font-bold text-slate-900">
                    Premium Sourced Construction Materials
                  </h4>
                  <p className="text-sm text-slate-600">
                    Only certified high-grade cement, FE-550D TMT steel, and kiln-burned bricks for
                    uncompromising load safety.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#CE1C73]/15 text-[#CE1C73]">
                  <Users size={18} className="text-[#CE1C73]" />
                </div>
                <div>
                  <h4 className="font-display text-base font-bold text-slate-900">
                    Transparent Turnkey Execution
                  </h4>
                  <p className="text-sm text-slate-600">
                    Clear milestones from foundation to key handover with zero surprise costs and
                    guaranteed timelines.
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs and Metrics Row */}
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link
                href="/about"
                className="group inline-flex items-center rounded-full bg-[#CE1C73] pl-6 pr-2 py-1.5 text-[0.9375rem] font-bold text-white shadow-md shadow-[#CE1C73]/20 transition-all duration-200 hover:bg-[#B81564] hover:shadow-lg"
              >
                <span>Learn More About Us</span>
                <span className="ml-3.5 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#CE1C73] transition-transform duration-200 group-hover:translate-x-1">
                  <ArrowRight size={16} strokeWidth={2.5} />
                </span>
              </Link>

              <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
                <div>
                  <p className="font-display text-2xl font-bold text-slate-900">250+</p>
                  <p className="text-xs font-medium text-slate-500">Completed Builds</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
