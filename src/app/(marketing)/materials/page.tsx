import { ArrowRight, Check, Phone } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { Container, SectionHeading } from '@/components/ui'
import { contact, site } from '@/content'
import { getMaterialSpecs } from '@/content/materials-specs'
import { getMaterials } from '@/lib/supabase/queries'

export const metadata: Metadata = {
  title: `Materials & Quality | ${site.name}, Tumkur`,
  description:
    'The cement, steel, wiring, plumbing, tiles and waterproofing that go into a Sneha Construction build in Tumkur — named brands and grades, not adjectives.',
  alternates: { canonical: '/materials' },
  openGraph: {
    title: 'Materials & Quality | Sneha Construction, Tumkur',
    description:
      'Ask what goes into the walls. Named brands and grades for every stage of the build.',
    url: '/materials',
    siteName: site.name,
    locale: 'en_IN',
    type: 'website',
  },
}

export default async function MaterialsOverviewPage() {
  const materials = await getMaterials()

  return (
    <>
      {/* Masthead — §8.7's heading direction */}
      <section className="border-b border-plaster-200 bg-plaster-50 pt-28 pb-14 sm:pt-32 lg:pt-36">
        <Container>
          <p className="inline-flex items-center gap-2 font-secondary text-xs font-bold tracking-[0.16em] text-brand-500 uppercase sm:text-[0.8125rem]">
            <span aria-hidden className="inline-block h-2 w-2 rounded-[2px] bg-brand-500" />
            Materials &amp; quality
          </p>
          <h1 className="mt-4 max-w-[18ch] font-display text-4xl leading-[1.06] font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Ask what goes into the walls. <span className="font-playfair italic">We&apos;ll tell you.</span>
          </h1>
          <p className="mt-5 max-w-xl font-secondary text-base leading-relaxed text-slate-600">
            Five stages, each with named brands and grades. Every load that reaches your site
            arrives with its manufacturer test certificate.
          </p>
        </Container>
      </section>

      {/* The five categories as ruled specification rows */}
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <ol>
            {materials.map((material, index) => {
              const specs = getMaterialSpecs(material.slug)

              return (
                <li key={material.id}>
                  <Link
                    href={`/materials/${material.slug}`}
                    className="group grid grid-cols-1 gap-6 border-b border-plaster-200 py-9 transition-colors duration-150 hover:bg-plaster-50 lg:grid-cols-12 lg:gap-10 lg:px-2"
                  >
                    <div className="lg:col-span-5">
                      <span
                        data-numeral
                        className="font-secondary text-xs font-bold text-slate-400"
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h2 className="mt-2 font-display text-2xl leading-snug font-semibold text-slate-900 transition-colors duration-150 group-hover:text-brand-500 sm:text-[1.75rem]">
                        {material.name}
                      </h2>
                      <p className="mt-2.5 max-w-[46ch] font-secondary text-sm leading-relaxed text-slate-600">
                        {material.promise}
                      </p>

                      <ul className="mt-4 space-y-1.5">
                        {(material.highlights ?? []).map((point) => (
                          <li key={point} className="flex gap-2.5">
                            <Check
                              size={14}
                              strokeWidth={2.4}
                              className="mt-0.5 shrink-0 text-brand-500"
                            />
                            <span className="font-secondary text-xs text-slate-600">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Brand roster — the part that actually persuades */}
                    <div className="lg:col-span-7">
                      <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-[12px] border border-plaster-200 bg-plaster-200 sm:grid-cols-2">
                        {specs.map((spec) => (
                          <div key={spec.component} className="bg-white p-4">
                            <dt className="font-secondary text-[0.6875rem] font-bold tracking-[0.12em] text-slate-500 uppercase">
                              {spec.component}
                            </dt>
                            <dd className="mt-1 font-display text-sm font-semibold text-slate-900">
                              {spec.brand}
                            </dd>
                            <dd className="mt-0.5 font-secondary text-xs leading-snug text-slate-500">
                              {spec.note}
                            </dd>
                          </div>
                        ))}
                      </dl>

                      <span className="mt-4 inline-flex items-center gap-2 font-secondary text-xs font-bold text-slate-900 transition-colors duration-150 group-hover:text-brand-500">
                        Read the detail
                        <ArrowRight
                          size={14}
                          strokeWidth={2.4}
                          className="transition-transform duration-200 group-hover:translate-x-0.5"
                        />
                      </span>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ol>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-ink-950 py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <SectionHeading tone="dark" eyebrow="Still deciding?">
                Come and see a <em>site in progress</em>
              </SectionHeading>
              <p className="mt-4 max-w-lg font-secondary text-base text-slate-300">
                The fastest way to judge a builder is to stand on one of their live sites and look
                at the work. We&apos;ll arrange it.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 lg:col-span-5 lg:justify-end">
              <Link
                href="/contact"
                className="group inline-flex items-center rounded-full bg-brand-500 py-2 pr-2 pl-6 font-secondary text-sm font-bold text-white transition-colors duration-150 hover:bg-brand-600"
              >
                <span>Book a site visit</span>
                <span className="ml-3.5 flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-500 transition-transform duration-200 group-hover:translate-x-1">
                  <ArrowRight size={16} strokeWidth={2.5} />
                </span>
              </Link>

              <a
                href={contact.phoneHref}
                className="inline-flex items-center gap-2.5 rounded-full border border-white/25 px-5 py-3 font-secondary text-sm font-bold text-white transition-colors duration-150 hover:border-white/60 hover:bg-white/10"
              >
                <Phone size={16} />
                <span>{contact.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
