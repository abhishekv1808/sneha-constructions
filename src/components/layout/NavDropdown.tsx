'use client'

import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useId, useRef, useState, type PointerEvent } from 'react'

import type { NavChild } from '@/content'
import { cn } from '@/lib/utils/cn'

/**
 * Split disclosure: the label is a real link to the section overview and the
 * caret is a separate button that owns the menu.
 */
export function NavDropdown({
  href,
  label,
  items,
  isActive,
  scrolled = false,
}: {
  href: string
  label: string
  items: readonly NavChild[]
  isActive: boolean
  scrolled?: boolean
}) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const wrapperRef = useRef<HTMLDivElement>(null)

  const handlePointer = useCallback((next: boolean) => {
    return (event: PointerEvent<HTMLDivElement>) => {
      if (event.pointerType === 'mouse') setOpen(next)
    }
  }, [])

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onPointerEnter={handlePointer(true)}
      onPointerLeave={handlePointer(false)}
      onBlur={(event) => {
        if (!wrapperRef.current?.contains(event.relatedTarget as Node | null)) setOpen(false)
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          event.stopPropagation()
          setOpen(false)
        }
      }}
    >
      <div
        className={cn(
          'inline-flex items-center rounded-full transition-all duration-200 ease-out',
          scrolled
            ? isActive
              ? 'bg-white font-semibold text-[#CE1C73] shadow-xs ring-1 ring-slate-200/80'
              : 'font-medium text-slate-800 hover:bg-white/60 hover:text-slate-950'
            : isActive
              ? 'bg-white/20 font-semibold text-white shadow-xs'
              : 'font-medium text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)] hover:bg-white/10 hover:text-white',
        )}
      >
        <Link
          href={href}
          className="py-2 pl-4 pr-1 font-secondary text-[0.9375rem] transition-colors"
        >
          {label}
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={`${label} menu`}
          onClick={() => setOpen((value) => !value)}
          className={cn(
            'flex h-9 w-7 items-center justify-center pr-2.5 transition-colors',
            scrolled
              ? 'text-slate-500 hover:text-slate-900'
              : 'text-white/80 hover:text-white',
          )}
        >
          <ChevronDown
            size={14}
            strokeWidth={2.2}
            aria-hidden="true"
            className={cn(
              'transition-transform duration-200 ease-out',
              open && 'rotate-180',
              isActive ? 'text-[#CE1C73]' : (scrolled ? 'text-slate-600' : 'text-white/80'),
            )}
          />
        </button>
      </div>

      <div
        id={panelId}
        hidden={!open}
        className="absolute top-full left-0 z-30 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150"
      >
        <ul className="space-y-0.5">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3.5 py-2.5 font-secondary text-xs font-medium text-slate-600 transition-all duration-150 ease-out hover:bg-slate-50 hover:text-slate-900"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
