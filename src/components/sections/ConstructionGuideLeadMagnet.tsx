'use client'

import React, { useState, useRef } from 'react'
import {
  BookOpen,
  Download,
  FileCheck,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Compass,
  FileText,
  MessageCircle,
  Clock,
} from 'lucide-react'

import { Container } from '@/components/ui'
import { contact, site, whatsappUrl } from '@/content'
import { recordLeadConversion } from '@/lib/analytics'

export function ConstructionGuideLeadMagnet() {
  const loadedAtRef = useRef<number>(Date.now())
  const [userName, setUserName] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [timeline, setTimeline] = useState('Within 3 months')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleDownloadGuide = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    if (!userName.trim()) {
      setErrorMessage('Please enter your full name.')
      return
    }

    const cleanPhone = userPhone.replace(/\D/g, '')
    if (cleanPhone.length !== 10 || !/^[6-9]/.test(cleanPhone)) {
      setErrorMessage('Please enter a valid 10-digit Indian mobile number.')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: userName.trim(),
          phone: cleanPhone,
          serviceType: 'General enquiry',
          source: '2025-2026 Construction Guide Lead Magnet',
          pagePath: typeof window !== 'undefined' ? window.location.pathname : '/',
          message: `Requested Free Tumkur Construction Guide 2025-2026. Construction timeline: ${timeline}.`,
          loadedAt: loadedAtRef.current || Date.now() - 3000,
          honeypot: '',
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.error || 'Failed to submit request. Please try again.')
      }

      recordLeadConversion('2025-2026 Construction Guide Lead Magnet')
      setIsSuccess(true)

      // WhatsApp delivery trigger
      const waMsg = `Hi ${site.shortName}, I just requested the "2025-2026 Tumkur Home Construction & Vastu Guide" on your website. Please send the PDF copy to my WhatsApp.\n\nName: ${userName.trim()}\nTimeline: ${timeline}`
      window.open(whatsappUrl(waMsg), '_blank', 'noopener,noreferrer')
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : 'Something went wrong. Please check your network.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative bg-gradient-to-b from-white via-slate-50 to-white py-14 sm:py-20 lg:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-[#031424] p-5 text-white shadow-2xl sm:rounded-[32px] sm:p-12 lg:p-16">
          {/* Radial ambient background lighting */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-20 -right-20 h-96 w-96 rounded-full bg-[#CE1C73]/20 blur-[120px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-blue-600/15 blur-[100px]"
          />

          <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
            {/* Left Column: Guide Teaser & Chapters (7 cols) */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1 text-xs font-bold tracking-wider text-[#CE1C73] uppercase backdrop-blur-sm">
                <BookOpen size={14} />
                <span>Free 28-Page Homeowner Field Manual</span>
              </div>

              <h2 className="mt-4 font-display text-[1.625rem] leading-tight font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Planning to Build in Tumkur?{' '}
                <span className="bg-gradient-to-r from-[#CE1C73] to-pink-400 bg-clip-text text-transparent">
                  Read This First.
                </span>
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                Before you hire an architect or sign a contractor agreement, download our
                comprehensive handbook. Written by practicing Tumkur civil engineers with 25+ years
                of local execution experience.
              </p>

              {/* 4 Core Chapters Grid */}
              <div className="mt-6 grid grid-cols-1 gap-2.5 sm:mt-8 sm:grid-cols-2 sm:gap-3">
                <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm">
                  <FileCheck size={18} className="mt-0.5 shrink-0 text-[#CE1C73]" />
                  <div>
                    <h4 className="text-xs font-bold text-white">TCC &amp; Panchayat Sanction</h4>
                    <p className="mt-0.5 text-xs text-slate-400">
                      A-Khata vs B-Khata rules, setback requirements, and rainwater harvesting laws.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm">
                  <ShieldCheck size={18} className="mt-0.5 shrink-0 text-[#CE1C73]" />
                  <div>
                    <h4 className="text-xs font-bold text-white">2025 Material Price Index</h4>
                    <p className="mt-0.5 text-xs text-slate-400">
                      Real landed costs in Tumkur for Tata Tiscon steel, Ultratech cement &amp;
                      M-sand.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm">
                  <Compass size={18} className="mt-0.5 shrink-0 text-[#CE1C73]" />
                  <div>
                    <h4 className="text-xs font-bold text-white">Room-by-Room Vastu Rules</h4>
                    <p className="mt-0.5 text-xs text-slate-400">
                      Cardinal alignments for Kitchen (Agneya), Master Bed (Nairutya), and Main
                      Entry.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm">
                  <Sparkles size={18} className="mt-0.5 shrink-0 text-[#CE1C73]" />
                  <div>
                    <h4 className="text-xs font-bold text-white">7 Turnkey Contract Red Flags</h4>
                    <p className="mt-0.5 text-xs text-slate-400">
                      How to prevent cost overruns, clause loopholes, and brand substitutions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Lead Form Card (5 cols) */}
            <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-md sm:p-8 lg:col-span-5">
              {isSuccess ? (
                <div className="py-6 text-center">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">
                    Guide Sent to WhatsApp!
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300">
                    Thank you, <strong>{userName}</strong>. We have dispatched your copy of the
                    28-page PDF guide directly to your WhatsApp number.
                  </p>
                  <p className="mt-4 text-xs text-slate-400">
                    Need an immediate conversation with our chief engineer? Call{' '}
                    <a href={contact.phoneHref} className="font-bold text-white underline">
                      {contact.phoneDisplay}
                    </a>
                  </p>
                </div>
              ) : (
                <form onSubmit={handleDownloadGuide} className="space-y-4">
                  <div>
                    <span className="text-[0.6875rem] font-black tracking-wider text-[#CE1C73] uppercase">
                      Instant WhatsApp Delivery
                    </span>
                    <h3 className="font-display text-xl font-bold text-white">
                      Download Your Free Copy
                    </h3>
                    <p className="text-xs text-slate-300">
                      Enter your mobile number to receive the PDF immediately.
                    </p>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-bold tracking-wider text-slate-200 uppercase">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="e.g. Shivakumar N."
                      required
                      className="w-full rounded-xl border border-white/20 bg-white/10 px-3.5 py-2.5 text-xs text-white placeholder:text-slate-400 focus:border-[#CE1C73] focus:bg-white/15 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-bold tracking-wider text-slate-200 uppercase">
                      WhatsApp / Mobile Number *
                    </label>
                    <div className="relative">
                      <span className="absolute top-2.5 left-3.5 text-xs font-bold text-slate-400">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="98765 43210"
                        required
                        className="w-full rounded-xl border border-white/20 bg-white/10 py-2.5 pr-3.5 pl-12 text-xs font-medium text-white placeholder:text-slate-400 focus:border-[#CE1C73] focus:bg-white/15 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-bold tracking-wider text-slate-200 uppercase">
                      When Are You Planning to Build?
                    </label>
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full rounded-xl border border-white/20 bg-slate-900 px-3.5 py-2.5 text-xs text-white focus:border-[#CE1C73] focus:outline-hidden"
                    >
                      <option value="Immediately (Within 1 month)">
                        Immediately (Within 1 month)
                      </option>
                      <option value="Within 3 months">Within 3 months</option>
                      <option value="Within 6 months">Within 6 months</option>
                      <option value="Currently exploring / Just bought plot">
                        Currently exploring / Just bought plot
                      </option>
                    </select>
                  </div>

                  {errorMessage && (
                    <p className="text-xs font-semibold text-rose-400">{errorMessage}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#CE1C73] py-3 text-xs font-bold text-white shadow-lg shadow-[#CE1C73]/40 transition-all hover:bg-[#B81564] disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Generating Your PDF...
                      </span>
                    ) : (
                      <>
                        <Download size={14} />
                        <span>Send Free PDF Guide to WhatsApp</span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-[0.6875rem] text-slate-400">
                    🔒 Zero spam. We never share your phone number with 3rd-party vendors.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
