import { ArrowRight, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import ctaBg from '@/assets/hero/hero-bg.jpg'
import { Container } from '@/components/ui'
import { contact } from '@/content'

export function CtaBand() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-r from-slate-50 via-white to-pink-50/40 py-24 sm:py-28 border-y border-slate-200">
      {/* Background Image with subtle light opacity */}
      <Image
        src={ctaBg}
        alt="Architectural residential build background"
        fill
        sizes="100vw"
        className="object-cover object-center opacity-10"
      />

      {/* Light Scrim */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/90 to-white/85" />

      <Container className="relative z-10">
        <div className="max-w-3xl text-slate-900">
          <div className="inline-flex items-center gap-2 font-secondary text-xs sm:text-[0.8125rem] font-bold tracking-[0.16em] text-[#CE1C73] uppercase">
            <span
              aria-hidden="true"
              className="inline-block h-2 w-2 rounded-[2px] bg-[#CE1C73]"
            />
            CONTACT US TODAY!
          </div>

          <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.18] tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
            Partner with us to design and build{' '}
            <span className="font-playfair italic">the home you envision</span>
          </h2>

          <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg">
            Whether you own a plot ready for construction or need an initial architectural
            feasibility study, our engineers in Tumkur are ready to consult with you today.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-5 sm:gap-7">
            {/* Direct Phone Call Button */}
            <a
              href={contact.phoneHref}
              className="group inline-flex items-center gap-3 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-800 shadow-sm transition-all duration-200 hover:border-[#CE1C73] hover:text-[#CE1C73]"
            >
              <Phone size={18} className="text-[#CE1C73] transition-colors" />
              <span>Call Us: {contact.phoneDisplay}</span>
            </a>

            {/* Signature Magenta CTA Button */}
            <Link
              href="/contact"
              className="group inline-flex items-center rounded-full bg-[#CE1C73] pl-6 pr-2 py-1.5 text-[0.9375rem] font-bold text-white shadow-xl shadow-[#CE1C73]/25 transition-all duration-200 hover:bg-[#B81564]"
            >
              <span>Get Free Consultation</span>
              <span className="ml-3.5 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#CE1C73] transition-transform duration-200 group-hover:translate-x-1">
                <ArrowRight size={16} strokeWidth={2.5} />
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
