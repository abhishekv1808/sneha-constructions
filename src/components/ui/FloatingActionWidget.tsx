'use client'

import { MessageCircle, PencilRuler, Phone, Plus, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { useQuoteModal } from '@/components/providers/QuoteModalProvider'
import { contact, site, whatsappUrl } from '@/content'

/**
 * Minimalist desktop quick-contact float.
 *
 * Collapsed it is a single 56px circle rather than the ~370px pill this
 * replaced, which was permanently occluding the bottom-right of every page and
 * duplicating the header's primary CTA. Opening it is now the only thing the
 * closed state does — the quote action lives inside, so there is one primary
 * CTA per viewport (§6) instead of two competing ones.
 *
 * Also brings the component onto spec: tokens instead of raw hex (§9), the two
 * sanctioned shadows instead of shadow-xl/2xl (§5.3), and colour-only hover
 * transitions — the previous `hover:scale-105` on every row is exactly the tell
 * §6 rules out. The old `animate-in` classes were inert anyway; no such plugin
 * is installed.
 */
export function FloatingActionWidget() {
  const { openQuoteModal } = useQuoteModal()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  // Escape closes and returns focus to the trigger; a click outside just closes.
  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  return (
    <aside
      ref={rootRef}
      aria-label="Quick contact"
      className="fixed right-6 bottom-6 z-40 hidden flex-col items-end gap-2.5 md:flex print:hidden"
    >
      {/* Actions. Kept mounted so the transition has something to animate, and
          hidden from the tree entirely while closed. */}
      <div
        data-motion
        inert={!open}
        aria-hidden={!open}
        className={`flex flex-col items-end gap-2 transition-[opacity,transform] duration-200 ease-out ${
          open
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-2 opacity-0'
        }`}
      >
        <ActionRow
          as="button"
          icon={<PencilRuler size={15} strokeWidth={2.2} />}
          label="Get a free quote"
          onClick={() => {
            setOpen(false)
            openQuoteModal({ source: 'Floating quick contact' })
          }}
        />

        <ActionRow
          as="a"
          href={whatsappUrl(
            `Hi ${site.shortName}, I want to discuss a construction project in Tumkur.`,
          )}
          external
          icon={<MessageCircle size={15} strokeWidth={2.2} />}
          label="WhatsApp"
          onClick={() => setOpen(false)}
        />

        <ActionRow
          as="a"
          href={contact.phoneHref}
          icon={<Phone size={15} strokeWidth={2.2} />}
          label={contact.phoneDisplay}
          onClick={() => setOpen(false)}
        />
      </div>

      {/* Trigger — 56px, the only thing visible at rest. */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? 'Close quick contact' : 'Open quick contact'}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-500 text-white shadow-lift transition-colors duration-150 hover:bg-brand-600"
      >
        {open ? <X size={20} strokeWidth={2.2} /> : <Plus size={22} strokeWidth={2.2} />}
      </button>
    </aside>
  )
}

type ActionRowProps = {
  icon: React.ReactNode
  label: string
  onClick: () => void
} & ({ as: 'button'; href?: never; external?: never } | { as: 'a'; href: string; external?: boolean })

function ActionRow({ icon, label, onClick, ...rest }: ActionRowProps) {
  const className =
    'flex items-center gap-2.5 rounded-full border border-plaster-200 bg-white py-2 pr-4 pl-2.5 font-secondary text-xs font-bold whitespace-nowrap text-slate-900 shadow-lift transition-colors duration-150 hover:border-brand-500 hover:text-brand-500'

  const inner = (
    <>
      <span
        aria-hidden
        className="flex h-7 w-7 items-center justify-center rounded-full bg-plaster-100 text-brand-500"
      >
        {icon}
      </span>
      <span>{label}</span>
    </>
  )

  if (rest.as === 'a') {
    const external = rest.external
      ? { target: '_blank', rel: 'noopener noreferrer' as const }
      : {}

    // Internal hrefs go through Link; tel: and wa.me must not.
    if (rest.href.startsWith('/')) {
      return (
        <Link href={rest.href} onClick={onClick} className={className}>
          {inner}
        </Link>
      )
    }

    return (
      <a href={rest.href} onClick={onClick} className={className} {...external}>
        {inner}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {inner}
    </button>
  )
}
