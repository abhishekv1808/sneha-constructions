'use client'

import { ArrowRight, Calculator, Check, Compass, HardHat, Layers, ShieldCheck, MessageCircle, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { Container } from '@/components/ui'
import { formatINR } from '@/lib/utils/format'
import { useQuoteModal } from '@/components/providers/QuoteModalProvider'
import { site, whatsappUrl } from '@/content'

interface PricingTier {
  id: string
  name: string
  rate: number
  description: string
  popular?: boolean
  features: string[]
}

const pricingTiers: PricingTier[] = [
  {
    id: 'essential',
    name: 'Standard Turnkey',
    rate: 1875,
    description:
      'High-quality foundational construction for smart budgets and long-term durability.',
    features: [
      'FE-550D TMT Steel & 53-Grade Cement',
      'Vastu-Compliant 2D & 3D Floor Layouts',
      'Standard Vitrified Flooring & Premium Fittings',
      'Complete Plumbing & Electrical Installation',
      'Structural Guarantee & Milestone Audits',
    ],
  },
  {
    id: 'premium',
    name: 'Premium Residence',
    rate: 2250,
    popular: true,
    description: 'Our most popular choice for modern duplexes and architectural family residences.',
    features: [
      'Everything in Standard Turnkey',
      'Teakwood Main Doors & UPVC Soundproof Windows',
      'Italian Finish Tiles & Designer Sanitaryware',
      'Custom False Ceiling with Ambient LED Lighting',
      'Waterproofing & Weather-Shield Exterior Render',
      'Dedicated In-House Site Engineer Supervision',
    ],
  },
  {
    id: 'luxury',
    name: 'Luxury Villa',
    rate: 2650,
    description:
      'Bespoke architectural finishes, luxury imported materials, and premium turnkey delivery.',
    features: [
      'Everything in Premium Residence',
      'Custom Parametric Wooden & Stone Elevations',
      'Full Home Smart Automation Wiring',
      'Bespoke Modular Kitchen & Wardrobe Joinery',
      'Landscaping, Terrace Deck & Solar Ready Grid',
      '5-Year Post-Handover Maintenance Support',
    ],
  },
]

const featuresList = [
  {
    icon: Compass,
    title: 'Architectural & Vastu Harmony',
    description:
      'Engineered for optimal natural light, ventilation, and traditional Vastu guidelines for peaceful living.',
  },
  {
    icon: ShieldCheck,
    title: 'Certified Tier-1 Materials',
    description:
      'Tata Tiscon, Ultratech, Astral, and Asian Paints — verified quality batches with zero substandard compromises.',
  },
  {
    icon: HardHat,
    title: 'Dedicated Site Supervision',
    description:
      'Full-time civil engineers on site daily to inspect curing times, alignment, and structural safety tolerances.',
  },
  {
    icon: Layers,
    title: 'Zero Escalation Pricing',
    description:
      'Fixed rate per square foot locked at agreement with detailed material itemization — no hidden surprises.',
  },
]

export function FeaturesEstimator() {
  const { openQuoteModal } = useQuoteModal()
  const [area, setArea] = useState(2400)
  const [selectedTier, setSelectedTier] = useState<PricingTier>(
    pricingTiers[1] as PricingTier,
  )

  const totalEstimate = area * selectedTier.rate

  const handleOpenEstimateModal = () => {
    openQuoteModal({
      serviceType: 'Turnkey',
      builtUpArea: area,
      packageTier: selectedTier.name,
      estimatedCost: formatINR(totalEstimate),
      source: 'Homepage Features Estimator',
      message: `Calculated ${area} sq ft under ${selectedTier.name} package (₹${selectedTier.rate}/sq ft). Estimated cost: ${formatINR(totalEstimate)}.`,
    })
  }

  const waLeadText = `Hi ${site.shortName}, I configured my build on your homepage calculator:
• *Built-up Area:* ${area.toLocaleString('en-IN')} sq ft
• *Package:* ${selectedTier.name} (₹${selectedTier.rate}/sq ft)
• *Estimated Cost:* ${formatINR(totalEstimate)}

Please share the detailed BOQ breakdown and schedule a free site consultation.`

  return (
    <section id="pricing" className="relative bg-[#F8F9FA] py-24 text-slate-900 sm:py-32 border-y border-slate-200">
      <Container>
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 font-secondary text-xs font-bold tracking-[0.16em] text-[#CE1C73] uppercase sm:text-[0.8125rem]">
            <span aria-hidden="true" className="inline-block h-2 w-2 rounded-[2px] bg-[#CE1C73]" />
            OUR FEATURES &amp; ESTIMATOR
          </div>

          <h2 className="mt-4 font-display text-3xl leading-[1.18] font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
            Driven by passion for quality, we build spaces that reflect{' '}
            <span className="font-playfair italic">lasting value</span>
          </h2>

          <p className="mt-4 text-base text-slate-600 sm:text-lg">
            Compare turnkey specifications and calculate an instant construction budget estimate
            tailored to your land size.
          </p>
        </div>

        {/* 4 Feature Highlights */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuresList.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="rounded-[20px] border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#CE1C73]/50 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#CE1C73] text-white shadow-md">
                  <Icon size={24} strokeWidth={2.2} />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
              </div>
            )
          })}
        </div>

        {/* Interactive Calculator Block */}
        <div className="mt-16 rounded-[24px] border border-slate-200 bg-white p-8 shadow-xl sm:p-10 lg:p-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            {/* Left: Slider and Package selection */}
            <div className="flex-1 space-y-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#CE1C73] text-white shadow-sm">
                  <Calculator size={20} strokeWidth={2.4} />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-slate-900">
                    Instant Build Cost Calculator
                  </h3>
                  <p className="text-xs text-slate-500">
                    Slide to adjust total built-up area (sq ft)
                  </p>
                </div>
              </div>

              {/* Slider */}
              <div>
                <div className="flex items-baseline justify-between">
                  <label htmlFor="area-slider" className="text-sm font-medium text-slate-700">
                    Built-up Area:
                  </label>
                  <span className="font-display text-2xl font-semibold text-[#CE1C73]">
                    {area.toLocaleString('en-IN')} <span className="text-sm text-slate-600">sq ft</span>
                  </span>
                </div>
                <input
                  id="area-slider"
                  type="range"
                  min="800"
                  max="8000"
                  step="50"
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="mt-3 h-2.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-[#CE1C73]"
                />
                <div className="mt-2 flex justify-between text-xs text-slate-400">
                  <span>800 sq ft</span>
                  <span>4,000 sq ft</span>
                  <span>8,000 sq ft</span>
                </div>
              </div>

              {/* Package Radio Tabs */}
              <div>
                <p className="mb-3 text-sm font-medium text-slate-700">Select Package Tier:</p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {pricingTiers.map((tier) => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setSelectedTier(tier)}
                      className={`relative rounded-xl border p-4 text-left transition-all ${
                        selectedTier.id === tier.id
                          ? 'border-2 border-[#CE1C73] bg-[#CE1C73]/5 text-slate-900 shadow-sm ring-1 ring-[#CE1C73]'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {tier.popular && (
                        <span className="absolute -top-2.5 right-3 rounded-full bg-[#CE1C73] px-2 py-0.5 text-[10px] font-extrabold tracking-wider text-white uppercase shadow-sm">
                          Popular
                        </span>
                      )}
                      <p className="font-display text-sm font-semibold text-slate-900">{tier.name}</p>
                      <p className="mt-1 font-display text-lg font-semibold text-[#CE1C73]">
                        ₹{tier.rate.toLocaleString('en-IN')}{' '}
                        <span className="text-xs font-normal text-slate-500">/ sq ft</span>
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Output Summary Card */}
            <div className="w-full shrink-0 rounded-2xl border border-slate-200 bg-[#F8F9FA] p-6 text-center shadow-inner lg:w-80">
              <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                Estimated Construction Cost
              </p>
              <p className="mt-3 font-display text-4xl font-bold text-slate-900">
                {formatINR(totalEstimate)}
              </p>
              <p className="mt-1 text-xs font-semibold text-[#CE1C73]">
                All-inclusive turnkey rate · ₹{selectedTier.rate}/sq ft
              </p>

              <div className="mt-6 space-y-2 border-t border-slate-200 pt-4 text-left text-xs text-slate-600">
                <p className="flex items-center gap-2">
                  <Check size={14} className="text-[#CE1C73] shrink-0" /> Architectural 2D &amp; 3D Vastu
                  Plans
                </p>
                <p className="flex items-center gap-2">
                  <Check size={14} className="text-[#CE1C73] shrink-0" /> Structure, Masonry &amp;
                  Waterproofing
                </p>
                <p className="flex items-center gap-2">
                  <Check size={14} className="text-[#CE1C73] shrink-0" /> Complete Electrical &amp; Plumbing
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-2.5">
                <button
                  type="button"
                  onClick={handleOpenEstimateModal}
                  className="group flex w-full items-center justify-center rounded-full bg-[#CE1C73] py-3 text-sm font-bold text-white shadow-md shadow-[#CE1C73]/25 transition-all hover:bg-[#B81564]"
                >
                  <span>Get Detailed Quote</span>
                  <ArrowRight
                    size={16}
                    className="ml-2 transition-transform group-hover:translate-x-1"
                  />
                </button>

                <a
                  href={whatsappUrl(waLeadText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-1.5 rounded-full bg-[#25D366] py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#20ba59]"
                >
                  <MessageCircle size={15} />
                  <span>Receive BOQ on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Banner to Full Estimate Hub */}
          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-xl border border-pink-200 bg-pink-50/50 p-4 sm:flex-row">
            <div className="flex items-center gap-2.5 text-xs text-slate-700">
              <Sparkles size={16} className="text-[#CE1C73] shrink-0" />
              <span>
                Want to calculate standard <strong>30×40</strong>, <strong>30×50</strong>, or <strong>40×60</strong> plots, check <strong>Vastu directions</strong>, or estimate <strong>Bank Construction Loan EMIs</strong>?
              </span>
            </div>
            <Link
              href="/estimate"
              className="inline-flex shrink-0 items-center gap-1.5 text-xs font-bold text-[#CE1C73] hover:underline"
            >
              <span>Explore Interactive Planning Suite</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* 3 Pricing Plans Detailed Cards */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {pricingTiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative flex flex-col justify-between rounded-[22px] p-8 transition-all duration-300 ${
                tier.popular
                  ? 'border-2 border-[#CE1C73] bg-white text-slate-900 shadow-2xl md:-translate-y-3'
                  : 'border border-slate-200 bg-white text-slate-900 shadow-sm hover:shadow-xl hover:border-slate-300'
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#CE1C73] px-4 py-1 text-xs font-black tracking-wider text-white uppercase shadow-md">
                  Most Popular Choice
                </span>
              )}

              <div>
                <h3 className="font-display text-xl font-semibold text-slate-900">
                  {tier.name}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  {tier.description}
                </p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-bold text-slate-900">
                    ₹{tier.rate.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm text-slate-500">
                    / sq ft
                  </span>
                </div>

                <div className="mt-6 h-px w-full bg-slate-200" />

                <p className="mt-6 text-xs font-bold tracking-wider uppercase text-slate-900">
                  What&apos;s Included:
                </p>

                <ul className="mt-4 space-y-3">
                  {tier.features.map((feat, fIdx) => (
                    <li
                      key={fIdx}
                      className="flex items-start gap-2.5 text-xs text-slate-700"
                    >
                      <span
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-sm ${
                          tier.popular ? 'bg-[#CE1C73] text-white' : 'bg-slate-100 text-[#CE1C73]'
                        }`}
                      >
                        <Check size={11} strokeWidth={3} />
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={() =>
                    openQuoteModal({
                      packageTier: tier.name,
                      serviceType: 'Turnkey',
                      source: `Pricing Plan Card: ${tier.name}`,
                    })
                  }
                  className={`group inline-flex w-full items-center justify-center rounded-full py-3 text-sm font-bold transition-all ${
                    tier.popular
                      ? 'bg-[#CE1C73] text-white hover:bg-[#B81564] shadow-lg shadow-[#CE1C73]/25'
                      : 'border border-slate-300 bg-slate-50 text-slate-800 hover:border-[#CE1C73] hover:bg-[#CE1C73] hover:text-white shadow-sm'
                  }`}
                >
                  <span>Select {tier.name}</span>
                  <ArrowRight
                    size={16}
                    className="ml-2 transition-transform group-hover:translate-x-1"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
