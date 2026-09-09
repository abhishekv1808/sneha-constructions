'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * §8.5 — the 1px rule connecting the six steps, drawn in on scroll. A single
 * animation, once.
 *
 * WHY NOT MOTION
 * Framer's `pathLength` is exactly this: it normalises the line with
 * `pathLength="1"` and animates `stroke-dashoffset` from 1 to 0. Doing that
 * through Motion costs ~50KB of core on the route — the whole home page budget
 * is 130KB (§13), and importing it here took the route from 112KB to 152KB for
 * one decorative line. An IntersectionObserver and a keyframe are the same
 * animation at no library cost.
 *
 * The observer disconnects on first intersection, which is what enforces §6's
 * "nothing animates on scroll-up".
 *
 * `data-motion` hands reduced motion to the rules in globals.css, which reset
 * stroke-dasharray and stroke-dashoffset so the line simply exists.
 */
export function ProcessLine({
  orientation,
  className,
}: {
  orientation: 'horizontal' | 'vertical'
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [drawn, setDrawn] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Draw immediately if the browser has no observer rather than leaving the
    // line permanently hidden.
    if (typeof IntersectionObserver === 'undefined') {
      setDrawn(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setDrawn(true)
          observer.disconnect()
        }
      },
      // threshold 0 with a bottom margin, not a ratio: the vertical rail is
      // taller than a phone viewport once the copy grows, and a ratio
      // threshold can then never be satisfied. This fires when the rail
      // reaches the lower fifth of the screen, whatever its height.
      { threshold: 0, rootMargin: '0px 0px -20% 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const horizontal = orientation === 'horizontal'

  // 100 units on the drawn axis, 1 on the other, with preserveAspectRatio
  // "none" so the rule stretches to whatever the section is; non-scaling-stroke
  // keeps it a true hairline through that stretch.
  const viewBox = horizontal ? '0 0 100 1' : '0 0 1 100'
  const coords = horizontal
    ? { x1: 0, y1: 0.5, x2: 100, y2: 0.5 }
    : { x1: 0.5, y1: 0, x2: 0.5, y2: 100 }

  return (
    // The rule lives in a positioned wrapper rather than being positioned
    // itself: `width: auto` on an <svg> resolves to its intrinsic viewBox
    // width, so an absolutely positioned SVG ignores a `right` inset and
    // renders 100px wide. The wrapper takes the insets, the SVG fills it.
    <div ref={ref} aria-hidden="true" className={className}>
      <svg
        focusable="false"
        viewBox={viewBox}
        preserveAspectRatio="none"
        className="h-full w-full overflow-visible"
      >
        <line
          {...coords}
          pathLength={1}
          stroke="var(--color-ink-600)"
          strokeWidth={1}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          className="process-rule"
          data-motion=""
          data-drawn={drawn || undefined}
        />
      </svg>
    </div>
  )
}
