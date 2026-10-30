'use client'

import { ArrowRight, Camera, Phone } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState, type CSSProperties } from 'react'

import { useQuoteModal } from '@/components/providers/QuoteModalProvider'
import { Container } from '@/components/ui'
import { contact } from '@/content'
import { cn } from '@/lib/utils/cn'
import type { SitePhoto } from '@/lib/site-photos'

/** Lines the track up with the page container (max 1240px + gutters). */
const TRACK_GUTTERS = 'px-5 md:px-8 lg:px-[max(3rem,calc((100vw-1240px)/2+3rem))]'

/**
 * Panel size. Phones: every panel 4:5, so each photo is still big. From sm:
 * one shared height, and each panel takes its own photo's shape (via --ratio),
 * so a portrait shot is not cropped into a landscape frame.
 */
const PANEL = 'w-[84vw] aspect-[4/5] sm:w-auto sm:h-[min(60svh,620px)] sm:aspect-[var(--ratio)]'
const PANEL_MAX_HEIGHT = 620

/** The photo's own width:height, kept within sensible bounds for a panel. */
function panelRatio({ width, height }: SitePhoto): number {
  return Math.min(1.8, Math.max(0.7, width / height))
}

/**
 * Real site photos in a row that moves sideways as the visitor scrolls down.
 *
 * How the pin works: the section is made as tall as the row is wide (plus one
 * screen), and its inner frame is `position: sticky`. While the frame is
 * stuck, scroll progress through the section maps to translateX on the row —
 * written straight to the DOM in a rAF, so scrolling never re-renders React.
 *
 * It renders unpinned first: a plain swipeable row. That is what no-JS and
 * reduced-motion visitors keep; everyone else is switched to the pinned
 * version after mount.
 */
export function SiteProgressScroller({ photos }: { photos: SitePhoto[] }) {
  const { openQuoteModal } = useQuoteModal()
  const sectionRef = useRef<HTMLElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLSpanElement>(null)
  const [pinned, setPinned] = useState(false)
  const [index, setIndex] = useState(0)
  const count = photos.length

  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) setPinned(true)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const frame = frameRef.current
    const track = trackRef.current
    if (!pinned || !section || !frame || !track) return

    let distance = 0
    let frameId = 0

    const render = () => {
      frameId = 0
      const scrollable = section.offsetHeight - frame.clientHeight
      const top = section.getBoundingClientRect().top
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, -top / scrollable)) : 0
      track.style.transform = `translate3d(${-progress * distance}px, 0, 0)`
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`
      setIndex(Math.min(count - 1, Math.floor(progress * count)))
    }
    const schedule = () => {
      if (!frameId) frameId = requestAnimationFrame(render)
    }
    const measure = () => {
      distance = Math.max(0, track.scrollWidth - frame.clientWidth)
      // One screen of scroll for the frame itself, plus one pixel of scroll
      // per pixel the row has to travel.
      section.style.height = `${distance + frame.clientHeight}px`
      render()
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(frame)
    observer.observe(track)
    window.addEventListener('scroll', schedule, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', schedule)
      cancelAnimationFrame(frameId)
      section.style.height = ''
      track.style.transform = ''
    }
  }, [pinned, count])

  return (
    <section
      ref={sectionRef}
      id="on-site"
      aria-labelledby="on-site-heading"
      data-track-location="on-site"
      className="relative bg-white"
    >
      <div
        ref={frameRef}
        className={cn(
          'flex flex-col justify-center overflow-hidden py-20 sm:py-24',
          pinned && 'sticky top-0 h-svh py-0 sm:py-0',
        )}
      >
        <Container>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-12">
            <div>
              <p className="inline-flex items-center gap-2 font-secondary text-[0.8125rem] font-semibold text-brand-500">
                <Camera aria-hidden="true" size={15} strokeWidth={1.75} />
                On site, right now
              </p>
              <h2
                id="on-site-heading"
                className="mt-3 font-display text-[clamp(1.625rem,3.6vw,2.875rem)] leading-[1.08] font-semibold tracking-[-0.02em] text-slate-900"
              >
                Real sites. Real progress.
              </h2>
            </div>
            <div className="md:max-w-[38ch] md:text-right">
              <p className="text-base leading-relaxed text-slate-600">
                No renders and no stock photos — this is our work, photographed on site as it goes
                up.
              </p>
              {pinned && (
                <div className="mt-4 flex items-center gap-3 md:justify-end">
                  <span className="font-secondary text-sm text-slate-600 tabular-nums">
                    <span className="font-semibold text-slate-900">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {' / '}
                    {String(count).padStart(2, '0')}
                  </span>
                  <span
                    aria-hidden="true"
                    className="relative h-[3px] w-28 overflow-hidden rounded-full bg-plaster-200"
                  >
                    <span
                      ref={barRef}
                      // transform, not Tailwind's scale-x-0: that sets the separate
                      // `scale` property, which would cancel the transform the
                      // scroll handler writes.
                      style={{ transform: 'scaleX(0)' }}
                      className="absolute inset-0 origin-left rounded-full bg-brand-500"
                    />
                  </span>
                </div>
              )}
            </div>
          </div>
        </Container>

        {/* The row. Pinned: moved by the scroll handler. Unpinned: swipe it. */}
        <div
          className={cn(
            'mt-8 sm:mt-10',
            !pinned && 'snap-x snap-mandatory [scrollbar-width:none] overflow-x-auto',
          )}
        >
          <div
            ref={trackRef}
            className={cn(
              'flex w-max gap-4 sm:gap-6',
              TRACK_GUTTERS,
              pinned && 'will-change-transform',
            )}
          >
            {photos.map((photo, i) => (
              <figure
                key={photo.src}
                style={{ '--ratio': panelRatio(photo) } as CSSProperties}
                className={cn(
                  'relative shrink-0 snap-start overflow-hidden rounded-3xl bg-plaster-200',
                  PANEL,
                )}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes={`(min-width: 640px) ${Math.round(PANEL_MAX_HEIGHT * panelRatio(photo))}px, 84vw`}
                  quality={80}
                  className="object-cover"
                />
                {/* §5.1's one permitted gradient: the bottom scrim on photo cards */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-2/5 bg-[linear-gradient(to_top,rgb(10_16_27/0.85)_0%,rgb(10_16_27/0.45)_45%,transparent_100%)]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7">
                  {photo.stage ? (
                    <span className="font-secondary text-sm font-semibold text-white sm:text-base">
                      {photo.stage}
                    </span>
                  ) : (
                    <span />
                  )}
                  <span className="font-display text-2xl font-semibold text-white/80 tabular-nums sm:text-3xl">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </figcaption>
              </figure>
            ))}

            {/* End of the row: the next step for a convinced visitor */}
            <div
              className={cn(
                'flex shrink-0 snap-start flex-col justify-end rounded-3xl bg-brand-50 p-7 ring-1 ring-brand-100 sm:p-10',
                'aspect-[4/5] w-[84vw] sm:aspect-auto sm:h-[min(60svh,620px)] sm:w-[400px]',
              )}
            >
              <p className="font-display text-2xl leading-snug font-semibold text-slate-900 sm:text-[1.75rem]">
                Want to see a site in person?
              </p>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                We&rsquo;ll take you round one of our ongoing sites near you — walk the floors,
                check the steel, ask the engineer.
              </p>
              <div className="mt-6 flex flex-col items-start gap-3">
                <button
                  type="button"
                  onClick={() => openQuoteModal({ source: 'On-site photos CTA' })}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-500 px-6 font-secondary text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-600"
                >
                  Book a site visit
                  <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
                </button>
                <a
                  href={contact.phoneHref}
                  className="inline-flex min-h-11 items-center gap-2 font-secondary text-sm font-semibold text-slate-900 underline-offset-4 hover:underline"
                >
                  <Phone aria-hidden="true" size={16} strokeWidth={1.75} />
                  <span className="tabular-nums">{contact.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
