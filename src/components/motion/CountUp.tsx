'use client'

import { useSpring } from 'motion/react'
import { useEffect, useRef } from 'react'

import { cn } from '@/lib/utils/cn'
import { formatINR } from '@/lib/utils/format'

import { SPRING } from './config'
import { useReducedMotion } from './useReducedMotion'

type CountUpProps = {
  value: number
  /** Must be referentially stable — it is an effect dependency. */
  format?: (value: number) => string
  className?: string
}

export function CountUp({ value, format = formatINR, className }: CountUpProps) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const spring = useSpring(value, SPRING)

  // Rendered once and never updated by React, so the per-frame writes below are
  // not fighting a re-render. Everything after mount goes through the effect.
  const initialText = useRef(format(value))

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (reduced) {
      node.textContent = format(value)
      return
    }

    const unsubscribe = spring.on('change', (latest) => {
      node.textContent = format(Math.round(latest))
    })
    spring.set(value)

    return unsubscribe
  }, [format, reduced, spring, value])

  return (
    <span ref={ref} className={cn('tabular', className)}>
      {initialText.current}
    </span>
  )
}
