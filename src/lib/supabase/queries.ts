import { unstable_cache } from 'next/cache'
import type { PostgrestError } from '@supabase/supabase-js'

import { contact, site, socialLinks } from '@/content'

import { getSupabaseAnonClient } from './anon'
import type { Tables } from './types'

/**
 * Typed, cached content fetchers — CLAUDE.md §10 "Caching & revalidation".
 *
 * Every export here is a server-only function wrapped in `unstable_cache` and
 * tagged per entity, so content is statically served and still updates within
 * seconds of an edit: a Supabase database webhook hits /api/revalidate, which
 * calls `revalidateTag` for the entity that changed.
 *
 * §9: these are called from server components only. Nothing in this file may be
 * imported into a client component — it would pull `next/cache` into the browser
 * bundle. Client components receive the data as props. There is no useEffect
 * data fetching anywhere in this project.
 *
 * Deliberately not re-exported from `lib/supabase/index.ts`: that barrel also
 * carries the browser client, and a client component importing the barrel would
 * drag this module in with it.
 */

// ---------------------------------------------------------------------------
// Cache tags
// ---------------------------------------------------------------------------

export const CACHE_TAGS = {
  services: 'services',
  materials: 'materials',
  projects: 'projects',
  testimonials: 'testimonials',
  faqs: 'faqs',
  areas: 'areas',
  settings: 'settings',
} as const

export type CacheTag = (typeof CACHE_TAGS)[keyof typeof CACHE_TAGS]

/**
 * Maps a Postgres table to the tag its changes invalidate. /api/revalidate is
 * the only consumer — the webhook payload names a table, not a tag.
 *
 * `project_images` maps to `projects` on purpose: an image only ever renders as
 * part of its parent project, so there is no separate cache entry to bust.
 */
export const TABLE_TAGS: Readonly<Record<string, CacheTag>> = {
  services: CACHE_TAGS.services,
  material_categories: CACHE_TAGS.materials,
  projects: CACHE_TAGS.projects,
  project_images: CACHE_TAGS.projects,
  testimonials: CACHE_TAGS.testimonials,
  faqs: CACHE_TAGS.faqs,
  service_areas: CACHE_TAGS.areas,
  site_settings: CACHE_TAGS.settings,
}

/**
 * Backstop only. The webhook is what makes edits appear within seconds; this
 * exists so a missed or misconfigured webhook self-heals within the hour
 * instead of serving a stale page until the next deploy.
 */
const CACHE_TTL_SECONDS = 60 * 60

// ---------------------------------------------------------------------------
// Row types
// ---------------------------------------------------------------------------

export type Service = Tables<'services'>
export type MaterialCategory = Tables<'material_categories'>
export type Project = Tables<'projects'>
export type ProjectImage = Tables<'project_images'>
export type Testimonial = Tables<'testimonials'>
export type Faq = Tables<'faqs'>
export type ServiceArea = Tables<'service_areas'>

export type ProjectWithImages = Project & { project_images: ProjectImage[] }

export type ProjectType = 'residential' | 'commercial' | 'turnkey'

export type ProjectFilters = {
  type?: ProjectType | null
  /** Town name as stored, e.g. 'Tumkur'. Matched case-insensitively. */
  location?: string | null
  featuredOnly?: boolean
  limit?: number | null
}

// ---------------------------------------------------------------------------
// Error handling & Fallback seed data
// ---------------------------------------------------------------------------

export class ContentQueryError extends Error {
  constructor(entity: string, cause: PostgrestError) {
    super(`Failed to load ${entity} from Supabase: ${cause.message} (${cause.code})`)
    this.name = 'ContentQueryError'
    this.cause = cause
  }
}

/**
 * Fetchers throw or gracefully fall back when Supabase is unreachable.
 */
export function unwrap<T>(entity: string, result: { data: T | null; error: PostgrestError | null }): T {
  if (result.error) throw new ContentQueryError(entity, result.error)
  return result.data as T
}

export const FALLBACK_SERVICES: Service[] = [
  {
    id: 'srv-residential',
    slug: 'residential',
    name: 'Residential Construction',
    category: 'residential',
    promise: 'Strong foundations. Elegant designs. Peaceful living spaces.',
    sub_services: [
      'Duplex Houses',
      'Farmhouses',
      'Bungalows',
      'Villas',
      'Apartments',
      'PGs & Hostels',
    ],
    sort_order: 1,
    is_published: true,
    created_at: null,
    updated_at: null,
    description: null,
    hero_image_path: null,
  },
  {
    id: 'srv-commercial',
    slug: 'commercial',
    name: 'Commercial Construction',
    category: 'commercial',
    promise: 'Perfectly planned commercial spaces built for success.',
    sub_services: [
      'Schools & Colleges',
      'Hotels & Restaurants',
      'Shopping Malls',
      'Office Buildings',
      'Hospitals & Clinics',
    ],
    sort_order: 2,
    is_published: true,
    created_at: null,
    updated_at: null,
    description: null,
    hero_image_path: null,
  },
  {
    id: 'srv-turnkey',
    slug: 'turnkey',
    name: 'Turnkey Construction Solutions',
    category: 'turnkey',
    promise: 'You dream it — we plan, build, and deliver it flawlessly.',
    sub_services: [
      'Site Planning & Layout',
      '3D Design & Architecture',
      'Foundation & Structure Work',
      'Electrical & Plumbing Installation',
      'Flooring, Painting & Finishing',
      'Quality Checks & Final Inspection',
    ],
    sort_order: 3,
    is_published: true,
    created_at: null,
    updated_at: null,
    description: null,
    hero_image_path: null,
  },
]

export const FALLBACK_MATERIALS: MaterialCategory[] = [
  {
    id: 'mat-foundation-structure',
    slug: 'foundation-structure',
    name: 'Foundation & Structure',
    promise:
      'High-quality cement, concrete and steel reinforcement engineered for long-term durability and load stability',
    highlights: ['Precision in foundation laying', 'Robust structural framework'],
    sort_order: 1,
    is_published: true,
    image_path: null,
    body: `Every load-bearing element in your house traces back to two materials: the steel that resists tension and the concrete that resists compression. Get either wrong and nothing above it is safe, however good the finish looks.

We use Fe-550D TMT rebar from Tata Tiscon or A1 Gold, bought through authorised primary distributors rather than the open market. The D grade matters: it denotes higher ductility, which is what allows a frame to flex rather than snap under seismic load. Every bar carries its brand and grade rolled into the ribs, so you can verify it yourself on delivery day.

Concrete is a design mix, not a guessed one. Structural casting uses 53-grade OPC from UltraTech, ACC or Birla Super with double-washed M-sand and 20 mm aggregate conforming to IS 383. We take cube samples from the pour and send them for 7-day and 28-day compressive strength tests, and you get the certificates.

Foundation depth and type follow the soil, not a template. We test the bearing capacity of your plot before designing the footing, because a raft where a strip would do wastes your money, and a strip where a raft is needed costs far more than money.

Curing is where most local builds quietly lose strength. Concrete gains most of its strength in the first three weeks, and only if it stays wet. We cure for 21 regulated days and our site engineer signs off on it.`,
  },
  {
    id: 'mat-walls-masonry',
    slug: 'walls-masonry',
    name: 'Walls & Masonry',
    promise:
      'Top-grade bricks, blocks and plastering with perfect alignment and premium finishing',
    highlights: ['Neat appearance & durable render', 'Soundproofing & thermal insulation'],
    sort_order: 2,
    is_published: true,
    image_path: null,
    body: `Walls do more than divide rooms. They carry load in places, keep heat out, keep sound in, and provide the flat true surface every finish after them depends on. A wall built out of plumb is a problem you pay for three more times before handover.

We build in table-moulded red kiln brick, sorted on delivery — under-burnt bricks get sent back rather than buried in an internal wall where nobody will see them. Solid concrete block goes into compound walls and non-load-bearing runs where it makes better sense.

Every course is checked for level and plumb as it goes up, not corrected afterwards with extra plaster. This is the single most common shortcut on a local site: build fast and hide the error in a thick render. It works until the plaster cracks along the line of the fault.

Plaster is PPC with M-sand — roughly 12 mm internally and 15 to 20 mm externally, applied in the correct number of coats and cured properly. Bonding agents and admixtures from Dr. Fixit or Fosroc are used where the substrate needs them, particularly at junctions between concrete and brick where cracks otherwise start.

Done properly, masonry earns you two things you will notice every day: a house that stays cooler than the street outside, and rooms that do not transmit every sound to the room next door.`,
  },
  {
    id: 'mat-electrical-plumbing',
    slug: 'electrical-plumbing',
    name: 'Electrical & Plumbing',
    promise:
      'Safe, efficient wiring and long-lasting plumbing for proper flow and safety compliance',
    highlights: ['Quality fittings & earthing', 'PVC/CPVC piping, leak-proof systems'],
    sort_order: 3,
    is_published: true,
    image_path: null,
    body: `These are the systems buried inside your walls. Once the plaster closes them in, fixing anything means breaking something — so this is the stage where shortcuts are least visible and most expensive.

Wiring is Polycab or Finolex FR-LSH: fire-retardant, low smoke and halogen. In a house fire the smoke reaches people long before the flame does, and ordinary PVC insulation is what makes it toxic. The cost difference is small. Everything runs in conduit, never buried loose in plaster.

The distribution board is Schneider, Legrand or Anchor, with independent MCBs for heavy appliances so a geyser fault does not take out your lighting. Earthing is done properly and tested, not assumed.

Water lines are Astral CPVC SDR-11, rated for hot and cold. Every line is pressure tested and held under pressure before a single trowel of plaster covers it, so a weeping joint is found while it costs nothing to fix. Drainage is Supreme or Astral PVC, laid to correct falls with inspection points at every junction — a drain without access is a drain you will eventually cut a floor open to reach.

We plan switch and socket positions with you before conduiting starts, on a walkthrough of the actual rooms. It is far easier to move a socket on a drawing than after the wall is closed.`,
  },
  {
    id: 'mat-interiors-finishing',
    slug: 'interiors-finishing',
    name: 'Interiors & Finishing',
    promise:
      'Smooth wall finishes, premium paints and tiles, interiors crafted for comfort and elegance',
    highlights: ['Premium paints & floor finishes', 'Attention to every last detail'],
    sort_order: 4,
    is_published: true,
    image_path: null,
    body: `This is the part of the house you actually touch. It is also the part where the difference between a careful builder and a fast one becomes obvious to anyone standing in the room.

Flooring is double-charged vitrified tile from Kajaria or Somany, laid to level with spacers and proper joint alignment. Double-charged means the pattern runs through the body of the tile rather than sitting on the surface, so it survives twenty years of traffic without wearing through.

Walls take two coats of Birla White putty before paint, which is what gives a finished wall its flatness. Paint is Asian Paints — Royale inside, Apex on the exterior where it has to survive sun and monsoon.

The main door frame is teakwood, five by three inches, with brass hardware. Internal doors are flush with laminate. Windows are three-track UPVC with mosquito mesh, which seals better than aluminium and does not corrode.

Sanitaryware is Jaquar, Cera or Parryware: dual-flush cisterns, chrome brass mixers, and a jet-black granite kitchen counter with a stainless steel sink and a two-foot dado above it.

None of this is exotic. It is simply specified, agreed in writing before work starts, and then actually installed — which is the part that varies.`,
  },
  {
    id: 'mat-roofing-waterproofing',
    slug: 'roofing-waterproofing',
    name: 'Roofing & Waterproofing',
    promise:
      'Leak-proof, heat-resistant roofing with reinforced slabs and superior waterproofing',
    highlights: ['Advanced waterproof membranes', 'Heat-resistant durable roofing'],
    sort_order: 5,
    is_published: true,
    image_path: null,
    body: `In this district the roof has two jobs: keep the monsoon out and keep the heat down. A slab that fails at either one makes the whole house harder to live in.

The slab itself is RCC in design-mix concrete, cured under water for 21 regulated days. Most terrace leaks are not waterproofing failures at all — they are curing failures, where the concrete developed shrinkage cracks in its first three weeks and no membrane applied later can bridge them.

Waterproofing is Dr. Fixit or Fosroc, applied to the terrace, every sunken slab and all wet areas. Sunken bathroom slabs are the second most common source of a leak that shows up on the ceiling below, usually a year after handover.

The terrace is finished in brickbat coba or tile-on-screed, laid to a deliberate fall so water actually reaches the outlet instead of standing in a corner. Standing water finds every weakness eventually. Brickbat coba has the additional benefit of adding thermal mass, which measurably reduces how much heat reaches the top floor.

Rainwater goes into PVC downpipes with leaf guards and is routed to a filtered recharge pit rather than onto the road. It is inexpensive to do while the site is open and awkward to retrofit afterwards — and in most urban local body areas some form of harvesting is a condition of sanction in any case.`,
  },
]

export const FALLBACK_SERVICE_AREAS: ServiceArea[] = [
  { id: 'area-tumkur', slug: 'tumkur', name: 'Tumkur', is_published: true, intro: null },
  { id: 'area-gubbi', slug: 'gubbi', name: 'Gubbi', is_published: true, intro: null },
  { id: 'area-kunigal', slug: 'kunigal', name: 'Kunigal', is_published: true, intro: null },
  { id: 'area-sira', slug: 'sira', name: 'Sira', is_published: true, intro: null },
  { id: 'area-tiptur', slug: 'tiptur', name: 'Tiptur', is_published: true, intro: null },
]

async function safeFetch<T>(
  entity: string,
  fetcher: () => PromiseLike<{ data: T | null; error: PostgrestError | null }>,
  fallback: T,
): Promise<T> {
  try {
    const result = await fetcher()
    if (result.error) {
      console.warn(`[queries] Failed to load ${entity} from Supabase (${result.error.message}). Serving fallback data.`)
      return fallback
    }
    return (result.data ?? fallback) as T
  } catch (err) {
    console.warn(`[queries] Error fetching ${entity} from Supabase. Serving fallback data:`, err)
    return fallback
  }
}

async function safeFetchSingle<T>(
  entity: string,
  fetcher: () => PromiseLike<{ data: T | null; error: PostgrestError | null }>,
  fallbackFinder: () => T | null,
): Promise<T | null> {
  try {
    const result = await fetcher()
    if (result.error) {
      console.warn(`[queries] Failed to load ${entity} from Supabase (${result.error.message}). Serving fallback data.`)
      return fallbackFinder()
    }
    return result.data
  } catch (err) {
    console.warn(`[queries] Error fetching ${entity} from Supabase. Serving fallback data:`, err)
    return fallbackFinder()
  }
}

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------

export const getServices = unstable_cache(
  async (): Promise<Service[]> => {
    const supabase = getSupabaseAnonClient()

    return safeFetch(
      'services',
      () =>
        supabase
          .from('services')
          .select('*')
          .eq('is_published', true)
          .order('sort_order', { ascending: true }),
      FALLBACK_SERVICES,
    )
  },
  ['content:services:all'],
  { tags: [CACHE_TAGS.services], revalidate: CACHE_TTL_SECONDS },
)

export const getServiceBySlug = unstable_cache(
  async (slug: string): Promise<Service | null> => {
    const supabase = getSupabaseAnonClient()

    return safeFetchSingle(
      `service "${slug}"`,
      () =>
        supabase
          .from('services')
          .select('*')
          .eq('slug', slug)
          .eq('is_published', true)
          .maybeSingle(),
      () => FALLBACK_SERVICES.find((s) => s.slug === slug) ?? null,
    )
  },
  ['content:services:by-slug'],
  { tags: [CACHE_TAGS.services], revalidate: CACHE_TTL_SECONDS },
)

// ---------------------------------------------------------------------------
// Materials & quality
// ---------------------------------------------------------------------------

export const getMaterials = unstable_cache(
  async (): Promise<MaterialCategory[]> => {
    const supabase = getSupabaseAnonClient()

    return safeFetch(
      'material categories',
      () =>
        supabase
          .from('material_categories')
          .select('*')
          .eq('is_published', true)
          .order('sort_order', { ascending: true }),
      FALLBACK_MATERIALS,
    )
  },
  ['content:materials:all'],
  { tags: [CACHE_TAGS.materials], revalidate: CACHE_TTL_SECONDS },
)

export const getMaterialBySlug = unstable_cache(
  async (slug: string): Promise<MaterialCategory | null> => {
    const supabase = getSupabaseAnonClient()

    return safeFetchSingle(
      `material category "${slug}"`,
      () =>
        supabase
          .from('material_categories')
          .select('*')
          .eq('slug', slug)
          .eq('is_published', true)
          .maybeSingle(),
      () => FALLBACK_MATERIALS.find((m) => m.slug === slug) ?? null,
    )
  },
  ['content:materials:by-slug'],
  { tags: [CACHE_TAGS.materials], revalidate: CACHE_TTL_SECONDS },
)

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

/**
 * Positional primitives rather than the filter object, so the cache key is
 * canonical. `unstable_cache` folds the arguments into the key by serialising
 * them, and `{ type, location }` and `{ location, type }` serialise differently
 * — two cache entries for one result set. The public wrapper below normalises.
 */
const getProjectsCached = unstable_cache(
  async (
    type: ProjectType | null,
    location: string | null,
    featuredOnly: boolean,
    limit: number | null,
  ): Promise<Project[]> => {
    const supabase = getSupabaseAnonClient()

    let query = supabase
      .from('projects')
      .select('*')
      .eq('is_published', true)
      .order('year_completed', { ascending: false, nullsFirst: false })
      .order('created_at', { ascending: false })

    if (type) query = query.eq('project_type', type)
    if (location) query = query.ilike('location', location)
    if (featuredOnly) query = query.eq('is_featured', true)
    if (limit !== null) query = query.limit(limit)

    return safeFetch('projects', () => query, [])
  },
  ['content:projects:list'],
  { tags: [CACHE_TAGS.projects], revalidate: CACHE_TTL_SECONDS },
)

export function getProjects(filters: ProjectFilters = {}): Promise<Project[]> {
  const { type = null, location = null, featuredOnly = false, limit = null } = filters
  return getProjectsCached(type, location, featuredOnly, limit)
}

export const getProjectBySlug = unstable_cache(
  async (slug: string): Promise<ProjectWithImages | null> => {
    const supabase = getSupabaseAnonClient()

    return safeFetchSingle(
      `project "${slug}"`,
      () =>
        supabase
          .from('projects')
          .select('*, project_images(*)')
          .eq('slug', slug)
          .eq('is_published', true)
          .order('sort_order', { referencedTable: 'project_images', ascending: true })
          .maybeSingle(),
      () => null,
    )
  },
  ['content:projects:by-slug'],
  { tags: [CACHE_TAGS.projects], revalidate: CACHE_TTL_SECONDS },
)

/** Distinct towns that actually have published work, for the §8.8 filter chips. */
export const getProjectLocations = unstable_cache(
  async (): Promise<string[]> => {
    const supabase = getSupabaseAnonClient()

    const rows = await safeFetch(
      'project locations',
      () => supabase.from('projects').select('location').eq('is_published', true),
      [],
    )

    return [...new Set(rows.map((row) => row.location))].sort((a, b) => a.localeCompare(b))
  },
  ['content:projects:locations'],
  { tags: [CACHE_TAGS.projects], revalidate: CACHE_TTL_SECONDS },
)

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

const getTestimonialsCached = unstable_cache(
  async (limit: number | null): Promise<Testimonial[]> => {
    const supabase = getSupabaseAnonClient()

    let query = supabase
      .from('testimonials')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true })

    if (limit !== null) query = query.limit(limit)

    return safeFetch('testimonials', () => query, [])
  },
  ['content:testimonials:list'],
  { tags: [CACHE_TAGS.testimonials], revalidate: CACHE_TTL_SECONDS },
)

export function getTestimonials(limit?: number): Promise<Testimonial[]> {
  return getTestimonialsCached(limit ?? null)
}

// ---------------------------------------------------------------------------
// FAQs
// ---------------------------------------------------------------------------

const getFaqsCached = unstable_cache(
  async (topic: string | null): Promise<Faq[]> => {
    const supabase = getSupabaseAnonClient()

    let query = supabase
      .from('faqs')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true })

    if (topic) query = query.eq('topic', topic)

    return safeFetch('FAQs', () => query, [])
  },
  ['content:faqs:list'],
  { tags: [CACHE_TAGS.faqs], revalidate: CACHE_TTL_SECONDS },
)

export function getFaqs(topic?: string): Promise<Faq[]> {
  return getFaqsCached(topic ?? null)
}

// ---------------------------------------------------------------------------
// Service areas
// ---------------------------------------------------------------------------

export const getServiceAreas = unstable_cache(
  async (): Promise<ServiceArea[]> => {
    const supabase = getSupabaseAnonClient()

    return safeFetch(
      'service areas',
      () =>
        supabase
          .from('service_areas')
          .select('*')
          .eq('is_published', true)
          .order('name', { ascending: true }),
      FALLBACK_SERVICE_AREAS,
    )
  },
  ['content:areas:all'],
  { tags: [CACHE_TAGS.areas], revalidate: CACHE_TTL_SECONDS },
)

export const getServiceAreaBySlug = unstable_cache(
  async (slug: string): Promise<ServiceArea | null> => {
    const supabase = getSupabaseAnonClient()

    return safeFetchSingle(
      `service area "${slug}"`,
      () =>
        supabase
          .from('service_areas')
          .select('*')
          .eq('slug', slug)
          .eq('is_published', true)
          .maybeSingle(),
      () => FALLBACK_SERVICE_AREAS.find((a) => a.slug === slug) ?? null,
    )
  },
  ['content:areas:by-slug'],
  { tags: [CACHE_TAGS.areas], revalidate: CACHE_TTL_SECONDS },
)

// ---------------------------------------------------------------------------
// Site settings
// ---------------------------------------------------------------------------

export type SiteSettings = {
  phone: { display: string; href: string; e164: string }
  whatsapp: { number: string; href: string }
  email: { address: string }
  address: {
    label: string
    lines: string[]
    street: string
    locality: string
    region: string
    postal_code: string
    country: string
  }
  hours: { display: string; schema_org: string }
  base_rate_sqft: number
  social: Record<string, string | null>
}

/**
 * The static content module is the canonical source (it is what seeds
 * `site_settings` in the first place), so it doubles as the fallback.
 */
const FALLBACK_SETTINGS: SiteSettings = {
  phone: {
    display: contact.phoneDisplay,
    href: contact.phoneHref,
    e164: contact.phoneHref.replace('tel:', ''),
  },
  whatsapp: {
    number: contact.whatsappNumber,
    href: `https://wa.me/${contact.whatsappNumber}`,
  },
  email: { address: contact.email },
  address: {
    label: contact.address.label,
    lines: [...contact.address.lines],
    street: contact.address.street,
    locality: contact.address.locality,
    region: contact.address.region,
    postal_code: contact.address.postalCode,
    country: contact.address.country,
  },
  hours: { display: contact.hours, schema_org: 'Mo-Sa 09:00-21:00' },
  base_rate_sqft: site.baseRateSqft,
  social: Object.fromEntries(socialLinks.map((link) => [link.label.toLowerCase(), link.href])),
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/**
 * Merges the key/value rows over the fallback one key at a time.
 *
 * This fetcher does not throw on bad data or connection failure. `site_settings`
 * is client-editable and feeds the header, footer and every page's JSON-LD.
 * A malformed key falls back to the §2 value and logs; a missing key does the same
 * silently.
 */
export const getSiteSettings = unstable_cache(
  async (): Promise<SiteSettings> => {
    const settings: SiteSettings = { ...FALLBACK_SETTINGS }

    try {
      const supabase = getSupabaseAnonClient()
      const result = await supabase.from('site_settings').select('key, value')

      if (result.error || !result.data) {
        return settings
      }

      for (const row of result.data) {
        switch (row.key) {
          case 'base_rate_sqft':
            if (typeof row.value === 'number') settings.base_rate_sqft = row.value
            else console.error('site_settings.base_rate_sqft is not a number; using the §2 value.')
            break
          case 'phone':
          case 'whatsapp':
          case 'email':
          case 'address':
          case 'hours':
          case 'social':
            if (isRecord(row.value)) {
              settings[row.key] = {
                ...FALLBACK_SETTINGS[row.key],
                ...row.value,
              } as never
            } else {
              console.error(`site_settings.${row.key} is not an object; using the §2 value.`)
            }
            break
          default:
            break
        }
      }
    } catch {
      // In unreachable/offline scenarios, return FALLBACK_SETTINGS safely
    }

    return settings
  },
  ['content:settings:all'],
  { tags: [CACHE_TAGS.settings], revalidate: CACHE_TTL_SECONDS },
)
