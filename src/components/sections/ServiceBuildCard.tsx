'use client'

import { ArrowUpRight, ScanLine } from 'lucide-react'
import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState, type PointerEvent } from 'react'

export interface ServiceBuildCardProps {
  index: number
  tag: string
  title: string
  description: string
  chips: readonly string[]
  href: string
  cta: string
  image: StaticImageData
  sketch: StaticImageData
  alt: string
}

/** Delay between neighbouring cards when the row builds together. */
const STAGGER_MS = 160

const SIZES = '(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 80vw'

/**
 * One service card: a transparent building over blueprint paper, then copy.
 *
 * - Build-up: the building first shows as its line drawing. When the card
 *   scrolls into view the photo rises over it from the foundation up, with a
 *   brand-coloured "level line" riding the edge. Once, never on scroll-up.
 * - Drawing lens (mouse only): hovering the building shows the line drawing
 *   inside a circle that follows the pointer — the drawing behind the house.
 *
 * Plain CSS transitions and one IntersectionObserver; no Motion bundle. The
 * photo layer carries data-motion, so reduced motion shows it finished.
 */
export function ServiceBuildCard({
  index,
  tag,
  title,
  description,
  chips,
  href,
  cta,
  image,
  sketch,
  alt,
}: ServiceBuildCardProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const [built, setBuilt] = useState(false)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    let timer: number | undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        observer.disconnect()
        timer = window.setTimeout(() => setBuilt(true), index * STAGGER_MS)
      },
      { threshold: 0.45 },
    )
    observer.observe(stage)

    return () => {
      observer.disconnect()
      window.clearTimeout(timer)
    }
  }, [index])

  // Written straight to CSS variables: the lens follows the pointer without
  // re-rendering the card on every move.
  function moveLens(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'mouse') return
    const box = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--lens-x', `${event.clientX - box.left}px`)
    event.currentTarget.style.setProperty('--lens-y', `${event.clientY - box.top}px`)
  }

  return (
    <Link
      href={href}
      className="group/card flex w-[82%] shrink-0 snap-start flex-col rounded-[26px] bg-white p-2 ring-1 ring-plaster-200 transition-shadow duration-300 hover:shadow-[0_28px_60px_-28px_rgb(3_20_36/0.35)] hover:ring-brand-500/30 sm:w-auto"
    >
      {/* ── The building ─────────────────────────────────────────────── */}
      <div
        ref={stageRef}
        data-built={built}
        className="group/stage relative aspect-[5/4] overflow-hidden rounded-[20px] bg-[linear-gradient(180deg,#f7faff_0%,#edf3fb_100%)]"
      >
        {/* Drawing-paper grid, quieter once the building stands */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_right,rgb(42_74_122/0.09)_1px,transparent_1px),linear-gradient(to_bottom,rgb(42_74_122/0.09)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_50%_60%,black_35%,transparent_80%)] bg-[size:22px_22px] transition-opacity duration-700 group-data-[built=true]/stage:opacity-50"
        />

        <span className="absolute top-3.5 left-3.5 z-20 rounded-full bg-white/85 px-2.5 py-1 font-secondary text-[0.6875rem] font-semibold text-slate-700 ring-1 ring-plaster-200 backdrop-blur-sm">
          {tag}
        </span>
        <span
          aria-hidden="true"
          className="pointer-coarse:hidden absolute top-3.5 right-3.5 z-20 inline-flex items-center gap-1 rounded-full bg-white/85 px-2.5 py-1 font-secondary text-[0.6875rem] font-medium text-slate-500 ring-1 ring-plaster-200 backdrop-blur-sm transition-opacity duration-300 group-hover/stage:opacity-0"
        >
          <ScanLine size={12} strokeWidth={2} />
          Hover for the drawing
        </span>

        {/* Ground shadow — tightens as the building lifts on hover */}
        <div
          aria-hidden="true"
          className="absolute bottom-[7%] left-1/2 h-5 w-[72%] -translate-x-1/2 rounded-[50%] bg-ink-950/15 blur-md transition-all duration-500 group-hover/card:w-[62%] group-hover/card:bg-ink-950/20"
        />

        {/* The three layers share one box, so the lens lines up exactly */}
        <div
          onPointerMove={moveLens}
          className="absolute inset-x-[7%] top-[16%] bottom-[9%] transition-transform duration-500 ease-out [--lens-x:50%] [--lens-y:50%] group-hover/card:-translate-y-1.5"
        >
          <Image
            src={sketch}
            alt=""
            aria-hidden="true"
            fill
            sizes={SIZES}
            className="object-contain object-bottom"
          />

          <div
            data-motion
            className="absolute inset-0 [clip-path:inset(100%_0_0_0)] transition-[clip-path] duration-[1300ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[built=true]/stage:[clip-path:inset(0_0_0_0)]"
          >
            <Image src={image} alt={alt} fill sizes={SIZES} className="object-contain object-bottom" />
          </div>

          {/* Level line riding the top of the rising building */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-full h-0.5 bg-brand-500 opacity-0 shadow-[0_0_12px_2px_rgb(206_28_115/0.45)] [transition:top_1300ms_cubic-bezier(0.22,1,0.36,1),opacity_350ms_ease_1150ms] group-data-[built=true]/stage:top-0 group-data-[built=true]/stage:opacity-0 group-data-[built=false]/stage:opacity-100 motion-reduce:hidden"
          />

          {/* Drawing lens */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 [mask-image:radial-gradient(circle_88px_at_var(--lens-x)_var(--lens-y),black_97%,transparent_100%)] group-hover/stage:opacity-100"
          >
            <Image src={sketch} alt="" fill sizes={SIZES} className="object-contain object-bottom" />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[var(--lens-y)] left-[var(--lens-x)] h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 ring-2 ring-brand-500/70 ring-offset-0 transition-opacity duration-300 group-hover/stage:opacity-100"
          />
        </div>
      </div>

      {/* ── The copy ─────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col px-3 pt-5 pb-3 sm:px-4">
        <h3 className="font-display text-[1.0625rem] leading-snug font-semibold text-slate-900 transition-colors duration-200 group-hover/card:text-brand-500 sm:text-lg">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>

        <ul className="mt-4 mb-5 flex flex-wrap gap-1.5" aria-label={`${title} includes`}>
          {chips.map((chip, i) => (
            <li
              key={chip}
              style={{ transitionDelay: `${i * 40}ms` }}
              className="rounded-full bg-plaster-100 px-2.5 py-1 font-secondary text-xs font-medium text-slate-700 transition-colors duration-200 group-hover/card:bg-brand-50 group-hover/card:text-brand-700"
            >
              {chip}
            </li>
          ))}
        </ul>

        <span className="mt-auto flex items-center justify-between gap-3 border-t border-plaster-200 pt-4 font-secondary text-sm font-semibold text-slate-900">
          {cta}
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-plaster-100 text-slate-900 transition-all duration-300 group-hover/card:rotate-45 group-hover/card:bg-brand-500 group-hover/card:text-white">
            <ArrowUpRight aria-hidden="true" size={17} strokeWidth={2} />
          </span>
        </span>
      </div>
    </Link>
  )
}
