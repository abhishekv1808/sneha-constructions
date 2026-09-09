'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Play, Pause } from 'lucide-react'

/**
 * ============================================================================
 * FRAME CONFIGURATION
 * When you change or upload new frames to /public/frames, simply update these settings:
 * - totalFrames: Number of image frames (e.g. 60, 90, 120, 240)
 * - folder: Path in /public (e.g. '/frames')
 * - prefix: File prefix (e.g. 'ezgif-frame-', 'frame_', 'frame-')
 * - extension: '.jpg' | '.webp' | '.png'
 * - padLength: 3 (for 001, 002) or 4 (for 0001, 0002)
 * ============================================================================
 */
export const FRAME_CONFIG = {
  folder: '/frames',
  prefix: 'ezgif-frame-',
  extension: '.jpg',
  totalFrames: 240,
  padLength: 3,
}

interface StageDescriptor {
  roman: string
  stageName: string
  line: string
}

const STAGES: StageDescriptor[] = [
  {
    roman: 'STAGE I',
    stageName: 'PLANNING',
    line: 'From pencil to precision — 100% Vastu architectural planning.',
  },
  {
    roman: 'STAGE II',
    stageName: 'FOUNDATION',
    line: 'Laying deep foundations — engineered with seismic structural integrity.',
  },
  {
    roman: 'STAGE III',
    stageName: 'STRUCTURE',
    line: 'Rising floor by floor — solid table-moulded red brick masonry.',
  },
  {
    roman: 'STAGE IV',
    stageName: 'ELEVATION',
    line: 'Your bespoke architectural landmark — delivered turnkey.',
  },
]

function getFrameUrl(index: number): string {
  const padded = String(index).padStart(FRAME_CONFIG.padLength, '0')
  return `${FRAME_CONFIG.folder}/${FRAME_CONFIG.prefix}${padded}${FRAME_CONFIG.extension}`
}

export function ArchitecturalEvolution() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const lastDrawnFrameRef = useRef<number>(1)

  const [currentFrame, setCurrentFrame] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeStageIndex, setActiveStageIndex] = useState(0)

  // 1. Draw frame to canvas with high-DPI scaling & object-fit: cover
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Find the requested image or fall back to last drawn
    const img = imagesRef.current[frameIdx - 1]
    const validImg = img && img.complete && img.naturalWidth > 0 ? img : imagesRef.current[lastDrawnFrameRef.current - 1]
    if (!validImg || !validImg.complete) return

    lastDrawnFrameRef.current = frameIdx

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()

    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
    }

    ctx.save()
    ctx.scale(dpr, dpr)

    const cw = rect.width
    const ch = rect.height
    const iw = validImg.naturalWidth || 1920
    const ih = validImg.naturalHeight || 1080

    const scale = Math.max(cw / iw, ch / ih)
    const ox = (cw - iw * scale) / 2
    const oy = (ch - ih * scale) / 2

    ctx.clearRect(0, 0, cw, ch)
    ctx.drawImage(validImg, 0, 0, iw, ih, ox, oy, iw * scale, ih * scale)
    ctx.restore()
  }, [])

  // 2. Preload frames
  useEffect(() => {
    let mounted = true
    const imgs: HTMLImageElement[] = []

    // Load first frame immediately
    const firstImg = new Image()
    firstImg.src = getFrameUrl(1)
    firstImg.onload = () => {
      if (mounted) drawFrame(1)
    }

    for (let i = 1; i <= FRAME_CONFIG.totalFrames; i++) {
      const img = new Image()
      img.src = getFrameUrl(i)
      imgs.push(img)
    }

    imagesRef.current = imgs

    return () => {
      mounted = false
    }
  }, [drawFrame])

  // Resize handler
  useEffect(() => {
    const handleResize = () => drawFrame(currentFrame)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [drawFrame, currentFrame])

  // 3. Scroll tracking: maps scroll progress to frame index & stage
  useEffect(() => {
    const handleScroll = () => {
      if (isPlaying) return
      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      const totalScrollable = rect.height - window.innerHeight
      if (totalScrollable <= 0) return

      const scrolled = -rect.top
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable))

      const targetFrame = Math.max(
        1,
        Math.min(FRAME_CONFIG.totalFrames, Math.round(progress * (FRAME_CONFIG.totalFrames - 1)) + 1)
      )

      setCurrentFrame(targetFrame)
      drawFrame(targetFrame)

      // Map progress to 4 stages regardless of total frame count
      if (progress < 0.25) setActiveStageIndex(0)
      else if (progress < 0.5) setActiveStageIndex(1)
      else if (progress < 0.75) setActiveStageIndex(2)
      else setActiveStageIndex(3)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [drawFrame, isPlaying])

  // 4. Auto-Play continuous time-lapse
  useEffect(() => {
    if (!isPlaying) return
    let frameId: number
    let lastTime = performance.now()
    const fps = 24
    const interval = 1000 / fps

    const animate = (currentTime: number) => {
      const delta = currentTime - lastTime
      if (delta >= interval) {
        lastTime = currentTime - (delta % interval)
        setCurrentFrame((prev) => {
          const next = prev >= FRAME_CONFIG.totalFrames ? 1 : prev + 1
          drawFrame(next)
          const progress = (next - 1) / (FRAME_CONFIG.totalFrames - 1)
          if (progress < 0.25) setActiveStageIndex(0)
          else if (progress < 0.5) setActiveStageIndex(1)
          else if (progress < 0.75) setActiveStageIndex(2)
          else setActiveStageIndex(3)
          return next
        })
      }
      frameId = requestAnimationFrame(animate)
    }

    frameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameId)
  }, [isPlaying, drawFrame])

  const activeStage: StageDescriptor = STAGES[activeStageIndex] ?? (STAGES[0] as StageDescriptor)
  const progressPercent = Math.round((currentFrame / FRAME_CONFIG.totalFrames) * 100)

  return (
    <section
      ref={containerRef}
      id="architectural-evolution"
      className="relative h-[400vh] bg-[#05070B] text-white"
    >
      {/* Sticky Fullscreen Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* Edge-to-Edge Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full object-cover" />

        {/* Cinematic Vignette for maximum text contrast */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/50" />
        <div className="pointer-events-none absolute inset-0 bg-radial from-transparent via-transparent to-black/35" />

        {/* Minimalist Top Bar */}
        <div className="relative z-20 flex items-center justify-between px-6 pt-6 sm:px-12 lg:px-16">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#CE1C73] animate-pulse" />
            <span className="font-cinzel text-xs tracking-[0.25em] text-white/70 uppercase">
              Sneha Architectural Film
            </span>
          </div>

          {/* Minimalist Auto-Play / Pause Button */}
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="group flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3.5 py-1.5 text-xs text-white/80 backdrop-blur-md transition-all hover:border-white/40 hover:bg-black/60 hover:text-white"
            aria-label={isPlaying ? 'Pause film' : 'Play film'}
          >
            {isPlaying ? (
              <>
                <Pause size={12} className="fill-current text-[#CE1C73]" />
                <span className="font-sans text-[11px] tracking-wider uppercase">Pause</span>
              </>
            ) : (
              <>
                <Play size={12} className="fill-current text-[#CE1C73]" />
                <span className="font-sans text-[11px] tracking-wider uppercase">Play Film</span>
              </>
            )}
          </button>
        </div>

        {/* BOTTOM SECTION: Single Line in Cormorant Garamond & Progress Indicator */}
        <div className="relative z-20 mx-auto w-full max-w-7xl px-6 pb-6 sm:px-12 lg:px-16">
          {/* Subtle Stage Counter */}
          <div className="flex items-center gap-3">
            <span className="font-cinzel text-[11px] sm:text-xs tracking-[0.28em] text-[#FF65A8] font-bold uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              {activeStage.roman} · {activeStage.stageName}
            </span>
            <span className="h-px w-8 bg-[#FF65A8]/50" />
          </div>

          {/* THE SINGLE LINE: Pure cinematic subtitle */}
          <div className="mt-2 min-h-[3.25rem] flex items-center">
            <p
              key={activeStageIndex}
              className="font-cormorant text-xl sm:text-2xl md:text-3xl lg:text-[2.35rem] xl:text-[2.65rem] font-medium italic leading-snug text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] transition-all duration-700 ease-out animate-in fade-in slide-in-from-bottom-2 whitespace-normal lg:whitespace-nowrap"
            >
              {activeStage.line}
            </p>
          </div>

          {/* Whisper-Thin Bottom Progress Hairline */}
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-white/50 font-sans tracking-widest uppercase">
            <span>Scroll to scrub</span>
            <div className="h-0.5 w-48 sm:w-80 rounded-full bg-white/15 overflow-hidden mx-4">
              <div
                className="h-full bg-gradient-to-r from-[#FF65A8] to-[#CE1C73] transition-all duration-75"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span>{progressPercent}%</span>
          </div>
        </div>
      </div>
    </section>
  )
}
