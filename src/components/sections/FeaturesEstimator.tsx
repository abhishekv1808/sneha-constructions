'use client'

import { ArrowRight, Calculator, Check, MessageCircle, Sparkles } from 'lucide-react'
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

export function FeaturesEstimator() {
  const { openQuoteModal } = useQuoteModal()
  const [area, setArea] = useState(2400)
  const [selectedTier, setSelectedTier] = useState<PricingTier>(pricingTiers[1] as PricingTier)

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
    <section
      id="pricing"
      className="relative border-y border-slate-200 bg-[#F8F9FA] py-16 text-slate-900 sm:py-24 lg:py-32"
    >
      <Container>
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 font-secondary text-xs font-bold tracking-[0.16em] text-[#CE1C73] uppercase sm:text-[0.8125rem]">
            <span aria-hidden="true" className="inline-block h-2 w-2 rounded-[2px] bg-[#CE1C73]" />
            COST ESTIMATOR
          </div>

          <h2 className="mt-4 font-display text-[1.625rem] leading-[1.18] font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
            Know your budget <span className="font-playfair italic">before you build</span>
          </h2>

          <p className="mt-4 text-[0.9375rem] text-slate-600 sm:text-lg">
            Set your built-up area, pick a package and see an instant estimate. Get the full
            breakdown on WhatsApp when you&rsquo;re ready.
          </p>
        </div>

        {/* Interactive Calculator Block */}
        <div className="mt-8 rounded-[24px] border border-slate-200 bg-white p-5 shadow-xl sm:mt-12 sm:p-10 lg:p-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            {/* Left: Slider and Package selection */}
            <div className="flex-1 space-y-6 sm:space-y-8">
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
                    {area.toLocaleString('en-IN')}{' '}
                    <span className="text-sm text-slate-600">sq ft</span>
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
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {pricingTiers.map((tier) => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setSelectedTier(tier)}
                      className={`relative rounded-xl border p-2.5 text-left transition-all sm:p-4 ${
                        selectedTier.id === tier.id
                          ? 'border-2 border-[#CE1C73] bg-[#CE1C73]/5 text-slate-900 shadow-sm ring-1 ring-[#CE1C73]'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {tier.popular && (
                        <span className="absolute -top-2.5 right-2 rounded-full bg-[#CE1C73] px-2 py-0.5 text-[0.6875rem] font-extrabold tracking-wider text-white uppercase shadow-sm sm:right-3 sm:text-[0.6875rem]">
                          Popular
                        </span>
                      )}
                      <p className="font-display text-xs leading-snug font-semibold text-slate-900 sm:text-sm">
                        {tier.name}
                      </p>
                      <p className="mt-1 font-display text-base font-semibold text-[#CE1C73] sm:text-lg">
                        ₹{tier.rate.toLocaleString('en-IN')}{' '}
                        <span className="block text-[0.6875rem] font-normal text-slate-500 sm:inline sm:text-xs">
                          / sq ft
                        </span>
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Output Summary Card */}
            <div className="w-full shrink-0 rounded-2xl border border-slate-200 bg-[#F8F9FA] p-5 text-center shadow-inner sm:p-6 lg:w-80">
              <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                Estimated Construction Cost
              </p>
              <p className="mt-3 font-display text-[2rem] font-bold text-slate-900 sm:text-4xl">
                {formatINR(totalEstimate)}
              </p>
              <p className="mt-1 text-xs font-semibold text-[#CE1C73]">
                All-inclusive turnkey rate · ₹{selectedTier.rate}/sq ft
              </p>

              <div className="mt-6 space-y-2 border-t border-slate-200 pt-4 text-left text-xs text-slate-600">
                <p className="flex items-center gap-2">
                  <Check size={14} className="shrink-0 text-[#CE1C73]" /> Architectural 2D &amp; 3D
                  Vastu Plans
                </p>
                <p className="flex items-center gap-2">
                  <Check size={14} className="shrink-0 text-[#CE1C73]" /> Structure, Masonry &amp;
                  Waterproofing
                </p>
                <p className="flex items-center gap-2">
                  <Check size={14} className="shrink-0 text-[#CE1C73]" /> Complete Electrical &amp;
                  Plumbing
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
              <Sparkles size={16} className="shrink-0 text-[#CE1C73]" />
              <span>
                Want to calculate standard <strong>30×40</strong>, <strong>30×50</strong>, or{' '}
                <strong>40×60</strong> plots, check <strong>Vastu directions</strong>, or estimate{' '}
                <strong>Bank Construction Loan EMIs</strong>?
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
      </Container>
    </section>
  )
}
