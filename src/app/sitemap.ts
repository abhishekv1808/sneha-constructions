import type { MetadataRoute } from 'next'

import { materials, services } from '@/content'
import { posts } from '@/content/blog-data'
import { env } from '@/lib/env'

/**
 * §12 sitemap. Lists only routes that exist and are meant to rank —
 * /kitchen-sink (a dev page) and /api/* are deliberately absent. Add
 * /projects and /areas/[slug] here when those routes ship.
 *
 * lastModified is set only where we know a real date (blog posts); a
 * made-up "now" on every build would teach Google to ignore the field.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${env.NEXT_PUBLIC_SITE_URL}${path}`

  const pages: MetadataRoute.Sitemap = [
    { url: url('/'), changeFrequency: 'weekly', priority: 1 },
    { url: url('/estimate'), changeFrequency: 'monthly', priority: 0.9 },
    { url: url('/contact'), changeFrequency: 'yearly', priority: 0.9 },
    { url: url('/services'), changeFrequency: 'monthly', priority: 0.8 },
    ...services.map((service) => ({
      url: url(`/services/${service.slug}`),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    { url: url('/materials'), changeFrequency: 'monthly', priority: 0.7 },
    ...materials.map((material) => ({
      url: url(`/materials/${material.slug}`),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    { url: url('/about'), changeFrequency: 'yearly', priority: 0.6 },
    { url: url('/blog'), changeFrequency: 'weekly', priority: 0.6 },
    ...posts.map((post) => ({
      url: url(`/blog/${post.slug}`),
      lastModified: new Date(post.updated ?? post.published),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    })),
    { url: url('/privacy-policy'), changeFrequency: 'yearly', priority: 0.1 },
    { url: url('/terms'), changeFrequency: 'yearly', priority: 0.1 },
  ]

  return pages
}
