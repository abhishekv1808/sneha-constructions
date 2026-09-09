'use client'

import { m, type Variants } from 'motion/react'
import type { ElementType } from 'react'

import { cn } from '@/lib/utils/cn'

import { EASE, REVEAL_DURATION, REVEAL_STAGGER, VIEWPORT } from './config'
import { useReducedMotion } from './useReducedMotion'

const container: Variants = {
  hidden: {},
  visible: (delay: number) => ({
    transition: { delayChildren: delay, staggerChildren: REVEAL_STAGGER },
  }),
}

// Both keyframes carry all four inset components so the browser interpolates
// them rather than snapping.
const line: Variants = {
  hidden: { clipPath: 'inset(0% 0% 100% 0%)' },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: REVEAL_DURATION, ease: EASE },
  },
}

type RevealTextProps = {
  lines: string[]
  as?: ElementType
  className?: string
  lineClassName?: string
  /** Seconds to wait before the first line. */
  delay?: number
  /** 'mount' for the hero load sequence; 'inView' everywhere else. */
  trigger?: 'mount' | 'inView'
}

export function RevealText({
  lines,
  as: Tag = 'p',
  className,
  lineClassName,
  delay = 0,
  trigger = 'inView',
}: RevealTextProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return (
      <Tag className={className}>
        {lines.map((text, index) => (
          <span key={index} className={cn('block', lineClassName)}>
            {text}
          </span>
        ))}
      </Tag>
    )
  }

  const trigate =
    trigger === 'mount'
      ? { animate: 'visible' as const }
      : { whileInView: 'visible' as const, viewport: VIEWPORT }

  return (
    <Tag className={className}>
      <m.span variants={container} initial="hidden" custom={delay} className="block" {...trigate}>
        {lines.map((text, index) => (
          <m.span
            key={index}
            variants={line}
            data-motion="reveal-line"
            className={cn('block', lineClassName)}
          >
            {text}
          </m.span>
        ))}
      </m.span>
    </Tag>
  )
}
