'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Calendar,
  CheckCircle2,
  ChevronRight,
  FileText,
  HelpCircle,
  Mail,
  MapPin,
  Phone,
  Printer,
  ShieldCheck,
} from 'lucide-react'

import { Container } from '@/components/ui'
import { contact, site } from '@/content'

export interface TocItem {
  id: string
  title: string
}

interface LegalPageShellProps {
  title: string
  badge: string
  effectiveDate: string
  lastUpdated: string
  lead: string
  tocItems: TocItem[]
  alternateLegalLink: {
    label: string
    href: string
  }
  children: React.ReactNode
}

export function LegalPageShell({
  title,
  badge,
  effectiveDate,
  lastUpdated,
  lead,
  tocItems,
  alternateLegalLink,
  children,
}: LegalPageShellProps) {
  const [activeId, setActiveId] = useState<string>(tocItems[0]?.id || '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the top-most visible entry
        const visibleEntries = entries.filter((e) => e.isIntersecting)
        const first = visibleEntries[0]
        if (first) {
          setActiveId(first.target.id)
        }
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: [0, 0.1],
      },
    )

    tocItems.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [tocItems])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const target = document.getElementById(id)
    if (target) {
      const offset = 100 // Header offset
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = target.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
      setActiveId(id)
    }
  }

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print()
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 1. Masthead Header */}
      <header className="border-b border-slate-200 bg-white pt-28 pb-12 sm:pt-32 sm:pb-16 lg:pt-36">
        <Container>
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-slate-500 sm:text-sm">
              <li>
                <Link href="/" className="transition-colors hover:text-slate-900">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-slate-400">
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li>
                <span className="text-slate-500">Legal</span>
              </li>
              <li aria-hidden="true" className="text-slate-400">
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li aria-current="page" className="font-semibold text-[#CE1C73]">
                {title}
              </li>
            </ol>
          </nav>

          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#CE1C73]/20 bg-[#FDF2F8] px-3.5 py-1 text-xs font-semibold tracking-wide text-[#CE1C73] uppercase">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>{badge}</span>
          </div>

          {/* Document Title */}
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            {title}
          </h1>

          {/* Lead Standfirst */}
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {lead}
          </p>

          {/* Metadata Badges & Print Action */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-6">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-600 sm:text-sm">
              <div className="flex items-center gap-1.5 font-medium text-slate-700">
                <Calendar className="h-4 w-4 text-slate-400" />
                <span>Effective: {effectiveDate}</span>
              </div>
              <span className="hidden sm:inline text-slate-300">•</span>
              <div className="flex items-center gap-1.5 text-slate-500">
                <span>Last reviewed: {lastUpdated}</span>
              </div>
              <span className="hidden sm:inline text-slate-300">•</span>
              <div className="flex items-center gap-1.5 text-slate-500">
                <MapPin className="h-3.5 w-3.5 text-slate-400" />
                <span>Tumkur, Karnataka, India</span>
              </div>
            </div>

            <button
              onClick={handlePrint}
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#CE1C73]/20 print:hidden"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </Container>
      </header>

      {/* 2. Main Content Layout */}
      <div className="py-12 sm:py-16">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
            {/* Left Sidebar: Sticky Table of Contents & Quick Support */}
            <aside className="lg:col-span-4 print:hidden">
              <div className="sticky top-28 space-y-6">
                {/* Table of Contents card */}
                <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <FileText className="h-4 w-4 text-[#CE1C73]" />
                    <h2 className="font-display text-sm font-bold tracking-wide text-slate-900 uppercase">
                      Table of Contents
                    </h2>
                  </div>

                  <nav aria-label="Table of contents" className="mt-3 max-h-[55vh] overflow-y-auto pr-1">
                    <ol className="space-y-1 text-sm">
                      {tocItems.map((item, idx) => {
                        const isActive = activeId === item.id
                        return (
                          <li key={item.id}>
                            <a
                              href={`#${item.id}`}
                              onClick={(e) => scrollToSection(e, item.id)}
                              className={`group flex items-start gap-2.5 rounded-lg px-2.5 py-1.5 transition-colors ${
                                isActive
                                  ? 'bg-[#FDF2F8] font-semibold text-[#CE1C73]'
                                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                              }`}
                            >
                              <span
                                className={`mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded text-[10px] font-bold ${
                                  isActive
                                    ? 'bg-[#CE1C73] text-white'
                                    : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                                }`}
                              >
                                {idx + 1}
                              </span>
                              <span className="leading-snug">{item.title}</span>
                            </a>
                          </li>
                        )
                      })}
                    </ol>
                  </nav>
                </div>

                {/* Related Legal Link */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="font-display text-xs font-bold tracking-wider text-slate-400 uppercase">
                    Related Document
                  </h3>
                  <Link
                    href={alternateLegalLink.href}
                    className="mt-2 group flex items-center justify-between font-semibold text-slate-800 hover:text-[#CE1C73] transition-colors"
                  >
                    <span>{alternateLegalLink.label}</span>
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>

                {/* Official Legal & Grievance Contact Card */}
                <div className="rounded-2xl border border-slate-200/90 bg-slate-900 p-5 text-white shadow-sm">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-[#F472B6]" />
                    <h3 className="text-sm font-semibold text-white">Need Legal Clarification?</h3>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300">
                    Questions about our policies, contracts, or your data rights? Reach out directly to our management in Tumkur.
                  </p>
                  <div className="mt-4 space-y-2 text-xs">
                    <a
                      href={contact.phoneHref}
                      className="flex items-center gap-2 text-slate-200 transition-colors hover:text-[#F472B6]"
                    >
                      <Phone className="h-3.5 w-3.5 text-[#F472B6]" />
                      <span>{contact.phoneDisplay}</span>
                    </a>
                    <a
                      href={contact.emailHref}
                      className="flex items-center gap-2 text-slate-200 transition-colors hover:text-[#F472B6]"
                    >
                      <Mail className="h-3.5 w-3.5 text-[#F472B6]" />
                      <span>{contact.email}</span>
                    </a>
                    <div className="flex items-start gap-2 text-slate-400 pt-1 border-t border-slate-800">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-500 mt-0.5" />
                      <span>{contact.address.locality}, {contact.address.region} – {contact.address.postalCode}</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Right Column: Legal Clauses Content */}
            <main className="lg:col-span-8">
              <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 lg:p-12 shadow-sm prose-slate max-w-none">
                {children}

                {/* Closing Formal Assurance Sign-off */}
                <div className="mt-16 border-t border-slate-200 pt-8">
                  <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-5 border border-slate-200/80">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="text-sm text-slate-600">
                      <p className="font-semibold text-slate-900">
                        {site.name} — Corporate Transparency Commitment
                      </p>
                      <p className="mt-1 leading-relaxed text-xs sm:text-sm">
                        As a licensed civil construction and contracting firm headquartered in Tumkur, Karnataka, we uphold ethical engineering standards, transparent billing, and strict adherence to the laws of the Republic of India.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </Container>
      </div>
    </div>
  )
}
