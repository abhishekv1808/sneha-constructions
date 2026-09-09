import { Award, ShieldCheck, Sparkles } from 'lucide-react'
import Image from 'next/image'

import aboutEngineers from '@/assets/about/about-engineers.jpg'
import { Container } from '@/components/ui'

export function AboutStory() {
  return (
    <section className="relative bg-white py-24 sm:py-32">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Visual Asset & Floating Badges */}
          <div className="relative lg:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[26px] shadow-2xl">
              <Image
                src={aboutEngineers}
                alt="Sneha Construction civil engineering leadership team reviewing structural villa blueprints"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17]/50 via-transparent to-transparent" />
            </div>

            {/* Floating Experience Badge */}
            <div className="absolute -bottom-6 -right-2 sm:-bottom-8 sm:right-6 flex items-center gap-4 rounded-[20px] bg-white p-5 text-slate-900 shadow-2xl border border-slate-200/90">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#CE1C73] text-white shadow-md">
                <Award size={26} strokeWidth={2.2} />
              </div>
              <div>
                <p className="font-display text-2xl font-bold leading-none text-slate-900">25+ Years</p>
                <p className="mt-1 text-xs text-slate-500 font-medium">Of Civil Excellence in Tumkur</p>
              </div>
            </div>

            {/* Secondary Badge Top Left */}
            <div className="absolute -top-4 -left-2 sm:-top-6 sm:left-4 hidden sm:flex items-center gap-3 rounded-full bg-white/95 px-5 py-2.5 shadow-xl ring-1 ring-slate-200 backdrop-blur-sm">
              <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-800">TUDA &amp; Panchayat Sanction Approved</span>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 font-secondary text-xs sm:text-[0.8125rem] font-bold tracking-[0.18em] text-[#CE1C73] uppercase">
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 rounded-[2px] bg-[#CE1C73]"
              />
              OUR STORY &amp; PHILOSOPHY
            </div>

            <h2 className="mt-4 font-display text-3xl font-bold leading-[1.18] tracking-tight text-slate-900 sm:text-4xl lg:text-[2.65rem]">
              Rooted in Tumkur, engineered to inspire and endure
            </h2>

            <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg">
              Founded over 25 years ago in Tumkur, Sneha Construction &amp; Developers began with a
              clear conviction: home construction should be a celebrated milestone, not an agonizing
              journey plagued by hidden escalation, sub-par concrete, or fragmented contractor delays.
            </p>

            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Over the decades, we have established an end-to-end turnkey ecosystem under one roof:
              in-house architectural draftsmen, licensed structural engineers, Vastu specialists, and
              dedicated site supervisors. We ensure every foundation poured and every teakwood frame
              installed meets uncompromising standards of durability.
            </p>

            {/* Three Pillar Cards */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-100 bg-[#FAFAF8] p-5 transition-colors hover:border-[#CE1C73]/50">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#CE1C73]/15 text-[#CE1C73]">
                  <ShieldCheck size={20} />
                </div>
                <h4 className="mt-3 font-display text-sm font-bold text-slate-900">Zero Cost Creep</h4>
                <p className="mt-1 text-xs text-slate-600 leading-normal">
                  Locked square-foot contracts with transparent material itemization from day one.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-[#FAFAF8] p-5 transition-colors hover:border-[#CE1C73]/50">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#CE1C73]/15 text-[#CE1C73]">
                  <Sparkles size={20} />
                </div>
                <h4 className="mt-3 font-display text-sm font-bold text-slate-900">Modern Vastu Synergy</h4>
                <p className="mt-1 text-xs text-slate-600 leading-normal">
                  Contemporary spatial luxury harmonious with traditional solar and directional energy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
