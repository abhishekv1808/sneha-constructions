/**
 * ────────────────────────────────────────────────────────────────────────────
 * CLIENT SIGN-OFF REQUIRED before this page ships.
 *
 * COST_SPLIT, PAYMENT_STAGES and the `excluded` list below describe what the
 * client's actual turnkey agreement says. They are drafted from the material
 * specification already on the site, but a published exclusion list and a
 * published payment ladder are contractual statements — the client must
 * confirm both against the agreement they really sign. Everything is gathered
 * here so that confirmation is a one-file edit.
 * ────────────────────────────────────────────────────────────────────────────
 */

/** Shares of the ₹1,875 rate. Must total 1. */
export const COST_SPLIT = [
  {
    id: 'design',
    label: 'Design & approvals',
    share: 0.06,
    detail: 'Soil test, plot survey, Vastu 2D plan, 3D elevation and the sanction drawing set.',
  },
  {
    id: 'structure',
    label: 'Foundation & structure',
    share: 0.32,
    detail: 'Excavation, footings, plinth, RCC columns, beams and slabs in Fe-550D steel.',
  },
  {
    id: 'masonry',
    label: 'Masonry & plaster',
    share: 0.14,
    detail: 'Brickwork, lintels, internal and external plaster, and 21-day water curing.',
  },
  {
    id: 'mep',
    label: 'Electrical & plumbing',
    share: 0.13,
    detail: 'Astral CPVC lines, Polycab FR concealed wiring, earthing and drainage.',
  },
  {
    id: 'finishing',
    label: 'Flooring, joinery & paint',
    share: 0.27,
    detail: 'Vitrified flooring, granite counter, teak main door, UPVC windows, Asian Paints.',
  },
  {
    id: 'external',
    label: 'External & handover',
    share: 0.08,
    detail: 'Waterproofing, terrace finish, deep cleaning and the 120-point audit.',
  },
] as const

export const BASE_RATE = 1875

/** What the rate covers — drawn from the published material specification. */
export const included = [
  'Soil bearing test and plot boundary survey',
  'Vastu-compliant 2D plan and 3D elevation',
  'TUDA / Gram Panchayat drawing set',
  'Tata Tiscon or A1 Gold Fe-550D TMT steel',
  'UltraTech / ACC 53-grade cement',
  'IS 383 M-sand and 20 mm aggregate',
  'RCC structure with 21-day regulated curing',
  'Astral CPVC plumbing, pressure tested',
  'Polycab FR concealed wiring and earthing',
  'Vitrified flooring and granite kitchen counter',
  'Teakwood main door and UPVC windows',
  'Asian Paints finish, Dr. Fixit waterproofing',
  '120-point audit, deep clean and key handover',
] as const

/**
 * What it does not. Publishing this is the point of the section — the disputes
 * on a turnkey build come from the exclusions nobody wrote down.
 */
export const excluded = [
  'Compound wall and main gate',
  'Borewell, sump and water connection',
  'Government sanction fees and deposits',
  'BESCOM meter and security deposit',
  'Lift and lift shaft machinery',
  'Solar water heater or PV panels',
  'Modular kitchen cabinets and wardrobes',
  'Loose furniture, curtains and appliances',
  'Landscaping and external paving',
  'Rock cutting or filling beyond normal soil',
] as const

/** The remote owner's weekly record. */
export interface LogEntry {
  week: string
  title: string
  message: string
  attachment: string
}

export const siteLog: readonly LogEntry[] = [
  {
    week: 'Week 02',
    title: 'Excavation and PCC',
    message: 'Footing pits marked and cut to design depth. PCC laid this morning.',
    attachment: 'Site photo set · 14 images',
  },
  {
    week: 'Week 05',
    title: 'Footings and column starters',
    message: 'Steel cages tied and columns cast. Cube samples sent for 7-day test.',
    attachment: 'Cube test certificate · M20',
  },
  {
    week: 'Week 09',
    title: 'Plinth beam and backfill',
    message: 'Plinth beam cast and cured. Backfilling and compaction complete.',
    attachment: 'Engineer note + drone shot',
  },
  {
    week: 'Week 14',
    title: 'Ground floor slab',
    message: 'Slab cast in a single pour. Curing begins today, runs 21 days.',
    attachment: 'Pour video · 2 min',
  },
  {
    week: 'Week 22',
    title: 'Brickwork and lintels',
    message: 'All ground floor walls up to lintel level. Openings match the plan.',
    attachment: 'Site photo set · 22 images',
  },
  {
    week: 'Week 30',
    title: 'Plaster and MEP rough-in',
    message: 'Conduits and CPVC lines pressure tested before plaster closed them in.',
    attachment: 'Pressure test report',
  },
] as const

/** Milestone payment ladder. Shares must total 1. */
export const PAYMENT_STAGES = [
  { label: 'On agreement', share: 0.1, precondition: 'BOQ signed, drawings issued' },
  { label: 'Foundation complete', share: 0.15, precondition: 'Footings cast and cured' },
  { label: 'Ground slab cast', share: 0.2, precondition: 'Slab poured, curing started' },
  { label: 'Roof slab cast', share: 0.2, precondition: 'Upper slab poured' },
  { label: 'Masonry and plaster', share: 0.15, precondition: 'Walls plastered inside and out' },
  { label: 'Flooring and finishing', share: 0.15, precondition: 'Tiling, joinery and paint done' },
  { label: 'Handover', share: 0.05, precondition: '120-point audit signed off' },
] as const

/** Trades a self-managing owner would otherwise coordinate alone. */
export const tradesHandled = [
  'Architect',
  'Structural engineer',
  'Sanction liaison',
  'Mason',
  'Steel supplier',
  'Bar bender',
  'Electrician',
  'Plumber',
  'Carpenter',
  'Tiler',
  'Painter',
  'Waterproofing',
] as const

/** The 120-point audit, by category. Counts must total 120. */
export const auditCategories = [
  { label: 'Structure and levels', count: 24 },
  { label: 'Electrical and earthing', count: 26 },
  { label: 'Plumbing and water pressure', count: 22 },
  { label: 'Tiling and flooring', count: 18 },
  { label: 'Doors, windows and joinery', count: 16 },
  { label: 'Paint and final finish', count: 14 },
] as const

export const auditTotal = auditCategories.reduce((sum, c) => sum + c.count, 0)
