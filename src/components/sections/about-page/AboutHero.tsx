import { ChevronRight, Home } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import aboutPageHero from '@/assets/about/about-page-hero.jpg'
import { Container } from '@/components/ui'

export function AboutHero() {
  return (
    <section className="relative isolate overflow-hidden bg-slate-50 pt-32 pb-24 sm:pt-40 sm:pb-32 text-slate-900 border-b border-slate-200">
      {/* Background Architectural Image */}
      <Image
        src={aboutPageHero}
        alt="Sneha Construction architectural studio and villa blueprints"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-10"
      />

      {/* Atmospheric Light Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/90 to-slate-50/75" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#CE1C73]/5 via-transparent to-transparent" />

      <Container className="relative z-10">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
          <Link href="/" className="inline-flex items-center gap-1.5 transition-colors hover:text-[#CE1C73]">
            <Home size={14} className="text-[#CE1C73]" />
            <span>Home</span>
          </Link>
          <ChevronRight size={14} className="text-slate-400" />
          <span className="text-[#CE1C73]">About Us</span>
        </nav>

        <div className="mt-8 max-w-3xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 font-secondary text-xs sm:text-[0.8125rem] font-bold tracking-[0.18em] text-[#CE1C73] uppercase">
            <span
              aria-hidden="true"
              className="inline-block h-2 w-2 rounded-[2px] bg-[#CE1C73]"
            />
            25+ YEARS OF STRUCTURAL MASTERY IN TUMKUR
          </div>

          {/* Display Headline */}
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.14] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.5rem]">
            Building Legacies, Crafting Architectural Landmarks
          </h1>

          {/* Lead Narrative */}
          <p className="mt-6 font-sans text-base leading-relaxed text-slate-600 sm:text-lg sm:leading-relaxed">
            Since 1999, Sneha Construction &amp; Developers has shaped Tumkur’s residential landscape.
            We unite visionary 3D architectural design with rigorous civil engineering, fixed-cost
            turnkey agreements, and traditional Vastu harmony.
          </p>

          {/* Floating Key Metrics Strip */}
          <div className="mt-10 grid grid-cols-2 gap-4 border-t border-slate-200 pt-8 sm:grid-cols-3 sm:gap-8">
            <div>
              <p className="font-display text-3xl font-extrabold text-[#CE1C73] sm:text-4xl">1999</p>
              <p className="mt-1 text-xs text-slate-500 font-medium">Founded in Tumkur, KA</p>
            </div>
            <div>
              <p className="font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">250+</p>
              <p className="mt-1 text-xs text-slate-500 font-medium">Turnkey Residences Delivered</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">100%</p>
              <p className="mt-1 text-xs text-slate-500 font-medium">On-Site Civil Supervision</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
