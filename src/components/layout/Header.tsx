'use client'

import { ArrowRight, Menu, Phone } from 'lucide-react'
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

  // White text is only used when at the top of pages with a dark hero (the home page)
  const isDarkHero = pathname === '/' && !scrolled

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          'fixed inset-x-0 top-0 z-40 transition-all duration-300 ease-out',
          scrolled
            ? 'bg-white/45 backdrop-blur-md border-b border-white/40 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]'
            : isDarkHero
              ? 'bg-transparent border-b border-transparent'
              : 'bg-white/45 backdrop-blur-md border-b border-white/40 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]',
        )}
      >
        <Container className="relative flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
          {/* Brand Logo — switch tone based on scroll state */}
          <Logo tone={isDarkHero ? 'dark' : 'light'} />

          {/* Desktop Nav Items */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul
              className={cn(
                'flex items-center gap-1 rounded-full p-1 transition-all duration-300',
                isDarkHero
                  ? 'border border-white/15 bg-white/[0.08]'
                  : 'border border-slate-200/60 bg-white/50 backdrop-blur-sm shadow-xs',
              )}
            >
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
                        scrolled={!isDarkHero}
                      />
                    ) : (
                      <Link
                        href={item.href}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'inline-flex items-center gap-1 rounded-full px-4 py-2 font-secondary text-[0.9375rem] transition-all duration-200 ease-out',
                          isDarkHero
                            ? active
                              ? 'bg-white/20 font-semibold text-white shadow-xs'
                              : 'font-medium text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)] hover:bg-white/10 hover:text-white'
                            : active
                              ? 'bg-white font-semibold text-[#CE1C73] shadow-xs ring-1 ring-slate-200/80'
                              : 'font-medium text-slate-800 hover:bg-white/60 hover:text-slate-950',
                        )}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Right Action Group */}
          <div className="flex items-center gap-3 lg:gap-4">
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
              className="group hidden lg:inline-flex items-center rounded-full bg-[#CE1C73] pl-5 pr-1.5 py-1.5 text-[0.875rem] font-bold text-white shadow-md shadow-[#CE1C73]/20 transition-all duration-200 hover:bg-[#B81564] hover:shadow-lg hover:shadow-[#CE1C73]/30"
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
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 ease-out lg:hidden',
                isDarkHero
                  ? 'border border-white/20 bg-white/10 text-white hover:bg-white/20'
                  : 'border border-slate-200/80 bg-white/60 text-slate-800 hover:bg-white',
              )}
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
