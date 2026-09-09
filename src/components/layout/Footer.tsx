'use client'

import React, { useState } from 'react'
import {
  ArrowRight,
  ArrowUp,
  Award,
  CheckCircle2,
  Clock,
  Compass,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Calculator,
  Building2,
} from 'lucide-react'
import Link from 'next/link'

import { Logo } from '@/components/layout/Logo'
import { Container } from '@/components/ui'
import { useQuoteModal } from '@/components/providers/QuoteModalProvider'
import { contact, legalLinks, materials, site, whatsappUrl } from '@/content'

const SERVICE_LOCALITIES = [
  'Vinobanagar',
  'SS Puram',
  'Batawadi',
  'Kyatsandra',
  'Siddaganga Layout',
  'Shettihalli',
  'Melekote',
  'Gubbi',
  'Kunigal',
  'Sira',
]

const TRUST_PILLARS = [
  {
    icon: ShieldCheck,
    title: 'Tata Tiscon & UltraTech',
    desc: 'Certified Grade-A materials with batch testing',
  },
  {
    icon: Compass,
    title: '100% Vastu Shastra',
    desc: 'Cosmic balance verified by civil architects',
  },
  {
    icon: Award,
    title: '0% Price Escalation',
    desc: 'Locked turnkey contracts with itemized BOQ',
  },
  {
    icon: Building2,
    title: '25+ Years in Tumkur',
    desc: 'Over 100 landmark residential & commercial builds',
  },
]

export function Footer() {
  const { openQuoteModal } = useQuoteModal()
  const year = new Date().getFullYear()

  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (newsletterEmail.trim()) {
      setSubscribed(true)
      setTimeout(() => setSubscribed(false), 4000)
      setNewsletterEmail('')
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative isolate overflow-hidden bg-[#0B0F19] text-slate-400">
      {/* Ambient Top Glow & Border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#CE1C73]/60 to-transparent" />
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-80 w-[600px] rounded-full bg-[#CE1C73]/10 blur-3xl" />

      {/* 1. Pre-Footer Trust & Quick-Action Strip */}
      <div className="border-b border-white/10 bg-white/[0.02]">
        <Container className="py-10 lg:py-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon
              return (
                <div key={idx} className="flex items-start gap-3.5 group">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-[#FF65A8] ring-1 ring-white/10 transition-all duration-300 group-hover:scale-105 group-hover:bg-[#CE1C73] group-hover:text-white group-hover:ring-[#CE1C73]">
                    <Icon size={20} strokeWidth={2.2} />
                  </span>
                  <div>
                    <h4 className="font-display text-sm font-bold text-white tracking-wide">
                      {pillar.title}
                    </h4>
                    <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Action Row inside Pre-Footer */}
          <div className="mt-10 flex flex-col items-center justify-between gap-6 rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.04] to-white/[0.01] p-6 backdrop-blur-sm sm:flex-row sm:p-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#FF65A8] uppercase">
                <Sparkles size={14} />
                <span>READY TO BUILD YOUR DREAM HOME?</span>
              </div>
              <h3 className="mt-1 font-display text-xl font-bold text-white sm:text-2xl">
                Consult with Senior Civil Engineers in Tumkur Today
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                Turnkey residential construction starting at ₹1,875/sq.ft · Free 3D plan &amp; soil feasibility inspection
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={whatsappUrl(`Hi ${site.shortName}, I would like to consult about construction for my plot in Tumkur.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-5 py-3 text-xs font-bold text-emerald-400 transition-all hover:bg-emerald-500 hover:text-white hover:shadow-lg hover:shadow-emerald-500/20"
              >
                <MessageCircle size={16} />
                <span>WhatsApp Us</span>
              </a>

              <button
                type="button"
                onClick={() => openQuoteModal({ source: 'Footer Pre-Banner' })}
                className="group flex items-center rounded-full bg-[#CE1C73] pl-5 pr-2 py-1.5 text-xs font-bold text-white shadow-lg shadow-[#CE1C73]/25 transition-all hover:bg-[#B81564]"
              >
                <span>Get Free Estimate</span>
                <span className="ml-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#CE1C73] transition-transform duration-200 group-hover:translate-x-0.5">
                  <ArrowRight size={14} strokeWidth={2.5} />
                </span>
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* 2. Main Footer Body */}
      <Container className="pt-16 pb-16 lg:pt-20 lg:pb-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Column 1: Brand & Live Working Hours (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Logo tone="dark" />

            <p className="max-w-[34ch] text-sm text-slate-300 leading-relaxed">
              {site.positioning} Over two decades of delivering landmark duplexes, contemporary residences, and commercial complexes with seismic engineering integrity.
            </p>

            {/* Live Working Hours Card with Green Beacon */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-display text-xs font-bold text-white uppercase tracking-wider">
                  <Clock size={15} className="text-[#FF65A8]" />
                  <span>Working Hours</span>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-bold text-emerald-400 ring-1 ring-emerald-500/30">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Open Mon – Sat
                </span>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Monday – Saturday:</span>
                  <span className="font-semibold text-white">9:00 AM – 9:00 PM</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Sunday:</span>
                  <span className="text-slate-300">By Prior Appointment</span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Base Turnkey Rate:</span>
                <span className="font-bold text-[#FF65A8]">₹1,875 / sq.ft. (Locked)</span>
              </div>
            </div>

            {/* Direct Phone & Email Fast Chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href={contact.phoneHref}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-slate-200 transition-colors hover:border-[#CE1C73] hover:text-white hover:bg-white/10"
              >
                <Phone size={13} className="text-[#FF65A8]" />
                <span>{contact.phoneDisplay}</span>
              </a>

              <a
                href={contact.emailHref}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-slate-200 transition-colors hover:border-[#CE1C73] hover:text-white hover:bg-white/10"
              >
                <Mail size={13} className="text-[#FF65A8]" />
                <span>{contact.email}</span>
              </a>
            </div>
          </div>

          {/* Column 2: Planning Tools & Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider">
                Planning Tools
              </h3>
              <div className="mt-2 h-0.5 w-8 bg-[#CE1C73]" />
            </div>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/estimate#cost-calculator"
                  className="group flex items-center gap-2 text-slate-300 transition-colors hover:text-[#FF65A8]"
                >
                  <Calculator size={15} className="text-[#FF65A8] transition-transform group-hover:scale-110" />
                  <span>Plot Cost Estimator (30×40, 40×60)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/estimate#vastu-advisor"
                  className="group flex items-center gap-2 text-slate-300 transition-colors hover:text-[#FF65A8]"
                >
                  <Compass size={15} className="text-[#FF65A8] transition-transform group-hover:scale-110" />
                  <span>8-Direction Vastu Advisor</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/estimate#loan-calculator"
                  className="group flex items-center gap-2 text-slate-300 transition-colors hover:text-[#FF65A8]"
                >
                  <Building2 size={15} className="text-[#FF65A8] transition-transform group-hover:scale-110" />
                  <span>Bank Construction Loan &amp; EMI</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="flex items-center gap-2 text-slate-300 transition-colors hover:text-[#FF65A8]"
                >
                  <span className="text-[#FF65A8] font-bold">›</span>
                  <span>Completed Projects Gallery</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="flex items-center gap-2 text-slate-300 transition-colors hover:text-[#FF65A8]"
                >
                  <span className="text-[#FF65A8] font-bold">›</span>
                  <span>Our 25-Year Civil Legacy</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="flex items-center gap-2 text-slate-300 transition-colors hover:text-[#FF65A8]"
                >
                  <span className="text-[#FF65A8] font-bold">›</span>
                  <span>Book Free Site Inspection</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services & Material Standards (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider">
                Services &amp; Build
              </h3>
              <div className="mt-2 h-0.5 w-8 bg-[#CE1C73]" />
            </div>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/services/residential"
                  className="text-slate-300 transition-colors hover:text-[#FF65A8] block"
                >
                  Residential Duplexes
                </Link>
              </li>
              <li>
                <Link
                  href="/services/commercial"
                  className="text-slate-300 transition-colors hover:text-[#FF65A8] block"
                >
                  Commercial Plazas
                </Link>
              </li>
              <li>
                <Link
                  href="/services/turnkey"
                  className="text-slate-300 transition-colors hover:text-[#FF65A8] block"
                >
                  Turnkey Construction
                </Link>
              </li>
              {materials.slice(0, 3).map((material) => (
                <li key={material.slug}>
                  <Link
                    href={`/materials/${material.slug}`}
                    className="text-slate-400 transition-colors hover:text-[#FF65A8] block text-xs"
                  >
                    {material.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Tumkur Localities & Rate Alerts (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider">
                Head Office &amp; Localities
              </h3>
              <div className="mt-2 h-0.5 w-8 bg-[#CE1C73]" />
            </div>

            <address className="not-italic text-xs text-slate-300 space-y-2.5 leading-relaxed">
              <p className="flex items-start gap-2.5">
                <MapPin size={17} className="shrink-0 text-[#FF65A8] mt-0.5" />
                <span>
                  {contact.address.lines.join(', ')}
                </span>
              </p>
            </address>

            {/* Tumkur Service Hub Localities */}
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Service Hubs in Tumkur:
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {SERVICE_LOCALITIES.map((loc) => (
                  <span
                    key={loc}
                    className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-slate-300"
                  >
                    {loc}
                  </span>
                ))}
              </div>
            </div>

            {/* Tumkur Construction Rate Alert Newsletter */}
            <div className="pt-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Monthly Tumkur Rate Bulletin
              </p>
              <p className="mt-1 text-[11px] text-slate-400">
                Receive monthly steel, cement &amp; labor rate trends in Tumkur.
              </p>
              <form onSubmit={handleSubscribe} className="mt-2.5">
                <div className="relative flex items-center rounded-full border border-white/20 bg-white/[0.04] p-1 transition-all focus-within:border-[#CE1C73] focus-within:ring-1 focus-within:ring-[#CE1C73]">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-transparent px-3.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to rate alerts"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#CE1C73] text-white shadow-md transition-transform hover:scale-105"
                  >
                    <ArrowRight size={14} strokeWidth={2.5} />
                  </button>
                </div>
                {subscribed && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-emerald-400 animate-in fade-in">
                    <CheckCircle2 size={12} />
                    <span>Subscribed! You will receive monthly rate updates.</span>
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* 3. Bottom Legal, RERA & Back-To-Top Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 text-xs text-slate-400 sm:flex-row">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <p className="text-slate-300">
              © {year} {site.name}. All Rights Reserved.
            </p>
            <p className="text-[11px] text-slate-400">
              Civil engineering, structural design, and turnkey architecture in Tumkur, Karnataka.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <ul className="flex flex-wrap gap-5 text-xs">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-400 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Back to top button */}
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-slate-300 shadow-md transition-all hover:border-[#CE1C73] hover:bg-[#CE1C73] hover:text-white hover:scale-105"
            >
              <ArrowUp size={16} strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </Container>
    </footer>
  )
}
