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
// Error handling
// ---------------------------------------------------------------------------

class ContentQueryError extends Error {
  constructor(entity: string, cause: PostgrestError) {
    super(`Failed to load ${entity} from Supabase: ${cause.message} (${cause.code})`)
    this.name = 'ContentQueryError'
    this.cause = cause
  }
}

/**
 * Fetchers throw rather than returning an empty array on failure. An empty
 * result and a broken connection must not look the same: §8.8 and §8.9 specify
 * honest empty states ("Project gallery coming soon"), and those are for "the
 * client has not supplied any yet", not "the database is unreachable". Silently
 * degrading would ship the wrong copy and hide the outage.
 */
function unwrap<T>(entity: string, result: { data: T | null; error: PostgrestError | null }): T {
  if (result.error) throw new ContentQueryError(entity, result.error)
  // PostgREST returns [] rather than null for list queries, and the callers of
  // maybeSingle() below type their own null.
  return result.data as T
}

// Every fetcher filters on is_published even though RLS already enforces it.
// The policy is the guarantee; this makes the intent legible at the call site
// and keeps the query honest if a policy is ever loosened for an admin preview.

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------

export const getServices = unstable_cache(
  async (): Promise<Service[]> => {
    const supabase = getSupabaseAnonClient()

    return unwrap(
      'services',
      await supabase
        .from('services')
        .select('*')
        .eq('is_published', true)
        .order('sort_order', { ascending: true }),
    )
  },
  ['content:services:all'],
  { tags: [CACHE_TAGS.services], revalidate: CACHE_TTL_SECONDS },
)

export const getServiceBySlug = unstable_cache(
  async (slug: string): Promise<Service | null> => {
    const supabase = getSupabaseAnonClient()

    return unwrap(
      `service "${slug}"`,
      await supabase
        .from('services')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .maybeSingle(),
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

    return unwrap(
      'material categories',
      await supabase
        .from('material_categories')
        .select('*')
        .eq('is_published', true)
        .order('sort_order', { ascending: true }),
    )
  },
  ['content:materials:all'],
  { tags: [CACHE_TAGS.materials], revalidate: CACHE_TTL_SECONDS },
)

export const getMaterialBySlug = unstable_cache(
  async (slug: string): Promise<MaterialCategory | null> => {
    const supabase = getSupabaseAnonClient()

    return unwrap(
      `material category "${slug}"`,
      await supabase
        .from('material_categories')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .maybeSingle(),
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
    // ilike with no wildcards is an exact, case-insensitive match — the filter
    // chips pass 'Tumkur' while a row might carry 'tumkur'.
    if (location) query = query.ilike('location', location)
    if (featuredOnly) query = query.eq('is_featured', true)
    if (limit !== null) query = query.limit(limit)

    return unwrap('projects', await query)
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

    // RLS on project_images gates on the parent's is_published, so an
    // unpublished project's gallery comes back empty rather than leaking.
    return unwrap(
      `project "${slug}"`,
      await supabase
        .from('projects')
        .select('*, project_images(*)')
        .eq('slug', slug)
        .eq('is_published', true)
        .order('sort_order', { referencedTable: 'project_images', ascending: true })
        .maybeSingle(),
    )
  },
  ['content:projects:by-slug'],
  { tags: [CACHE_TAGS.projects], revalidate: CACHE_TTL_SECONDS },
)

/** Distinct towns that actually have published work, for the §8.8 filter chips. */
export const getProjectLocations = unstable_cache(
  async (): Promise<string[]> => {
    const supabase = getSupabaseAnonClient()

    const rows = unwrap(
      'project locations',
      await supabase.from('projects').select('location').eq('is_published', true),
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

    return unwrap('testimonials', await query)
  },
  ['content:testimonials:list'],
  { tags: [CACHE_TAGS.testimonials], revalidate: CACHE_TTL_SECONDS },
)

/**
 * §8.9 cuts the section entirely below two real testimonials rather than
 * padding it, so the caller is expected to check `length` before rendering.
 */
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

    return unwrap('FAQs', await query)
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

    return unwrap(
      'service areas',
      await supabase
        .from('service_areas')
        .select('*')
        .eq('is_published', true)
        .order('name', { ascending: true }),
    )
  },
  ['content:areas:all'],
  { tags: [CACHE_TAGS.areas], revalidate: CACHE_TTL_SECONDS },
)

export const getServiceAreaBySlug = unstable_cache(
  async (slug: string): Promise<ServiceArea | null> => {
    const supabase = getSupabaseAnonClient()

    return unwrap(
      `service area "${slug}"`,
      await supabase
        .from('service_areas')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .maybeSingle(),
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
 * This is the one fetcher that does not throw on bad data. `site_settings` is
 * client-editable and feeds the header, footer and every page's JSON-LD — a
 * typo in one jsonb value must not take the whole site down. A malformed key
 * falls back to the §2 value and logs; a missing key does the same silently,
 * since a key that has not been seeded yet is not an error.
 */
export const getSiteSettings = unstable_cache(
  async (): Promise<SiteSettings> => {
    const supabase = getSupabaseAnonClient()

    const rows = unwrap('site settings', await supabase.from('site_settings').select('key, value'))

    const settings: SiteSettings = { ...FALLBACK_SETTINGS }

    for (const row of rows) {
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
            // Spread over the fallback so a partially-filled row keeps the
            // §2 value for whatever it omits.
            settings[row.key] = {
              ...FALLBACK_SETTINGS[row.key],
              ...row.value,
            } as never
          } else {
            console.error(`site_settings.${row.key} is not an object; using the §2 value.`)
          }
          break
        default:
          // An unrecognised key is fine — the client can add their own.
          break
      }
    }

    return settings
  },
  ['content:settings:all'],
  { tags: [CACHE_TAGS.settings], revalidate: CACHE_TTL_SECONDS },
)
