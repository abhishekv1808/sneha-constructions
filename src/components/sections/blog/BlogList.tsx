'use client'

import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import type { CategoryId } from '@/content/blog-data'

/**
 * Only the index metadata crosses to the client — never the post bodies, which
 * would put every article's full text into the bundle for the sake of a filter.
 */
export interface PostSummary {
  slug: string
  title: string
  standfirst: string
  categoryId: CategoryId
  categoryLabel: string
  dateISO: string
  dateLabel: string
  minutes: number
}

interface BlogListProps {
  posts: readonly PostSummary[]
  categories: readonly { id: CategoryId; label: string }[]
}

export function BlogList({ posts, categories }: BlogListProps) {
  const [filter, setFilter] = useState<CategoryId | 'all'>('all')

  const shown = filter === 'all' ? posts : posts.filter((post) => post.categoryId === filter)

  return (
    <>
      <div
        role="group"
        aria-label="Filter articles by topic"
        className="flex flex-wrap gap-2 border-b border-plaster-200 pb-6"
      >
        <FilterChip active={filter === 'all'} onClick={() => setFilter('all')}>
          All articles
        </FilterChip>
        {categories.map((category) => (
          <FilterChip
            key={category.id}
            active={filter === category.id}
            onClick={() => setFilter(category.id)}
          >
            {category.label}
          </FilterChip>
        ))}
      </div>

      {/* Ruled editorial rows — the site has no stock article photography and a
          grid of grey placeholder cards would look worse than none. */}
      <ol aria-live="polite">
        {shown.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group grid grid-cols-1 gap-2 border-b border-plaster-200 py-7 transition-colors duration-150 hover:bg-plaster-50 sm:grid-cols-[9rem_1fr_auto] sm:gap-6 sm:px-2"
            >
              <div className="font-secondary text-xs">
                <span className="block font-bold tracking-[0.12em] text-brand-500 uppercase">
                  {post.categoryLabel}
                </span>
                <time dateTime={post.dateISO} className="mt-1 block text-slate-500">
                  {post.dateLabel}
                </time>
              </div>

              <div className="min-w-0">
                <h3 className="font-display text-xl leading-snug font-semibold text-slate-900 transition-colors duration-150 group-hover:text-brand-500 sm:text-2xl">
                  {post.title}
                </h3>
                <p className="mt-1.5 max-w-[62ch] font-secondary text-sm leading-relaxed text-slate-600">
                  {post.standfirst}
                </p>
                <p className="mt-2 font-secondary text-xs text-slate-400 sm:hidden">
                  {post.minutes} min read
                </p>
              </div>

              <div className="hidden shrink-0 flex-col items-end gap-3 sm:flex">
                <span className="font-secondary text-xs text-slate-400">
                  {post.minutes} min read
                </span>
                <span
                  aria-hidden
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-plaster-100 text-slate-900 transition-colors duration-150 group-hover:bg-brand-500 group-hover:text-white"
                >
                  <ArrowUpRight size={16} strokeWidth={2.4} />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ol>

      {shown.length === 0 && (
        <p className="py-12 text-center font-secondary text-sm text-slate-500">
          Nothing under this topic yet.
        </p>
      )}
    </>
  )
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-4 py-2 font-secondary text-xs font-bold transition-colors duration-150 ${
        active ? 'bg-brand-500 text-white' : 'bg-plaster-100 text-slate-600 hover:bg-plaster-200'
      }`}
    >
      {children}
    </button>
  )
}
