import type { ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'

type Tone = 'light' | 'dark'

interface SectionHeadingProps {
  /** Small dot-prefixed label above the heading. */
  eyebrow: string
  /** Heading text. Wrap an accent phrase in <em> to get the Playfair italic. */
  children: ReactNode
  tone?: Tone
  className?: string
  /** Optional lead paragraph under the heading. Keep it to one sentence. */
  lead?: string
}

/**
 * The eyebrow + display heading pair used at the top of every marketing
 * section. Extracted so the three service pages share one system while their
 * layouts stay unrelated. `<em>` inside children renders as the Playfair
 * italic accent — see the `[&_em]` rules below.
 */
export function SectionHeading({
  eyebrow,
  children,
  tone = 'light',
  className,
  lead,
}: SectionHeadingProps) {
  const dark = tone === 'dark'

  return (
    <div className={cn('max-w-2xl', className)}>
      <p
        className={cn(
          'inline-flex items-center gap-2 font-secondary text-xs font-bold tracking-[0.16em] uppercase sm:text-[0.8125rem]',
          dark ? 'text-brand-300' : 'text-brand-500',
        )}
      >
        <span
          aria-hidden
          className={cn(
            'inline-block h-2 w-2 rounded-[2px]',
            dark ? 'bg-brand-300' : 'bg-brand-500',
          )}
        />
        {eyebrow}
      </p>

      <h2
        className={cn(
          'mt-4 font-display text-3xl leading-[1.12] font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem]',
          '[&_em]:font-playfair [&_em]:italic',
          dark ? 'text-white' : 'text-slate-900',
        )}
      >
        {children}
      </h2>

      {lead && (
        <p
          className={cn(
            'mt-4 font-secondary text-base leading-relaxed',
            dark ? 'text-slate-300' : 'text-slate-600',
          )}
        >
          {lead}
        </p>
      )}
    </div>
  )
}
