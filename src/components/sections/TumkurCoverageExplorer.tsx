'use client'

import React, { useState } from 'react'
import {
  MapPin,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  ArrowRight,
  Home,
  Building2,
  Sparkles,
  Phone,
} from 'lucide-react'

import { Container } from '@/components/ui'
import { useQuoteModal } from '@/components/providers/QuoteModalProvider'
import { contact, site } from '@/content'

export interface LocalityData {
  id: string
  name: string
  zone: string
  distance: string
  completedHomes: number
  soilType: string
  foundationType: string
  popularPlot: string
  landmark: string
  description: string
}

export const TUMKUR_LOCALITIES: LocalityData[] = [
  {
    id: 'ss-puram',
    name: 'SS Puram & Ashok Nagar',
    zone: 'Central Tumkur',
    distance: '1.8 km from Sneha Office',
    completedHomes: 32,
    soilType: 'Hard Red Gravel Strata',
    foundationType: 'Isolated Trapezoidal Footing (5.5 ft depth)',
    popularPlot: '30×40 & 40×60 Duplexes',
    landmark: 'Near SS Puram Main Road & Sree Siddaganga Mutt link',
    description: 'Tumkur’s premier residential belt. High demand for contemporary 3BHK & 4BHK duplexes with teakwood joinery.',
  },
  {
    id: 'batawadi',
    name: 'Batawadi & Ring Road',
    zone: 'East Tumkur',
    distance: '2.2 km from Sneha Office',
    completedHomes: 28,
    soilType: 'Red Loamy Medium-Hard Soil',
    foundationType: 'Combined Footing with Anti-Termite Barrier',
    popularPlot: '30×40 & 30×50 Residences',
    landmark: 'Adjacent to NH-48 Ring Road bypass',
    description: 'Fast-appreciating suburban sector. Ideal for modern family duplexes with dedicated car porch and rooftop terrace.',
  },
  {
    id: 'gubbi-gate',
    name: 'Gubbi Gate & Mandipet',
    zone: 'West Tumkur',
    distance: '3.5 km from Sneha Office',
    completedHomes: 20,
    soilType: 'Clayey Silt Strata (6.5 ft excavation)',
    foundationType: 'Deep RCC Footing with Waterproof Plinth Beam',
    popularPlot: 'Commercial Ground + Duplex Above',
    landmark: 'Near Gubbi Main Road & City Wholesale Market',
    description: 'High commercial value sector. Special expertise in mixed-use structures: ground-floor shops and luxury family living on upper floors.',
  },
  {
    id: 'vinobanagar',
    name: 'Vinobanagar & Siddaganga Ext.',
    zone: 'South-East Tumkur',
    distance: '4.1 km from Sneha Office',
    completedHomes: 24,
    soilType: 'Hard Granitic Sub-strata',
    foundationType: 'Rock-Anchored Columns (IS-456 compliant)',
    popularPlot: '40×60 & Custom Villas',
    landmark: 'Near Siddaganga Institutions & Hill View',
    description: 'Serene, elevated residential neighborhood. Famous for architect-designed contemporary villas with large glass elevations.',
  },
  {
    id: 'kyathsandra',
    name: 'Kyathsandra & Kunigal Road',
    zone: 'South Tumkur',
    distance: '6.8 km from Sneha Office',
    completedHomes: 18,
    soilType: 'Loamy Red Earth with High Percolation',
    foundationType: 'Wide-Base Footings + Rainwater Recharge Pit',
    popularPlot: '50×80 & Expansive Plots',
    landmark: 'Near Bangalore-Tumkur Expressway junction',
    description: 'Spacious plot layouts and luxury weekend homes. Ample space for landscaped gardens, double-height living, and solar integrations.',
  },
  {
    id: 'sira-gate',
    name: 'Sira Gate & Melekote',
    zone: 'North Tumkur',
    distance: '5.2 km from Sneha Office',
    completedHomes: 15,
    soilType: 'Hard Calcareous Red Loam',
    foundationType: 'Standard Column Footing + DPC Protection',
    popularPlot: '30×40 Budget Duplexes & Rentals',
    landmark: 'Near Sira Main Road & Industrial Hub',
    description: 'Excellent rental yield corridor. Popular for independent G+1 and G+2 multi-unit homes designed for rental income.',
  },
]

export function TumkurCoverageExplorer() {
  const { openQuoteModal } = useQuoteModal()
  const [activeLocality, setActiveLocality] = useState<LocalityData>(TUMKUR_LOCALITIES[0] as LocalityData)

  const handleBookLocalityInspection = (locality: LocalityData) => {
    openQuoteModal({
      serviceType: 'Site visit request',
      locality: locality.name,
      source: `Tumkur Coverage Explorer: ${locality.name}`,
      message: `I have a plot at ${locality.name}. Please arrange a free site inspection and soil consultation (Foundation recommendation: ${locality.foundationType}).`,
    })
  }

  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 sm:py-28">
      <Container>
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            We Build Across Tumkur
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base leading-relaxed">
            Every neighborhood in Tumkur has distinct soil mechanics and water tables. With 25+ years on the ground, our structural engineers tailor your foundation depth and concrete mix to your exact locality.
          </p>
        </div>

        {/* Localities Interactive Grid & Detail View */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column: Locality Selector List (5 cols) */}
          <div className="space-y-3 lg:col-span-5">
            <p className="text-xs font-bold tracking-wider text-slate-500 uppercase px-1">
              Select Your Neighborhood:
            </p>
            <div className="space-y-2.5">
              {TUMKUR_LOCALITIES.map((loc) => {
                const isSelected = activeLocality.id === loc.id
                return (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => setActiveLocality(loc)}
                    className={`group relative flex w-full items-center justify-between rounded-2xl border p-4 text-left transition-all duration-200 ${
                      isSelected
                        ? 'border-2 border-[#CE1C73] bg-white shadow-md'
                        : 'border-slate-200 bg-white/70 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                          isSelected
                            ? 'bg-[#CE1C73] text-white'
                            : 'bg-slate-100 text-slate-600 group-hover:bg-[#CE1C73]/10 group-hover:text-[#CE1C73]'
                        }`}
                      >
                        <MapPin size={18} />
                      </div>
                      <div>
                        <h4
                          className={`font-display text-sm font-bold ${
                            isSelected ? 'text-[#CE1C73]' : 'text-slate-900'
                          }`}
                        >
                          {loc.name}
                        </h4>
                        <p className="text-[11px] text-slate-500">{loc.zone} · {loc.completedHomes}+ Homes</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 group-hover:text-[#CE1C73]">
                      <ArrowRight size={14} className={isSelected ? 'text-[#CE1C73]' : ''} />
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right Column: Active Locality Engineering Breakdown (7 cols) */}
          <div className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-xl lg:col-span-7 sm:p-8">
            <div>
              {/* Header Badge */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5">
                <div>
                  <span className="text-[10px] font-bold tracking-wider text-[#CE1C73] uppercase">
                    {activeLocality.zone}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-slate-900">
                    {activeLocality.name}
                  </h3>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-200">
                  <CheckCircle2 size={14} className="text-emerald-600" />
                  <span>{activeLocality.completedHomes}+ Projects Completed</span>
                </div>
              </div>

              {/* Description */}
              <p className="mt-4 text-xs text-slate-600 sm:text-sm leading-relaxed">
                {activeLocality.description}
              </p>

              {/* Engineering Specs Grid */}
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Soil Profile */}
                <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    <Layers size={14} className="text-[#CE1C73]" />
                    <span>Soil Profile</span>
                  </div>
                  <p className="font-display text-sm font-semibold text-slate-900">
                    {activeLocality.soilType}
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Tested across multiple sites for accurate bearing capacity.
                  </p>
                </div>

                {/* Foundation Recommendation */}
                <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    <ShieldCheck size={14} className="text-[#CE1C73]" />
                    <span>Recommended Foundation</span>
                  </div>
                  <p className="font-display text-sm font-semibold text-slate-900">
                    {activeLocality.foundationType}
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Designed to prevent settlement and crack formation.
                  </p>
                </div>

                {/* Popular Plot Typology */}
                <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    <Home size={14} className="text-[#CE1C73]" />
                    <span>Dominant Configuration</span>
                  </div>
                  <p className="font-display text-sm font-semibold text-slate-900">
                    {activeLocality.popularPlot}
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Maximum FSI utilization within municipal setback guidelines.
                  </p>
                </div>

                {/* Service Range */}
                <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    <Building2 size={14} className="text-[#CE1C73]" />
                    <span>Site Proximity</span>
                  </div>
                  <p className="font-display text-sm font-semibold text-slate-900">
                    {activeLocality.distance}
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Our site engineers visit within 30 minutes for daily supervision.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Actions for Active Locality */}
            <div className="mt-8 flex flex-col gap-3 pt-6 border-t border-slate-100 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-xs text-slate-500">
                <span>Landmark reference:</span>{' '}
                <strong className="text-slate-800">{activeLocality.landmark}</strong>
              </div>

              <button
                type="button"
                onClick={() => handleBookLocalityInspection(activeLocality)}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#CE1C73] px-6 py-3 text-xs font-bold text-white shadow-md shadow-[#CE1C73]/20 transition-all hover:bg-[#B81564]"
              >
                <span>Book Free Site Inspection in {activeLocality.name.split('&')[0]?.trim()}</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Tumkur Taluk Coverage Ribbon */}
        <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-xs">
          <p className="text-xs text-slate-600">
            <strong className="text-slate-900">Building outside Tumkur city limits?</strong> We also undertake turnkey projects across{' '}
            <span className="font-semibold text-[#CE1C73]">Gubbi, Kunigal, Koratagere, Sira, Tiptur &amp; Turuvekere taluks</span>. Call our engineering desk at{' '}
            <a href={contact.phoneHref} className="font-bold text-slate-900 underline hover:text-[#CE1C73]">
              {contact.phoneDisplay}
            </a>
            .
          </p>
        </div>
      </Container>
    </section>
  )
}
