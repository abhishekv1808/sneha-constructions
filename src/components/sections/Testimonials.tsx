'use client'

import { ArrowLeft, ArrowRight, MapPin, Pause, Play, Quote, Star } from 'lucide-react'
import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'

import { Container } from '@/components/ui'
import { serviceAreas } from '@/content'
import { testimonials, type Testimonial } from '@/content/testimonials'
import { cn } from '@/lib/utils/cn'

/** "Pooja & Anand Gowda" → "PA". Monograms instead of stock faces (§8.9). */
function initials(name: string): string {
  return name
    .replace(/^(Dr|Mr|Mrs|Ms)\.?\s+/i, '')
    .split(/[\s&.]+/)
    .filter((part) => /^[A-Z]/.test(part))
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
}

function Stars({ rating, active }: { rating: number; active: boolean }) {
  return (
    <p className="flex items-center gap-0.5">
      <span className="sr-only">Rated {rating} out of 5</span>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          size={16}
          strokeWidth={1.5}
          style={{ '--star-index': i } as CSSProperties}
          className={cn(
            i < rating
              ? active
                ? 'fill-amber-300 text-amber-300'
                : 'fill-amber-400 text-amber-400'
              : active
                ? 'text-white/40'
                : 'text-plaster-300',
            active && 'animate-star-pop motion-reduce:animate-none',
          )}
        />
      ))}
    </p>
  )
}

function ReviewCard({
  review,
  active,
  onSelect,
}: {
  review: Testimonial
  active: boolean
  onSelect: () => void
}) {
  return (
    <li
      onMouseEnter={onSelect}
      onClick={onSelect}
      className="flex w-[82vw] max-w-[340px] shrink-0 snap-start flex-col sm:w-[340px]"
    >
      <figure className="flex flex-1 flex-col">
        {/* Speech bubble — the tail is part of the same filled shape, so one
            drop-shadow on the bubble outlines both, and not the name below.
            The highlighted review turns brand pink (white on brand-500 is
            ≥4.5:1). */}
        <div
          className={cn(
            'relative flex flex-1 flex-col rounded-2xl rounded-bl-none p-7 transition-colors duration-300',
            active
              ? 'bg-brand-500 drop-shadow-[0_16px_32px_rgb(206_28_115/0.28)]'
              : 'bg-white drop-shadow-[0_10px_24px_rgb(15_23_42/0.07)]',
          )}
        >
          <Quote
            aria-hidden="true"
            size={28}
            strokeWidth={0}
            className={cn(
              'absolute top-6 right-6 transition-colors duration-300',
              active ? 'fill-white/25' : 'fill-plaster-200',
            )}
          />
          <blockquote className="flex-1">
            <p
              className={cn(
                'pr-6 text-[0.9375rem] leading-[1.7] transition-colors duration-300',
                active ? 'text-white' : 'text-slate-700',
              )}
            >
              {review.quote}
            </p>
          </blockquote>
          {review.rating !== undefined && (
            <div className="mt-6">
              {/* Keyed on `active` so the pop replays each time it comes round */}
              <Stars key={String(active)} rating={review.rating} active={active} />
            </div>
          )}
          <span
            aria-hidden="true"
            className={cn(
              'absolute top-full left-0 h-5 w-7 transition-colors duration-300 [clip-path:polygon(0_0,100%_0,0_100%)]',
              active ? 'bg-brand-500' : 'bg-white',
            )}
          />
        </div>

        <figcaption className="mt-8 flex items-center gap-3 pl-1">
          <span
            aria-hidden="true"
            className={cn(
              'flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-secondary text-xs font-bold ring-1 transition-colors duration-300',
              active
                ? 'bg-brand-500 text-white ring-brand-500'
                : 'bg-brand-50 text-brand-600 ring-brand-100',
            )}
          >
            {initials(review.author)}
          </span>
          <span className="min-w-0">
            <span className="block font-display text-sm font-semibold text-slate-900">
              {review.author}
            </span>
            <span className="block truncate font-secondary text-xs text-slate-600">
              {review.projectType} · {review.location}
            </span>
          </span>
        </figcaption>
      </figure>
    </li>
  )
}

/**
 * Homeowner reviews as a row of speech-bubble cards that runs off the right
 * edge. Every 5s the highlight moves to the next review and the row scrolls to
 * it; the timer bars under the heading show when. Hover, keyboard focus, the
 * pause button or the section leaving the viewport all stop it, and reduced
 * motion starts it paused (WCAG 2.2.2). Native scroll with snap underneath —
 * swiping works as normal and the highlight follows.
 */
export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLUListElement>(null)
  /** Set while our own scrollTo runs, so the scroll listener ignores it. */
  const autoScrolling = useRef(false)
  const scrollEndTimer = useRef<number | undefined>(undefined)

  const [active, setActive] = useState(0)
  const [userPaused, setUserPaused] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [focused, setFocused] = useState(false)
  const [inView, setInView] = useState(false)
  const paused = userPaused || hovering || focused || !inView
  const count = testimonials.length

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setUserPaused(true)
    const node = sectionRef.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => setInView(!!entry?.isIntersecting), {
      threshold: 0.35,
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => () => window.clearTimeout(scrollEndTimer.current), [])

  /** Highlights review `index` and brings it to the start of the row (the
      browser clamps at the end, so the last few highlight in place). */
  const goTo = useCallback(
    (index: number) => {
      const track = trackRef.current
      const next = ((index % count) + count) % count
      setActive(next)
      const card = track?.children[next] as HTMLElement | undefined
      if (!track || !card) return
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      autoScrolling.current = true
      track.scrollTo({
        left: card.offsetLeft - parseFloat(getComputedStyle(track).paddingLeft),
        behavior: reduce ? 'auto' : 'smooth',
      })
    },
    [count],
  )

  /** After a swipe or trackpad scroll settles, highlight the card at the start. */
  function handleScroll() {
    window.clearTimeout(scrollEndTimer.current)
    scrollEndTimer.current = window.setTimeout(() => {
      if (autoScrolling.current) {
        autoScrolling.current = false
        return
      }
      const track = trackRef.current
      if (!track) return
      const start = track.scrollLeft + parseFloat(getComputedStyle(track).paddingLeft)
      const cards = Array.from(track.children) as HTMLElement[]
      let nearest = 0
      cards.forEach((card, i) => {
        const best = cards[nearest]
        if (best && Math.abs(card.offsetLeft - start) < Math.abs(best.offsetLeft - start)) {
          nearest = i
        }
      })
      setActive(nearest)
    }, 120)
  }

  if (count === 0) return null

  const arrowClass =
    'flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-slate-900 ring-1 ring-plaster-300 transition-colors duration-150 hover:bg-slate-900 hover:text-white hover:ring-slate-900'

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      aria-labelledby="testimonials-heading"
      data-track-location="testimonials"
      className="overflow-hidden bg-plaster-100 py-24 sm:py-32"
    >
      <Container>
        <div className="text-center">
          <h2
            id="testimonials-heading"
            className="font-display text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.1] font-light tracking-[-0.02em] text-slate-900"
          >
            What families say <span className="font-semibold">after moving in</span>
          </h2>
          <p className="mt-4 inline-flex items-center gap-1.5 font-secondary text-sm text-slate-600 sm:text-[0.9375rem]">
            <MapPin aria-hidden="true" size={15} strokeWidth={1.75} className="text-brand-500" />
            Homeowners across {serviceAreas.map((a) => a.name).join(', ')}
          </p>
        </div>

        <div
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false)
          }}
          className="mt-14 grid grid-cols-1 gap-10 lg:mt-20 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-center lg:gap-16"
        >
          {/* ── Left: title + controls ─────────────────────────────────── */}
          <div className="flex flex-col items-start">
            <Quote
              aria-hidden="true"
              size={56}
              strokeWidth={0}
              className="rotate-180 fill-brand-200"
            />
            <p className="mt-4 font-display text-2xl leading-snug font-medium text-slate-900 sm:text-[1.75rem]">
              What our customers are saying
            </p>

            <p className="mt-6 font-secondary text-sm text-slate-600 tabular-nums">
              <span className="font-semibold text-slate-900">
                {String(active + 1).padStart(2, '0')}
              </span>
              {' / '}
              {String(count).padStart(2, '0')}
            </p>

            {/* One bar per review; the highlighted one fills over 5s and its
                animationend moves on. Paused → the fill holds where it is. */}
            <div aria-hidden="true" className="mt-3 flex w-full max-w-[240px] gap-1.5">
              {testimonials.map((review, i) => (
                <span
                  key={review.id}
                  className="h-[3px] flex-1 overflow-hidden rounded-full bg-plaster-300"
                >
                  {i < active && <span className="block h-full w-full bg-slate-900" />}
                  {i === active && (
                    <span
                      key={active}
                      onAnimationEnd={() => goTo(active + 1)}
                      style={{ animationPlayState: paused ? 'paused' : 'running' }}
                      className="block h-full w-full origin-left animate-testimonial-timer bg-brand-500"
                    />
                  )}
                </span>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-2">
              <button
                type="button"
                onClick={() => goTo(active - 1)}
                aria-label="Previous review"
                aria-controls="testimonials-track"
                className={arrowClass}
              >
                <ArrowLeft aria-hidden="true" size={18} strokeWidth={1.75} />
              </button>
              <button
                type="button"
                onClick={() => goTo(active + 1)}
                aria-label="Next review"
                aria-controls="testimonials-track"
                className={arrowClass}
              >
                <ArrowRight aria-hidden="true" size={18} strokeWidth={1.75} />
              </button>
              <button
                type="button"
                onClick={() => setUserPaused((p) => !p)}
                aria-label={userPaused ? 'Play reviews automatically' : 'Pause reviews'}
                className="ml-1 inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 font-secondary text-xs font-semibold text-slate-600 transition-colors duration-150 hover:text-slate-900"
              >
                {userPaused ? (
                  <Play aria-hidden="true" size={14} strokeWidth={2} />
                ) : (
                  <Pause aria-hidden="true" size={14} strokeWidth={2} />
                )}
                {userPaused ? 'Play' : 'Pause'}
              </button>
            </div>
          </div>

          {/* ── Right: the cards, bleeding off the right edge ──────────── */}
          {/* Negative margins pull the track to the viewport edges (phone: both
              sides; lg: right only) and matching padding keeps the first card
              aligned with the page content. The extra 40px all round (-my-10,
              lg:-ml-10 against py-10, lg:pl-10) is room for the card shadows,
              which the scroll container would otherwise clip into a hard box. On lg
              a mask fades that left 40px, so cards scrolled past don't peek out
              beside the controls. */}
          <div className="-mx-5 -my-10 md:-mx-8 lg:mr-[calc(-1*max(3rem,(100vw-1240px)/2+3rem))] lg:-ml-10">
            <ul
              id="testimonials-track"
              ref={trackRef}
              onScroll={handleScroll}
              tabIndex={0}
              aria-label="Customer reviews"
              className="relative flex snap-x snap-mandatory scroll-px-5 [scrollbar-width:none] gap-5 overflow-x-auto px-5 py-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 md:scroll-px-8 md:px-8 lg:scroll-px-10 lg:gap-6 lg:[mask-image:linear-gradient(to_right,transparent_1.25rem,black_2.5rem)] lg:pr-12 lg:pl-10 [&::-webkit-scrollbar]:hidden"
            >
              {testimonials.map((review, i) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  active={i === active}
                  onSelect={() => setActive(i)}
                />
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}
