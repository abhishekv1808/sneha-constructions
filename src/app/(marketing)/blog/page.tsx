import { ArrowRight, Phone } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { BlogList, type PostSummary } from '@/components/sections/blog'
import { Container } from '@/components/ui'
import { contact, site } from '@/content'
import {
  categories,
  formatPostDate,
  getCategory,
  getFeaturedPost,
  readingMinutes,
  sortedPosts,
} from '@/content/blog-data'

export const metadata: Metadata = {
  title: `Building Guides for Tumkur | ${site.name}`,
  description:
    'Practical guides on building a house in Tumkur — construction costs, plan sanction and approvals, checking materials on site, and reading a construction agreement.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Building Guides for Tumkur | Sneha Construction',
    description:
      'Straight answers on cost, approvals, materials and planning for anyone building in Tumkur district.',
    url: '/blog',
    siteName: site.name,
    locale: 'en_IN',
    type: 'website',
  },
}

export default function BlogIndexPage() {
  const featured = getFeaturedPost()
  const rest = sortedPosts().filter((post) => post.slug !== featured.slug)

  const summaries: PostSummary[] = rest.map((post) => ({
    slug: post.slug,
    title: post.title,
    standfirst: post.standfirst,
    categoryId: post.category,
    categoryLabel: getCategory(post.category).label,
    dateISO: post.published,
    dateLabel: formatPostDate(post.published),
    minutes: readingMinutes(post),
  }))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `Building guides — ${site.name}`,
    url: `/blog`,
    publisher: { '@type': 'Organization', name: site.name },
    blogPost: sortedPosts().map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.standfirst,
      datePublished: post.published,
      url: `/blog/${post.slug}`,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <section className="border-b border-plaster-200 bg-plaster-50 pt-28 pb-14 sm:pt-32 lg:pt-36">
        <Container>
          <p className="inline-flex items-center gap-2 font-secondary text-xs font-bold tracking-[0.16em] text-brand-500 uppercase sm:text-[0.8125rem]">
            <span aria-hidden className="inline-block h-2 w-2 rounded-[2px] bg-brand-500" />
            Guides
          </p>
          <h1 className="mt-4 max-w-[20ch] font-display text-4xl leading-[1.06] font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Straight answers <span className="font-playfair italic">before you build</span>
          </h1>
          <p className="mt-5 max-w-xl font-secondary text-base leading-relaxed text-slate-600">
            What things cost, which approvals you need, and how to check the work — written for
            people building in Tumkur district.
          </p>
        </Container>
      </section>

      {/* Featured */}
      <section className="bg-white py-14 sm:py-16">
        <Container>
          <Link
            href={`/blog/${featured.slug}`}
            className="group block overflow-hidden rounded-[16px] bg-ink-950 p-7 transition-colors duration-150 hover:bg-ink-900 sm:p-10"
          >
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-8">
                <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-secondary text-xs">
                  <span className="rounded-full bg-brand-500 px-2.5 py-0.5 font-bold text-white">
                    Start here
                  </span>
                  <span className="font-bold tracking-[0.12em] text-brand-300 uppercase">
                    {getCategory(featured.category).label}
                  </span>
                  <time dateTime={featured.published} className="text-slate-400">
                    {formatPostDate(featured.published)}
                  </time>
                  <span className="text-slate-500">{readingMinutes(featured)} min read</span>
                </p>

                <h2 className="mt-5 max-w-[20ch] font-display text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl">
                  {featured.title}
                </h2>

                <p className="mt-4 max-w-[58ch] font-secondary text-base leading-relaxed text-slate-300">
                  {featured.standfirst}
                </p>

                <span className="mt-7 inline-flex items-center gap-2.5 font-secondary text-sm font-bold text-white">
                  Read the guide
                  <span
                    aria-hidden
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 transition-transform duration-200 group-hover:translate-x-1"
                  >
                    <ArrowRight size={15} strokeWidth={2.5} />
                  </span>
                </span>
              </div>

              {/* Takeaways stand in for a cover image — there is no article
                  photography, and this is more useful than a stock photo. */}
              <div className="lg:col-span-4">
                <div className="rounded-[12px] border border-ink-700 p-5">
                  <p className="font-secondary text-[0.6875rem] font-bold tracking-[0.14em] text-slate-400 uppercase">
                    In short
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {featured.takeaways.map((point) => (
                      <li key={point} className="flex gap-2.5">
                        <span
                          aria-hidden
                          className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 rounded-[1px] bg-brand-300"
                        />
                        <span className="font-secondary text-sm leading-snug text-slate-300">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Link>
        </Container>
      </section>

      {/* The rest */}
      <section className="bg-white pb-20 sm:pb-28">
        <Container>
          <BlogList posts={summaries} categories={[...categories]} />
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t border-plaster-200 bg-plaster-50 py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl leading-snug font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Still have a question about your plot?
            </h2>
            <p className="mt-3 font-secondary text-base text-slate-600">
              Ask us directly. A free site visit anywhere in Tumkur district.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center rounded-full bg-brand-500 py-2 pr-2 pl-6 font-secondary text-sm font-bold text-white transition-colors duration-150 hover:bg-brand-600"
              >
                <span>Ask us</span>
                <span className="ml-3.5 flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-500 transition-transform duration-200 group-hover:translate-x-1">
                  <ArrowRight size={16} strokeWidth={2.5} />
                </span>
              </Link>

              <a
                href={contact.phoneHref}
                className="inline-flex items-center gap-2.5 rounded-full border border-plaster-300 bg-white px-5 py-3 font-secondary text-sm font-bold text-slate-900 transition-colors duration-150 hover:border-brand-500 hover:text-brand-500"
              >
                <Phone size={16} className="text-brand-500" />
                <span>{contact.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
