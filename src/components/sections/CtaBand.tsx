import { ArrowRight, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import ctaFullBg from '@/assets/cta/cta-fullwidth-engineer-customer.jpg'
import { Container } from '@/components/ui'
import { contact } from '@/content'

export function CtaBand() {
  return (
    <section className="relative isolate overflow-hidden border-y border-slate-200 py-20 sm:py-28 lg:py-36">
      {/* Full-width background image with engineer and customer on the right side */}
      <Image
        src={ctaFullBg}
        alt="Sneha Construction civil engineer and Tumakuru homeowner reviewing house plans together on an active residential construction site"
        fill
        sizes="100vw"
        placeholder="blur"
        className="object-cover object-[78%_center] lg:object-center"
      />

      {/* Directional scrim:
          - Solid white on the left for crisp, high-contrast typography
          - Smoothly fades out towards the right so the engineer, customer, and site stay in full, vivid view */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.88)_60%,rgba(255,255,255,0.45)_100%)] lg:bg-[linear-gradient(90deg,#ffffff_0%,rgba(255,255,255,0.98)_34%,rgba(255,255,255,0.85)_48%,rgba(255,255,255,0.25)_66%,rgba(255,255,255,0)_82%)]"
      />

      <Container className="relative z-10">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          {/* Left: Headline, Value Proposition, Action Buttons */}
          <div className="max-w-2xl text-slate-900">
            <div className="inline-flex items-center gap-2 font-secondary text-xs font-bold tracking-[0.16em] text-[#CE1C73] uppercase sm:text-[0.8125rem]">
              <span aria-hidden="true" className="inline-block h-2 w-2 rounded-[2px] bg-[#CE1C73]" />
              CONTACT US TODAY!
            </div>

            <h2 className="mt-4 font-display text-[1.625rem] leading-[1.18] font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
              Partner with us to design and build{' '}
              <span className="font-playfair italic">the home you envision</span>
            </h2>

            <p className="mt-4 text-[0.9375rem] leading-relaxed text-slate-600 sm:mt-6 sm:text-lg">
              Whether you own a plot ready for construction or need an initial architectural
              feasibility study, our engineers in Tumkur are ready to consult with you today.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-5">
              {/* Direct Phone Call Button */}
              <a
                href={contact.phoneHref}
                className="group inline-flex items-center gap-3 rounded-full border border-slate-300 bg-white/95 px-6 py-3 text-sm font-bold text-slate-800 shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-[#CE1C73] hover:text-[#CE1C73]"
              >
                <Phone size={18} className="text-[#CE1C73] transition-colors" />
                <span>Call Us: {contact.phoneDisplay}</span>
              </a>

              {/* Signature Magenta CTA Button */}
              <Link
                href="/contact"
                className="group inline-flex items-center rounded-full bg-[#CE1C73] py-1.5 pr-2 pl-6 text-[0.9375rem] font-bold text-white shadow-xl shadow-[#CE1C73]/25 transition-all duration-200 hover:bg-[#B81564]"
              >
                <span>Get Free Consultation</span>
                <span className="ml-3.5 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#CE1C73] transition-transform duration-200 group-hover:translate-x-1">
                  <ArrowRight size={16} strokeWidth={2.5} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
