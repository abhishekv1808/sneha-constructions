'use client'

import React, { useState } from 'react'
import {
  MessageCircle,
  Phone,
  Calculator,
  PencilRuler,
  X,
  Sparkles,
  ChevronUp,
} from 'lucide-react'
import Link from 'next/link'
import { useQuoteModal } from '@/components/providers/QuoteModalProvider'
import { contact, site, whatsappUrl } from '@/content'

export function FloatingActionWidget() {
  const { openQuoteModal } = useQuoteModal()
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <aside
      aria-label="Quick contact and quote options"
      className="fixed bottom-6 right-6 z-40 hidden md:flex flex-col items-end gap-3 print:hidden"
    >
      {/* Expanded Quick Options Menu */}
      {isExpanded && (
        <div className="flex flex-col items-end gap-2.5 animate-in fade-in slide-in-from-bottom-3 duration-200">
          {/* Option 1: Cost Estimator Hub */}
          <Link
            href="/estimate"
            onClick={() => setIsExpanded(false)}
            className="flex items-center gap-3 rounded-full border border-slate-200 bg-white py-2.5 pr-4 pl-3.5 text-xs font-bold text-slate-800 shadow-xl transition-all hover:border-[#CE1C73] hover:bg-slate-50 hover:scale-105"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-100 text-[#CE1C73]">
              <Calculator size={16} />
            </span>
            <span>Cost &amp; Vastu Tools</span>
          </Link>

          {/* Option 2: 1-Click WhatsApp */}
          <a
            href={whatsappUrl(`Hi ${site.shortName}, I want to discuss a construction project in Tumkur.`)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsExpanded(false)}
            className="flex items-center gap-3 rounded-full border border-emerald-200 bg-white py-2.5 pr-4 pl-3.5 text-xs font-bold text-slate-800 shadow-xl transition-all hover:border-emerald-500 hover:bg-emerald-50/50 hover:scale-105"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <MessageCircle size={16} />
            </span>
            <span>Chat on WhatsApp</span>
          </a>

          {/* Option 3: Direct Phone Call */}
          <a
            href={contact.phoneHref}
            onClick={() => setIsExpanded(false)}
            className="flex items-center gap-3 rounded-full border border-slate-200 bg-white py-2.5 pr-4 pl-3.5 text-xs font-bold text-slate-800 shadow-xl transition-all hover:border-[#CE1C73] hover:bg-slate-50 hover:scale-105"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700">
              <Phone size={16} />
            </span>
            <span>Call: {contact.phoneDisplay}</span>
          </a>
        </div>
      )}

      {/* Main Floating Trigger Pill */}
      <div className="flex items-center gap-2">
        {/* Quick Quote Button */}
        <button
          type="button"
          onClick={() => {
            setIsExpanded(false)
            openQuoteModal({ source: 'Floating Action Widget' })
          }}
          className="group flex items-center gap-2.5 rounded-full bg-[#CE1C73] py-3 pr-5 pl-4 text-xs font-bold text-white shadow-xl shadow-[#CE1C73]/30 transition-all hover:bg-[#B81564] hover:shadow-2xl hover:scale-105"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white">
            <PencilRuler size={14} strokeWidth={2.4} />
          </span>
          <span>Get Free Estimate</span>
          <span className="hidden lg:inline-block rounded-full bg-white/25 px-2 py-0.5 text-[10px] font-black text-white uppercase">
            30-Min Call
          </span>
        </button>

        {/* Toggle Expand / Close Button */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-label={isExpanded ? 'Close quick menu' : 'Open quick contact options'}
          className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all shadow-lg ${
            isExpanded
              ? 'border-slate-300 bg-slate-800 text-white hover:bg-slate-900'
              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          {isExpanded ? <X size={18} /> : <ChevronUp size={20} className="animate-pulse" />}
        </button>
      </div>
    </aside>
  )
}
