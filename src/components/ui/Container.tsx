import type { ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn('mx-auto w-full max-w-[1240px] px-5 md:px-8 lg:px-12', className)}>
      {children}
    </div>
  )
}
