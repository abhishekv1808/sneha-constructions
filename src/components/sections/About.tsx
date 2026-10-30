import { ArrowRight, Clock, HardHat, ReceiptText, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import aboutImage from '@/assets/about/about-engineers.jpg'
import { Container } from '@/components/ui'
import { site } from '@/content'

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
    text: 'An itemised quote before work starts, so there are no surprises later.',
  },
  {
    icon: Clock,
    title: 'On-time delivery',
    text: 'Clear milestones from foundation to handover, and updates at every stage.',
  },
  {
    icon: HardHat,
    title: 'In-house engineers & architects',
    text: 'Design, structure and site supervision by one team.',
  },
] as const

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="bg-white py-16 sm:py-24 lg:py-32">
      <Container>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-20">
          {/* ── Photo ──────────────────────────────────────────────────── */}
          <div className="relative lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl lg:aspect-[4/5] bg-plaster-100">
              {/* Placeholder: a generic site photo, not Sneha's team. Swap for
                  real on-site photography when the client supplies it (§2). */}
              <Image
                src={aboutImage}
                alt="Two site engineers in hard hats reviewing drawings in front of a two-storey house under construction"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                placeholder="blur"
                className="object-cover object-[45%_50%]"
              />
            </div>

            {/* The offer the business runs on, pinned to the photo */}
            <div className="absolute -bottom-6 left-6 rounded-2xl bg-white px-5 py-4 shadow-[0_12px_32px_-8px_rgb(19_26_36/0.18)] ring-1 ring-plaster-200 sm:left-8">
              <p className="font-secondary text-xs font-medium text-slate-600">
                Turnkey homes from
              </p>
              <p className="mt-0.5 font-display text-2xl font-semibold text-slate-900 tabular-nums">
                ₹{site.baseRateSqft.toLocaleString('en-IN')}
                <span className="text-base font-medium text-slate-600"> / sq ft</span>
              </p>
            </div>
          </div>

          {/* ── Story ──────────────────────────────────────────────────── */}
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 font-secondary text-[0.8125rem] font-semibold text-brand-500">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              About us
            </p>
            <h2
              id="about-heading"
              className="mt-3 max-w-[20ch] font-display text-[clamp(1.625rem,4vw,3.25rem)] leading-[1.08] font-semibold tracking-[-0.02em] text-slate-900"
            >
              A Tumkur builder you can sit across the table from
            </h2>
            <p className="mt-6 max-w-[58ch] text-[0.9375rem] leading-relaxed text-slate-600 sm:text-lg">
              Every building begins with a dream. From duplexes and villas to schools and offices,
              our engineers, architects and craftsmen build it with premium materials, honest
              pricing and a handover date we keep.
            </p>

            <ul className="mt-10 grid grid-cols-1 gap-x-10 sm:grid-cols-2">
              {PILLARS.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex gap-4 border-t border-plaster-200 py-5">
                  <Icon
                    aria-hidden="true"
                    size={22}
                    strokeWidth={1.5}
                    className="mt-0.5 shrink-0 text-brand-500"
                  />
                  <div>
                    <h3 className="font-display text-base font-semibold text-slate-900">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <Link
              href="/about"
              className="group mt-8 inline-flex min-h-11 items-center gap-2 font-secondary text-[0.9375rem] font-semibold text-slate-900 underline-offset-4 hover:underline"
            >
              More about us
              <ArrowRight
                aria-hidden="true"
                size={17}
                strokeWidth={2}
                className="text-brand-500 transition-transform duration-150 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
