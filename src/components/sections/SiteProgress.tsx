import { getSitePhotos } from '@/lib/site-photos'

import { SiteProgressScroller } from './SiteProgressScroller'

/**
 * Real on-site photos from public/construction_images. Server component: it
 * reads the folder, so adding a photo needs no code change. Renders nothing
 * if the folder is empty.
 */
export function SiteProgress() {
  const photos = getSitePhotos()
  if (photos.length === 0) return null
  return <SiteProgressScroller photos={photos} />
}
