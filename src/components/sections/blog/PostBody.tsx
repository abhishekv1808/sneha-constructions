import { Info, Quote } from 'lucide-react'

import type { Block } from '@/content/blog-data'

/**
 * Renders the typed blocks from blog-data. Every element is styled explicitly
 * rather than through a prose reset, so an article sits inside the same design
 * system as the rest of the site instead of importing a second one.
 *
 * No state, no handlers — server component.
 */
export function PostBody({ blocks }: { blocks: readonly Block[] }) {
  return (
    <div className="max-w-[68ch]">
      {blocks.map((block, index) => (
        <BlockView key={index} block={block} />
      ))}
    </div>
  )
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case 'p':
      return (
        <p className="mt-5 font-secondary text-[1.0625rem] leading-[1.75] text-slate-700 first:mt-0">
          {block.text}
        </p>
      )

    case 'h2':
      return (
        <h2 className="mt-12 font-display text-2xl leading-snug font-semibold tracking-tight text-slate-900 sm:text-[1.75rem]">
          {block.text}
        </h2>
      )

    case 'h3':
      return (
        <h3 className="mt-8 font-display text-lg font-semibold text-slate-900">{block.text}</h3>
      )

    case 'ul':
      return (
        <ul className="mt-5 space-y-2.5">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3">
              <span
                aria-hidden
                className="mt-[0.6875rem] h-1.5 w-1.5 shrink-0 rounded-[1px] bg-brand-500"
              />
              <span className="font-secondary text-[1.0625rem] leading-[1.7] text-slate-700">
                {item}
              </span>
            </li>
          ))}
        </ul>
      )

    case 'ol':
      return (
        <ol className="mt-5 space-y-3">
          {block.items.map((item, i) => (
            <li key={item} className="flex gap-3.5">
              <span
                data-numeral
                aria-hidden
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500/10 font-secondary text-xs font-bold text-brand-500"
              >
                {i + 1}
              </span>
              <span className="font-secondary text-[1.0625rem] leading-[1.7] text-slate-700">
                {item}
              </span>
            </li>
          ))}
        </ol>
      )

    case 'callout':
      return (
        <aside className="mt-8 rounded-[12px] border border-plaster-200 bg-plaster-50 p-5 sm:p-6">
          <p className="flex items-center gap-2 font-secondary text-xs font-bold tracking-[0.14em] text-brand-500 uppercase">
            <Info size={14} strokeWidth={2.2} aria-hidden />
            {block.title}
          </p>
          <p className="mt-2.5 font-secondary text-[1rem] leading-[1.7] text-slate-700">
            {block.text}
          </p>
        </aside>
      )

    case 'quote':
      return (
        <figure className="mt-9 border-l-2 border-brand-500 pl-5 sm:pl-6">
          <Quote size={20} className="text-brand-500" strokeWidth={1.5} aria-hidden />
          <blockquote className="mt-2.5 font-display text-lg leading-[1.5] font-medium text-slate-900 sm:text-xl">
            {block.text}
          </blockquote>
          {block.attribution && (
            <figcaption className="mt-2 font-secondary text-sm text-slate-500">
              {block.attribution}
            </figcaption>
          )}
        </figure>
      )

    case 'table':
      return (
        <figure className="mt-8">
          {/* Wide content scrolls inside its own container (§13). */}
          <div className="overflow-x-auto rounded-[12px] border border-plaster-200">
            <table className="w-full min-w-[34rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-plaster-200 bg-plaster-50">
                  {block.head.map((cell, i) => (
                    <th
                      key={i}
                      scope="col"
                      className="px-4 py-3 font-secondary text-[0.6875rem] font-bold tracking-[0.12em] text-slate-500 uppercase"
                    >
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, r) => (
                  <tr key={r} className="border-b border-plaster-200 last:border-b-0">
                    {row.map((cell, c) => (
                      <td
                        key={c}
                        className={`px-4 py-3 align-top font-secondary text-sm leading-relaxed ${
                          c === 0 ? 'font-semibold text-slate-900' : 'text-slate-600'
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption && (
            <figcaption className="mt-2.5 font-secondary text-xs text-slate-500">
              {block.caption}
            </figcaption>
          )}
        </figure>
      )
  }
}
