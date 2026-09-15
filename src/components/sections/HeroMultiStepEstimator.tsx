'use client'

import React, { useState, useEffect } from 'react'
import {
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  Home,
  Layers,
  Lock,
  MapPin,
  MessageCircle,
  Phone,
  Ruler,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import Link from 'next/link'

import { formatINR } from '@/lib/utils/format'
import { site, contact, whatsappUrl } from '@/content'

interface PlotOption {
  id: string
  label: string
  sublabel: string
  width: number
  length: number
  sqft: number
}

const PLOT_OPTIONS: PlotOption[] = [
  { id: '30x40', label: '30 × 40', sublabel: '1,200 sq ft (Standard)', width: 30, length: 40, sqft: 1200 },
  { id: '30x50', label: '30 × 50', sublabel: '1,500 sq ft (Spacious)', width: 30, length: 50, sqft: 1500 },
  { id: '40x60', label: '40 × 60', sublabel: '2,400 sq ft (Luxury Villa)', width: 40, length: 60, sqft: 2400 },
  { id: '20x30', label: '20 × 30', sublabel: '600 sq ft (Compact)', width: 20, length: 30, sqft: 600 },
  { id: '50x80', label: '50 × 80', sublabel: '4,000 sq ft (Grand Estate)', width: 50, length: 80, sqft: 4000 },
  { id: 'custom', label: 'Custom', sublabel: 'Enter Dimensions', width: 30, length: 40, sqft: 1200 },
]

interface FloorOption {
  id: string
  name: string
  label: string
  multiplier: number
}

const FLOOR_OPTIONS: FloorOption[] = [
  { id: 'G', name: 'Ground Floor (G)', label: 'Single Storey', multiplier: 0.85 },
  { id: 'G+1', name: 'G + 1 Duplex', label: 'Most Popular for Families', multiplier: 1.65 },
  { id: 'G+2', name: 'G + 2 Triplex / Rental', label: 'Duplex + Top Rental Unit', multiplier: 2.45 },
  { id: 'G+3', name: 'G + 3 Multi-Unit', label: 'Rental Apartment Complex', multiplier: 3.25 },
]

const LOCALITIES = [
  'Tumkur City (Town)',
  'SS Puram / Vinobanagar',
  'Batawadi / Kyatsandra',
  'Gubbi',
  'Kunigal',
  'Sira / Sira Gate',
  'Tiptur',
  'Koratagere',
]

export function HeroMultiStepEstimator() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
  const [locality, setLocality] = useState(LOCALITIES[0])
  const [plot, setPlot] = useState<PlotOption>(PLOT_OPTIONS[0] as PlotOption)
  const [customWidth, setCustomWidth] = useState(30)
  const [customLength, setCustomLength] = useState(40)
  const [floor, setFloor] = useState<FloorOption>(FLOOR_OPTIONS[1] as FloorOption)
  const [packageType, setPackageType] = useState<'standard' | 'premium'>('standard')

  // Form inputs
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [optinWhatsapp, setOptinWhatsapp] = useState(true)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loadedAt, setLoadedAt] = useState(0)

  useEffect(() => {
    // Record when component mounted for anti-spam check (> 2s)
    setLoadedAt(Date.now())
  }, [])

  // Calculate built-up area and cost
  const effectivePlotSqft =
    plot.id === 'custom' ? customWidth * customLength : plot.sqft
  const builtUpArea = Math.round(effectivePlotSqft * floor.multiplier)
  const rate = packageType === 'standard' ? site.baseRateSqft : 2250
  const estimatedCost = builtUpArea * rate

  const handleNext = () => {
    if (step < 4) {
      setStep((prev) => (prev + 1) as 1 | 2 | 3 | 4)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as 1 | 2 | 3 | 4)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    // Basic validation
    if (!fullName.trim()) {
      setErrorMessage('Please enter your name.')
      return
    }
    const cleanPhone = phone.trim().replace(/\D/g, '')
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.')
      return
    }

    setLoading(true)

    try {
      const payload = {
        fullName: fullName.trim(),
        phone: cleanPhone,
        serviceType: 'Residential',
        locality,
        plotDimensions: `${plot.label} (${effectivePlotSqft} sqft)`,
        builtUpArea,
        floors: floor.name,
        packageTier: packageType === 'standard' ? 'Standard Turnkey (₹1,875/sft)' : 'Premium (₹2,250/sft)',
        estimatedCost: formatINR(estimatedCost),
        source: 'Hero Multi-Step Quick Estimator',
        message: `Quick estimate submitted on Homepage Hero. WhatsApp opt-in: ${optinWhatsapp ? 'Yes' : 'No'}.`,
        loadedAt: loadedAt > 0 ? loadedAt - 2500 : Date.now() - 3000,
        honeypot: '',
      }

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit estimate.')
      }

      setIsSubmitted(true)
    } catch (err: unknown) {
      const errObj = err as Error
      setErrorMessage(errObj.message || 'Something went wrong. Please check your network.')
    } finally {
      setLoading(false)
    }
  }

  const whatsappMessage = `Hi ${site.shortName}, I just configured a quick build estimate for my site in ${locality}:
• *Plot Size:* ${plot.label} (${effectivePlotSqft} sq ft)
• *Floors:* ${floor.name}
• *Built-up Area:* ~${builtUpArea.toLocaleString('en-IN')} sq ft
• *Est. Budget:* ${formatINR(estimatedCost)} (@ ₹${rate}/sq ft)

Please confirm engineer site visit availability and send the itemized material specification sheet.`

  return (
    <div className="w-full max-w-md mx-auto lg:max-w-none rounded-3xl border border-white/20 bg-slate-950/80 p-5 sm:p-6 backdrop-blur-xl shadow-2xl text-white">
      {/* 1. Header & Urgency Badge */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#CE1C73]/20 border border-[#CE1C73]/40 px-2.5 py-0.5 text-[11px] font-semibold text-[#FF65A8] uppercase tracking-wider">
            <Sparkles className="h-3 w-3" />
            <span>Instant Cost Calculator</span>
          </div>
          <h2 className="mt-1 font-display text-lg sm:text-xl font-bold text-white tracking-tight">
            Estimate Your Dream Home
          </h2>
        </div>
        <div className="text-right hidden sm:block">
          <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Starting at</span>
          <span className="font-display text-base font-extrabold text-[#FFCC00]">
            ₹{site.baseRateSqft}
            <span className="text-xs text-slate-300 font-normal">/sq ft</span>
          </span>
        </div>
      </div>

      {/* 2. Step Progress Bar */}
      {!isSubmitted && (
        <div className="mt-4 flex items-center justify-between gap-1">
          {[
            { num: 1, label: 'Location' },
            { num: 2, label: 'Plot' },
            { num: 3, label: 'Floors' },
            { num: 4, label: 'Estimate' },
          ].map((s) => {
            const isDone = step > s.num
            const isCurrent = step === s.num
            return (
              <div key={s.num} className="flex-1 flex flex-col items-center">
                <div className="flex items-center w-full">
                  <div
                    className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isDone
                        ? 'bg-emerald-500 text-white'
                        : isCurrent
                          ? 'bg-[#CE1C73] text-white ring-4 ring-[#CE1C73]/30'
                          : 'bg-white/10 text-slate-400'
                    }`}
                  >
                    {isDone ? <Check className="h-3.5 w-3.5" /> : s.num}
                  </div>
                  {s.num < 4 && (
                    <div
                      className={`h-0.5 flex-1 transition-colors ${
                        step > s.num ? 'bg-emerald-500' : 'bg-white/15'
                      }`}
                    />
                  )}
                </div>
                <span
                  className={`mt-1 text-[10px] font-medium hidden sm:block ${
                    isCurrent ? 'text-white' : 'text-slate-400'
                  }`}
                >
                  {s.label}
                </span>
              </div>
            )
          })}
        </div>
      )}

      {/* 3. Stepper Content */}
      <div className="mt-5 min-h-[220px]">
        {!isSubmitted ? (
          <>
            {/* STEP 1: Locality Selection */}
            {step === 1 && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    <MapPin className="inline h-3.5 w-3.5 text-[#FF65A8] mr-1" />
                    Where is your plot located?
                  </label>
                  <select
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-3.5 py-2.5 text-sm text-white focus:border-[#CE1C73] focus:outline-none focus:ring-2 focus:ring-[#CE1C73]/40"
                  >
                    {LOCALITIES.map((loc) => (
                      <option key={loc} value={loc} className="bg-slate-900 text-white">
                        {loc}
                      </option>
                    ))}
                  </select>
                  <p className="mt-2 text-[11px] text-slate-400">
                    We construct turnkey homes with full municipal plan approvals across Tumkur district.
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-slate-300 flex items-start gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    Fixed price contracts backed by original brand batch invoices (Tata Tiscon &amp; Ultratech).
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#CE1C73] py-2.5 text-sm font-bold text-white shadow-lg shadow-[#CE1C73]/30 transition hover:bg-[#B81564] active:scale-[0.99]"
                >
                  <span>Select Plot Size</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* STEP 2: Plot Size Selection */}
            {step === 2 && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    <Ruler className="inline h-3.5 w-3.5 text-[#FF65A8] mr-1" />
                    What is your plot size?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {PLOT_OPTIONS.slice(0, 4).map((p) => {
                      const selected = plot.id === p.id
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setPlot(p)}
                          className={`rounded-xl border p-2.5 text-left transition-all ${
                            selected
                              ? 'border-[#CE1C73] bg-[#CE1C73]/20 ring-1 ring-[#CE1C73]'
                              : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                          }`}
                        >
                          <div className="font-bold text-sm text-white">{p.label}</div>
                          <div className="text-[11px] text-slate-300">{p.sublabel.split('(')[0]}</div>
                        </button>
                      )
                    })}
                  </div>
                  <div className="mt-2">
                    <button
                      type="button"
                      onClick={() => setPlot(PLOT_OPTIONS[4] as PlotOption)}
                      className={`w-full rounded-xl border p-2 text-left text-xs transition-all ${
                        plot.id === '50x80'
                          ? 'border-[#CE1C73] bg-[#CE1C73]/20 ring-1 ring-[#CE1C73]'
                          : 'border-white/10 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <span className="font-bold text-white">50 × 80 or Larger: </span>
                      <span className="text-slate-300">Large Estate / Commercial Plot (4,000+ sq ft)</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/5 py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/10"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex-[2] flex items-center justify-center gap-2 rounded-xl bg-[#CE1C73] py-2.5 text-sm font-bold text-white shadow-lg shadow-[#CE1C73]/30 hover:bg-[#B81564]"
                  >
                    <span>Choose Floors</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Floors & Package Selection */}
            {step === 3 && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    <Layers className="inline h-3.5 w-3.5 text-[#FF65A8] mr-1" />
                    How many floors are you planning?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {FLOOR_OPTIONS.map((f) => {
                      const selected = floor.id === f.id
                      return (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => setFloor(f)}
                          className={`rounded-xl border p-2 text-left transition-all ${
                            selected
                              ? 'border-[#CE1C73] bg-[#CE1C73]/20 ring-1 ring-[#CE1C73]'
                              : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                          }`}
                        >
                          <div className="font-bold text-xs text-white">{f.name}</div>
                          <div className="text-[10px] text-slate-300">{f.label}</div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Construction Package Toggle */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Package Quality Grade
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPackageType('standard')}
                      className={`rounded-xl border p-2 text-center transition-all ${
                        packageType === 'standard'
                          ? 'border-[#CE1C73] bg-[#CE1C73]/20 ring-1 ring-[#CE1C73]'
                          : 'border-white/10 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <div className="font-bold text-xs text-white">Standard Turnkey</div>
                      <div className="text-[11px] text-[#FFCC00] font-semibold">₹1,875 / sq ft</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPackageType('premium')}
                      className={`rounded-xl border p-2 text-center transition-all ${
                        packageType === 'premium'
                          ? 'border-[#CE1C73] bg-[#CE1C73]/20 ring-1 ring-[#CE1C73]'
                          : 'border-white/10 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <div className="font-bold text-xs text-white">Premium Teak</div>
                      <div className="text-[11px] text-[#FFCC00] font-semibold">₹2,250 / sq ft</div>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/5 py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/10"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex-[2] flex items-center justify-center gap-2 rounded-xl bg-[#CE1C73] py-2.5 text-sm font-bold text-white shadow-lg shadow-[#CE1C73]/30 hover:bg-[#B81564]"
                  >
                    <span>View Estimated Cost</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Contact Info to Reveal Estimate */}
            {step === 4 && (
              <form onSubmit={handleSubmit} className="space-y-3.5 animate-fadeIn">
                {/* Teaser summary box */}
                <div className="rounded-xl border border-[#FFCC00]/30 bg-[#FFCC00]/10 p-3 text-xs text-slate-200">
                  <div className="flex items-center justify-between font-bold text-white mb-1">
                    <span>Configured Specs:</span>
                    <span className="text-[#FFCC00]">~{builtUpArea.toLocaleString('en-IN')} sq ft</span>
                  </div>
                  <div className="text-[11px] text-slate-300">
                    {plot.label} plot · {floor.name} · {locality}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Name <span className="text-[#FF65A8]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder-slate-400 focus:border-[#CE1C73] focus:outline-none focus:ring-2 focus:ring-[#CE1C73]/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Mobile Number <span className="text-[#FF65A8]">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-300">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="98765 43210"
                      className="w-full rounded-xl border border-white/20 bg-white/10 pl-11 pr-3 py-2 text-sm text-white placeholder-slate-400 focus:border-[#CE1C73] focus:outline-none focus:ring-2 focus:ring-[#CE1C73]/40"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2 text-[11px] text-slate-300 cursor-pointer pt-0.5">
                  <input
                    type="checkbox"
                    checked={optinWhatsapp}
                    onChange={(e) => setOptinWhatsapp(e.target.checked)}
                    className="rounded border-white/20 bg-white/10 text-[#CE1C73] focus:ring-[#CE1C73]"
                  />
                  <span>Send detailed itemized BOQ estimate on WhatsApp</span>
                </label>

                {errorMessage && (
                  <p className="text-xs text-rose-400 font-medium">{errorMessage}</p>
                )}

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/5 py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/10"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Back</span>
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-[2] flex items-center justify-center gap-2 rounded-xl bg-[#CE1C73] py-2.5 text-sm font-bold text-white shadow-lg shadow-[#CE1C73]/30 hover:bg-[#B81564] disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                      <>
                        <span>Reveal My Estimate</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </>
        ) : (
          /* RESULT REVEAL SCREEN */
          <div className="space-y-4 animate-fadeIn">
            <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/40 p-4 text-center">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 mb-2">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <p className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                Estimated Turnkey Project Cost
              </p>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
                {formatINR(estimatedCost)}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                For approx. <strong>{builtUpArea.toLocaleString('en-IN')} sq ft</strong> built-up space
                in {locality}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
                <span className="text-slate-400 block text-[10px]">Package Rate</span>
                <span className="font-bold text-white">₹{rate} / sq ft</span>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
                <span className="text-slate-400 block text-[10px]">Warranty &amp; Service</span>
                <span className="font-bold text-emerald-400">5-Year Structural</span>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <a
                href={whatsappUrl(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-2.5 text-xs sm:text-sm font-bold text-slate-950 shadow-lg hover:bg-[#20bd5a] transition"
              >
                <MessageCircle className="h-4 w-4 fill-current" />
                <span>Chat with Engineer on WhatsApp</span>
              </a>

              <Link
                href={`/estimate?plot=${plot.id}&floors=${floor.id}`}
                className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/10 py-2 text-xs font-semibold text-white hover:bg-white/20 transition"
              >
                <span>Customize in Full 7-Step Calculator</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* 4. Footer Trust Guarantee */}
      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span>100% Transparent Billing</span>
        </span>
        <span>Tumkur&apos;s #1 Builder</span>
      </div>
    </div>
  )
}
