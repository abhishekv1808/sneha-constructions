'use client'

import React, { useState } from 'react'
import {
  Compass,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Droplets,
  Bed,
  DoorOpen,
  ArrowRight,
  MessageCircle,
} from 'lucide-react'
import { useQuoteModal } from '@/components/providers/QuoteModalProvider'
import { site, whatsappUrl } from '@/content'

interface VastuGuideline {
  zone: string
  element: string
  bestFor: string
  avoid: string
  score: 'Supreme' | 'Auspicious' | 'Neutral' | 'Careful'
  description: string
}

interface DirectionConfig {
  id: string
  name: string
  kannadaName: string
  rulingPlanet: string
  element: string
  rating: string
  guidelines: {
    mainDoor: string
    kitchen: string
    masterBedroom: string
    poojaRoom: string
    waterSump: string
    staircase: string
  }
  tips: string[]
}

const DIRECTIONS: Record<string, DirectionConfig> = {
  East: {
    id: 'East',
    name: 'East Facing',
    kannadaName: 'Poorva (ಪೂರ್ವ)',
    rulingPlanet: 'Surya (Sun) & Indra',
    element: 'Air / Fire transition',
    rating: 'Highly Auspicious ⭐⭐⭐⭐⭐',
    guidelines: {
      mainDoor: 'Jayanta & Mahendra padas (Northeast of East wall) — grants prosperity and clarity',
      kitchen: 'Southeast (Agneya corner) facing East while cooking',
      masterBedroom: 'Southwest (Nairutya) corner for family stability and health',
      poojaRoom: 'Northeast (Eshanya) corner with deities facing East or West',
      waterSump: 'Northeast zone — pure divine flow',
      staircase: 'South or West wall in clockwise ascent',
    },
    tips: [
      'Leave more open space towards East and North than South and West.',
      'Construct a lower compound wall on the East side to welcome morning sunlight.',
      'Ensure kitchen platform allows the cook to face East towards the morning sun.',
    ],
  },
  North: {
    id: 'North',
    name: 'North Facing',
    kannadaName: 'Uttara (ಉತ್ತರ)',
    rulingPlanet: 'Kuber (Lord of Wealth) & Mercury',
    element: 'Water (Jala)',
    rating: 'Supreme for Wealth ⭐⭐⭐⭐⭐',
    guidelines: {
      mainDoor: 'Mukhya & Bhallata padas (North to Northeast) — brings abundant cash flow',
      kitchen: 'Southeast (Agneya corner) — second choice Northwest (Vayavya)',
      masterBedroom: 'Southwest (Nairutya) corner — heaviest zone of the building',
      poojaRoom: 'Northeast (Eshanya) zone, pristine and light',
      waterSump: 'North or Northeast quadrant underground',
      staircase: 'South or West side — keep North open and uncluttered',
    },
    tips: [
      'North facing homes naturally attract financial growth and business stability.',
      'Keep the northern boundary wall 3-6 inches lower than southern boundary.',
      'Ideal for duplex villas with large glass glazing towards the North for glare-free light.',
    ],
  },
  NorthEast: {
    id: 'NorthEast',
    name: 'North-East Facing',
    kannadaName: 'Eshanya (ಈಶಾನ್ಯ)',
    rulingPlanet: 'Shiva / Jupiter (Guru)',
    element: 'Pure Water / Divine Light',
    rating: 'Sacred Sanctuary ⭐⭐⭐⭐⭐',
    guidelines: {
      mainDoor: 'Exact Eshanya zone — highest spiritual vibration and health harmony',
      kitchen: 'Southeast (Agneya) — strictly avoid kitchen in Northeast',
      masterBedroom: 'Southwest (Nairutya) corner',
      poojaRoom: 'Northeast core zone with prayer altar',
      waterSump: 'Underground tank or borewell right in Northeast',
      staircase: 'Strictly avoid staircase in Northeast corner; locate in South/West',
    },
    tips: [
      'Never place septic tanks, toilets, or heavy overhead water tanks in the North-East.',
      'Keep this corner the lowest and most illuminated zone of your plot.',
      'Incorporate a water feature or tulasi katte in this front yard.',
    ],
  },
  West: {
    id: 'West',
    name: 'West Facing',
    kannadaName: 'Paschima (ಪಶ್ಚಿಮ)',
    rulingPlanet: 'Varuna & Saturn (Shani)',
    element: 'Air / Space',
    rating: 'Great for Professionals & Traders ⭐⭐⭐⭐',
    guidelines: {
      mainDoor: 'Pushpadanta & Varuna padas in the center/middle-west',
      kitchen: 'Southeast (Agneya) is ideal; Northwest is secondary',
      masterBedroom: 'Southwest (Nairutya) for authoritative head of family',
      poojaRoom: 'Northeast zone, well-partitioned with sacred lighting',
      waterSump: 'Northeast underground; overhead tank in Southwest',
      staircase: 'South or West side; turns clockwise towards upper floors',
    },
    tips: [
      'Ideal for doctors, engineers, advocates, politicians, and business owners.',
      'Keep rear (East/North) open setbacks wider than front (West) setbacks.',
      'Plant shady trees or install vertical fins on West facade to buffer afternoon heat.',
    ],
  },
  South: {
    id: 'South',
    name: 'South Facing',
    kannadaName: 'Dakshina (ದಕ್ಷಿಣ)',
    rulingPlanet: 'Yama & Mars (Mangala)',
    element: 'Fire / Earth',
    rating: 'Powerful & Energetic ⭐⭐⭐⭐',
    guidelines: {
      mainDoor: 'Gruhakshata or Vitatha pada (Southeast side of South wall) — strictly avoid Nairutya door',
      kitchen: 'Southeast (Agneya) corner, perfectly aligning with cosmic fire',
      masterBedroom: 'Southwest (Nairutya) corner with bed headboard towards South',
      poojaRoom: 'Northeast (Eshanya) sector towards quiet side of the home',
      waterSump: 'Northeast quadrant strictly; never put borewell in South',
      staircase: 'South or Southwest — adds heavy structural stability',
    },
    tips: [
      'Contrary to common myth, South-facing plots engineered by experts bring massive status and vitality.',
      'Keep southern boundary wall higher and thicker than the northern boundary.',
      'Our civil engineers create high-efficiency natural cross-ventilation for South plots.',
    ],
  },
  SouthEast: {
    id: 'SouthEast',
    name: 'South-East Corner',
    kannadaName: 'Agneya (ಆಗ್ನೇಯ)',
    rulingPlanet: 'Venus (Shukra) & Agni',
    element: 'Fire (Tejas)',
    rating: 'Dynamic Energy Zone ⭐⭐⭐⭐',
    guidelines: {
      mainDoor: 'East side near Agneya or pure East entrance',
      kitchen: 'Agneya corner — supreme alignment with cooking flame',
      masterBedroom: 'Southwest (Nairutya)',
      poojaRoom: 'Northeast quadrant',
      waterSump: 'Northeast strictly; avoid water bodies in South-East',
      staircase: 'South wall',
    },
    tips: [
      'Ensure high electrical safety and clean utility routing in this fire corner.',
      'Avoid placing master bedrooms in Agneya to prevent restlessness.',
    ],
  },
  NorthWest: {
    id: 'NorthWest',
    name: 'North-West Facing',
    kannadaName: 'Vayavya (ವಾಯವ್ಯ)',
    rulingPlanet: 'Moon (Chandra) & Vayu',
    element: 'Wind (Movement)',
    rating: 'Prosperity & Opportunity ⭐⭐⭐⭐',
    guidelines: {
      mainDoor: 'North-Northwest entrance',
      kitchen: 'Southeast (Agneya) or secondary Northwest',
      masterBedroom: 'Southwest (Nairutya); guest rooms perfect in Northwest',
      poojaRoom: 'Northeast quadrant',
      waterSump: 'Northeast underground',
      staircase: 'West or South wall',
    },
    tips: [
      'Excellent for guest bedrooms, unmarried daughters, and moving goods storage.',
      'Ensure strong ventilation and operable windows on the Northwest wall.',
    ],
  },
  SouthWest: {
    id: 'SouthWest',
    name: 'South-West Plot',
    kannadaName: 'Nairutya (ನೈಋತ್ಯ)',
    rulingPlanet: 'Rahu & Nirrithi',
    element: 'Earth (Prithvi)',
    rating: 'Heavy Foundation Zone ⭐⭐⭐',
    guidelines: {
      mainDoor: 'Must enter from adjacent West or South padas, never corner cut',
      kitchen: 'Southeast (Agneya) corner',
      masterBedroom: 'Exact Southwest corner — grants supreme leadership',
      poojaRoom: 'Northeast quadrant',
      waterSump: 'Northeast underground; heavy overhead tank in Southwest',
      staircase: 'Southwest or South',
    },
    tips: [
      'Must have the highest floor elevation and heaviest structural columns.',
      'Our architects optimize Nairutya plots with custom Vastu neutralizers and setbacks.',
    ],
  },
}

export function VastuAdvisor() {
  const { openQuoteModal } = useQuoteModal()
  const [selectedDirection, setSelectedDirection] = useState<string>('East')

  const currentDir = (DIRECTIONS[selectedDirection] ?? DIRECTIONS['East']) as DirectionConfig

  const handleClaimVastuPlan = () => {
    openQuoteModal({
      serviceType: 'Residential',
      vastuFacing: currentDir.name,
      source: 'Vastu Direction Advisor',
      message: `Requesting Free 2D Vastu Compliant Floor Plan for ${currentDir.name} (${currentDir.kannadaName}) plot.`,
    })
  }

  const waVastuMessage = `Hi ${site.shortName}, I checked my plot Vastu on your website for *${currentDir.name} (${currentDir.kannadaName})*.

Can you share a free 2D sample floor plan layout compliant with Vastu Shastra for this facing?`

  return (
    <div className="w-full rounded-[24px] border border-slate-200 bg-white p-6 shadow-xl sm:p-8 lg:p-10">
      {/* Header */}
      <div className="flex flex-col gap-3 pb-6 border-b border-slate-100 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#CE1C73] text-white shadow-sm">
            <Compass size={22} strokeWidth={2.2} />
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-slate-900 sm:text-2xl">
              Vastu Plot Direction Advisor
            </h3>
            <p className="text-xs text-slate-500">
              Karnataka traditional Vastu Shastra rules combined with modern civil engineering
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-[#CE1C73] bg-pink-50 px-3 py-1.5 rounded-full self-start sm:self-auto">
          <Sparkles size={14} />
          <span>100% Vastu Guaranteed by Sneha</span>
        </div>
      </div>

      {/* 8 Direction Compass Pills */}
      <div className="mt-6">
        <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
          Select Your Plot Facing Direction:
        </label>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
          {Object.keys(DIRECTIONS).map((dirKey) => {
            const dir = DIRECTIONS[dirKey]
            if (!dir) return null
            const isSelected = selectedDirection === dirKey
            return (
              <button
                key={dirKey}
                type="button"
                onClick={() => setSelectedDirection(dirKey)}
                className={`flex flex-col items-center justify-center rounded-xl border py-3 px-2 text-center transition-all ${
                  isSelected
                    ? 'border-2 border-[#CE1C73] bg-[#CE1C73]/5 shadow-xs'
                    : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <span className={`font-display text-sm font-bold ${isSelected ? 'text-[#CE1C73]' : 'text-slate-800'}`}>
                  {dirKey}
                </span>
                <span className="text-[10px] text-slate-500 truncate max-w-full">
                  {dir.kannadaName.split(' ')[0]}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Direction Details Panel */}
      <div className="mt-8 rounded-2xl border border-slate-200 bg-[#FBFBFC] p-6 sm:p-8">
        {/* Top Info Bar */}
        <div className="flex flex-col gap-3 pb-6 border-b border-slate-200 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-display text-2xl font-extrabold text-slate-900">
                {currentDir.name}
              </h4>
              <span className="rounded-full bg-slate-200/80 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
                {currentDir.kannadaName}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Ruling Deity: <strong>{currentDir.rulingPlanet}</strong> · Cosmic Element: <strong>{currentDir.element}</strong>
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-800 shadow-xs">
            {currentDir.rating}
          </div>
        </div>

        {/* 6 Key Architectural Placements */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Main Entrance */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase">
              <DoorOpen size={16} className="text-[#CE1C73]" />
              <span>Main Door (Simha Dwara)</span>
            </div>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              {currentDir.guidelines.mainDoor}
            </p>
          </div>

          {/* Kitchen */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase">
              <Flame size={16} className="text-orange-500" />
              <span>Kitchen (Agneya Zone)</span>
            </div>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              {currentDir.guidelines.kitchen}
            </p>
          </div>

          {/* Master Bedroom */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase">
              <Bed size={16} className="text-indigo-600" />
              <span>Master Bedroom (Nairutya)</span>
            </div>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              {currentDir.guidelines.masterBedroom}
            </p>
          </div>

          {/* Pooja Room */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase">
              <Sparkles size={16} className="text-amber-500" />
              <span>Pooja Room (Eshanya)</span>
            </div>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              {currentDir.guidelines.poojaRoom}
            </p>
          </div>

          {/* Water Sump & Borewell */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase">
              <Droplets size={16} className="text-blue-600" />
              <span>Underground Sump / Borewell</span>
            </div>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              {currentDir.guidelines.waterSump}
            </p>
          </div>

          {/* Staircase */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase">
              <CheckCircle2 size={16} className="text-emerald-600" />
              <span>Staircase Alignment</span>
            </div>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              {currentDir.guidelines.staircase}
            </p>
          </div>
        </div>

        {/* Expert Tips */}
        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50/60 p-4">
          <p className="text-xs font-bold text-amber-900 uppercase">
            Senior Architect Vastu Tips for {currentDir.name}:
          </p>
          <ul className="mt-2 space-y-1.5 text-xs text-amber-900/90">
            {currentDir.tips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#CE1C73] font-bold">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Lead Capture Magnet Action Bar */}
        <div className="mt-8 flex flex-col gap-4 rounded-xl bg-white p-5 border border-slate-200 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h5 className="font-display text-base font-bold text-slate-900">
              Get a Customized 2D Vastu Floor Plan for Your Plot
            </h5>
            <p className="text-xs text-slate-500">
              Drafted by Sneha&apos;s senior licensed architects in Tumkur · 100% Free · No obligation
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={whatsappUrl(waVastuMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#20ba59]"
            >
              <MessageCircle size={16} />
              <span>WhatsApp Floor Plan</span>
            </a>

            <button
              type="button"
              onClick={handleClaimVastuPlan}
              className="group flex items-center justify-center rounded-full bg-[#CE1C73] px-5 py-2.5 text-xs font-bold text-white shadow-sm shadow-[#CE1C73]/20 transition-all hover:bg-[#B81564]"
            >
              <span>Claim Free 2D Layout</span>
              <ArrowRight size={14} className="ml-1.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
