'use client'

import { AnimatePresence, m, useInView, type Variants } from 'motion/react'
import { useEffect, useRef, useState, type ReactNode } from 'react'

import { EASE, MotionProvider, useReducedMotion, VIEWPORT } from '@/components/motion'
import { cn } from '@/lib/utils/cn'

/*
 * Motion for the "How we build for you" section. The section itself stays a
 * server component; these are the client islands it drops its content into.
 *
 * Every piece follows the same rules as the rest of the motion layer:
 * - only `m.*` (LazyMotion strict), inside BuildBenefitsMotionScope;
 * - `once` viewport triggers, so nothing replays on scroll-up;
 * - reduced motion renders the final state with no animation, and
 *   `data-motion` lets the CSS fallback show it before hydration too.
 */

/** Mounts LazyMotion for the section, so the motion bundle loads only here. */
export function BuildBenefitsMotionScope({ children }: { children: ReactNode }) {
  return <MotionProvider>{children}</MotionProvider>
}

/* ── Generic reveal ──────────────────────────────────────────────────────── */

type From = 'up' | 'left' | 'right'

const OFFSET: Record<From, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  left: { x: -48, y: 0 },
  right: { x: 48, y: 0 },
}

/** Fades and slides its children in once, when they scroll into view. */
export function Reveal({
  children,
  from = 'up',
  delay = 0,
  scale = false,
  className,
}: {
  children: ReactNode
  from?: From
  delay?: number
  /** Also grow from 96% — used for the image panels. */
  scale?: boolean
  className?: string
}) {
  const reduced = useReducedMotion()
  if (reduced) return <div className={className}>{children}</div>

  const { x, y } = OFFSET[from]
  return (
    <m.div
      data-motion
      className={className}
      initial={{ opacity: 0, x, y, scale: scale ? 0.96 : 1 }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </m.div>
  )
}

/** The numbered icon badge: pops in with a slight turn. */
export function PopIn({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion()
  if (reduced) return <span className={className}>{children}</span>

  return (
    <m.span
      data-motion
      className={className}
      initial={{ opacity: 0, scale: 0.5, rotate: -12 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={VIEWPORT}
      transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.15 }}
    >
      {children}
    </m.span>
  )
}

/* ── Staggered checklist ─────────────────────────────────────────────────── */

const list: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } },
}
const item: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } },
}

/** A list whose items arrive one after another. */
export function StaggerList({
  items,
  className,
  itemClassName,
  icon,
}: {
  items: readonly string[]
  className?: string
  itemClassName?: string
  icon: ReactNode
}) {
  const reduced = useReducedMotion()
  if (reduced) {
    return (
      <ul className={className}>
        {items.map((text) => (
          <li key={text} className={itemClassName}>
            {icon}
            {text}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <m.ul
      className={className}
      variants={list}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {items.map((text) => (
        <m.li key={text} data-motion variants={item} className={itemClassName}>
          {icon}
          {text}
        </m.li>
      ))}
    </m.ul>
  )
}

/* ── Payment slabs: segments fill one by one ─────────────────────────────── */

export function SlabBar({ count, paid }: { count: number; paid: number }) {
  const reduced = useReducedMotion()

  return (
    <div aria-hidden="true" className="mt-3 flex gap-1">
      {Array.from({ length: count }, (_, i) => {
        const filled = i < paid
        return (
          <span
            key={i}
            className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-plaster-200"
          >
            {filled &&
              (reduced ? (
                <span className="absolute inset-0 rounded-full bg-brand-500" />
              ) : (
                <m.span
                  data-motion
                  className="absolute inset-0 origin-left rounded-full bg-brand-500"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.35, ease: EASE, delay: 0.4 + i * 0.22 }}
                />
              ))}
          </span>
        )
      })}
    </div>
  )
}

/* ── WhatsApp preview: messages arrive like a real chat ──────────────────── */

const bubble: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 320, damping: 24 },
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.15 } },
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 rounded-xl rounded-tl-sm bg-white px-3 py-2.5 shadow-sm">
      {[0, 1, 2].map((i) => (
        <m.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-slate-400"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </span>
  )
}

/**
 * Shows the chat messages one at a time: first message, a typing indicator,
 * then the second. Starts when the chat scrolls into view; reduced motion
 * shows both messages straight away.
 */
export function ChatSequence({ messages }: { messages: ReactNode[] }) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, VIEWPORT)
  // How many messages are visible; `typing` shows the dots before the next one.
  const [shown, setShown] = useState(0)
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    if (reduced || !inView) return
    const timers: number[] = []
    let t = 300
    messages.forEach((_, i) => {
      if (i > 0) {
        timers.push(window.setTimeout(() => setTyping(true), t))
        t += 1100
      }
      timers.push(
        window.setTimeout(() => {
          setTyping(false)
          setShown(i + 1)
        }, t),
      )
      t += 500
    })
    return () => timers.forEach(window.clearTimeout)
  }, [inView, reduced, messages])

  if (reduced) return <div className="space-y-2">{messages}</div>

  return (
    // Reserves the full height up front, so the chat never pushes the page
    // around as messages arrive. The typing dots only show while a later
    // message is still hidden, so they always fit inside that reserved space.
    <div ref={ref} className="grid">
      <div aria-hidden="true" className="invisible col-start-1 row-start-1 space-y-2">
        {messages}
      </div>
      <div className="col-start-1 row-start-1 space-y-2">
        <AnimatePresence initial={false}>
          {messages.slice(0, shown).map((message, i) => (
            <m.div key={i} variants={bubble} initial="hidden" animate="visible">
              {message}
            </m.div>
          ))}
          {typing && (
            <m.div key="typing" variants={bubble} initial="hidden" animate="visible" exit="exit">
              <TypingDots />
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ── "On your site" status dot ───────────────────────────────────────────── */

export function LiveDot({ className }: { className?: string }) {
  const reduced = useReducedMotion()
  return (
    <span aria-hidden="true" className={cn('relative flex h-1.5 w-1.5', className)}>
      {!reduced && (
        <m.span
          className="absolute inset-0 rounded-full bg-emerald-500"
          animate={{ scale: [1, 2.6], opacity: [0.6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
        />
      )}
      <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
    </span>
  )
}
