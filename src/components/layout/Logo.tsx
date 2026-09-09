import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/utils/cn'

export function Logo({
  tone = 'dark',
  className,
}: {
  tone?: 'dark' | 'light'
  className?: string
}) {
  return (
    <Link
      href="/"
      className={cn(
        'group inline-flex items-center gap-3 transition-all duration-200 ease-out',
        className,
      )}
      aria-label="Sneha Construction & Developers Home"
    >
      {/* Official Corporate Logo Container */}
      <div
        className={cn(
          'flex items-center rounded-xl px-3 py-1.5 transition-all duration-200 group-hover:scale-[1.02]',
          tone === 'dark'
            ? 'bg-white shadow-md ring-1 ring-white/20 group-hover:bg-white group-hover:shadow-lg'
            : 'bg-white shadow-sm ring-1 ring-slate-200/80 group-hover:shadow-md',
        )}
      >
        <Image
          src="/sneha-constructions-logo.png"
          alt="Sneha Construction & Developers"
          width={180}
          height={60}
          priority
          className="h-9 w-auto object-contain sm:h-10 lg:h-11"
        />
      </div>
    </Link>
  )
}
