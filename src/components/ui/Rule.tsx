import { cn } from '@/lib/utils/cn'

export type SurfaceTone = 'light' | 'dark'

export function Rule({ tone = 'light', className }: { tone?: SurfaceTone; className?: string }) {
  return (
    <hr
      className={cn(
        'h-px w-full border-0',
        tone === 'dark' ? 'bg-ink-600' : 'bg-plaster-200',
        className,
      )}
    />
  )
}
