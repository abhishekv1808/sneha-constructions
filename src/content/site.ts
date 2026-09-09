// Canonical client facts — CLAUDE.md §2. Extracted from the live site; do not
// invent replacements for anything here.
//
// Phase 2 seeds the Supabase `site_settings` row from this module, so the NAP
// has one source of truth in both places until the layout reads that row
// instead. Corrections land here first.

export const site = {
  name: 'Sneha Construction & Developers',
  shortName: 'Sneha Construction',
  tagline: 'Building Trust, Brick by Brick.',
  positioning:
    'A construction company based in Tumkur, delivering premium-quality residential and commercial projects at affordable prices.',
  /** The advertised turnkey rate the whole business runs on — §8.2, §8.6. */
  baseRateSqft: 1875,
} as const

export const contact = {
  phoneDisplay: '+91 80014 80064',
  // §2: no spaces and no encoded leading space. The live site's
  // `tel:%20+91%2080014%2080064` fails on some Android dialers.
  phoneHref: 'tel:+918001480064',
  whatsappNumber: '918001480064',
  // Normalised to lowercase — the live site mixes three casings.
  email: 'info@snehaconstruction.com',
  emailHref: 'mailto:info@snehaconstruction.com',
  hours: 'Monday – Saturday, 9:00 AM – 9:00 PM',
  hoursShort: 'Mon – Sat, 9 AM – 9 PM',
  address: {
    label: 'Head Office',
    lines: [
      '4th Cross, Vinobanagar,',
      'SS Temple Main Road, BG Patya Circle,',
      'Tumkur – 572101, Karnataka',
    ],
    street: '4th Cross, Vinobanagar, SS Temple Main Road, BG Patya Circle',
    locality: 'Tumkur',
    region: 'Karnataka',
    postalCode: '572101',
    country: 'IN',
  },
} as const

/** §11. Prefills the message when the link carries an estimate summary. */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${contact.whatsappNumber}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export const serviceAreas = [
  { slug: 'tumkur', name: 'Tumkur' },
  { slug: 'gubbi', name: 'Gubbi' },
  { slug: 'kunigal', name: 'Kunigal' },
  { slug: 'sira', name: 'Sira' },
  { slug: 'tiptur', name: 'Tiptur' },
] as const

/** §2 — the three pillars. Sub-services render as a comma run, not a list (§8.4). */
export const services = [
  {
    slug: 'residential',
    name: 'Residential construction',
    promise: 'Strong foundations. Elegant designs. Peaceful living spaces.',
    subServices: [
      'Duplex houses',
      'Farmhouses',
      'Bungalows',
      'Villas',
      'Apartments',
      'PGs & hostels',
    ],
  },
  {
    slug: 'commercial',
    name: 'Commercial construction',
    promise: 'Perfectly planned commercial spaces built for success.',
    subServices: [
      'Schools & colleges',
      'Hotels & restaurants',
      'Shopping malls',
      'Office buildings',
      'Hospitals & clinics',
    ],
  },
  {
    slug: 'turnkey',
    name: 'Turnkey construction',
    promise: 'You dream it — we plan, build, and deliver it flawlessly.',
    subServices: [
      'Site planning & layout',
      '3D design & architecture',
      'Foundation & structure work',
      'Electrical & plumbing installation',
      'Flooring, painting & finishing',
      'Quality checks & final inspection',
    ],
  },
] as const

/** §2 — each of these had its own WordPress URL and its own 301 (§7). */
export const materials = [
  { slug: 'foundation-structure', name: 'Foundation & structure' },
  { slug: 'walls-masonry', name: 'Walls & masonry' },
  { slug: 'electrical-plumbing', name: 'Electrical & plumbing' },
  { slug: 'interiors-finishing', name: 'Interiors & finishing' },
  { slug: 'roofing-waterproofing', name: 'Roofing & waterproofing' },
] as const

/** The proof spine distilled from the brand vision — §2. */
export const pillars = [
  'Premium materials',
  'Transparent pricing',
  'On-time delivery',
  'In-house engineers & architects',
] as const

// §2: Facebook, Twitter/X and YouTube on the live site all point at
// https://facebook.com. A dead social icon costs more trust than an absent one,
// so nothing ships until the client supplies real URLs. Populate this array and
// the footer row appears on its own.
export const socialLinks: ReadonlyArray<{ label: string; href: string }> = []

/**
 * §8.5 — the six build stages. A genuine sequence, which is why this is the one
 * place numerals belong (§4).
 *
 * The stage names are §8.5 verbatim. The one-line descriptions are drafted from
 * §2's own materials and turnkey wording rather than invented practice — but
 * they are still draft copy, and §8 is explicit that final wording goes past the
 * client.
 */
export const processSteps = [
  {
    title: 'Site visit & planning',
    description:
      'We visit your site, check soil and access, and agree the scope and budget before anything is drawn.',
  },
  {
    title: '3D design & approvals',
    description:
      'Our architects draw the layout and a 3D elevation, and we handle the local approvals.',
  },
  {
    title: 'Foundation & structure',
    description:
      'Cement, concrete and steel reinforcement laid for long-term durability and load stability.',
  },
  {
    title: 'Electrical & plumbing',
    description: 'Wiring, earthing and leak-proof PVC/CPVC piping installed to safety compliance.',
  },
  {
    title: 'Finishing & interiors',
    description:
      'Plastering, flooring, premium paints and the interior details that decide how it feels.',
  },
  {
    title: 'Quality check & handover',
    description: 'A final inspection against our checklist, then the keys.',
  },
] as const
