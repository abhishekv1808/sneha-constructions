import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/utils/cn'

export interface LogoProps {
  tone?: 'dark' | 'light'
  className?: string
  containerClassName?: string
  imageClassName?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizeMap = {
  sm: {
    container: 'px-2.5 py-1 rounded-lg',
    image: 'h-8 w-auto sm:h-9 lg:h-10',
  },
  md: {
    container: 'px-3 py-1.5 rounded-xl',
    image: 'h-9 w-auto sm:h-10 lg:h-12',
  },
  lg: {
    container: 'px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl',
    image: 'h-11 w-auto sm:h-12 lg:h-14 xl:h-[3.75rem]',
  },
  xl: {
    container: 'px-4 py-2 rounded-2xl sm:px-5 sm:py-2.5',
    image: 'h-13 w-auto sm:h-15 lg:h-16 xl:h-[4.25rem]',
  },
}

export function Logo({
  tone = 'dark',
  className,
  containerClassName,
  imageClassName,
  size = 'lg',
}: LogoProps) {
  const currentSize = sizeMap[size]

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
          'flex items-center transition-all duration-200 group-hover:scale-[1.02]',
          currentSize.container,
          tone === 'dark'
            ? 'bg-white shadow-md ring-1 ring-white/20 group-hover:bg-white group-hover:shadow-lg'
            : 'bg-white shadow-sm ring-1 ring-slate-200/80 group-hover:shadow-md',
          containerClassName,
        )}
      >
        <Image
          src="/sneha-constructions-logo.png"
          alt="Sneha Construction & Developers"
          width={300}
          height={195}
          priority
          className={cn(
            'object-contain transition-all duration-300',
            currentSize.image,
            imageClassName,
          )}
        />
      </div>
    </Link>
  )
}

