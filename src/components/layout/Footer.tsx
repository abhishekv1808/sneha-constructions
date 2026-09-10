'use client'

import {
  ArrowUp,
  Building2,
  Clock,
  Compass,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
} from 'lucide-react'
import Link from 'next/link'

import { Logo } from '@/components/layout/Logo'
import { Container } from '@/components/ui'
import { contact, legalLinks, site, whatsappUrl } from '@/content'

const PILLARS = [
  {
    icon: Building2,
    title: '25+ Years in Tumkur',
    desc: 'Over 100+ turnkey residential & commercial landmarks delivered with structural precision.',
  },
  {
    icon: Compass,
    title: '100% Vastu Compliance',
    desc: 'Architectural planning aligned with authentic Vastu Shastra principles for harmony and peace.',
  },
  {
    icon: ShieldCheck,
    title: 'Locked Turnkey Pricing',
    desc: 'Transparent itemized BOQ with 0% hidden cost escalations from foundation to final key.',
  },
]

export function Footer() {
  const year = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-slate-950 text-slate-400 border-t border-slate-800/80">
      {/* 1. Refined Architectural Value Strip */}
      <div className="border-b border-slate-800/60 bg-slate-900/30">
        <Container className="py-8 lg:py-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/60">
            {PILLARS.map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={idx}
                  className={`flex items-start gap-4 ${idx !== 0 ? 'pt-6 sm:pt-0 sm:pl-8' : ''}`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 text-[#CE1C73] ring-1 ring-white/10">
                    <Icon size={20} strokeWidth={1.75} />
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-semibold text-slate-200">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </Container>
      </div>

      {/* 2. Main Footer Navigation & Details */}
      <Container className="pt-14 pb-12 lg:pt-16 lg:pb-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Column 1: Brand & Positioning (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Logo tone="dark" />

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Tumkur&apos;s premier design-and-build firm delivering turnkey duplex residences, modern villas, and commercial complexes with structural mastery and timeless craftsmanship.
            </p>

            <div className="pt-1 flex flex-col gap-2.5 text-xs">
              <a
                href={contact.phoneHref}
                className="inline-flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors"
              >
                <Phone size={14} className="text-[#CE1C73]" />
                <span className="font-medium">{contact.phoneDisplay}</span>
              </a>

              <a
                href={contact.emailHref}
                className="inline-flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors"
              >
                <Mail size={14} className="text-[#CE1C73]" />
                <span>{contact.email}</span>
              </a>

              <a
                href={whatsappUrl(`Hi ${site.shortName}, I would like to consult about construction for my plot in Tumkur.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <MessageCircle size={14} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Column 2: Construction Services (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-secondary text-xs font-bold tracking-[0.16em] uppercase text-slate-200">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/services/residential"
                  className="text-slate-400 hover:text-white transition-colors block"
                >
                  Residential Duplexes &amp; Villas
                </Link>
              </li>
              <li>
                <Link
                  href="/services/commercial"
                  className="text-slate-400 hover:text-white transition-colors block"
                >
                  Commercial Complexes &amp; Plazas
                </Link>
              </li>
              <li>
                <Link
                  href="/services/turnkey"
                  className="text-slate-400 hover:text-white transition-colors block"
                >
                  Turnkey Construction
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-slate-400 hover:text-white transition-colors block"
                >
                  3D Architectural Design &amp; Plans
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-slate-400 hover:text-white transition-colors block"
                >
                  Structural Engineering
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Planning Tools & Company (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-secondary text-xs font-bold tracking-[0.16em] uppercase text-slate-200">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/estimate#cost-calculator"
                  className="text-slate-400 hover:text-white transition-colors block"
                >
                  Cost Estimator
                </Link>
              </li>
              <li>
                <Link
                  href="/estimate#vastu-advisor"
                  className="text-slate-400 hover:text-white transition-colors block"
                >
                  Vastu Advisor
                </Link>
              </li>
              <li>
                <Link
                  href="/estimate#loan-calculator"
                  className="text-slate-400 hover:text-white transition-colors block"
                >
                  Loan Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-slate-400 hover:text-white transition-colors block"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-400 hover:text-white transition-colors block"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Office & Timings (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-secondary text-xs font-bold tracking-[0.16em] uppercase text-slate-200">
              Head Office
            </h4>

            <div className="space-y-3 text-xs leading-relaxed">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-[#CE1C73] shrink-0 mt-0.5" />
                <address className="not-italic text-slate-400">
                  {contact.address.lines.map((line, idx) => (
                    <div key={idx}>{line}</div>
                  ))}
                </address>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <Clock size={16} className="text-[#CE1C73] shrink-0 mt-0.5" />
                <div className="text-slate-400">
                  <div>Mon – Sat: 9:00 AM – 9:00 PM</div>
                  <div className="text-slate-500">Sunday: By Prior Appointment</div>
                </div>
              </div>

              <p className="pt-2 text-slate-500 text-[11px] border-t border-slate-800/80">
                Serving Tumkur, Gubbi, Kunigal, Sira, and Tiptur regions.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Bottom Legal Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-slate-400 hover:text-slate-200 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </Container>
    </footer>
  )
}
