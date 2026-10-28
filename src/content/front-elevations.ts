// Front elevation designs by Sneha Construction & Developers, shown in the
// strip below the home hero. Masters are optimised WebP (≤1600px long edge,
// metadata stripped) in src/assets/front-elevations; next/image serves each
// as AVIF/WebP at the card's display size.
//
// These are 3D design renders, not photographs of finished buildings — the
// alt text says so. Do not describe them as "completed" or name a town unless
// that specific design was actually built there.
//
// Sourced from public/front_elevations (uploaded originals). Left out on
// purpose: image3 (carries a third-party "HouseGyan" watermark) and
// image10 / image13 (141px thumbnails — too small for the cards).

import type { StaticImageData } from 'next/image'

import cornerHouseBlackFrames from '@/assets/front-elevations/front-elevation-three-storey-corner-house-black-frames.webp'
import fourStoreyWoodJali from '@/assets/front-elevations/front-elevation-four-storey-house-wood-cladding-jali.webp'
import narrowDuplexLouvers from '@/assets/front-elevations/front-elevation-narrow-plot-duplex-wooden-louvers.webp'
import duplexVillaGlassBalconies from '@/assets/front-elevations/front-elevation-modern-duplex-villa-glass-balconies.webp'
import threeStoreyStoneWood from '@/assets/front-elevations/front-elevation-three-storey-house-stone-wood-cladding.webp'
import narrowThreeStoreyWoodPanel from '@/assets/front-elevations/front-elevation-narrow-three-storey-house-wood-panel.webp'
import duplexNightLighting from '@/assets/front-elevations/front-elevation-duplex-house-night-lighting.webp'
import duplexWoodenWindowsGarden from '@/assets/front-elevations/front-elevation-duplex-house-wooden-windows-garden.webp'
import duplexTerracePlanters from '@/assets/front-elevations/front-elevation-contemporary-duplex-terrace-planters.webp'
import angledRoofCanopy from '@/assets/front-elevations/front-elevation-multi-storey-residence-angled-roof-canopy.webp'
import villaCantileveredBalconies from '@/assets/front-elevations/front-elevation-three-storey-villa-cantilevered-balconies.webp'
import fourStoreyGlassFacade from '@/assets/front-elevations/front-elevation-four-storey-building-glass-facade.webp'
import villaWideBalconies from '@/assets/front-elevations/front-elevation-three-storey-villa-wide-balconies.webp'
import duplexWhiteGreyWood from '@/assets/front-elevations/front-elevation-modern-duplex-white-grey-wood-accent.webp'
import narrowHouseWoodenCanopy from '@/assets/front-elevations/front-elevation-narrow-plot-house-wooden-canopy.webp'
import floralJaliPanel from '@/assets/front-elevations/front-elevation-three-storey-house-floral-jali-panel.webp'

export interface FrontElevation {
  id: string
  image: StaticImageData
  /** Describes what is in the picture — read by screen readers and Google Images. */
  alt: string
  /** Short name used in structured data. */
  title: string
}

export const frontElevations: readonly FrontElevation[] = [
  {
    id: 'corner-house-black-frames',
    image: cornerHouseBlackFrames,
    title: 'Three-storey corner house elevation',
    alt: '3D front elevation of a three-storey corner house with white walls, black window frames, stone cladding and a rooftop pergola',
  },
  {
    id: 'duplex-villa-glass-balconies',
    image: duplexVillaGlassBalconies,
    title: 'Modern duplex villa elevation',
    alt: '3D front elevation of a modern duplex villa with wood-framed bays, glass balcony railings and landscaped entrance steps',
  },
  {
    id: 'four-storey-wood-jali',
    image: fourStoreyWoodJali,
    title: 'Four-storey house with jali panels',
    alt: '3D front elevation of a four-storey house with wood-finish cladding, decorative jali panels and a grey stone feature wall',
  },
  {
    id: 'duplex-night-lighting',
    image: duplexNightLighting,
    title: 'Duplex house with facade lighting',
    alt: '3D front elevation of a duplex house at dusk with warm facade lighting, a black main gate and wall-mounted lights',
  },
  {
    id: 'narrow-duplex-louvers',
    image: narrowDuplexLouvers,
    title: 'Narrow-plot duplex elevation',
    alt: '3D front elevation of a narrow-plot duplex with vertical wooden louvers, a glass balcony and a rooftop pergola',
  },
  {
    id: 'villa-cantilevered-balconies',
    image: villaCantileveredBalconies,
    title: 'Three-storey villa with cantilevered balconies',
    alt: '3D front elevation of a three-storey villa with cantilevered balconies and a sloping wood-lined roof canopy',
  },
  {
    id: 'duplex-wooden-windows-garden',
    image: duplexWoodenWindowsGarden,
    title: 'Duplex house with garden frontage',
    alt: '3D front elevation of a duplex house with wooden window frames, black double doors and a planted front garden',
  },
  {
    id: 'three-storey-stone-wood',
    image: threeStoreyStoneWood,
    title: 'Three-storey house with stone and wood cladding',
    alt: '3D front elevation of a three-storey house with stone and wood cladding, open balconies and a covered car porch',
  },
  {
    id: 'angled-roof-canopy',
    image: angledRoofCanopy,
    title: 'Multi-storey residence with angled canopy',
    alt: '3D front elevation of a multi-storey residence with an angled wooden roof canopy, stone feature wall and LED accent lines',
  },
  {
    id: 'duplex-terrace-planters',
    image: duplexTerracePlanters,
    title: 'Contemporary duplex with terrace planters',
    alt: '3D front elevation of a contemporary duplex with a wooden feature panel, glass balcony and terrace planters',
  },
  {
    id: 'four-storey-glass-facade',
    image: fourStoreyGlassFacade,
    title: 'Four-storey building with glass facade',
    alt: '3D front elevation of a four-storey building with a full-height glass facade framed in wood-finish panels',
  },
  {
    id: 'narrow-three-storey-wood-panel',
    image: narrowThreeStoreyWoodPanel,
    title: 'Narrow three-storey house elevation',
    alt: '3D front elevation of a narrow three-storey house with a vertical wood-finish panel and a geometric black gate',
  },
  {
    id: 'villa-wide-balconies',
    image: villaWideBalconies,
    title: 'Three-storey villa with wide balconies',
    alt: '3D front elevation of a three-storey villa with wide open balconies, wooden accents and a landscaped front yard',
  },
  {
    id: 'duplex-white-grey-wood',
    image: duplexWhiteGreyWood,
    title: 'Modern white and grey duplex',
    alt: '3D front elevation of a modern white and grey duplex with tall windows and a wooden accent panel',
  },
  {
    id: 'narrow-house-wooden-canopy',
    image: narrowHouseWoodenCanopy,
    title: 'Narrow-plot house with wooden canopy',
    alt: '3D front elevation of a narrow-plot house with a cantilevered wooden top-floor canopy and slatted louvers',
  },
  {
    id: 'floral-jali-panel',
    image: floralJaliPanel,
    title: 'Three-storey house with floral jali panel',
    alt: '3D front elevation of a three-storey house with a grey staircase tower, floral jali panel and white balconies',
  },
]
