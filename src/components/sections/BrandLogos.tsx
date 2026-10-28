import Image from 'next/image'

import { Container } from '@/components/ui'
import { cn } from '@/lib/utils/cn'

interface Brand {
  name: string
  file: string
  /** Evens out optical weight: some files carry a tagline or empty padding. */
  size: string
}

/**
 * Official manufacturer logos, sourced from Wikimedia Commons / Wikipedia and
 * the brands' own websites — see public/brands/SOURCES.md.
 */
const STRUCTURE_AND_FINISH: Brand[] = [
  { name: 'UltraTech Cement', file: 'ultratech.svg', size: 'h-11' },
  { name: 'Tata Steel', file: 'tata-steel.svg', size: 'h-6' },
  { name: 'JSW', file: 'jsw.svg', size: 'h-10' },
  { name: 'Kajaria', file: 'kajaria.svg', size: 'h-7' },
  { name: 'Asian Paints', file: 'asian-paints.svg', size: 'h-6' },
  { name: 'Jaquar', file: 'jaquar.svg', size: 'h-10' },
]

const SERVICES: Brand[] = [
  { name: 'Finolex', file: 'finolex.svg', size: 'h-7' },
  { name: 'Polycab', file: 'polycab.png', size: 'h-16' },
  { name: 'Havells', file: 'havells.svg', size: 'h-11' },
  { name: 'GM Modular', file: 'gm-modular.png', size: 'h-12' },
  { name: 'Ashirvad by Aliaxis', file: 'ashirvad.webp', size: 'h-12' },
  { name: 'Astral Pipes', file: 'astral.png', size: 'h-10' },
]

/** Just the logo — no card, no label; the brands speak for themselves. */
function Logo({ brand, decorative }: { brand: Brand; decorative: boolean }) {
  return (
    <li className="flex h-16 shrink-0 items-center sm:h-20">
      <Image
        src={`/brands/${brand.file}`}
        alt={decorative ? '' : `${brand.name} logo`}
        width={200}
        height={80}
        unoptimized
        className={cn('w-auto max-w-[180px] object-contain', brand.size)}
      />
    </li>
  )
}

/**
 * One infinitely scrolling row. The track holds the list twice over (so a
 * single copy is always wider than the viewport), then a second, aria-hidden
 * copy; sliding by exactly 50% makes the loop seamless.
 */
function MarqueeRow({ brands, reverse = false }: { brands: Brand[]; reverse?: boolean }) {
  const run = [...brands, ...brands]
  return (
    <div
      className={cn(
        'flex w-max group-hover:[animation-play-state:paused] motion-reduce:animate-none',
        reverse ? 'animate-marquee-brands-reverse' : 'animate-marquee-brands',
      )}
    >
      {[false, true].map((copy) => (
        <ul
          key={String(copy)}
          aria-hidden={copy || undefined}
          className="flex shrink-0 items-center gap-14 pr-14 sm:gap-20 sm:pr-20"
        >
          {run.map((brand, i) => (
            <Logo
              key={`${brand.file}-${i}`}
              brand={brand}
              decorative={copy || i >= brands.length}
            />
          ))}
        </ul>
      ))}
    </div>
  )
}

export function BrandLogos() {
  return (
    <section
      aria-labelledby="brands-heading"
      className="border-y border-plaster-200 bg-white py-20 md:py-24"
    >
      <Container>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-12">
          <div>
            <p className="inline-flex items-center gap-2 font-secondary text-[0.8125rem] font-semibold text-brand-500">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              Genuine, invoiced materials
            </p>
            <h2
              id="brands-heading"
              className="mt-3 max-w-[24ch] font-display text-[clamp(1.875rem,3.5vw,2.75rem)] leading-[1.1] font-semibold tracking-tight text-slate-900"
            >
              Built with brands you already trust
            </h2>
          </div>
          <p className="max-w-[40ch] text-base leading-relaxed text-slate-600 md:text-right">
            From the cement in the foundation to the switches on the wall — only branded materials,
            with the bills to show for it.
          </p>
        </div>
      </Container>

      <div className="group mt-12 flex flex-col gap-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] motion-reduce:overflow-x-auto sm:gap-8">
        <MarqueeRow brands={STRUCTURE_AND_FINISH} />
        <MarqueeRow brands={SERVICES} reverse />
      </div>
    </section>
  )
}
