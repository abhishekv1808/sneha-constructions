'use client'

import React, { useState, useId } from 'react'
import {
  Calculator,
  Layers,
  Sparkles,
  ArrowRight,
  MessageCircle,
  FileSpreadsheet,
  CheckCircle2,
  PieChart,
  Home,
  Building,
} from 'lucide-react'
import { formatINR } from '@/lib/utils/format'
import { useQuoteModal } from '@/components/providers/QuoteModalProvider'
import { site, whatsappUrl } from '@/content'

interface PlotPreset {
  id: string
  name: string
  width: number
  length: number
  plotArea: number
}

const PLOT_PRESETS: PlotPreset[] = [
  { id: '30x40', name: '30 × 40', width: 30, length: 40, plotArea: 1200 },
  { id: '30x50', name: '30 × 50', width: 30, length: 50, plotArea: 1500 },
  { id: '40x60', name: '40 × 60', width: 40, length: 60, plotArea: 2400 },
  { id: '50x80', name: '50 × 80', width: 50, length: 80, plotArea: 4000 },
  { id: 'custom', name: 'Custom Size', width: 0, length: 0, plotArea: 1800 },
]

interface FloorOption {
  id: string
  name: string
  label: string
  multiplier: number // coverage multiplier over site area
  description: string
}

const FLOOR_OPTIONS: FloorOption[] = [
  { id: 'G', name: 'Ground Floor Only (G)', label: 'Single Storey', multiplier: 0.85, description: 'Single level residence + car porch' },
  { id: 'G+1', name: 'G + 1 Duplex House', label: '2 Floors Duplex', multiplier: 1.65, description: 'Living + kitchen + 3-4 bedrooms' },
  { id: 'G+2', name: 'G + 2 Triplex / Rental', label: '3 Floors Multi-unit', multiplier: 2.45, description: 'Owner duplex + top rental floor' },
]

interface PackageTier {
  id: string
  name: string
  rate: number
  popular?: boolean
  description: string
  specs: string[]
}

const PACKAGE_TIERS: PackageTier[] = [
  {
    id: 'standard',
    name: 'Standard Turnkey',
    rate: 1875,
    description: 'High-strength foundation & durable quality fixtures.',
    specs: ['FE-550D TMT Steel', '53-Grade Ultratech Cement', 'Vitrified 2x2 Tiles', 'Astral / Ashirvad Plumbing'],
  },
  {
    id: 'premium',
    name: 'Premium Residence',
    rate: 2250,
    popular: true,
    description: 'Our most popular choice for modern duplexes in Tumkur.',
    specs: ['Everything in Standard', 'Teakwood Main Door', 'UPVC Soundproof Windows', 'Designer Bathrooms & False Ceiling'],
  },
  {
    id: 'luxury',
    name: 'Luxury Villa',
    rate: 2650,
    description: 'Architectural elevation, smart automation & premium joinery.',
    specs: ['Everything in Premium', 'Italian Marble / Large Vitrified', 'Parametric Exterior Render', 'Modular Kitchen & Smart Wiring'],
  },
]

export function SmartCostCalculator() {
  const { openQuoteModal } = useQuoteModal()
  const areaSliderId = useId()
  const customSqftId = useId()

  const [selectedPlot, setSelectedPlot] = useState<PlotPreset>(PLOT_PRESETS[0] as PlotPreset)
  const [selectedFloor, setSelectedFloor] = useState<FloorOption>(FLOOR_OPTIONS[1] as FloorOption)
  const [selectedTier, setSelectedTier] = useState<PackageTier>(PACKAGE_TIERS[1] as PackageTier)
  const [customArea, setCustomArea] = useState(2000)

  // Calculate built-up area
  const builtUpArea =
    selectedPlot.id === 'custom'
      ? customArea
      : Math.round(selectedPlot.plotArea * selectedFloor.multiplier)

  // Total estimated construction cost
  const totalCost = builtUpArea * selectedTier.rate

  // Cost breakdown
  const civilCost = Math.round(totalCost * 0.48) // 48% Civil & Structural
  const finishingCost = Math.round(totalCost * 0.24) // 24% Flooring & Finishing
  const mepCost = Math.round(totalCost * 0.14) // 14% Electrical & Plumbing
  const joineryCost = Math.round(totalCost * 0.09) // 9% Doors, Windows, Grills
  const designApprovalsCost = totalCost - (civilCost + finishingCost + mepCost + joineryCost) // ~5% Architecture & Approvals

  const waEstimateMessage = `Hi ${site.shortName}, I configured my home on your website calculator:
• *Plot Size:* ${selectedPlot.name}
• *Floors:* ${selectedFloor.name}
• *Built-up Area:* ${builtUpArea.toLocaleString('en-IN')} sq ft
• *Package:* ${selectedTier.name} (₹${selectedTier.rate}/sq ft)
• *Estimated Cost:* ${formatINR(totalCost)}

Please send me the detailed itemized BOQ (Bill of Quantities) and schedule a free site consultation.`

  const handleOpenLeadModal = () => {
    openQuoteModal({
      serviceType: selectedFloor.id === 'G' ? 'Independent House' : 'Duplex Villa',
      plotDimensions: selectedPlot.name,
      builtUpArea,
      estimatedCost: formatINR(totalCost),
      packageTier: selectedTier.name,
      floors: selectedFloor.name,
      source: 'Smart Cost Calculator',
      message: `Calculated ${builtUpArea} sq ft for ${selectedPlot.name} (${selectedFloor.name}) under ${selectedTier.name} package.`,
    })
  }

  return (
    <div className="w-full rounded-[24px] border border-slate-200 bg-white p-6 shadow-xl sm:p-8 lg:p-10">
      {/* Header */}
      <div className="flex flex-col gap-3 pb-6 border-b border-slate-100 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#CE1C73] text-white shadow-sm">
            <Calculator size={22} strokeWidth={2.4} />
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-slate-900 sm:text-2xl">
              Plot-to-House Smart Cost Calculator
            </h3>
            <p className="text-xs text-slate-500">
              Karnataka standard plot dimensions · All-inclusive turnkey estimates with zero hidden costs
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full self-start sm:self-auto">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Rates Updated for 2025–2026</span>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* Left Column: Configurator (7 cols) */}
        <div className="space-y-8 lg:col-span-7">
          {/* 1. Plot Preset Selection */}
          <div>
            <label className="flex items-center gap-2 text-xs font-bold tracking-wider text-slate-700 uppercase">
              <Home size={15} className="text-[#CE1C73]" />
              <span>Step 1: Choose Your Plot Dimension</span>
            </label>
            <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-5">
              {PLOT_PRESETS.map((plot) => {
                const isSelected = selectedPlot.id === plot.id
                return (
                  <button
                    key={plot.id}
                    type="button"
                    onClick={() => setSelectedPlot(plot)}
                    className={`flex flex-col items-center justify-center rounded-xl border py-3 px-2 text-center transition-all ${
                      isSelected
                        ? 'border-2 border-[#CE1C73] bg-[#CE1C73]/5 shadow-xs'
                        : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/70 hover:border-slate-300'
                    }`}
                  >
                    <span className={`font-display text-sm font-bold ${isSelected ? 'text-[#CE1C73]' : 'text-slate-800'}`}>
                      {plot.name}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {plot.plotArea > 0 ? `${plot.plotArea.toLocaleString('en-IN')} sqft` : 'Enter custom'}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Custom Area Slider if "Custom" selected */}
            {selectedPlot.id === 'custom' && (
              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-baseline justify-between">
                  <label htmlFor={customSqftId} className="text-xs font-bold text-slate-700 uppercase">Custom Built-Up Area:</label>
                  <span className="font-display text-lg font-bold text-[#CE1C73]">
                    {customArea.toLocaleString('en-IN')} sq ft
                  </span>
                </div>
                <input
                  id={areaSliderId}
                  type="range"
                  min="600"
                  max="10000"
                  step="50"
                  value={customArea}
                  onChange={(e) => setCustomArea(Number(e.target.value))}
                  className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-[#CE1C73]"
                />
              </div>
            )}
          </div>

          {/* 2. Floor Configuration */}
          {selectedPlot.id !== 'custom' && (
            <div>
              <label className="flex items-center gap-2 text-xs font-bold tracking-wider text-slate-700 uppercase">
                <Building size={15} className="text-[#CE1C73]" />
                <span>Step 2: Choose Floor Configuration</span>
              </label>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {FLOOR_OPTIONS.map((floor) => {
                  const isSelected = selectedFloor.id === floor.id
                  return (
                    <button
                      key={floor.id}
                      type="button"
                      onClick={() => setSelectedFloor(floor)}
                      className={`flex flex-col items-start rounded-xl border p-3.5 text-left transition-all ${
                        isSelected
                          ? 'border-2 border-[#CE1C73] bg-[#CE1C73]/5 shadow-xs'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <span className={`text-xs font-bold ${isSelected ? 'text-[#CE1C73]' : 'text-slate-900'}`}>
                        {floor.label}
                      </span>
                      <span className="mt-1 text-[11px] text-slate-500 leading-snug">
                        {floor.description}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* 3. Package Selection */}
          <div>
            <label className="flex items-center gap-2 text-xs font-bold tracking-wider text-slate-700 uppercase">
              <Sparkles size={15} className="text-[#CE1C73]" />
              <span>Step 3: Select Material &amp; Finish Tier</span>
            </label>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {PACKAGE_TIERS.map((tier) => {
                const isSelected = selectedTier.id === tier.id
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setSelectedTier(tier)}
                    className={`relative flex flex-col justify-between rounded-xl border p-4 text-left transition-all ${
                      isSelected
                        ? 'border-2 border-[#CE1C73] bg-[#CE1C73]/5 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    {tier.popular && (
                      <span className="absolute -top-2.5 right-3 rounded-full bg-[#CE1C73] px-2 py-0.5 text-[9px] font-black tracking-wider text-white uppercase shadow-xs">
                        Popular
                      </span>
                    )}
                    <div>
                      <p className="font-display text-sm font-bold text-slate-900">{tier.name}</p>
                      <p className="mt-1 font-display text-lg font-bold text-[#CE1C73]">
                        ₹{tier.rate.toLocaleString('en-IN')}{' '}
                        <span className="text-xs font-normal text-slate-500">/ sq ft</span>
                      </p>
                      <p className="mt-2 text-[11px] text-slate-600 leading-relaxed">
                        {tier.description}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Output Summary & BOQ Card (5 cols) */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-[#FBFBFC] p-6 shadow-inner lg:col-span-5 sm:p-8">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <span className="text-xs font-bold text-slate-500 uppercase">Calculated Built-Up:</span>
              <span className="font-display text-base font-extrabold text-slate-900">
                {builtUpArea.toLocaleString('en-IN')} <span className="text-xs font-normal text-slate-500">sq ft</span>
              </span>
            </div>

            {/* Main Cost Headline */}
            <div className="pt-6 text-center">
              <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                Estimated Total Construction Cost
              </span>
              <p className="mt-2 font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                {formatINR(totalCost)}
              </p>
              <p className="mt-1 text-xs font-semibold text-[#CE1C73]">
                Rate: ₹{selectedTier.rate}/sq ft · {selectedTier.name}
              </p>
            </div>

            {/* Visual BOQ Breakdown */}
            <div className="mt-8 space-y-3 rounded-xl border border-slate-200/80 bg-white p-4">
              <p className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase">
                <PieChart size={14} className="text-[#CE1C73]" />
                <span>Transparent BOQ Cost Distribution:</span>
              </p>

              <div className="space-y-2.5 pt-1 text-xs">
                {/* Civil */}
                <div>
                  <div className="flex justify-between text-slate-700">
                    <span className="font-medium">Structure &amp; Brickwork (48%)</span>
                    <span className="font-bold text-slate-900">{formatINR(civilCost)}</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-slate-700" style={{ width: '48%' }} />
                  </div>
                </div>

                {/* Finishing */}
                <div>
                  <div className="flex justify-between text-slate-700">
                    <span className="font-medium">Flooring, Tile &amp; Paint (24%)</span>
                    <span className="font-bold text-slate-900">{formatINR(finishingCost)}</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-[#CE1C73]" style={{ width: '24%' }} />
                  </div>
                </div>

                {/* MEP */}
                <div>
                  <div className="flex justify-between text-slate-700">
                    <span className="font-medium">Electrical &amp; Plumbing (14%)</span>
                    <span className="font-bold text-slate-900">{formatINR(mepCost)}</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-blue-600" style={{ width: '14%' }} />
                  </div>
                </div>

                {/* Joinery */}
                <div>
                  <div className="flex justify-between text-slate-700">
                    <span className="font-medium">Doors, Windows &amp; Fabrication (9%)</span>
                    <span className="font-bold text-slate-900">{formatINR(joineryCost)}</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-amber-500" style={{ width: '9%' }} />
                  </div>
                </div>

                {/* Architecture & Approvals */}
                <div>
                  <div className="flex justify-between text-slate-700">
                    <span className="font-medium">Architectural Vastu Plans &amp; Approvals (5%)</span>
                    <span className="font-bold text-slate-900">{formatINR(designApprovalsCost)}</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-emerald-500" style={{ width: '5%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Callouts */}
          <div className="mt-8 space-y-3">
            {/* Primary WhatsApp Action */}
            <a
              href={whatsappUrl(waEstimateMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#20ba59]"
            >
              <MessageCircle size={18} />
              <span>Get Itemized BOQ on WhatsApp</span>
            </a>

            {/* Lock Rate / Request Consultation */}
            <button
              type="button"
              onClick={handleOpenLeadModal}
              className="group flex w-full items-center justify-center rounded-full bg-[#CE1C73] py-3 text-sm font-bold text-white shadow-md shadow-[#CE1C73]/20 transition-all hover:bg-[#B81564]"
            >
              <span>Lock This Rate · Book Site Inspection</span>
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </button>

            <p className="text-center text-[11px] text-slate-400">
              Free site inspection anywhere in Tumkur within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
