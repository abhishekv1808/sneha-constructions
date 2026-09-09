import { env } from '@/lib/env'

const BUCKET = 'media'

/**
 * Turns a `media` bucket path into a public URL.
 *
 * Columns like `services.hero_image_path` and `projects.cover_image_path` store
 * a path (`projects/<slug>/<uuid>.webp`), not a URL — handing that straight to
 * next/image would resolve it against the site origin and 404. The bucket is
 * public read (§10), so no signing is involved.
 *
 * The Supabase hostname is already in next.config.ts `images.remotePatterns`.
 */
export function mediaUrl(path: string | null | undefined): string | null {
  if (!path) return null

  const clean = path.replace(/^\/+/, '')
  return `${env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${clean}`
}
