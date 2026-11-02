import type { MetadataRoute } from 'next'

import { materials, services } from '@/content'
import { posts } from '@/content/blog-data'
import { frontElevations } from '@/content/front-elevations'
import { env } from '@/lib/env'

/**
 * §12 sitemap. Lists only routes that exist and are meant to rank —
 * /kitchen-sink (a dev page) and /api/* are deliberately absent. Add
 * /projects (only a temporary redirect today) and /areas/[slug] here when
 * those routes ship.
 *
 * lastModified is set only where we know a real date (blog posts); a
 * made-up "now" on every build would teach Google to ignore the field.
 * changeFrequency and priority are left out because Google ignores them.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${env.NEXT_PUBLIC_SITE_URL}${path}`

  const pages: MetadataRoute.Sitemap = [
    {
      url: url('/'),
      // Image sitemap entries: the home page's front elevation designs, so
      // Google Images can discover them (image.src is site-relative).
      images: frontElevations.map((elevation) => url(elevation.image.src)),
    },
    { url: url('/estimate') },
    { url: url('/contact') },
    { url: url('/services') },
    ...services.map((service) => ({ url: url(`/services/${service.slug}`) })),
    { url: url('/materials') },
    ...materials.map((material) => ({ url: url(`/materials/${material.slug}`) })),
    { url: url('/about') },
    { url: url('/blog') },
    ...posts.map((post) => ({
      url: url(`/blog/${post.slug}`),
      lastModified: new Date(post.updated ?? post.published),
    })),
    { url: url('/privacy-policy') },
    { url: url('/terms') },
  ]

  return pages
}
