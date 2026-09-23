'use client'

import React from 'react'
import Link from 'next/link'
import { MessageCircle, Phone, Calculator, HardHat } from 'lucide-react'
import { contact, site, whatsappUrl } from '@/content'
import { useQuoteModal } from '@/components/providers/QuoteModalProvider'

/**
 * Mobile-First Floating Quick-Action Dock.
 * Fixed below 768px, safe-area aware, 4 conversion-optimized touch targets.
 */
const actionClass =
  'flex min-h-[58px] flex-1 flex-col items-center justify-center gap-1 py-1.5 text-[11px] font-semibold transition-all duration-150 ease-out active:scale-95'

export function MobileActionBar() {
  const { openQuoteModal } = useQuoteModal()

  return (
    <nav
      aria-label="Mobile Quick Actions"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200/90 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.08)] md:hidden print:hidden"
    >
      <div className="grid grid-cols-4 items-stretch divide-x divide-slate-100">
        {/* 1. Call Engineer */}
        <a
          href={contact.phoneHref}
          className={`${actionClass} text-slate-700 hover:text-slate-900 hover:bg-slate-50`}
        >
          <Phone size={19} strokeWidth={2} className="text-[#CE1C73]" aria-hidden="true" />
          <span>Call</span>
        </a>

        {/* 2. WhatsApp Quote */}
        <a
          href={whatsappUrl(
            `Hi ${site.shortName}, I am looking to construct a home in Tumkur and would like to get a quote.`
          )}
          target="_blank"
          rel="noopener noreferrer"
          className={`${actionClass} text-slate-700 hover:text-slate-900 hover:bg-slate-50`}
        >
          <MessageCircle size={19} strokeWidth={2} className="text-[#25D366]" aria-hidden="true" />
          <span>WhatsApp</span>
        </a>

        {/* 3. Cost Estimator */}
        <Link
          href="/estimate"
          className={`${actionClass} text-slate-700 hover:text-slate-900 hover:bg-slate-50`}
        >
          <Calculator size={19} strokeWidth={2} className="text-blue-600" aria-hidden="true" />
          <span>Estimate</span>
        </Link>

        {/* 4. Book Free Site Visit */}
        <button
          type="button"
          onClick={() =>
            openQuoteModal({
              serviceType: 'Site visit request',
              source: 'Mobile Quick Action Dock',
            })
          }
          className={`${actionClass} bg-[#CE1C73] text-white font-bold hover:bg-[#B81564]`}
        >
          <HardHat size={19} strokeWidth={2} aria-hidden="true" />
          <span>Book Visit</span>
        </button>
      </div>
    </nav>
  )
}
