import Image from 'next/image'

import { Container } from '@/components/ui'
import { frontElevations, type FrontElevation } from '@/content/front-elevations'
import { frontElevationGalleryJsonLd, serializeJsonLd } from '@/lib/seo'

/** Card heights per breakpoint, in px — kept in sync with the classes below. */
const HEIGHTS = { base: 220, sm: 280, md: 320 } as const

/**
 * Each card keeps its image's own aspect ratio (fixed height, natural width),
 * so tall elevations are never cropped. `sizes` is therefore per image: the
 * card's rendered width at each breakpoint, which lets next/image pick the
 * smallest file that is still sharp.
 */
function sizesFor({ width, height }: FrontElevation['image']): string {
  const ratio = width / height
  const w = (h: number) => `${Math.round(h * ratio)}px`
  return `(min-width: 768px) ${w(HEIGHTS.md)}, (min-width: 640px) ${w(HEIGHTS.sm)}, ${w(HEIGHTS.base)}`
}

function ElevationRow({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul
      aria-hidden={duplicate || undefined}
      className="flex shrink-0 items-center gap-5 px-2.5 sm:gap-7 sm:px-3.5"
    >
      {frontElevations.map((elevation) => (
        <li
          key={elevation.id}
          className="group relative h-[220px] shrink-0 overflow-hidden rounded-[20px] border border-slate-200/90 bg-slate-100 shadow-sm transition-[box-shadow,border-color] duration-300 hover:border-slate-300 hover:shadow-xl sm:h-[280px] md:h-[320px]"
        >
          <Image
            src={elevation.image}
            // The loop's second copy is decorative — an empty alt keeps screen
            // readers and image search from seeing every design twice.
            alt={duplicate ? '' : elevation.alt}
            sizes={sizesFor(elevation.image)}
            placeholder="blur"
            quality={80}
            className="h-full w-auto transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </li>
      ))}
    </ul>
  )
}

/**
 * Infinite strip of front elevation designs below the hero — instant visual
 * proof of the work. Server component: no state or handlers, the motion is CSS
 * (`animate-marquee-buildings`), and hovering pauses it.
 */
export function BuildingCarousel() {
  return (
    <section
      aria-labelledby="elevations-heading"
      className="relative overflow-hidden bg-white py-12 motion-reduce:overflow-x-auto sm:py-16"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(frontElevationGalleryJsonLd()) }}
      />
      <Container className="mb-10 sm:mb-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-12">
          <div className="lg:shrink-0">
            <p className="inline-flex items-center gap-2 font-secondary text-[0.8125rem] font-semibold text-brand-500">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              Front elevation designs
            </p>
            <h2
              id="elevations-heading"
              className="mt-3 max-w-[28ch] font-display text-[clamp(1.875rem,3.5vw,2.75rem)] leading-[1.1] font-semibold tracking-tight text-slate-900"
            >
              Homes we&rsquo;ve designed for our clients
            </h2>
          </div>
          <p className="max-w-[42ch] text-base leading-relaxed text-slate-600 md:max-w-[36ch] md:text-right">
            3D elevations from our in-house design team, each one drawn for a real plot in and
            around Tumkur.
          </p>
        </div>
      </Container>

      {/* The strip — edge fades are scoped to it so they never wash over the heading */}
      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white via-white/80 to-transparent sm:w-28 md:w-36"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white via-white/80 to-transparent sm:w-28 md:w-36"
        />

        {/* Two identical rows; the track slides by exactly one row's width */}
        <div className="flex w-max animate-marquee-buildings items-center hover:[animation-play-state:paused] motion-reduce:animate-none">
          <ElevationRow />
          <ElevationRow duplicate />
        </div>
      </div>
    </section>
  )
}
