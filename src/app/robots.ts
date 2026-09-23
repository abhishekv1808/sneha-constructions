import type { MetadataRoute } from 'next'

import { env } from '@/lib/env'

/** §12: allow everything that is meant to rank; point crawlers at the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // API routes are not pages; /kitchen-sink is a developer component sheet.
      disallow: ['/api/', '/kitchen-sink'],
    },
    sitemap: `${env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
    host: env.NEXT_PUBLIC_SITE_URL,
  }
}
