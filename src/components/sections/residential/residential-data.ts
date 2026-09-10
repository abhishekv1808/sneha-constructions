import type { StaticImageData } from 'next/image'

import heroBg from '@/assets/hero/hero-bg.jpg'
import heroIndianDuplex from '@/assets/hero/hero-indian-duplex.jpg'
import detailTimber from '@/assets/hero/detail-timber.jpg'
import showcasePavilion from '@/assets/hero/showcase-pavilion.jpg'
import residentialHeroVilla from '@/assets/services/bespoke/residential-hero-villa.jpg'
import turnkeyHeroResidence from '@/assets/services/bespoke/turnkey-hero-residence.jpg'
import architectInspectingSite from '@/assets/team/architect-inspecting-site.jpg'
import indianWorkersCraft from '@/assets/team/indian-workers-craft.jpg'
import videoBandBg from '@/assets/video/video-band-bg.jpg'

/**
 * Every figure and project name below is placeholder pending Phase 0 client
 * inputs (CLAUDE.md §14). They mirror the numbers already shipping in
 * `services-data.ts` so the site tells one story; replace both together.
 */

export type Typology = 'duplex' | 'villa' | 'bungalow'

export interface ResidentialHome {
  id: string
  name: string
  typology: Typology
  typologyLabel: string
  town: string
  area: string
  year: string
  image: StaticImageData
}

/** The six completed homes. Order drives the hero carousel. */
export const homes: readonly ResidentialHome[] = [
  {
    id: 'sunset-court',
    name: 'Sunset Court',
    typology: 'villa',
    typologyLabel: 'Luxury villa',
    town: 'SS Puram, Tumkur',
    area: '3,600 sq ft',
    year: '2025',
    image: residentialHeroVilla,
  },
  {
    id: 'sri-mahalaxmi',
    name: 'Sri Mahalaxmi Villa',
    typology: 'duplex',
    typologyLabel: 'Modern duplex',
    town: 'Gubbi Main Road',
    area: '3,200 sq ft',
    year: '2025',
    image: turnkeyHeroResidence,
  },
  {
    id: 'palm-line',
    name: 'Palm Line Residence',
    typology: 'villa',
    typologyLabel: 'Luxury villa',
    town: 'Kunigal Road, Tumkur',
    area: '4,200 sq ft',
    year: '2024',
    image: heroIndianDuplex,
  },
  {
    id: 'timber-wave',
    name: 'The Timber Wave',
    typology: 'bungalow',
    typologyLabel: 'Bungalow',
    town: 'Vinobanagar, Tumkur',
    area: '4,800 sq ft',
    year: '2024',
    image: heroBg,
  },
  {
    id: 'curve-house',
    name: 'Curve House',
    typology: 'bungalow',
    typologyLabel: 'Bungalow',
    town: 'Sira Road, Tumkur',
    area: '2,600 sq ft',
    year: '2024',
    image: showcasePavilion,
  },
  {
    id: 'still-water',
    name: 'Still Water',
    typology: 'duplex',
    typologyLabel: 'Modern duplex',
    town: 'Tiptur Extension',
    area: '2,950 sq ft',
    year: '2023',
    image: videoBandBg,
  },
] as const

export const typologyFilters = [
  { key: 'all', label: 'Everything' },
  { key: 'duplex', label: 'Duplexes' },
  { key: 'villa', label: 'Villas' },
  { key: 'bungalow', label: 'Bungalows' },
] as const

/** §8.3-style proof, four figures and nothing else. */
export const proofFigures = [
  { value: '250+', label: 'Homes handed over' },
  { value: '₹1,875', label: 'Starting rate / sq ft' },
  { value: '6–9', label: 'Months to handover' },
  { value: '10 yr', label: 'Structural warranty' },
] as const

/** The expanding site reel — what a build actually looks like. */
export interface ReelPanel {
  id: string
  word: string
  line: string
  image: StaticImageData | string
  alt: string
}

export const reelPanels: readonly ReelPanel[] = [
  {
    id: 'foundation',
    word: 'Foundation',
    line: 'Footings cast, cured and checked before a single wall goes up.',
    image: '/frames/ezgif-frame-070.jpg',
    alt: 'Footings and plinth beams set out on a cleared residential plot',
  },
  {
    id: 'structure',
    word: 'Structure',
    line: 'RCC columns, beams and slabs in Fe550D steel.',
    image: '/frames/ezgif-frame-130.jpg',
    alt: 'Reinforced concrete frame with red brick infill on a two-storey house',
  },
  {
    id: 'masonry',
    word: 'Masonry',
    line: 'Table-moulded brick, laid level and checked course by course.',
    image: indianWorkersCraft,
    alt: 'Masons checking a brick course with a spirit level on site',
  },
  {
    id: 'supervision',
    word: 'Supervision',
    line: 'A site engineer on your plot, not on the phone.',
    image: architectInspectingSite,
    alt: 'Site engineer reviewing the villa elevation on a tablet at the build',
  },
  {
    id: 'finishing',
    word: 'Finishing',
    line: 'Joinery, paint and flooring — the part you actually touch.',
    image: detailTimber,
    alt: 'Custom curved timber joinery in a completed living room',
  },
] as const

/** Paper to keys. Frames come from the /frames timelapse already in the repo. */
export interface JourneyStage {
  id: string
  title: string
  line: string
  frame: string
  alt: string
}

export const journeyStages: readonly JourneyStage[] = [
  {
    id: 'paper',
    title: 'On paper',
    line: 'Your plot, your family, your budget — drawn to scale and to Vastu.',
    frame: '/frames/ezgif-frame-001.jpg',
    alt: 'Architect drafting a residential floor plan by hand',
  },
  {
    id: 'in-3d',
    title: 'In 3D',
    line: 'See the elevation before we break ground.',
    frame: '/frames/ezgif-frame-040.jpg',
    alt: 'Three-dimensional massing model rising off the printed floor plan',
  },
  {
    id: 'ground',
    title: 'Out of the ground',
    line: 'Excavation, footings and the plinth.',
    frame: '/frames/ezgif-frame-070.jpg',
    alt: 'Structural frame set out over the completed foundation',
  },
  {
    id: 'structure',
    title: 'Structure up',
    line: 'Slab by slab, with brickwork close behind.',
    frame: '/frames/ezgif-frame-130.jpg',
    alt: 'Two-storey concrete frame with brick walls under construction',
  },
  {
    id: 'skin',
    title: 'Skin and services',
    line: 'Plaster, cladding, windows, wiring and plumbing.',
    frame: '/frames/ezgif-frame-185.jpg',
    alt: 'House with plaster, stone cladding and glazing installed',
  },
  {
    id: 'keys',
    title: 'Keys',
    line: 'Cleaned, landscaped and handed over on the promised date.',
    frame: '/frames/ezgif-frame-238.jpg',
    alt: 'Completed and landscaped two-storey home ready for handover',
  },
] as const

/** Rates mirror the homepage estimator so one number never contradicts another. */
export interface PackageTier {
  id: string
  name: string
  rate: number
  popular?: boolean
  includes: readonly string[]
}

export const packageTiers: readonly PackageTier[] = [
  {
    id: 'essential',
    name: 'Standard',
    rate: 1875,
    includes: [
      'Fe550D TMT steel, 53-grade cement',
      'Vastu 2D plan and 3D elevation',
      'Vitrified flooring, branded fittings',
      'Full wiring and plumbing',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    rate: 2250,
    popular: true,
    includes: [
      'Everything in Standard',
      'Teak main door, UPVC windows',
      'Designer tiles and sanitaryware',
      'False ceiling with ambient lighting',
      'Dedicated site engineer',
    ],
  },
  {
    id: 'luxury',
    name: 'Luxury',
    rate: 2650,
    includes: [
      'Everything in Premium',
      'Custom stone and timber elevation',
      'Smart home wiring throughout',
      'Modular kitchen and wardrobes',
      'Landscaping and terrace deck',
    ],
  },
] as const
