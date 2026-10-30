// Server only: reads the filesystem. Import it from server components.
import { createHash } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'

import { imageSize } from 'image-size'

import { SITE_PHOTO_FALLBACK_ALT, sitePhotoDetails } from '@/content/site-photos'

export interface SitePhoto {
  src: string
  alt: string
  stage?: string
  width: number
  height: number
}

const FOLDER = 'construction_images'
const IMAGE_FILE = /\.(jpe?g|png|webp|avif)$/i

/**
 * Every photo in public/construction_images.
 *
 * Order: photos listed in content/site-photos.ts come first, in the order they
 * are listed there (the build sequence); any others follow in natural filename
 * order (image2 before image10). Byte-identical files are shown once.
 *
 * Read at build time on a static page; in dev it re-reads on each request, so
 * a newly added photo appears on refresh.
 */
export function getSitePhotos(): SitePhoto[] {
  const dir = path.join(process.cwd(), 'public', FOLDER)
  let files: string[]
  try {
    files = fs.readdirSync(dir).filter((file) => IMAGE_FILE.test(file))
  } catch {
    return []
  }

  const listed = Object.keys(sitePhotoDetails)
  const rank = (file: string) => {
    const i = listed.indexOf(file)
    return i === -1 ? listed.length : i
  }
  files.sort((a, b) => rank(a) - rank(b) || a.localeCompare(b, 'en', { numeric: true }))

  const seen = new Set<string>()
  const photos: SitePhoto[] = []
  for (const file of files) {
    let buffer: Buffer
    let size: { width: number; height: number }
    try {
      buffer = fs.readFileSync(path.join(dir, file))
      size = imageSize(buffer)
    } catch {
      continue // unreadable or not really an image — skip it rather than break the page
    }
    const hash = createHash('sha1').update(buffer).digest('hex')
    if (seen.has(hash)) continue
    seen.add(hash)

    photos.push({
      src: `/${FOLDER}/${file}`,
      alt: sitePhotoDetails[file]?.alt ?? SITE_PHOTO_FALLBACK_ALT,
      stage: sitePhotoDetails[file]?.stage,
      width: size.width,
      height: size.height,
    })
  }
  return photos
}
