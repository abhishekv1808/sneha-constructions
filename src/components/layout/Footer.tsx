'use client'

import { ArrowRight, ArrowUp, Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

import teamPhoto from '@/assets/footer/sneha-construction-team.jpg'
import { Logo } from '@/components/layout/Logo'
import { Container } from '@/components/ui'
import { contact, legalLinks, serviceAreas, site, whatsappUrl } from '@/content'

const SERVICE_LINKS = [
  { href: '/services/residential', label: 'Residential construction' },
  { href: '/services/commercial', label: 'Commercial construction' },
  { href: '/services/turnkey', label: 'Turnkey construction' },
  { href: '/materials', label: 'Materials & quality' },
] as const

const EXPLORE_LINKS = [
  { href: '/estimate#cost-calculator', label: 'Cost estimator' },
  { href: '/estimate#vastu-advisor', label: 'Vastu advisor' },
  { href: '/estimate#loan-calculator', label: 'Loan calculator' },
  { href: '/about', label: 'About us' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact us' },
] as const

const linkClass =
  'inline-flex min-h-9 items-center text-sm text-slate-600 transition-colors duration-150 hover:text-brand-500'

function ColumnHeading({ children }: { children: ReactNode }) {
  return <h2 className="font-display text-base font-semibold text-slate-900">{children}</h2>
}

/**
 * Light footer: a call-to-action card, four columns, the legal bar, and one of
 * the company's own elevation designs rising out of the bottom of the page.
 */
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      // Phones: room for the fixed action bar, so it never covers the house.
      className="relative border-t border-plaster-200 bg-plaster-50 pb-[calc(3.75rem+env(safe-area-inset-bottom))] text-slate-600 md:pb-0"
    >
      <Container className="pt-14 sm:pt-20">
        {/* ── Call to action ───────────────────────────────────────────── */}
        <div className="flex flex-col gap-6 rounded-3xl bg-white p-6 ring-1 ring-plaster-200 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10">
          <div>
            <p className="font-display text-[1.375rem] leading-snug font-semibold text-slate-900 sm:text-[1.75rem]">
              Planning to build? Let&rsquo;s talk.
            </p>
            <p className="mt-2 max-w-[48ch] text-[0.9375rem] leading-relaxed text-slate-600">
              Tell us about your plot and we&rsquo;ll walk you through the cost, the design and the
              timeline — free, with no obligation.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-500 px-5 font-secondary text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-600"
            >
              Get a free quote
              <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
            </Link>
            <a
              href={contact.phoneHref}
              className="inline-flex min-h-11 items-center gap-2 rounded-full px-5 font-secondary text-sm font-semibold text-slate-900 ring-1 ring-plaster-300 transition-colors duration-150 hover:bg-plaster-50"
            >
              <Phone aria-hidden="true" size={16} strokeWidth={1.75} />
              <span className="tabular-nums">{contact.phoneDisplay}</span>
            </a>
          </div>
        </div>

        {/* ── Columns ──────────────────────────────────────────────────── */}
        <div className="mt-12 grid grid-cols-1 gap-10 sm:mt-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <Logo tone="light" size="md" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
              {site.positioning}
            </p>
            <div className="mt-5 flex flex-col items-start gap-1">
              <a href={contact.emailHref} className={linkClass}>
                <Mail aria-hidden="true" size={15} className="mr-2.5 text-brand-500" />
                {contact.email}
              </a>
              <a
                href={whatsappUrl(
                  `Hi ${site.shortName}, I would like to consult about construction for my plot.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-9 items-center text-sm font-medium text-emerald-700 transition-colors duration-150 hover:text-emerald-800"
              >
                <MessageCircle aria-hidden="true" size={15} className="mr-2.5" />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <nav aria-label="Services" className="lg:col-span-3">
            <ColumnHeading>Services</ColumnHeading>
            <ul className="mt-3">
              {SERVICE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Explore" className="lg:col-span-2">
            <ColumnHeading>Explore</ColumnHeading>
            <ul className="mt-3">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <ColumnHeading>{contact.address.label}</ColumnHeading>
            <div className="mt-4 space-y-4 text-sm leading-relaxed">
              <div className="flex items-start gap-2.5">
                <MapPin aria-hidden="true" size={16} className="mt-0.5 shrink-0 text-brand-500" />
                <address className="not-italic">
                  {contact.address.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock aria-hidden="true" size={16} className="mt-0.5 shrink-0 text-brand-500" />
                <span>{contact.hours}</span>
              </div>
              <p className="border-t border-plaster-200 pt-3 text-xs text-slate-500">
                Serving {serviceAreas.map((area) => area.name).join(', ')}
              </p>
            </div>
          </div>
        </div>

        {/* ── Legal bar ────────────────────────────────────────────────── */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-plaster-200 pt-6 text-xs text-slate-500 sm:mt-16 sm:flex-row">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-600 transition-colors duration-150 hover:text-brand-500"
              >
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-600 ring-1 ring-plaster-200 transition-colors duration-150 hover:text-brand-500"
            >
              <ArrowUp aria-hidden="true" size={16} />
            </button>
          </div>
        </div>
      </Container>

      {/* ── The team, full width at the bottom of the page ───────────────── */}
      {/* Edge to edge. A top mask fades the sky into the footer colour so the
          photo rises out of the page instead of starting at a hard line.
          Phones: the photo's own 16:9. From lg: 2:1, anchored low so the crop
          only trims sky — heads sit about 29% down the original, below the
          fade. The footer's bottom padding keeps the phone action bar off it.
          Lazy by default — it is the last thing on every page. */}
      <div className="relative mt-6 aspect-video w-full [mask-image:linear-gradient(to_bottom,transparent,black_20%)] lg:aspect-[2/1]">
        <Image
          src={teamPhoto}
          alt="Sneha Construction team in branded shirts reviewing drawings at a residential construction site"
          fill
          sizes="100vw"
          quality={80}
          placeholder="blur"
          className="object-cover object-[50%_75%]"
        />
      </div>
    </footer>
  )
}
