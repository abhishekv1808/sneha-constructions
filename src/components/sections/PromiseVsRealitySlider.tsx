'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import Image from 'next/image'
import {
  ChevronsLeftRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Building,
  ArrowRight,
  Eye,
} from 'lucide-react'

import { Container } from '@/components/ui'
import { useQuoteModal } from '@/components/providers/QuoteModalProvider'

// Real image assets
import heroIndianDuplex from '@/assets/hero/hero-indian-duplex.jpg'
import residentialHeroVilla from '@/assets/services/bespoke/residential-hero-villa.jpg'

interface ComparisonProject {
  id: string
  title: string
  location: string
  area: string
  beforeLabel: string
  beforeImage: string
  afterLabel: string
  afterImage: typeof residentialHeroVilla
  tagline: string
  specs: string[]
}

const COMPARISON_PROJECTS: ComparisonProject[] = [
  {
    id: 'sunset-court',
    title: 'Sunset Court Luxury Duplex',
    location: 'SS Puram, Tumkur',
    area: '3,600 sq ft',
    beforeLabel: '3D Architectural BIM / CAD Render',
    beforeImage: '/frames/ezgif-frame-001.jpg',
    afterLabel: '100% Matching Completed Residence',
    afterImage: residentialHeroVilla,
    tagline: 'Zero elevation deviation between approved 3D model and final keys handover.',
    specs: ['Burma Teak Entrance', 'Double-height Living Glass', 'Parametric Exterior Louvers'],
  },
  {
    id: 'mahalaxmi-villa',
    title: 'Sri Mahalaxmi Modern Duplex',
    location: 'Gubbi Main Road, Tumkur',
    area: '3,200 sq ft',
    beforeLabel: 'Approved Elevation Drawing',
    beforeImage: '/frames/ezgif-frame-015.jpg',
    afterLabel: 'Actual Handover Reality',
    afterImage: heroIndianDuplex,
    tagline: 'Every cantilever, window proportion, and textured groove executed to precision.',
    specs: ['4BHK Duplex Plan', 'Kajaria 4×2 Glazed Vitrified', 'Schneider Modular Automation'],
  },
]

export function PromiseVsRealitySlider() {
  const { openQuoteModal } = useQuoteModal()
  const [sliderPosition, setSliderPosition] = useState(50) // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false)
  const [activeProjectIndex, setActiveProjectIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const activeProject = COMPARISON_PROJECTS[activeProjectIndex] ?? COMPARISON_PROJECTS[0]!

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100))
    setSliderPosition(percent)
  }, [])

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches[0]) {
        handleMove(e.touches[0].clientX)
      }
    },
    [handleMove]
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX)
      }
    },
    [isDragging, handleMove]
  )

  const handleMouseUp = () => setIsDragging(false)

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false)
    window.addEventListener('mouseup', handleGlobalMouseUp)
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp)
  }, [])

  const handleBookConsultation = () => {
    openQuoteModal({
      serviceType: 'Residential',
      locality: activeProject.location,
      source: `Promise vs Reality: ${activeProject.title}`,
      message: `I saw your 3D Render vs Real Handover comparison for "${activeProject.title}". I would like a 3D elevation design consultation for my plot in Tumkur.`,
    })
  }

  return (
    <section className="relative bg-[#031424] py-20 text-white sm:py-28 overflow-hidden">
      {/* Background atmospheric glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#CE1C73]/15 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-10 right-1/4 h-80 w-80 rounded-full bg-blue-600/10 blur-[100px]"
      />

      <Container>
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs font-bold tracking-wider text-[#CE1C73] uppercase backdrop-blur-sm">
            <Eye size={14} />
            <span>Uncompromising Architectural Fidelity</span>
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Promise vs.{' '}
            <span className="bg-gradient-to-r from-[#CE1C73] to-pink-400 bg-clip-text text-transparent">
              Reality
            </span>
          </h2>
          <p className="mt-3 text-sm text-slate-300 sm:text-base leading-relaxed">
            Many builders show stunning 3D pictures but deliver compromised buildings. At Sneha Constructions, what our architects design in 3D CAD is 100% what our civil engineers build on your plot.
          </p>

          {/* Project Switcher Pills */}
          <div className="mt-8 inline-flex rounded-xl border border-white/15 bg-white/5 p-1 backdrop-blur-md">
            {COMPARISON_PROJECTS.map((proj, idx) => (
              <button
                key={proj.id}
                type="button"
                onClick={() => {
                  setActiveProjectIndex(idx)
                  setSliderPosition(50)
                }}
                className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                  activeProjectIndex === idx
                    ? 'bg-[#CE1C73] text-white shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {proj.title}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Comparison Slider Container */}
        <div className="mt-12 mx-auto max-w-4xl">
          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchMove={handleTouchMove}
            className="group relative h-[380px] w-full cursor-ew-resize select-none overflow-hidden rounded-[28px] border-2 border-white/20 bg-slate-900 shadow-2xl sm:h-[480px] lg:h-[520px]"
          >
            {/* UNDERLYING LAYER: Real Handover Reality (Right side) */}
            <div className="absolute inset-0">
              <Image
                src={activeProject.afterImage}
                alt={`${activeProject.title} - Real Completed Reality`}
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover"
                priority
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
              />
            </div>

            {/* TOP CLIPPED LAYER: 3D Architectural CAD Render (Left side) */}
            <div
              className="absolute inset-0 transition-[clip-path] duration-75 ease-out"
              style={{
                clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
              }}
            >
              {/* If beforeImage is a string URL */}
              <div className="relative h-full w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeProject.beforeImage}
                  alt={`${activeProject.title} - 3D Architectural Promise`}
                  className="h-full w-full object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                />
              </div>
            </div>

            {/* Floating Tag: Left (3D Promise) */}
            <div className="absolute top-5 left-5 z-20 pointer-events-none">
              <span className="flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1 text-[11px] font-bold text-amber-400 backdrop-blur-md border border-amber-400/30">
                <Sparkles size={12} />
                <span>3D Architectural CAD Model</span>
              </span>
            </div>

            {/* Floating Tag: Right (Real Handover) */}
            <div className="absolute top-5 right-5 z-20 pointer-events-none">
              <span className="flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1 text-[11px] font-bold text-emerald-400 backdrop-blur-md border border-emerald-400/30">
                <CheckCircle2 size={12} />
                <span>100% Real Handover in Tumkur</span>
              </span>
            </div>

            {/* Slider Dividing Bar & Draggable Handle */}
            <div
              className="absolute inset-y-0 z-30 flex items-center justify-center pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Vertical line */}
              <div className="h-full w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]" />

              {/* Center circular handle */}
              <div className="absolute flex h-12 w-12 items-center justify-center rounded-full bg-[#CE1C73] text-white shadow-xl shadow-[#CE1C73]/60 border-2 border-white transition-transform group-hover:scale-110">
                <ChevronsLeftRight size={20} strokeWidth={2.5} />
              </div>
            </div>

            {/* Bottom Meta Overlay */}
            <div className="absolute inset-x-0 bottom-0 z-20 p-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end pointer-events-none">
              <div>
                <p className="text-xs font-semibold text-[#CE1C73]">
                  {activeProject.location} · {activeProject.area}
                </p>
                <h3 className="font-display text-lg font-bold text-white sm:text-xl">
                  {activeProject.title}
                </h3>
                <p className="mt-1 text-xs text-slate-300 max-w-md">
                  {activeProject.tagline}
                </p>
              </div>

              {/* Drag Prompt Hint */}
              <div className="rounded-full bg-black/60 px-3 py-1.5 text-[10px] font-bold tracking-wider text-white uppercase backdrop-blur-md border border-white/15 self-start sm:self-auto">
                ⟵ Drag Left / Right to Compare ⟶
              </div>
            </div>
          </div>

          {/* Under-Slider Trust Strip & Action */}
          <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 sm:flex-row sm:p-5 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#CE1C73]/20 text-[#CE1C73]">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white sm:text-sm">
                  Laser-Guided Execution Guarantee
                </h4>
                <p className="text-[11px] text-slate-400">
                  Every beam cantilever, window proportion, and facade stone matches the approved drawings.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleBookConsultation}
              className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#CE1C73] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#B81564] transition-all"
            >
              <span>Get 3D Elevation for Your Plot</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}
