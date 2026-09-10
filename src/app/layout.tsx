import type { Metadata } from 'next'
import { Cinzel, Cormorant_Garamond, Noto_Sans_Kannada, Outfit, Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google'

import { SmoothScroll } from '@/components/layout'
import { env } from '@/lib/env'

import './globals.css'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  preload: false,
})

const cinzel = Cinzel({
  variable: '--font-cinzel',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  preload: false,
})

// Primary face: Outfit — a clean geometric variable sans (wght 100–900) with
// contemporary character. Used for headlines and main reading text.
const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
  fallback: ['system-ui', 'Segoe UI', 'Arial', 'sans-serif'],
})

// Secondary face: Plus Jakarta Sans — warm geometric for UI labels, captions,
// buttons, form labels, and nav. Not preloaded; never the LCP text.
const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta',
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  adjustFontFallback: true,
  fallback: ['system-ui', 'Segoe UI', 'Arial', 'sans-serif'],
})

// Italic accent face: Playfair Display italic — high-contrast transitional
// serif for decorative headlines, pull quotes, and editorial flourishes.
const playfairDisplay = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
  fallback: ['Georgia', 'Times New Roman', 'serif'],
})

const notoSansKannada = Noto_Sans_Kannada({
  variable: '--font-noto-kannada',
  subsets: ['kannada'],
  weight: ['400', '500', '600'],
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
  fallback: ['system-ui', 'sans-serif'],
})

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: 'Sneha Construction & Developers, Tumkur',
    template: '%s | Sneha Construction & Developers, Tumkur',
  },
  description:
    'Residential, commercial and turnkey construction across Tumkur, Gubbi, Kunigal, Sira and Tiptur. Premium materials, transparent pricing, delivered on time.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-IN"
      className={`${outfit.variable} ${plusJakartaSans.variable} ${playfairDisplay.variable} ${notoSansKannada.variable} ${cormorant.variable} ${cinzel.variable}`}
    >
      <body className="bg-plaster-50 text-body font-sans text-slate-900 antialiased">
        <SmoothScroll>
          {/* §13: first tab stop on every page. Off-screen until focused, never
              display:none — a hidden element cannot receive focus. */}
          <a
            href="#main"
            className="sr-only rounded-button bg-oxide-600 px-4 py-3 text-body-sm text-white focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50"
          >
            Skip to content
          </a>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
