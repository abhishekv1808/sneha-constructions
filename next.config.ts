import { loadEnvConfig } from '@next/env'
import type { NextConfig } from 'next'

// Next does not load .env files before evaluating this file, so do it explicitly.
loadEnvConfig(process.cwd())

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL

// WordPress URLs that carry index equity — CLAUDE.md §7.
// /services/ and /projects/ are deliberately absent: those paths are unchanged in
// the new IA, and Next's own trailing-slash normalisation already handles them.
// Adding them here would redirect each to itself.
const legacyRoutes: ReadonlyArray<readonly [from: string, to: string]> = [
  ['/about-us', '/about'],
  ['/materials-quality', '/materials'],
  ['/foundation-structure', '/materials/foundation-structure'],
  ['/walls-masonry', '/materials/walls-masonry'],
  ['/electrical-plumbing', '/materials/electrical-plumbing'],
  ['/interiors-finishing', '/materials/interiors-finishing'],
  ['/roofing-waterproofing', '/materials/roofing-waterproofing'],
  ['/contact-us', '/contact'],

  // Each service has its own bespoke route now; the legacy '-construction'
  // aliases fold into the canonical URLs so no page is reachable at two
  // addresses. The /services/[slug] segment they used to resolve through is gone.
  ['/services/residential-construction', '/services/residential'],
  ['/services/commercial-construction', '/services/commercial'],
  ['/services/turnkey-construction', '/services/turnkey'],
]

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 80, 85, 90],
    remotePatterns: supabaseUrl
      ? [
          {
            protocol: 'https',
            hostname: new URL(supabaseUrl).hostname,
            pathname: '/storage/v1/object/public/**',
          },
        ]
      : [],
  },

  async redirects() {
    return [
      ...legacyRoutes.map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),

      // Legal alias redirects
      { source: '/privacy', destination: '/privacy-policy', permanent: true },
      { source: '/terms-and-conditions', destination: '/terms', permanent: true },
      { source: '/terms-of-service', destination: '/terms', permanent: true },
      { source: '/terms-of-use', destination: '/terms', permanent: true },

      // WordPress 404 noise — §7.
      { source: '/wp-content/:path*', destination: '/', permanent: true },
      { source: '/wp-admin/:path*', destination: '/', permanent: true },
      { source: '/wp-includes/:path*', destination: '/', permanent: true },

      // Legacy ?p=<id> permalinks. The destination carries its own query so Next
      // does not forward `p` through, which would re-match this rule and loop.
      {
        source: '/',
        has: [{ type: 'query' as const, key: 'p' }],
        destination: '/?from=legacy',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
