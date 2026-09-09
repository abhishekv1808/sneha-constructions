'use client'

import { LazyMotion } from 'motion/react'
import type { ReactNode } from 'react'

// Importing domAnimation directly would pull ~47kB gzip into the layout chunk,
// which every route then pays for on first load. The dynamic import defers it
// to its own chunk. §6, §13.
const loadFeatures = () => import('./features').then((mod) => mod.default)

// `strict` makes any `motion.*` component throw. That is deliberate: only `m.*`
// keeps the feature bundle out of the initial chunk, and the compiler cannot
// catch the mistake for us.
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  )
}
