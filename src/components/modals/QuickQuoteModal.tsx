'use client'

import React, { useEffect, useState, useRef } from 'react'
import {
  X,
  CheckCircle2,
  Phone,
  ArrowRight,
  ArrowLeft,
  Building2,
  Home,
  Briefcase,
  Sparkles,
  MapPin,
  Clock,
  MessageCircle,
  Loader2,
} from 'lucide-react'
import { useQuoteModal } from '@/components/providers/QuoteModalProvider'
import { contact, site, whatsappUrl } from '@/content'

const PROJECT_TYPES = [
  { id: 'Duplex Villa', label: 'Duplex Villa', icon: Home, desc: 'G+1 modern architectural home' },
  { id: 'Independent House', label: 'Family Home', icon: Building2, desc: 'Single or multi-generation residence' },
  { id: 'Commercial', label: 'Commercial Plaza', icon: Briefcase, desc: 'Shops, offices, clinics or rentals' },
  { id: 'Turnkey', label: 'Turnkey Package', icon: Sparkles, desc: 'Complete end-to-end design & build' },
]

const PLOT_OPTIONS = [
  { label: '30 × 40', area: '1,200 – 2,400 sq ft' },
  { label: '30 × 50', area: '1,500 – 3,000 sq ft' },
  { label: '40 × 60', area: '2,400 – 4,800 sq ft' },
  { label: '50 × 80', area: '4,000+ sq ft' },
  { label: 'Custom Plot', area: 'Any dimension' },
]

const TUMKUR_LOCALITIES = [
  'Vinobanagar',
  'SS Puram',
  'Batawadi',
  'Kyatsandra',
  'Siddaganga Layout',
  'Shettihalli',
  'Melekote',
  'Gubbi Gate / Town',
  'Kunigal Road',
  'Other / Outside Tumkur',
]

export function QuickQuoteModal() {
  const { isOpen, initialData, closeQuoteModal } = useQuoteModal()

  const [step, setStep] = useState<1 | 2>(1)
  const [projectType, setProjectType] = useState('Duplex Villa')
  const [plotDimension, setPlotDimension] = useState('30 × 40')
  const [timeline, setTimeline] = useState('Immediately')
  
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [locality, setLocality] = useState('SS Puram')
  const [additionalNotes, setAdditionalNotes] = useState('')
  const [honeypot, setHoneypot] = useState('')

  const [loadedAt, setLoadedAt] = useState<number>(Date.now())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const modalRef = useRef<HTMLDivElement>(null)

  // Reset and sync with initialData when opened
  useEffect(() => {
    if (isOpen) {
      setLoadedAt(Date.now())
      setStep(1)
      setIsSuccess(false)
      setErrorMessage('')
      if (initialData.serviceType) {
        setProjectType(initialData.serviceType)
      }
      if (initialData.plotDimensions) {
        setPlotDimension(initialData.plotDimensions)
      }
      if (initialData.locality) {
        setLocality(initialData.locality)
      }
      if (initialData.message) {
        setAdditionalNotes(initialData.message)
      }
      // Disable background scroll
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen, initialData])

  // ESC key listener
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        closeQuoteModal()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, closeQuoteModal])

  if (!isOpen) return null

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    // Basic phone validation for Indian mobile
    const cleanPhone = phone.trim()
    const indianRegex = /^(\+91[\s-]?)?[6-9]\d{9}$/
    if (!indianRegex.test(cleanPhone)) {
      setErrorMessage('Please enter a valid 10-digit Indian mobile number')
      return
    }

    if (fullName.trim().length < 2) {
      setErrorMessage('Please enter your full name')
      return
    }

    setIsSubmitting(true)

    try {
      const payload = {
        fullName: fullName.trim(),
        phone: cleanPhone,
        serviceType: projectType === 'Turnkey' ? 'Turnkey' : projectType === 'Commercial' ? 'Commercial' : 'Residential',
        message: [
          `Project Type: ${projectType}`,
          `Plot: ${plotDimension}`,
          `Timeline: ${timeline}`,
          `Locality: ${locality}`,
          additionalNotes ? `Notes: ${additionalNotes}` : null,
          initialData.estimatedCost ? `Estimated Cost: ${initialData.estimatedCost}` : null,
          initialData.packageTier ? `Package Tier: ${initialData.packageTier}` : null,
        ].filter(Boolean).join(' | '),
        plotDimensions: plotDimension,
        builtUpArea: initialData.builtUpArea || '',
        estimatedCost: initialData.estimatedCost || '',
        packageTier: initialData.packageTier || '',
        floors: initialData.floors || '',
        locality: locality,
        vastuFacing: initialData.vastuFacing || '',
        source: initialData.source || 'Quick Quote Modal',
        honeypot,
        loadedAt,
      }

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const result = await res.json()

      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit enquiry. Please try again.')
      }

      setIsSuccess(true)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Network error. Please try again or call us directly.'
      setErrorMessage(msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  const waLeadText = `Hi ${site.shortName}, I just requested a quick estimate on your website!\n\n*Name:* ${fullName || 'Client'}\n*Project:* ${projectType}\n*Plot:* ${plotDimension}\n*Location:* ${locality}, Tumkur\n*Timeline:* ${timeline}${initialData.estimatedCost ? `\n*Budget Estimate:* ${initialData.estimatedCost}` : ''}\n\nPlease share the detailed BOQ & 2D layout consultation.`

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-all duration-300 sm:p-6"
      onClick={(e) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
          closeQuoteModal()
        }
      }}
    >
      <div
        ref={modalRef}
        className="relative flex max-h-[92vh] w-full max-w-xl flex-col overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-2xl transition-all"
      >
        {/* Header Ribbon */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-[#FBFBFC] px-6 py-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#CE1C73]/10 text-[#CE1C73]">
              <Sparkles size={16} strokeWidth={2.5} />
            </span>
            <div>
              <p className="font-display text-sm font-bold text-slate-900">
                {isSuccess ? 'Estimate Request Sent' : 'Get Free Construction Quote & BOQ'}
              </p>
              <p className="text-[11px] text-slate-500">
                Guaranteed response within 30 minutes · 100% Free Consultation
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeQuoteModal}
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close quote modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto px-6 py-6 sm:px-8">
          {isSuccess ? (
            /* Success View */
            <div className="flex flex-col items-center py-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-sm animate-bounce">
                <CheckCircle2 size={36} strokeWidth={2.4} />
              </div>

              <h3 className="mt-5 font-display text-2xl font-bold text-slate-900">
                Thank You, {fullName}!
              </h3>
              <p className="mt-2 max-w-md text-sm text-slate-600 leading-relaxed">
                Your construction requirements for <strong className="text-slate-800">{plotDimension} {projectType}</strong> have been assigned to our Senior Civil Engineering Team in Tumkur.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappUrl(waLeadText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-md transition-transform hover:scale-[1.02] hover:bg-[#20ba59]"
                >
                  <MessageCircle size={18} />
                  <span>Receive BOQ on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={closeQuoteModal}
                  className="rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                >
                  Done
                </button>
              </div>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
                <Clock size={14} className="text-[#CE1C73]" />
                <span>Our engineer will also call you at <strong className="text-slate-700">{phone}</strong></span>
              </div>
            </div>
          ) : (
            /* 2-Step Form */
            <form onSubmit={step === 1 ? handleNextStep : handleSubmit}>
              {/* Anti-spam honeypot */}
              <input
                type="text"
                name="user_note_hp"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Progress Indicator */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                      step === 1 ? 'bg-[#CE1C73] text-white' : 'bg-emerald-500 text-white'
                    }`}
                  >
                    1
                  </span>
                  <span className={`text-xs font-semibold ${step === 1 ? 'text-slate-900' : 'text-slate-500'}`}>
                    Project Details
                  </span>
                </div>

                <div className="h-0.5 w-12 bg-slate-200" />

                <div className="flex items-center gap-2">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                      step === 2 ? 'bg-[#CE1C73] text-white' : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    2
                  </span>
                  <span className={`text-xs font-semibold ${step === 2 ? 'text-slate-900' : 'text-slate-500'}`}>
                    Contact &amp; Location
                  </span>
                </div>
              </div>

              {step === 1 ? (
                /* STEP 1: PROJECT SPECS */
                <div className="space-y-6">
                  {/* Select Project Type */}
                  <div>
                    <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
                      Select Project Type:
                    </label>
                    <div className="mt-2.5 grid grid-cols-2 gap-3">
                      {PROJECT_TYPES.map((pt) => {
                        const Icon = pt.icon
                        const isSelected = projectType === pt.id
                        return (
                          <button
                            key={pt.id}
                            type="button"
                            onClick={() => setProjectType(pt.id)}
                            className={`flex flex-col items-start rounded-xl border p-3.5 text-left transition-all ${
                              isSelected
                                ? 'border-2 border-[#CE1C73] bg-[#CE1C73]/5 shadow-xs'
                                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                            }`}
                          >
                            <span
                              className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                                isSelected ? 'bg-[#CE1C73] text-white' : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              <Icon size={16} />
                            </span>
                            <span className="mt-2 text-xs font-bold text-slate-900">{pt.label}</span>
                            <span className="text-[10px] text-slate-500">{pt.desc}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Plot Dimensions */}
                  <div>
                    <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
                      Plot Dimensions:
                    </label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {PLOT_OPTIONS.map((opt) => {
                        const isSelected = plotDimension === opt.label
                        return (
                          <button
                            key={opt.label}
                            type="button"
                            onClick={() => setPlotDimension(opt.label)}
                            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                              isSelected
                                ? 'bg-[#CE1C73] text-white shadow-xs'
                                : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                            }`}
                          >
                            {opt.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Construction Timeline */}
                  <div>
                    <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
                      When do you plan to start?
                    </label>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {['Immediately', 'In 1–3 Months', 'Exploring Plans'].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setTimeline(t)}
                          className={`rounded-xl border py-2 text-center text-xs font-medium transition-all ${
                            timeline === t
                              ? 'border-2 border-[#CE1C73] bg-[#CE1C73]/5 font-bold text-[#CE1C73]'
                              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="group flex w-full items-center justify-center rounded-full bg-[#CE1C73] py-3.5 text-sm font-bold text-white shadow-md shadow-[#CE1C73]/20 transition-all hover:bg-[#B81564]"
                    >
                      <span>Continue to Contact &amp; BOQ</span>
                      <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              ) : (
                /* STEP 2: CONTACT & LOCALITY */
                <div className="space-y-4">
                  {errorMessage && (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                      {errorMessage}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#CE1C73] focus:outline-hidden focus:ring-1 focus:ring-[#CE1C73]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
                      WhatsApp / Mobile Number *
                    </label>
                    <div className="relative mt-1.5">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-xs font-bold text-slate-500">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        placeholder="98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 py-2.5 pr-4 pl-12 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#CE1C73] focus:outline-hidden focus:ring-1 focus:ring-[#CE1C73]"
                      />
                    </div>
                    <p className="mt-1 text-[11px] text-slate-400">
                      We send your itemized estimate &amp; 3D designs to this WhatsApp number.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
                      Site Locality (Tumkur &amp; Surroundings)
                    </label>
                    <select
                      value={locality}
                      onChange={(e) => setLocality(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-[#CE1C73] focus:outline-hidden focus:ring-1 focus:ring-[#CE1C73]"
                    >
                      {TUMKUR_LOCALITIES.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
                      Specific Notes or Floor Plan Ideas (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Ground floor parking + 1st floor 3BHK duplex, east-facing entry"
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#CE1C73] focus:outline-hidden focus:ring-1 focus:ring-[#CE1C73]"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex items-center justify-center rounded-full border border-slate-200 px-4 py-3 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                    >
                      <ArrowLeft size={14} className="mr-1" />
                      <span>Back</span>
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group flex flex-1 items-center justify-center rounded-full bg-[#CE1C73] py-3 text-sm font-bold text-white shadow-md shadow-[#CE1C73]/20 transition-all hover:bg-[#B81564] disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="mr-2 animate-spin" />
                          <span>Generating Estimate...</span>
                        </>
                      ) : (
                        <>
                          <span>Get Free Estimate &amp; Call</span>
                          <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>

        {/* Footer Guarantee */}
        <div className="border-t border-slate-100 bg-slate-50 px-6 py-3 text-center text-[11px] text-slate-500">
          🔒 Zero spam policy. We never share your contact details. Call directly at{' '}
          <a href={contact.phoneHref} className="font-bold text-[#CE1C73] hover:underline">
            {contact.phoneDisplay}
          </a>
        </div>
      </div>
    </div>
  )
}
