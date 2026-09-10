import { ArrowLeft, ArrowRight, Check, ChevronRight, Phone } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Container } from '@/components/ui'
import { contact, site } from '@/content'
import { getMaterialSpecs } from '@/content/materials-specs'
import { getMaterialBySlug, getMaterials } from '@/lib/supabase/queries'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const materials = await getMaterials()
  return materials.map((material) => ({ slug: material.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const material = await getMaterialBySlug(slug)

  if (!material) return { title: `Not found | ${site.shortName}` }

  return {
    title: `${material.name} | Materials & Quality | ${site.shortName}, Tumkur`,
    description: material.promise,
    alternates: { canonical: `/materials/${material.slug}` },
    openGraph: {
      title: `${material.name} — Materials & Quality`,
      description: material.promise,
      url: `/materials/${material.slug}`,
      siteName: site.name,
      locale: 'en_IN',
      type: 'article',
    },
  }
}

export default async function MaterialDetailPage({ params }: PageProps) {
  const { slug } = await params
  const material = await getMaterialBySlug(slug)

  if (!material) notFound()

  const all = await getMaterials()
  const index = all.findIndex((item) => item.slug === material.slug)
  const previous = index > 0 ? all[index - 1] : null
  const next = index >= 0 && index < all.length - 1 ? all[index + 1] : null
  const specs = getMaterialSpecs(material.slug)

  // `body` is client-editable and may be empty; split into paragraphs when set.
  const paragraphs = (material.body ?? '')
    .split(/\n\s*\n/)
    .map((para) => para.trim())
    .filter(Boolean)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: '/' },
      { '@type': 'ListItem', position: 2, name: 'Materials & quality', item: '/materials' },
      {
        '@type': 'ListItem',
        position: 3,
        name: material.name,
        item: `/materials/${material.slug}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="border-b border-plaster-200 bg-plaster-50 pt-28 pb-12 sm:pt-32 lg:pt-36">
        <Container>
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 font-secondary text-xs font-semibold text-slate-500"
          >
            <Link href="/" className="transition-colors hover:text-brand-500">
              Home
            </Link>
            <ChevronRight size={13} className="text-slate-400" aria-hidden />
            <Link href="/materials" className="transition-colors hover:text-brand-500">
              Materials &amp; quality
            </Link>
            <ChevronRight size={13} className="text-slate-400" aria-hidden />
            <span className="truncate text-brand-500">{material.name}</span>
          </nav>

          <h1 className="mt-7 max-w-[16ch] font-display text-4xl leading-[1.08] font-semibold tracking-tight text-slate-900 sm:text-5xl">
            {material.name}
          </h1>

          <p className="mt-5 max-w-[62ch] font-secondary text-lg leading-relaxed text-slate-600">
            {material.promise}
          </p>
        </Container>
      </header>

      <section className="bg-white py-14 sm:py-16">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              {paragraphs.length > 0 ? (
                <div className="max-w-[68ch]">
                  {paragraphs.map((para, i) => (
                    <p
                      key={i}
                      className="mt-5 font-secondary text-[1.0625rem] leading-[1.75] text-slate-700 first:mt-0"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              ) : (
                // Honest placeholder rather than filler prose. The client can
                // fill `material_categories.body` and it appears within seconds.
                <p className="max-w-[68ch] font-secondary text-[1.0625rem] leading-[1.75] text-slate-500">
                  Detailed notes for this stage are being written. In the meantime, the
                  specification opposite is exactly what we use on site — call us and we will walk
                  you through any of it.
                </p>
              )}

              <h2 className="mt-12 font-display text-2xl font-semibold tracking-tight text-slate-900">
                What you get
              </h2>
              <ul className="mt-5 space-y-3">
                {(material.highlights ?? []).map((point) => (
                  <li key={point} className="flex gap-3">
                    <Check
                      size={16}
                      strokeWidth={2.4}
                      className="mt-1 shrink-0 text-brand-500"
                    />
                    <span className="font-secondary text-[1.0625rem] leading-[1.7] text-slate-700">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specification rail */}
            <aside className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <div className="overflow-hidden rounded-[12px] border border-plaster-200">
                  <p className="border-b border-plaster-200 bg-plaster-50 px-5 py-3 font-secondary text-[0.6875rem] font-bold tracking-[0.14em] text-slate-500 uppercase">
                    What we use
                  </p>
                  <dl className="divide-y divide-plaster-200">
                    {specs.map((spec) => (
                      <div key={spec.component} className="px-5 py-4">
                        <dt className="font-secondary text-[0.6875rem] font-bold tracking-[0.12em] text-slate-500 uppercase">
                          {spec.component}
                        </dt>
                        <dd className="mt-1 font-display text-sm font-semibold text-brand-500">
                          {spec.brand}
                        </dd>
                        <dd className="mt-1 font-secondary text-xs leading-relaxed text-slate-600">
                          {spec.note}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="mt-4 rounded-[12px] bg-ink-950 p-5">
                  <p className="font-display text-base leading-snug font-semibold text-white">
                    Want to see it on site?
                  </p>
                  <p className="mt-1.5 font-secondary text-sm leading-relaxed text-slate-400">
                    We&apos;ll show you this stage on a live build in Tumkur.
                  </p>
                  <a
                    href={contact.phoneHref}
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-500 px-4 py-2.5 font-secondary text-xs font-bold text-white transition-colors duration-150 hover:bg-brand-600"
                  >
                    <Phone size={14} />
                    <span>{contact.phoneDisplay}</span>
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Prev / next through the five stages */}
      <section className="border-t border-plaster-200 bg-plaster-50 py-12">
        <Container>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {previous ? (
              <Link
                href={`/materials/${previous.slug}`}
                className="group flex items-center gap-3 rounded-[12px] border border-plaster-200 bg-white p-5 transition-colors duration-150 hover:border-brand-500"
              >
                <ArrowLeft
                  size={16}
                  strokeWidth={2.4}
                  className="shrink-0 text-brand-500 transition-transform duration-200 group-hover:-translate-x-0.5"
                />
                <span>
                  <span className="block font-secondary text-[0.6875rem] font-bold tracking-[0.12em] text-slate-500 uppercase">
                    Previous stage
                  </span>
                  <span className="mt-0.5 block font-display text-sm font-semibold text-slate-900">
                    {previous.name}
                  </span>
                </span>
              </Link>
            ) : (
              <span />
            )}

            {next && (
              <Link
                href={`/materials/${next.slug}`}
                className="group flex items-center justify-end gap-3 rounded-[12px] border border-plaster-200 bg-white p-5 text-right transition-colors duration-150 hover:border-brand-500 sm:col-start-2"
              >
                <span>
                  <span className="block font-secondary text-[0.6875rem] font-bold tracking-[0.12em] text-slate-500 uppercase">
                    Next stage
                  </span>
                  <span className="mt-0.5 block font-display text-sm font-semibold text-slate-900">
                    {next.name}
                  </span>
                </span>
                <ArrowRight
                  size={16}
                  strokeWidth={2.4}
                  className="shrink-0 text-brand-500 transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
            )}
          </div>
        </Container>
      </section>
    </>
  )
}
