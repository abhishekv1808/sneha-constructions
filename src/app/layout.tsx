import type { Metadata } from 'next'
import { Cinzel, Cormorant_Garamond, DM_Sans, Noto_Sans_Kannada, Space_Grotesk } from 'next/font/google'

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

// adjustFontFallback generates the size-adjust'd local fallback face that keeps
// CLS under budget while the webfont swaps in — §13.
//
// Space Grotesk is the primary face: headlines and main reading text. Unlike
// Bricolage it has a single wght axis (300–700) and no wdth axis, so the type
// scale below no longer pins font-variation-settings — font-weight alone drives
// a single-axis variable font, and naming an axis the file does not carry is
// silently ignored anyway.
const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
  fallback: ['system-ui', 'Segoe UI', 'Arial', 'sans-serif'],
})

// Secondary: the supporting UI layer — meta labels, captions, buttons, form
// labels, nav. Not preloaded; it is never the LCP text.
const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  adjustFontFallback: true,
  fallback: ['system-ui', 'Segoe UI', 'Arial', 'sans-serif'],
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
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${notoSansKannada.variable} ${cormorant.variable} ${cinzel.variable}`}
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
