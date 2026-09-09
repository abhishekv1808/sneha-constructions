'use client'

import { Mail, MapPin, Phone, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, type RefObject } from 'react'

import { Logo } from '@/components/layout/Logo'
import { Button } from '@/components/ui'
import { contact, primaryNav } from '@/content'
import { cn } from '@/lib/utils/cn'

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'

/**
 * Full-screen ink drawer — §8.1. Mounted only while open, so the effect
 * teardown is what returns focus to the hamburger (§13).
 */
export function MobileDrawer({
  onClose,
  triggerRef,
}: {
  onClose: () => void
  triggerRef: RefObject<HTMLButtonElement | null>
}) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const panel = panelRef.current
    const trigger = triggerRef.current
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key !== 'Tab' || !panel) return

      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (focusable.length === 0) return

      const [first] = focusable
      const last = focusable.at(-1)
      if (!first || !last) return

      const active = document.activeElement

      if (event.shiftKey && (active === first || !panel.contains(active))) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = overflow
      trigger?.focus()
    }
  }, [onClose, triggerRef])

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-white text-slate-900 lg:hidden"
    >
      <div className="flex h-18 shrink-0 items-center justify-between px-5 border-b border-slate-100">
        <Logo tone="light" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="flex h-11 w-11 items-center justify-center rounded-button text-slate-700 transition-[background-color] duration-150 ease-out hover:bg-slate-100"
        >
          <X size={24} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>

      <nav aria-label="Site" className="flex-1 px-5 pb-12">
        <ul className="flex flex-col">
          {primaryNav.map((item) => (
            <li key={item.href} className="border-b border-slate-200">
              <Link
                href={item.href}
                onClick={onClose}
                className="block py-4 text-heading-3 text-slate-900 hover:text-[#CE1C73] transition-colors"
              >
                {item.label}
              </Link>
              {item.children ? (
                <ul className="flex flex-col gap-1 pb-4">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        onClick={onClose}
                        className="block py-2 text-body-sm text-slate-600 hover:text-[#CE1C73] transition-colors"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>

        <Button href="/contact" onClick={onClose} className="mt-8 w-full bg-[#CE1C73] text-white hover:bg-[#B81564]">
          Get a free quote
        </Button>
      </nav>

      {/* Phone and address pinned to the bottom of the drawer */}
      <div className="mt-auto shrink-0 border-t border-slate-200 bg-slate-50 px-5 py-6">
        <a
          href={contact.phoneHref}
          className="flex items-center gap-3 py-2 text-heading-4 text-slate-900 hover:text-[#CE1C73] transition-colors"
        >
          <Phone size={20} strokeWidth={1.8} aria-hidden="true" className="text-[#CE1C73]" />
          {contact.phoneDisplay}
        </a>
        <a
          href={contact.emailHref}
          className="flex items-center gap-3 py-2 text-body-sm text-slate-600 hover:text-[#CE1C73] transition-colors"
        >
          <Mail size={20} strokeWidth={1.8} aria-hidden="true" className="text-[#CE1C73]" />
          {contact.email}
        </a>
        <p className="flex gap-3 py-2 text-body-sm text-slate-600">
          <MapPin
            size={20}
            strokeWidth={1.8}
            aria-hidden="true"
            className={cn('mt-1 shrink-0 text-[#CE1C73]')}
          />
          <span>
            {contact.address.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </span>
        </p>
      </div>
    </div>
  )
}
