import { ArrowRight, Clock, HardHat, MapPin, Phone, ReceiptText, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import siteEngineer from '@/assets/team/architect-inspecting-site.jpg'
import siteCrew from '@/assets/team/indian-workers-craft.jpg'
import { Container } from '@/components/ui'
import { contact, serviceAreas, site } from '@/content'

/** The four pillars from the brand vision (CLAUDE.md §2), each with one plain line. */
const PILLARS = [
  {
    icon: ShieldCheck,
    title: 'Premium materials',
    text: 'Branded cement, steel and fittings, with the bills to show for it.',
  },
  {
    icon: ReceiptText,
    title: 'Transparent pricing',
    text: 'An itemised quote before work starts — no surprises later.',
  },
  {
    icon: Clock,
    title: 'On-time delivery',
    text: 'Clear milestones from foundation to handover, with updates at every stage.',
  },
  {
    icon: HardHat,
    title: 'In-house engineers & architects',
    text: 'Design, structure and site supervision by one team.',
  },
] as const

/**
 * Home page "About us": the site's section pattern — tracked eyebrow, a
 * heading with an italic accent, white cards on a hairline ring and the pink
 * pill button — beside a two-photo collage of work on site.
 */
export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden bg-white py-16 sm:py-24 lg:py-32"
    >
      <Container className="max-w-[1320px]">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* ── Photos ─────────────────────────────────────────────────── */}
          {/* Placeholders: generic site photography, not Sneha's own team.
              Swap for real on-site photos when the client supplies them (§2). */}
          <div className="relative pb-10 sm:pb-14 lg:col-span-6 lg:pb-0">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[26px] bg-plaster-100 sm:w-[86%] lg:aspect-[4/5]">
              <Image
                src={siteCrew}
                alt="Masons and a site engineer checking a brick wall with a spirit level on a construction site"
                fill
                sizes="(min-width: 1024px) 42vw, (min-width: 640px) 86vw, 100vw"
                placeholder="blur"
                className="object-cover object-[40%_50%]"
              />
            </div>

            {/* Second photo, overlapping the first */}
            <div className="absolute right-0 bottom-0 hidden aspect-[4/3] w-[48%] overflow-hidden rounded-[22px] bg-plaster-100 shadow-[0_24px_48px_-20px_rgb(3_20_36/0.35)] ring-[6px] ring-white sm:block">
              <Image
                src={siteEngineer}
                alt="Site engineer reviewing drawings on a tablet beside a building under construction"
                fill
                sizes="(min-width: 1024px) 24vw, 42vw"
                placeholder="blur"
                className="object-cover"
              />
            </div>

            {/* The offer the business runs on */}
            <div className="absolute top-5 left-5 rounded-2xl bg-white/95 px-4 py-3 shadow-[0_16px_36px_-14px_rgb(3_20_36/0.3)] ring-1 ring-plaster-200 backdrop-blur-sm sm:top-6 sm:left-6 sm:px-5 sm:py-4">
              <p className="font-secondary text-xs font-medium text-slate-600">Turnkey homes from</p>
              <p className="mt-0.5 font-display text-xl font-semibold text-slate-900 tabular-nums sm:text-2xl">
                ₹{site.baseRateSqft.toLocaleString('en-IN')}
                <span className="text-sm font-medium text-slate-600 sm:text-base"> / sq ft</span>
              </p>
            </div>

            {/* Where we build */}
            {/* Clear of the second photo from sm up, so it wraps instead */}
            <div className="absolute bottom-0 left-4 flex max-w-[calc(100%-2rem)] items-start gap-2 rounded-2xl bg-white px-4 py-2.5 font-secondary text-xs leading-snug font-semibold text-slate-800 shadow-[0_12px_28px_-12px_rgb(3_20_36/0.3)] ring-1 ring-plaster-200 sm:bottom-6 sm:left-6 sm:max-w-[40%]">
              <MapPin aria-hidden="true" size={15} className="mt-px shrink-0 text-brand-500" />
              <span>Building across {serviceAreas.map((area) => area.name).join(', ')}</span>
            </div>
          </div>

          {/* ── Story ──────────────────────────────────────────────────── */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 font-secondary text-xs font-bold tracking-[0.16em] text-brand-500 uppercase sm:text-[0.8125rem]">
              <span aria-hidden="true" className="inline-block h-2 w-2 rounded-[2px] bg-brand-500" />
              About us
            </div>

            <h2
              id="about-heading"
              className="mt-4 max-w-[22ch] font-display text-[1.625rem] leading-[1.18] font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]"
            >
              A Tumkur builder you can{' '}
              <span className="font-playfair italic">sit across the table from</span>
            </h2>

            <p className="mt-4 max-w-[56ch] text-[0.9375rem] leading-relaxed text-slate-600 sm:mt-6 sm:text-lg">
              Every building begins with a dream. From duplexes and villas to schools and offices,
              our engineers, architects and craftsmen build it with premium materials, honest
              pricing and a handover date we keep.
            </p>

            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              {PILLARS.map(({ icon: Icon, title, text }) => (
                <li
                  key={title}
                  className="group flex gap-4 rounded-[20px] bg-white p-4 ring-1 ring-plaster-200 transition-shadow duration-300 hover:shadow-[0_20px_40px_-24px_rgb(3_20_36/0.3)] hover:ring-brand-500/30 sm:p-5"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-500 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white"
                  >
                    <Icon size={20} strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="font-display text-[0.9375rem] font-semibold text-slate-900 sm:text-base">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-5">
              <Link
                href="/about"
                className="group inline-flex items-center rounded-full bg-brand-500 py-1.5 pr-2 pl-6 text-[0.9375rem] font-bold text-white shadow-xl shadow-brand-500/25 transition-colors duration-200 hover:bg-brand-600"
              >
                More about us
                <span className="ml-3.5 flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-500 transition-transform duration-200 group-hover:translate-x-1">
                  <ArrowRight aria-hidden="true" size={16} strokeWidth={2.5} />
                </span>
              </Link>
              <a
                href={contact.phoneHref}
                className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-slate-300 bg-white px-5 text-sm font-bold text-slate-800 transition-colors duration-200 hover:border-brand-500 hover:text-brand-500"
              >
                <Phone aria-hidden="true" size={17} className="text-brand-500" />
                <span className="tabular-nums">{contact.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
