'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image, { type StaticImageData } from 'next/image'
import {
  Play,
  X,
  MapPin,
  Clock,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  HardHat,
  ArrowRight,
  ShieldCheck,
  Volume2,
  VolumeX,
} from 'lucide-react'

import { Container } from '@/components/ui'
import { useQuoteModal } from '@/components/providers/QuoteModalProvider'
import { site, whatsappUrl } from '@/content'

// Static image imports
import architectInspectingSite from '@/assets/team/architect-inspecting-site.jpg'
import indianWorkersCraft from '@/assets/team/indian-workers-craft.jpg'
import heroIndianDuplex from '@/assets/hero/hero-indian-duplex.jpg'
import turnkeyHeroResidence from '@/assets/services/bespoke/turnkey-hero-residence.jpg'
import residentialHeroVilla from '@/assets/services/bespoke/residential-hero-villa.jpg'

export interface SiteReel {
  id: string
  title: string
  location: string
  duration: string
  stage: string
  stageNumber: string
  description: string
  highlights: string[]
  quote: string
  engineer: string
  image: StaticImageData
}

export const SITE_REELS: SiteReel[] = [
  {
    id: 'reel-vastu-layout',
    title: 'Bhoomi Pooje & 100% Vastu Marking',
    location: 'Gubbi Gate, Tumkur',
    duration: '0:45',
    stage: 'Groundwork & Footing',
    stageNumber: '01',
    description: 'Marking exact cardinal solar axes, excavation to hard strata, and anti-termite soil treatment before footing PCC.',
    highlights: ['Vastu compass alignment', 'IS 6313 Soil Treatment', 'Footing PCC M15 casting'],
    quote: 'Zero deviation from sanctioned setback lines and Vastu corners.',
    engineer: 'Er. Naveen Kumar, Structural Lead',
    image: residentialHeroVilla,
  },
  {
    id: 'reel-rebar-check',
    title: 'Tata Tiscon FE-550D Steel Quality Check',
    location: 'SS Puram, Tumkur',
    duration: '0:58',
    stage: 'Column & Rebar Inspection',
    stageNumber: '02',
    description: 'Senior engineer checking column stirrup 135° hook bends, rebar lap length 50d, and concrete cover blocks.',
    highlights: ['100% Primary Tata Tiscon', 'Laser level checking', '40mm cover blocks verification'],
    quote: 'Every tie wire and bend tested before shuttering closes.',
    engineer: 'Er. R. Abhishek, Site In-charge',
    image: architectInspectingSite,
  },
  {
    id: 'reel-slab-casting',
    title: 'Machine Concrete Slab Pouring & Curing',
    location: 'Batawadi, Tumkur',
    duration: '0:52',
    stage: 'RCC Slab Casting',
    stageNumber: '03',
    description: 'Monolithic roof slab casting with M25 design mix, needle vibrators to eliminate honeycombing, and 21-day pond curing.',
    highlights: ['M25 Design Mix with Ultratech', 'High-frequency needle compaction', 'Cube testing at 7 & 28 days'],
    quote: 'Pond curing kept continuously wet for 21 days for maximum compressive strength.',
    engineer: 'Er. Basavaraj S., Quality Engineer',
    image: indianWorkersCraft,
  },
  {
    id: 'reel-joinery-finishing',
    title: 'Teakwood Joinery & Laser Flooring',
    location: 'Vinobanagar, Tumkur',
    duration: '0:48',
    stage: 'Finishing & Interiors',
    stageNumber: '04',
    description: 'Hand-crafted Burma teak main door frame installation, concealed plumbing pressure check at 7 bar, and 4x2 vitrified tiles.',
    highlights: ['1st-Quality Teakwood Main Frame', '7-Bar CPVC Pressure Testing', 'Kajaria 4x2 double-charged vitrified'],
    quote: 'Tile spacers and laser leveling guarantee zero lippage across all rooms.',
    engineer: 'Mahesh K., Finishing Supervisor',
    image: turnkeyHeroResidence,
  },
  {
    id: 'reel-key-handover',
    title: 'Grand Housewarming & Turnkey Handover',
    location: 'Sira Gate, Tumkur',
    duration: '1:00',
    stage: 'Key Handover & Warranty',
    stageNumber: '05',
    description: 'Delivering a 3,400 sq ft 4BHK duplex on schedule. Handing over the 5-Year Structural Warranty certificate and as-built drawings.',
    highlights: ['Completed in 11 months', 'Zero cost overrun guarantee', '5-Year Written Warranty Document'],
    quote: 'Handed over on the auspicious Gruhapravesha date without a single rupee of price escalation.',
    engineer: 'Er. R. Abhishek, Chief Consultant',
    image: heroIndianDuplex,
  },
]

export function SiteShortsCarousel() {
  const { openQuoteModal } = useQuoteModal()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [activeReel, setActiveReel] = useState<SiteReel | null>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [playbackProgress, setPlaybackProgress] = useState(25)

  // Carousel scroll controls
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -340 : 340
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' })
    }
  }

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveReel(null)
      }
    }
    if (activeReel) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [activeReel])

  // Simulated progress bar ticker when modal is open
  useEffect(() => {
    if (!activeReel || !isPlaying) return
    const interval = setInterval(() => {
      setPlaybackProgress((prev) => (prev >= 100 ? 5 : prev + 3))
    }, 400)
    return () => clearInterval(interval)
  }, [activeReel, isPlaying])

  const handleOpenSiteVisit = (reel: SiteReel) => {
    setActiveReel(null)
    openQuoteModal({
      serviceType: 'Site visit request',
      locality: reel.location,
      source: `Tumkur Site Reel: ${reel.title}`,
      message: `I watched the video for "${reel.title}" at ${reel.location}. I would like to schedule a site visit or inspect an ongoing build in Tumkur.`,
    })
  }

  return (
    <section className="relative overflow-hidden bg-[#031424] py-20 text-white sm:py-28">
      {/* Background radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-[#CE1C73]/15 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-10 h-80 w-80 rounded-full bg-blue-600/10 blur-[100px]"
      />

      <Container>
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs font-bold tracking-wider text-[#CE1C73] uppercase">
              <HardHat size={14} />
              <span>Transparent Fieldwork · Tumkur Sites</span>
            </div>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              See How We Build,{' '}
              <span className="bg-gradient-to-r from-[#CE1C73] to-pink-400 bg-clip-text text-transparent">
                In 60 Seconds
              </span>
            </h2>
            <p className="mt-3 text-sm text-slate-300 sm:text-base leading-relaxed">
              No stock renderings. Real site supervision, certified IS-standard materials, and craftsmanship
              filmed live at our active residential projects across Tumkur.
            </p>
          </div>

          {/* Nav arrows */}
          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              onClick={() => scroll('left')}
              aria-label="Previous reel"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/40"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              aria-label="Next reel"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/40"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel Row (9:16 vertical cards) */}
        <div
          ref={scrollContainerRef}
          className="mt-12 flex gap-5 overflow-x-auto pb-4 pt-2 snap-x snap-mandatory scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {SITE_REELS.map((reel) => (
            <div
              key={reel.id}
              onClick={() => {
                setActiveReel(reel)
                setIsPlaying(true)
                setPlaybackProgress(10)
              }}
              className="group relative h-[480px] w-[270px] shrink-0 cursor-pointer overflow-hidden rounded-[24px] border border-white/15 bg-slate-900 shadow-2xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[#CE1C73]/70 hover:shadow-[#CE1C73]/20 snap-start sm:h-[510px] sm:w-[286px]"
            >
              {/* Background Poster Image */}
              <Image
                src={reel.image}
                alt={reel.title}
                fill
                sizes="(max-width: 640px) 270px, 286px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient Overlays */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-[#031424] via-[#031424]/40 to-black/60"
              />

              {/* Top Bar: Stage Badge & Duration */}
              <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 z-10">
                <span className="flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-extrabold tracking-wider text-[#CE1C73] uppercase backdrop-blur-md border border-white/10">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#CE1C73] animate-pulse" />
                  {reel.stageNumber} · {reel.stage}
                </span>

                <span className="flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-[11px] font-bold text-slate-300 backdrop-blur-md">
                  <Clock size={12} />
                  <span>{reel.duration}</span>
                </span>
              </div>

              {/* Center Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#CE1C73] text-white shadow-lg shadow-[#CE1C73]/50 transition-transform duration-300 group-hover:scale-110">
                  <Play size={24} className="ml-1 fill-white" />
                </div>
              </div>

              {/* Bottom Card Content */}
              <div className="absolute inset-x-0 bottom-0 p-5 z-10">
                <div className="flex items-center gap-1 text-xs font-semibold text-emerald-400 mb-1.5">
                  <MapPin size={13} />
                  <span>{reel.location}</span>
                </div>
                <h3 className="font-display text-base font-bold leading-snug text-white group-hover:text-pink-200 transition-colors">
                  {reel.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-xs text-slate-300 leading-relaxed">
                  {reel.description}
                </p>

                {/* Footer Micro-CTA */}
                <div className="mt-3 flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-[#CE1C73] uppercase">
                  <span>Watch 60s Reel</span>
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile helper text */}
        <p className="mt-4 text-center text-xs text-slate-400 md:hidden">
          ← Swipe to explore more Tumkur project reels →
        </p>
      </Container>

      {/* 9:16 Shorts Video Modal Player */}
      {activeReel && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 backdrop-blur-md sm:p-6"
          onClick={() => setActiveReel(null)}
        >
          <div
            className="relative flex h-full max-h-[720px] w-full max-w-[420px] flex-col overflow-hidden rounded-[28px] border border-white/20 bg-slate-950 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Progress Scrub Bar */}
            <div className="absolute top-0 inset-x-0 z-30 h-1.5 bg-white/20">
              <div
                className="h-full bg-[#CE1C73] transition-all duration-300"
                style={{ width: `${playbackProgress}%` }}
              />
            </div>

            {/* Modal Header Overlay */}
            <div className="absolute top-3 inset-x-0 z-30 flex items-center justify-between px-4 py-2 bg-gradient-to-b from-black/80 to-transparent">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-[#CE1C73] px-2.5 py-0.5 text-[10px] font-black uppercase text-white">
                  {activeReel.stageNumber} · {activeReel.stage}
                </span>
                <span className="text-xs text-slate-300 font-medium">{activeReel.location}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/80"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveReel(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-rose-600 transition-colors"
                  aria-label="Close video reel"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Video Body Area */}
            <div
              className="relative flex-1 cursor-pointer"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              <Image
                src={activeReel.image}
                alt={activeReel.title}
                fill
                sizes="420px"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/30"
              />

              {/* Pause / Play State Indicator */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20">
                    <Play size={28} className="ml-1 fill-white" />
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Controls & Micro-CTAs */}
            <div className="relative z-30 bg-slate-950/95 p-5 border-t border-white/10">
              <h3 className="font-display text-lg font-bold text-white">
                {activeReel.title}
              </h3>
              <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                {activeReel.description}
              </p>

              {/* Key Highlights */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {activeReel.highlights.map((h) => (
                  <span
                    key={h}
                    className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-pink-200"
                  >
                    <CheckCircle2 size={11} className="text-[#CE1C73]" />
                    {h}
                  </span>
                ))}
              </div>

              {/* Engineer Quote */}
              <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-2.5 text-left">
                <p className="text-[11px] italic text-slate-300">&ldquo;{activeReel.quote}&rdquo;</p>
                <p className="mt-1 text-[10px] font-bold text-[#CE1C73]">{activeReel.engineer}</p>
              </div>

              {/* Action Buttons inside Reel */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenSiteVisit(activeReel)}
                  className="flex items-center justify-center gap-1.5 rounded-full bg-[#CE1C73] py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#B81564] transition-all"
                >
                  <HardHat size={14} />
                  <span>Visit This Site</span>
                </button>

                <a
                  href={whatsappUrl(
                    `Hi ${site.shortName}, I watched the site reel for "${activeReel.title}" at ${activeReel.location}. I'm planning to build in Tumkur and would like more details.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-full bg-[#25D366] py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#20ba59] transition-all"
                >
                  <MessageCircle size={14} />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
