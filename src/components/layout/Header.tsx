'use client'

import { ArrowRight, Menu, Phone } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { Container } from '@/components/ui'
import { contact, heroRoutes, primaryNav } from '@/content'
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

  // White text is only used at the top of routes whose first section is a
  // full-bleed dark photograph the header floats over — heroRoutes, §8.1.
  const isDarkHero = heroRoutes.has(pathname) && !scrolled

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          'fixed inset-x-0 top-0 z-40 transition-all duration-300 ease-out',
          scrolled
            ? 'bg-white/70 backdrop-blur-md border-b border-slate-200/60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] py-1.5'
            : isDarkHero
              ? 'bg-transparent border-b border-transparent pt-3 sm:pt-4 lg:pt-4 pb-2'
              : 'bg-white/70 backdrop-blur-md border-b border-slate-200/60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] pt-3 sm:pt-4 lg:pt-4 pb-2',
        )}
      >
        <Container
          className={cn(
            'relative flex items-center justify-between gap-6 transition-all duration-300',
            scrolled ? 'h-16 lg:h-18' : 'h-18 sm:h-20 lg:h-22',
          )}
        >
          {/* Brand Logo — switch tone and responsive scale based on scroll state */}
          <Logo tone={isDarkHero ? 'dark' : 'light'} size={scrolled ? 'md' : 'lg'} />

          {/* Desktop Nav Items */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1 transition-all duration-300">
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
                          'inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 font-secondary text-[0.8125rem] transition-all duration-200 ease-out',
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
