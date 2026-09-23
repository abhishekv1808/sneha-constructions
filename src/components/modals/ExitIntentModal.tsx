'use client'

import { ArrowRight, CheckCircle2, Loader2, MessageCircle, Phone, ShieldCheck, X } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'

import turnkeyResidence from '@/assets/services/bespoke/turnkey-hero-residence.jpg'
import { useQuoteModal } from '@/components/providers/QuoteModalProvider'
import { contact, site, whatsappUrl } from '@/content'
import { cn } from '@/lib/utils/cn'
import { AnalyticsEvent, recordLeadConversion, trackEvent } from '@/lib/analytics'
import { hasCapturedLead } from '@/lib/utils/lead-memory'
import { leadFormSchema } from '@/lib/validation'

// ---------------------------------------------------------------------------
// Trigger rules — tuned to catch a leaving visitor without nagging a reading one.
// ---------------------------------------------------------------------------

/** Nobody gets the popup in their first moments on the site. */
const MIN_DWELL_MS = 12_000
/** After a dismissal, stay away this long. */
const SNOOZE_MS = 7 * 24 * 60 * 60 * 1000
/** Mobile: the visitor must have read this far down before a flick-up counts. */
const MOBILE_MIN_DEPTH = 0.4
/** Mobile: upward scroll speed (px per ms) that reads as "heading for the address bar". */
const MOBILE_FLICK_SPEED = 1.6

/** Pages where interrupting would get in the way of the visitor, not help. */
const EXCLUDED_PATHS = ['/contact', '/privacy-policy', '/terms']

const SESSION_SHOWN_KEY = 'sneha:exit-intent:shown'
const SNOOZED_AT_KEY = 'sneha:exit-intent:snoozed-at'

const PLOT_SIZES = ['30 × 40', '30 × 50', '40 × 60', 'Other'] as const

function readStorage(store: 'local' | 'session', key: string): string | null {
  try {
    return (store === 'local' ? window.localStorage : window.sessionStorage).getItem(key)
  } catch {
    return null
  }
}

function writeStorage(store: 'local' | 'session', key: string, value: string): void {
  try {
    ;(store === 'local' ? window.localStorage : window.sessionStorage).setItem(key, value)
  } catch {
    // Storage unavailable — the in-memory `armed` flag still caps it per page life.
  }
}

function isSuppressed(): boolean {
  if (hasCapturedLead()) return true
  if (readStorage('session', SESSION_SHOWN_KEY)) return true
  const snoozedAt = Number(readStorage('local', SNOOZED_AT_KEY))
  return Number.isFinite(snoozedAt) && snoozedAt > 0 && Date.now() - snoozedAt < SNOOZE_MS
}

export function ExitIntentModal() {
  const pathname = usePathname()
  const { isOpen: quoteModalOpen } = useQuoteModal()

  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [plotSize, setPlotSize] = useState<(typeof PLOT_SIZES)[number] | ''>('')
  const [honeypot, setHoneypot] = useState('')
  const [error, setError] = useState('')
  const [openedAt, setOpenedAt] = useState(0)

  const armed = useRef(true)
  const mountedAt = useRef(0)
  const dialogRef = useRef<HTMLDivElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)

  // Someone who opened the quote form is already talking to us — never follow up with this.
  useEffect(() => {
    if (quoteModalOpen) armed.current = false
  }, [quoteModalOpen])

  const show = useCallback(() => {
    if (!armed.current || isSuppressed()) return
    if (Date.now() - mountedAt.current < MIN_DWELL_MS) return
    if (EXCLUDED_PATHS.some((path) => pathname.startsWith(path))) return

    armed.current = false
    writeStorage('session', SESSION_SHOWN_KEY, '1')
    trackEvent(AnalyticsEvent.ExitIntentShown)
    previousFocus.current = document.activeElement as HTMLElement | null
    setOpenedAt(Date.now())
    setOpen(true)
  }, [pathname])

  // --- Exit-intent detection -------------------------------------------------
  useEffect(() => {
    mountedAt.current = Date.now()

    // QA hook: /?exit-intent=preview opens it immediately, bypassing every rule.
    if (new URLSearchParams(window.location.search).get('exit-intent') === 'preview') {
      previousFocus.current = document.activeElement as HTMLElement | null
      setOpenedAt(Date.now())
      setOpen(true)
      return
    }

    if (isSuppressed()) return

    const hasMouse = window.matchMedia('(pointer: fine)').matches

    // Desktop: the cursor leaves through the top edge, toward the tabs or close button.
    const onMouseOut = (e: MouseEvent) => {
      if (e.relatedTarget === null && e.clientY <= 0) show()
    }

    // Mobile: a fast flick back up after reading a good way down the page.
    let lastY = window.scrollY
    let lastT = performance.now()
    let maxDepth = 0
    const onScroll = () => {
      const y = window.scrollY
      const t = performance.now()
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      if (scrollable > 0) maxDepth = Math.max(maxDepth, y / scrollable)

      const speedUp = (lastY - y) / Math.max(t - lastT, 1)
      if (maxDepth >= MOBILE_MIN_DEPTH && speedUp > MOBILE_FLICK_SPEED) show()

      lastY = y
      lastT = t
    }

    if (hasMouse) {
      document.addEventListener('mouseout', onMouseOut)
    } else {
      window.addEventListener('scroll', onScroll, { passive: true })
    }
    return () => {
      document.removeEventListener('mouseout', onMouseOut)
      window.removeEventListener('scroll', onScroll)
    }
  }, [show])

  // --- Dialog behaviour: scroll lock, initial focus, Escape, focus trap ------
  const close = useCallback(() => {
    setOpen(false)
    if (status !== 'success') writeStorage('local', SNOOZED_AT_KEY, String(Date.now()))
    previousFocus.current?.focus()
  }, [status])

  useEffect(() => {
    if (!open) return

    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    nameInputRef.current?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close()
        return
      }
      if (e.key !== 'Tab' || !dialogRef.current) return

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([tabindex="-1"]), select, textarea',
      )
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (!first || !last) return

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, close])

  // --- Submit -----------------------------------------------------------------
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    const payload = {
      fullName,
      phone: phone.replace(/\s+/g, ''),
      plotDimensions: plotSize,
      message: plotSize
        ? `Asked for a cost estimate before leaving the site. Plot: ${plotSize}.`
        : 'Asked for a cost estimate before leaving the site.',
      source: 'Exit Intent Popup',
      honeypot,
      loadedAt: openedAt,
    }

    // §11: the same zod schema the server re-validates with.
    const parsed = leadFormSchema.safeParse(payload)
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Please check your details.')
      return
    }

    setStatus('submitting')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result: { success?: boolean } = await res.json()
      if (!res.ok || !result.success) throw new Error('Lead not accepted')

      recordLeadConversion('Exit Intent Popup')
      setStatus('success')
    } catch {
      setStatus('idle')
      setError(`Couldn't send that — check your phone number, or call us on ${contact.phoneDisplay}.`)
    }
  }

  if (!open) return null

  const whatsappText = `Hi ${site.shortName}, I'd like a construction cost estimate${
    plotSize && plotSize !== 'Other' ? ` for my ${plotSize} plot` : ''
  }. My name is ${fullName.trim() || '—'}.`

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-ink-950/70 backdrop-blur-sm motion-safe:animate-[hero-fade-in_200ms_ease-out_both] sm:items-center sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close()
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-intent-title"
        aria-describedby="exit-intent-desc"
        className="relative grid max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-t-2xl bg-white shadow-2xl motion-safe:animate-[hero-card-rise_280ms_cubic-bezier(0.22,1,0.36,1)_both] sm:rounded-2xl md:grid-cols-[5fr_6fr] md:overflow-hidden"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-slate-600 transition-colors duration-150 hover:bg-plaster-100 hover:text-slate-900 md:bg-transparent"
        >
          <X aria-hidden="true" size={20} />
        </button>

        {/* Visual panel — the offer, over a finished home */}
        <div className="relative hidden min-h-full overflow-hidden bg-ink-950 md:block">
          <Image
            src={turnkeyResidence}
            alt="Completed villa lit up at dusk"
            fill
            sizes="320px"
            placeholder="blur"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/40 to-ink-950/10"
          />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white">
            <p className="font-secondary text-[0.8125rem] font-medium text-white/75">
              Turnkey construction from
            </p>
            <p className="mt-1 flex items-baseline gap-1.5">
              <span className="font-display text-4xl leading-none font-bold tracking-tight tabular-nums">
                ₹{site.baseRateSqft.toLocaleString('en-IN')}
              </span>
              <span className="font-secondary text-sm text-white/75">/ sq ft</span>
            </p>
            <ul className="mt-4 space-y-1.5 border-t border-white/15 pt-4 font-secondary text-[0.8125rem] text-white/85">
              <li>Free site visit by our engineer</li>
              <li>Itemised estimate — no hidden costs</li>
              <li>Tumkur, Gubbi, Kunigal, Sira, Tiptur</li>
            </ul>
          </div>
        </div>

        {/* Form panel */}
        <div className="p-6 pt-8 sm:p-8">
          {status === 'success' ? (
            <div className="flex h-full flex-col justify-center py-4" aria-live="polite">
              <CheckCircle2 aria-hidden="true" size={40} strokeWidth={1.75} className="text-success" />
              <h2
                id="exit-intent-title"
                className="mt-4 font-display text-2xl leading-tight font-semibold tracking-tight text-slate-900"
              >
                Thanks, {fullName.trim().split(' ')[0]}. We&apos;ll call you soon.
              </h2>
              <p id="exit-intent-desc" className="mt-2 text-base leading-relaxed text-slate-600">
                Expect a call within one working day. In a hurry? Call{' '}
                <a href={contact.phoneHref} className="font-semibold text-brand-500 underline-offset-2 hover:underline">
                  {contact.phoneDisplay}
                </a>
                .
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappUrl(whatsappText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 font-secondary text-sm font-semibold text-ink-950 transition-colors duration-150 hover:bg-[#20bd5a]"
                >
                  <MessageCircle aria-hidden="true" size={18} />
                  Continue on WhatsApp
                </a>
                <button
                  type="button"
                  onClick={close}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-plaster-300 px-6 font-secondary text-sm font-semibold text-slate-700 transition-colors duration-150 hover:bg-plaster-100"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="font-secondary text-[0.8125rem] font-semibold text-brand-500">
                Before you go
              </p>
              <h2
                id="exit-intent-title"
                className="mt-2 max-w-[18ch] font-display text-[1.75rem] leading-[1.15] font-semibold tracking-tight text-slate-900"
              >
                Get your build cost for free
              </h2>
              <p id="exit-intent-desc" className="mt-2 text-[0.9375rem] leading-relaxed text-slate-600">
                Leave your number — our engineer will call with an estimate for your plot. No
                obligation.
              </p>

              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
                {/* §11 honeypot — hidden from people, filled by bots */}
                <input
                  type="text"
                  name="company_website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />

                <div>
                  <label htmlFor="exit-name" className="block font-secondary text-sm font-medium text-slate-900">
                    Your name
                  </label>
                  <input
                    ref={nameInputRef}
                    id="exit-name"
                    type="text"
                    autoComplete="name"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="mt-1.5 h-12 w-full rounded-md border border-plaster-300 bg-white px-4 text-base text-slate-900 transition-colors duration-150 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="exit-phone" className="block font-secondary text-sm font-medium text-slate-900">
                    Mobile number
                  </label>
                  <div className="relative mt-1.5">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 font-secondary text-sm font-medium text-slate-600">
                      +91
                    </span>
                    <input
                      id="exit-phone"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      required
                      maxLength={11}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      aria-invalid={error ? true : undefined}
                      aria-describedby={error ? 'exit-error' : undefined}
                      className="h-12 w-full rounded-md border border-plaster-300 bg-white pr-4 pl-13 text-base tabular-nums text-slate-900 transition-colors duration-150 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none"
                    />
                  </div>
                </div>

                <fieldset>
                  <legend className="font-secondary text-sm font-medium text-slate-900">
                    Plot size <span className="font-normal text-slate-600">(optional)</span>
                  </legend>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {PLOT_SIZES.map((size) => {
                      const selected = plotSize === size
                      return (
                        <button
                          key={size}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => setPlotSize(selected ? '' : size)}
                          className={cn(
                            'min-h-11 rounded-full border px-4 font-secondary text-sm font-medium tabular-nums transition-colors duration-150',
                            selected
                              ? 'border-brand-500 bg-brand-50 text-brand-600'
                              : 'border-plaster-300 text-slate-700 hover:border-slate-400',
                          )}
                        >
                          {size}
                        </button>
                      )
                    })}
                  </div>
                </fieldset>

                <p id="exit-error" aria-live="polite" className="min-h-5 text-sm text-danger">
                  {error}
                </p>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-6 font-secondary text-[0.9375rem] font-semibold text-white shadow-lg shadow-brand-500/25 transition-colors duration-150 hover:bg-brand-600 disabled:opacity-70"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 aria-hidden="true" size={18} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Get my free estimate
                      <ArrowRight aria-hidden="true" size={18} />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-plaster-200 pt-4 font-secondary text-[0.8125rem] text-slate-600">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck aria-hidden="true" size={16} className="text-success" />
                  No spam. We only call about your build.
                </span>
                <a
                  href={contact.phoneHref}
                  className="flex items-center gap-1.5 font-semibold text-slate-900 hover:text-brand-500"
                >
                  <Phone aria-hidden="true" size={15} />
                  <span className="tabular-nums">{contact.phoneDisplay}</span>
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
