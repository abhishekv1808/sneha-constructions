import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { ImageResponse } from 'next/og'

import { contact, serviceAreas, site } from '@/content'

/**
 * §12 default share image for every route without its own. Shown as the
 * preview card when a link is shared on WhatsApp — this audience's main
 * sharing channel.
 *
 * Deliberately flat (no photograph): WhatsApp drops preview images much over
 * ~300 KB, and a photo would push this PNG well past that.
 */
export const alt = `${site.name} — residential, commercial and turnkey construction in Tumkur`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const INK = '#031424'
const BRAND = '#CE1C73'
const BRAND_LIGHT = '#F472B6'

const asset = (path: string) => readFile(join(process.cwd(), path))

export default async function OpengraphImage() {
  const [logo, outfitMedium, outfitBold, rupee] = await Promise.all([
    asset('public/sneha-constructions-logo.png'),
    // Brand face, so the card matches the site. Static TTFs — ImageResponse
    // cannot read woff2 or variable fonts.
    asset('src/assets/fonts/Outfit-500.ttf'),
    asset('src/assets/fonts/Outfit-700.ttf'),
    // Outfit has no ₹ glyph; this 1.6 KB Noto Sans subset holds only U+20B9.
    asset('src/assets/fonts/NotoSans-700-rupee.ttf'),
  ])
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '64px 72px',
        backgroundColor: INK,
        // Faint blueprint grid, echoing the site's linework
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
        color: 'white',
        fontFamily: 'Outfit, NotoRupee',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div
          style={{
            display: 'flex',
            backgroundColor: 'white',
            borderRadius: 20,
            padding: '14px 22px',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders raw <img> */}
          <img src={logoSrc} alt="" width={138} height={90} />
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 22,
            letterSpacing: 4,
            color: BRAND_LIGHT,
            fontWeight: 500,
          }}
        >
          {site.tagline.toUpperCase()}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 80,
            fontWeight: 700,
            lineHeight: 1.02,
            letterSpacing: -2.5,
          }}
        >
          <span>Your Dream Home,</span>
          <span>Built to Last</span>
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 22,
            fontSize: 28,
            fontWeight: 500,
            color: 'rgba(255,255,255,0.7)',
          }}
        >
          {`Residential, commercial & turnkey construction · ${serviceAreas.map((area) => area.name).join(', ')}`}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <div
          style={{
            display: 'flex',
            backgroundColor: BRAND,
            borderRadius: 999,
            padding: '14px 30px',
            fontSize: 30,
            fontWeight: 700,
          }}
        >
          {`From ₹${site.baseRateSqft.toLocaleString('en-IN')} / sq ft`}
        </div>
        <div
          style={{
            display: 'flex',
            border: '2px solid rgba(255,255,255,0.25)',
            borderRadius: 999,
            padding: '12px 28px',
            fontSize: 30,
            fontWeight: 600,
          }}
        >
          {contact.phoneDisplay}
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: 'Outfit', data: outfitMedium, weight: 500, style: 'normal' },
        { name: 'Outfit', data: outfitBold, weight: 700, style: 'normal' },
        { name: 'NotoRupee', data: rupee, weight: 700, style: 'normal' },
      ],
    },
  )
}
