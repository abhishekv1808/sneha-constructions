'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Check,
  Sparkles,
  ShieldCheck,
  Calculator,
  ArrowRight,
  FileText,
  BadgeCheck,
  Clock,
  Home,
  CheckCircle2,
} from 'lucide-react'

import { Container } from '@/components/ui'
import { useQuoteModal } from '@/components/providers/QuoteModalProvider'
import { site } from '@/content'

interface PackageData {
  id: 'standard' | 'premium' | 'luxury'
  name: string
  tagline: string
  rate: number
  popular?: boolean
  bestFor: string
  completionTime: string
  specs: {
    steelCement: string
    doorsWindows: string
    flooring: string
    plumbingSanitary: string
    electrical: string
    paintingWaterproofing: string
  }
}

const PACKAGES: PackageData[] = [
  {
    id: 'standard',
    name: 'Standard Turnkey',
    tagline: 'High-strength structural core & durable quality fixtures.',
    rate: 1875,
    bestFor: 'Rental units, budget residences & compact independent homes',
    completionTime: '8 – 10 Months',
    specs: {
      steelCement: 'JSW / Kamdhenu FE-550D TMT rebar + Ultratech / ACC 53-Grade OPC cement',
      doorsWindows: 'Honne wood main frame, flush internal doors, 2-track aluminium sliding windows',
      flooring: 'Double-charged 2×2 vitrified tiles (₹60/sqft allowance) + anti-skid ceramic baths',
      plumbingSanitary: 'Astral CPVC piping, Cera / Parryware sanitary fixtures with chrome taps',
      electrical: 'Finolex / Anchor fire-retardant wiring, Roma modular switches, separate AC points',
      paintingWaterproofing: 'Birla White putty + Asian Paints Tractor Emulsion inside, Apex exterior coat',
    },
  },
  {
    id: 'premium',
    name: 'Premium Residence',
    tagline: 'Architectural elegance, Burma teak accents & premium fittings.',
    rate: 2250,
    popular: true,
    bestFor: 'Modern duplex villas & primary family residences in Tumkur',
    completionTime: '10 – 12 Months',
    specs: {
      steelCement: '100% Primary Tata Tiscon FE-550D Super Ductile + Ultratech 53-Grade OPC',
      doorsWindows: '1st-Quality Burma Teakwood main door (5×3 frame), 3-track soundproof UPVC windows with mosquito mesh',
      flooring: 'Large format 4×2 vitrified tiles by Kajaria / Somany (₹95/sqft) + designer tile bathrooms',
      plumbingSanitary: 'Astral SDR-11 CPVC, Jaquar / Kohler concealed diverters & wall-hung commodes',
      electrical: 'Polycab FR-LSH wiring, Legrand / Schneider modular switches, EV car charger conduit',
      paintingWaterproofing: 'Asian Paints Royale Luxury interior emulsion, Apex Ultima exterior weather barrier + Dr. Fixit waterproofing',
    },
  },
  {
    id: 'luxury',
    name: 'Luxury Villa',
    tagline: 'Bespoke elevation, Italian marble, smart wiring & elite craftsmanship.',
    rate: 2650,
    bestFor: 'High-end villas, bungalows & custom architectural landmarks',
    completionTime: '12 – 14 Months',
    specs: {
      steelCement: 'Tata Tiscon FE-550D + Ultratech WeatherPlus water-repellent cement',
      doorsWindows: 'Custom 8ft carved Burma Teak pivoting main door, German soundproof UPVC / Aluminium acoustic systems',
      flooring: 'Imported Italian Marble in living/dining or 6×4 slab tiles (₹175/sqft allowance) + wooden laminate master bedroom',
      plumbingSanitary: 'Grohe / Kohler premium sensor faucets, freestanding bathtub provision, pressurized pump system',
      electrical: 'Smart automation ready wiring, Schneider digital touch switches, automated gate conduit',
      paintingWaterproofing: 'Asian Paints Royale Aspire / PU wood polish, Apex Ultima Protek with 10-Year warranty + membrane waterproofing',
    },
  },
]

const COMPARISON_ROWS = [
  { key: 'steelCement', label: 'Structural Steel & Cement' },
  { key: 'doorsWindows', label: 'Doors & Windows' },
  { key: 'flooring', label: 'Flooring & Wall Tiling' },
  { key: 'plumbingSanitary', label: 'Plumbing & Sanitaryware' },
  { key: 'electrical', label: 'Electrical & Smart Infrastructure' },
  { key: 'paintingWaterproofing', label: 'Painting & Waterproofing' },
] as const

export function PackageComparison() {
  const { openQuoteModal } = useQuoteModal()
  const [activeTab, setActiveTab] = useState<'cards' | 'matrix'>('cards')

  const handleBookConsultation = (pkg: PackageData) => {
    openQuoteModal({
      serviceType: 'Residential',
      packageTier: pkg.name,
      source: `Package Comparison Section: ${pkg.name}`,
      message: `I am interested in the ${pkg.name} package (₹${pkg.rate}/sq ft). Please schedule a site visit and send detailed specifications.`,
    })
  }

  return (
    <section className="relative bg-slate-50 py-20 sm:py-28">
      <Container>
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#CE1C73]/20 bg-[#CE1C73]/10 px-3.5 py-1 text-xs font-bold tracking-wider text-[#CE1C73] uppercase">
            <BadgeCheck size={15} />
            <span>Transparent Fixed-Price Turnkey Contracts</span>
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Compare Our Construction Packages
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base leading-relaxed">
            Every material brand is contractually itemized before you sign. Zero hidden extras, zero surprise rate hikes during construction.
          </p>

          {/* Toggle view between Cards and Detailed Matrix */}
          <div className="mt-8 inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-xs">
            <button
              type="button"
              onClick={() => setActiveTab('cards')}
              className={`rounded-lg px-5 py-2 text-xs font-bold transition-all ${
                activeTab === 'cards'
                  ? 'bg-[#CE1C73] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Overview Cards
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('matrix')}
              className={`rounded-lg px-5 py-2 text-xs font-bold transition-all ${
                activeTab === 'matrix'
                  ? 'bg-[#CE1C73] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Full Material Comparison Matrix
            </button>
          </div>
        </div>

        {/* OVERVIEW CARDS VIEW */}
        {activeTab === 'cards' && (
          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative flex flex-col justify-between rounded-3xl border bg-white p-7 transition-all duration-300 hover:shadow-xl sm:p-8 ${
                  pkg.popular
                    ? 'border-2 border-[#CE1C73] shadow-lg shadow-[#CE1C73]/10 lg:-translate-y-2'
                    : 'border-slate-200 shadow-sm'
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#CE1C73] px-4 py-1 text-[11px] font-black tracking-wider text-white uppercase shadow-sm">
                    Most Popular Choice
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-xl font-bold text-slate-900">
                      {pkg.name}
                    </h3>
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                      <Clock size={13} />
                      {pkg.completionTime}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-slate-500 leading-relaxed min-h-[36px]">
                    {pkg.tagline}
                  </p>

                  {/* Pricing */}
                  <div className="mt-5 border-y border-slate-100 py-4">
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-4xl font-extrabold text-slate-900">
                        ₹{pkg.rate.toLocaleString('en-IN')}
                      </span>
                      <span className="text-sm font-semibold text-slate-500">/ sq ft</span>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-400">
                      Built-up area basis · Includes architectural plans, labor &amp; materials
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="mt-6 space-y-3">
                    <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Key Inclusions:
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-600">
                      <li className="flex items-start gap-2.5">
                        <Check size={16} className="shrink-0 text-[#CE1C73] mt-0.5" />
                        <span><strong>Steel &amp; Cement:</strong> {pkg.specs.steelCement.split('+')[0]}</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check size={16} className="shrink-0 text-[#CE1C73] mt-0.5" />
                        <span><strong>Main Door:</strong> {pkg.specs.doorsWindows.split(',')[0]}</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check size={16} className="shrink-0 text-[#CE1C73] mt-0.5" />
                        <span><strong>Flooring:</strong> {pkg.specs.flooring.split('+')[0]}</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check size={16} className="shrink-0 text-[#CE1C73] mt-0.5" />
                        <span><strong>Plumbing:</strong> {pkg.specs.plumbingSanitary.split(',')[0]}</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check size={16} className="shrink-0 text-[#CE1C73] mt-0.5" />
                        <span><strong>Electrical:</strong> {pkg.specs.electrical.split(',')[0]}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-8 space-y-2.5 pt-4 border-t border-slate-100">
                  <Link
                    href={`/estimate?pkg=${pkg.id}`}
                    className={`flex w-full items-center justify-center gap-2 rounded-full py-3 text-xs font-bold transition-all ${
                      pkg.popular
                        ? 'bg-[#CE1C73] text-white shadow-md hover:bg-[#B81564]'
                        : 'border border-slate-300 bg-white text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <Calculator size={14} />
                    <span>Calculate Cost for {pkg.name}</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleBookConsultation(pkg)}
                    className="w-full text-center text-xs font-semibold text-slate-500 hover:text-[#CE1C73] transition-colors py-1"
                  >
                    Request Detailed Material BOQ →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* DETAILED MATRIX VIEW */}
        {activeTab === 'matrix' && (
          <div className="mt-12 overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-md">
            <table className="w-full min-w-[700px] border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80">
                  <th className="p-4 sm:p-5 font-bold text-slate-700 w-1/4">Specification Component</th>
                  {PACKAGES.map((pkg) => (
                    <th key={pkg.id} className="p-4 sm:p-5 font-bold text-slate-900 w-1/4">
                      <div className="flex items-center justify-between">
                        <span>{pkg.name}</span>
                        <span className="font-display text-sm font-extrabold text-[#CE1C73]">
                          ₹{pkg.rate}/sqft
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.key} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-slate-800 bg-slate-50/30">
                      {row.label}
                    </td>
                    {PACKAGES.map((pkg) => (
                      <td key={pkg.id} className="p-4 sm:p-5 text-slate-600 leading-relaxed">
                        {pkg.specs[row.key]}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="bg-slate-50/60">
                  <td className="p-4 sm:p-5 font-bold text-slate-800">Action</td>
                  {PACKAGES.map((pkg) => (
                    <td key={pkg.id} className="p-4 sm:p-5">
                      <Link
                        href={`/estimate?pkg=${pkg.id}`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#CE1C73] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#B81564] transition-all"
                      >
                        <Calculator size={13} />
                        <span>Estimate {pkg.name}</span>
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Contractual Warranty Strip */}
        <div className="mt-12 rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-900 via-ink-950 to-slate-900 p-6 text-white shadow-lg sm:p-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#CE1C73] text-white shadow-md">
                <ShieldCheck size={26} />
              </div>
              <div>
                <h4 className="font-display text-base font-bold text-white sm:text-lg">
                  5-Year Structural RCC Warranty + 3-Year Free Maintenance
                </h4>
                <p className="mt-1 text-xs text-slate-300">
                  Legally drafted into your agreement. We stand behind every pillar, beam, and waterproofing coat we build.
                </p>
              </div>
            </div>

            <Link
              href="/estimate"
              className="group flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-bold text-slate-900 shadow-md hover:bg-slate-100 transition-all"
            >
              <span>Calculate Your Build Cost Now</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
