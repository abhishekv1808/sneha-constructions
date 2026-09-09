'use client'

import { ReactLenis } from 'lenis/react'
import type { ReactNode } from 'react'
import 'lenis/dist/lenis.css'

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  )
}
