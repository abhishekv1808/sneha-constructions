import type { ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'

import type { SurfaceTone } from './Rule'

export function Chip({
  tone = 'light',
  selected = false,
  className,
  children,
}: {
  tone?: SurfaceTone
  selected?: boolean
  className?: string
  children: ReactNode
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-input border px-3 py-1 text-meta',
        selected
          ? 'border-oxide-600 bg-oxide-600 text-white'
          : tone === 'dark'
            ? 'border-ink-600 bg-ink-800 text-slate-400'
            : 'border-plaster-300 bg-plaster-50 text-slate-600',
        className,
      )}
    >
      {children}
    </span>
  )
}
