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
}: {
  href: string
  label: string
  items: readonly NavChild[]
  isActive: boolean
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
      <div className="flex items-center">
        <Link
          href={href}
          className={cn(
            'py-2 pl-3.5 pr-1 font-secondary text-[0.9375rem] transition-[color] duration-150 ease-out hover:text-white',
            isActive
              ? 'font-bold text-[#FF65A8]'
              : 'font-medium text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]',
          )}
        >
          {label}
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={`${label} menu`}
          onClick={() => setOpen((value) => !value)}
          className="flex h-10 w-7 items-center justify-center text-white/70 transition-all duration-150 ease-out hover:text-white"
        >
          <ChevronDown
            size={15}
            strokeWidth={2}
            aria-hidden="true"
            className={cn('transition-transform duration-200 ease-out', open && 'rotate-180 text-[#FF65A8]')}
          />
        </button>
      </div>

      <div
        id={panelId}
        hidden={!open}
        className="absolute top-full left-0 z-30 w-64 rounded-2xl border border-white/15 bg-slate-950/80 p-2 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-150"
      >
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3.5 py-2.5 font-secondary text-xs font-medium text-slate-200 transition-all duration-150 ease-out hover:bg-white/10 hover:text-white"
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
