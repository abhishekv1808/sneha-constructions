// Captions for the real on-site photos in public/construction_images.
//
// The section reads that folder on its own: drop a new photo in and it shows
// up. Add an entry here, keyed by the full filename (with its extension), to
// give it a proper description and a stage label. Photos without an entry
// still show, after these, with a generic alt text.
//
// The order of the entries below is the order on the page — kept as the build
// sequence, from digging the foundation to the finished facade.
//
// Describe only what is in the picture. Name a town only if the client
// confirms where the photo was taken.

export interface SitePhotoDetails {
  /** Read by screen readers and Google Images. */
  alt: string
  /** Short label shown on the photo, e.g. the construction stage. */
  stage?: string
}

export const SITE_PHOTO_FALLBACK_ALT = 'Sneha Construction site work in progress'

export const sitePhotoDetails: Record<string, SitePhotoDetails> = {
  'sneha_constructions_underconstruction_image9.webp': {
    stage: 'Excavation · digging the foundation',
    alt: 'JCB backhoe digging foundation trenches on a residential plot, beside heaps of red soil',
  },
  'sneha_constructions_underconstruction_image1.webp': {
    stage: 'Foundation · levelling the PCC bed',
    alt: 'Site workers levelling a fresh concrete floor bed between steel column bars on a residential site',
  },
  'sneha_constructions_underconstruction_image4.webp': {
    stage: 'Ground slab · laying concrete',
    alt: 'Workers carrying and levelling fresh concrete around column formwork on a town site',
  },
  'sneha_constructions_underconstruction_image4.jpg': {
    stage: 'Slab · concrete pour',
    alt: 'Workers in hard hats pumping and levelling concrete over a steel-mesh slab, with a multi-storey RCC frame behind',
  },
  'sneha_constructions_underconstruction_image6.webp': {
    stage: 'Masonry · brick compound wall',
    alt: 'Mason levelling a red-brick compound wall between concrete columns',
  },
  'sneha_constructions_underconstruction_image2.webp': {
    stage: 'Structure · block masonry',
    alt: 'Three-storey building under construction with scaffolding, block walls and workers carrying material',
  },
  'sneha_constructions_underconstruction_image3.webp': {
    stage: 'Plastering · exterior walls',
    alt: 'Three-storey building with fresh exterior plaster and scaffolding, with workers at the base',
  },
  'sneha_constructions_underconstruction_image7.webp': {
    stage: 'Finishing · painting the facade',
    alt: 'Two-storey house nearly complete, with workers painting the exterior and fitting windows',
  },
}
