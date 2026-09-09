'use client'

import { MessageCircle, Phone, PencilRuler } from 'lucide-react'
import { contact, site, whatsappUrl } from '@/content'
import { useQuoteModal } from '@/components/providers/QuoteModalProvider'

/**
 * §8.14 — the single highest-leverage conversion element for this audience.
 * Fixed below 768px, safe-area aware, three 44px+ targets.
 */
const actionClass =
  'flex min-h-14 flex-1 flex-col items-center justify-center gap-1 py-2 text-meta transition-[background-color] duration-150 ease-out'

export function MobileActionBar() {
  const { openQuoteModal } = useQuoteModal()

  return (
    <div
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md shadow-lg md:hidden"
    >
      <div className="flex items-stretch">
        <a href={contact.phoneHref} className={`${actionClass} text-slate-800 hover:bg-slate-50`}>
          <Phone size={20} strokeWidth={1.8} className="text-[#CE1C73]" aria-hidden="true" />
          <span>Call</span>
        </a>

        <a
          href={whatsappUrl(`Hi ${site.shortName}, I'd like to discuss a construction project.`)}
          target="_blank"
          rel="noopener noreferrer"
          className={`${actionClass} border-x border-slate-200 text-slate-800 hover:bg-slate-50`}
        >
          <MessageCircle size={20} strokeWidth={1.8} className="text-emerald-600" aria-hidden="true" />
          <span>WhatsApp</span>
        </a>

        <button
          type="button"
          onClick={() => openQuoteModal({ source: 'Mobile Action Bar' })}
          className={`${actionClass} bg-[#CE1C73] text-white hover:bg-[#B81564] font-bold`}
        >
          <PencilRuler size={20} strokeWidth={1.8} aria-hidden="true" />
          <span>Get Quote</span>
        </button>
      </div>
    </div>
  )
}
