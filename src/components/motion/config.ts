// §6. Every timing constant in the motion layer lives here.

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

// Nothing animates on scroll-up — `once` is what enforces that.
export const VIEWPORT = { once: true, amount: 0.3 } as const

export const SPRING = { stiffness: 180, damping: 26 } as const

export const REVEAL_STAGGER = 0.06
export const REVEAL_DURATION = 0.52

/**
 * §6 — the hero load sequence, the page's one orchestrated moment.
 *
 * The headline is absent on purpose. §6 lists a line-by-line mask reveal for it
 * and, two lines later, requires that "the hero headline renders in its final
 * position on first paint" because "no animation delays the LCP element". Those
 * cannot both hold: a clip-path reveal starts the text unpainted, so the
 * headline cannot register as a contentful paint until the animation finishes.
 * The LCP rule wins — see the note in HeroSequence.tsx.
 *
 * The scrim lift is absent for the same reason, confirmed by measurement
 * rather than argument: it covered the hero at first paint and held LCP at
 * 3.6–3.7s against a 2.0s budget. What remains is the support fade and the
 * card rise, neither of which touches the LCP element.
 *
 * Seconds, to match Motion's units.
 */
export const HERO_SEQUENCE = {
  /** Support paragraph and buttons fade in together. */
  supportDelay: 0.24,
  supportDuration: 0.22,
  /** Overlapping cards rise 24px into place. */
  cardsDelay: 0.32,
  cardStagger: 0.08,
  cardDuration: 0.24,
  cardOffsetPx: 24,
} as const
