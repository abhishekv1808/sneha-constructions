'use client'

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

import type { ServiceFaq } from '@/content/services-data'

export function ServiceFaqAccordion({ faqs }: { faqs: ServiceFaq[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  const toggle = (idx: number) => {
    setOpenIdx((cur) => (cur === idx ? null : idx))
  }

  return (
    <div className="mx-auto mt-12 max-w-3xl space-y-4">
      {faqs.map((faq, i) => {
        const isOpen = openIdx === i
        return (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-200 hover:border-slate-300 shadow-sm"
          >
            <button
              type="button"
              onClick={() => toggle(i)}
              className="flex w-full items-center justify-between p-6 text-left transition-colors hover:text-[#CE1C73]"
              aria-expanded={isOpen}
            >
              <span className="font-display text-base sm:text-lg font-bold text-slate-900 pr-4">
                {faq.question}
              </span>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 bg-[#CE1C73] text-white' : ''
                }`}
              >
                <ChevronDown size={18} />
              </span>
            </button>

            {isOpen && (
              <div className="border-t border-slate-100 px-6 pt-2 pb-6 text-sm sm:text-base leading-relaxed text-slate-600">
                {faq.answer}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
