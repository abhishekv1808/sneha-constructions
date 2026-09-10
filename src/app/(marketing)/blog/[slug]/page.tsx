import { ArrowRight, ArrowUpRight, ChevronRight, Phone } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { PostBody } from '@/components/sections/blog'
import { Container } from '@/components/ui'
import { contact, site } from '@/content'
import {
  formatPostDate,
  getCategory,
  getPostBySlug,
  getRelatedPosts,
  posts,
  readingMinutes,
} from '@/content/blog-data'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) return { title: `Article not found | ${site.shortName}` }

  return {
    title: `${post.metaTitle} | ${site.shortName}`,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `/blog/${post.slug}`,
      siteName: site.name,
      locale: 'en_IN',
      type: 'article',
      publishedTime: post.published,
      modifiedTime: post.updated ?? post.published,
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) notFound()

  const category = getCategory(post.category)
  const minutes = readingMinutes(post)
  const related = getRelatedPosts(post)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.metaDescription,
        datePublished: post.published,
        dateModified: post.updated ?? post.published,
        articleSection: category.label,
        inLanguage: 'en-IN',
        author: { '@type': 'Organization', name: site.name },
        publisher: {
          '@type': 'Organization',
          name: site.name,
          telephone: contact.phoneDisplay,
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': `/blog/${post.slug}` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: '/' },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: '/blog' },
          { '@type': 'ListItem', position: 3, name: post.title, item: `/blog/${post.slug}` },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        {/* Masthead */}
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
              <Link href="/blog" className="transition-colors hover:text-brand-500">
                Guides
              </Link>
              <ChevronRight size={13} className="text-slate-400" aria-hidden />
              <span className="truncate text-brand-500">{category.label}</span>
            </nav>

            {/* The ch cap belongs on the h1, not a wrapper: ch resolves against
                the element's own font-size, so on the wrapper it measured at
                body size and squeezed the title into six narrow lines. */}
            <h1 className="mt-7 max-w-[18ch] font-display text-4xl leading-[1.08] font-semibold tracking-tight text-slate-900 sm:text-5xl">
              {post.title}
            </h1>

            <p className="mt-5 max-w-[62ch] font-secondary text-lg leading-relaxed text-slate-600">
              {post.standfirst}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-plaster-200 pt-5 font-secondary text-xs text-slate-500">
              <span className="font-bold text-slate-900">{post.author}</span>
              <span>{post.authorRole}</span>
              <time dateTime={post.published}>{formatPostDate(post.published)}</time>
              <span>{minutes} min read</span>
            </div>
          </Container>
        </header>

        {/* Body + rail */}
        <div className="bg-white py-14 sm:py-16">
          <Container>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-8">
                <PostBody blocks={post.body} />
              </div>

              <aside className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <div className="rounded-[12px] border border-plaster-200 bg-plaster-50 p-5">
                    <p className="font-secondary text-[0.6875rem] font-bold tracking-[0.14em] text-brand-500 uppercase">
                      In short
                    </p>
                    <ul className="mt-3 space-y-2.5">
                      {post.takeaways.map((point) => (
                        <li key={point} className="flex gap-2.5">
                          <span
                            aria-hidden
                            className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 rounded-[1px] bg-brand-500"
                          />
                          <span className="font-secondary text-sm leading-snug text-slate-700">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 rounded-[12px] bg-ink-950 p-5">
                    <p className="font-display text-base leading-snug font-semibold text-white">
                      Building this year?
                    </p>
                    <p className="mt-1.5 font-secondary text-sm leading-relaxed text-slate-400">
                      Free site visit anywhere in Tumkur district.
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
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-plaster-200 bg-plaster-50 py-16 sm:py-20">
          <Container>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-900">
              Read next
            </h2>

            <ul className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-[12px] border border-plaster-200 bg-plaster-200 sm:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug} className="bg-white">
                  <Link
                    href={`/blog/${item.slug}`}
                    className="group flex h-full flex-col justify-between p-5 transition-colors duration-150 hover:bg-plaster-50"
                  >
                    <div>
                      <span className="font-secondary text-[0.6875rem] font-bold tracking-[0.12em] text-brand-500 uppercase">
                        {getCategory(item.category).label}
                      </span>
                      <h3 className="mt-2.5 font-display text-lg leading-snug font-semibold text-slate-900 transition-colors duration-150 group-hover:text-brand-500">
                        {item.title}
                      </h3>
                    </div>
                    <span className="mt-5 flex items-center justify-between font-secondary text-xs text-slate-400">
                      <span>{readingMinutes(item)} min read</span>
                      <ArrowUpRight
                        size={15}
                        strokeWidth={2.4}
                        aria-hidden
                        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 font-secondary text-sm font-bold text-slate-900 transition-colors hover:text-brand-500"
              >
                <span>All guides</span>
                <ArrowRight
                  size={15}
                  strokeWidth={2.4}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </Container>
        </section>
      )}
    </>
  )
}
