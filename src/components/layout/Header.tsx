'use client'

import { ArrowRight, ChevronDown, Menu, Phone } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { Container } from '@/components/ui'
import { contact, primaryNav } from '@/content'
import { cn } from '@/lib/utils/cn'

import { Logo } from './Logo'
import { MobileDrawer } from './MobileDrawer'
import { NavDropdown } from './NavDropdown'

function isActiveRoute(pathname: string, href: string): boolean {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)
}

export function Header() {
  const pathname = usePathname()
  const headerRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-40 text-white transition-all duration-300 ease-out"
      >
        {/* Full Glassmorphic Backdrop Surface */}
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-0 transition-all duration-300 ease-out',
            'border-b border-white/15 backdrop-blur-2xl backdrop-saturate-180',
            scrolled
              ? 'bg-slate-950/40 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]'
              : 'bg-slate-950/25 shadow-[0_4px_24px_0_rgba(0,0,0,0.15)]',
          )}
        />
        {/* Subtle Specular Highlight Rim along the top */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-linear-to-r from-transparent via-white/25 to-transparent"
        />

        <Container className="relative flex h-20 items-center justify-between gap-6 lg:h-22">
          {/* Brand Logo in clean card pill */}
          <Logo />

          {/* Desktop Nav Items */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] p-1.5 shadow-inner backdrop-blur-md">
              {primaryNav.map((item) => {
                const active = isActiveRoute(pathname, item.href)

                return (
                  <li key={item.href}>
                    {item.children ? (
                      <NavDropdown
                        href={item.href}
                        label={item.label}
                        items={item.children}
                        isActive={active}
                      />
                    ) : (
                      <Link
                        href={item.href}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'inline-flex items-center gap-1 rounded-full px-4 py-2 font-secondary text-[0.9375rem] transition-all duration-200 ease-out',
                          active
                            ? 'border border-white/20 bg-white/20 font-bold text-white shadow-xs backdrop-blur-md'
                            : 'font-medium text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)] hover:bg-white/10 hover:text-white',
                        )}
                      >
                        {item.label}
                        {item.label === 'Home' && (
                          <ChevronDown size={14} strokeWidth={2.2} className="text-[#CE1C73]" />
                        )}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Right Action Group */}
          <div className="flex items-center gap-3 lg:gap-5">
            {/* Mobile Call Icon */}
            <a
              href={contact.phoneHref}
              aria-label={`Call ${contact.phoneDisplay}`}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#CE1C73] text-white shadow-md transition-transform duration-150 ease-out hover:scale-105 lg:hidden"
            >
              <Phone size={17} strokeWidth={2.2} aria-hidden="true" />
            </a>

            {/* Desktop Primary CTA Button */}
            <Link
              href="/contact"
              className="group hidden lg:inline-flex items-center rounded-full border border-pink-400/30 bg-[#CE1C73] pl-5 pr-1.5 py-1.5 text-[0.875rem] font-bold text-white shadow-lg shadow-[#CE1C73]/30 transition-all duration-200 hover:bg-[#B81564] hover:shadow-xl hover:shadow-[#CE1C73]/40"
            >
              <span>Get In Touch</span>
              <span className="ml-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#CE1C73] shadow-sm transition-transform duration-200 group-hover:translate-x-0.5">
                <ArrowRight size={15} strokeWidth={2.5} />
              </span>
            </Link>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-150 ease-out hover:bg-white/20 lg:hidden"
            >
              <Menu size={20} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
        </Container>
      </header>

      {drawerOpen && (
        <MobileDrawer
          onClose={() => setDrawerOpen(false)}
          triggerRef={menuButtonRef}
        />
      )}
    </>
  )
}
