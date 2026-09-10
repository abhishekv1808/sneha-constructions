import {
  Building2,
  GraduationCap,
  Hotel,
  Stethoscope,
  Store,
  Warehouse,
  type LucideIcon,
} from 'lucide-react'

/**
 * ────────────────────────────────────────────────────────────────────────────
 * CLIENT SIGN-OFF REQUIRED before this page ships.
 *
 * Every number in FEASIBILITY is a planning assumption, not a quoted figure.
 * Karnataka/TUDA FAR is set by road width, zone and plot size, and the
 * efficiency and rate columns are trade averages. The UI labels its output
 * "indicative" throughout and never presents a single figure as a quote, but
 * the client and their liaison engineer must confirm these before launch.
 * They are gathered here so that confirmation is a one-file edit.
 * ────────────────────────────────────────────────────────────────────────────
 */
export const FEASIBILITY = {
  /** Share of the plot the footprint may cover. */
  groundCoverage: 0.65,
  /** FAR by the width of the road the plot fronts — the driver under KMBBR. */
  roadWidths: [
    { id: '12', label: '12 m road', sub: '~40 ft', far: 1.75 },
    { id: '15', label: '15 m road', sub: '~50 ft', far: 2.25 },
    { id: '18', label: '18 m road', sub: '~60 ft', far: 2.75 },
    { id: '24', label: '24 m+ road', sub: '~80 ft+', far: 3.25 },
  ],
} as const

export interface BuildingType {
  id: string
  label: string
  icon: LucideIcon
  /** Usable carpet as a share of built-up — lower where cores and services eat floor. */
  efficiency: number
  /** Indicative civil construction rate, ₹ per sq ft of built-up area. */
  rate: number
  /** The one engineering fact that defines this typology. */
  signature: string
  description: string
  features: readonly string[]
}

export const buildingTypes: readonly BuildingType[] = [
  {
    id: 'office',
    label: 'Office',
    icon: Building2,
    efficiency: 0.78,
    rate: 2150,
    signature: 'Post-tensioned slabs for column-free floor plates',
    description:
      'Corporate floors with lift cores, server provision and acoustic glass facades.',
    features: [
      'High load-bearing post-tensioned RCC slabs',
      'Centralised electrical trunking and busbars',
      'DG backup and transformer yard',
      'Basement multi-vehicle parking',
    ],
  },
  {
    id: 'retail',
    label: 'Retail plaza',
    icon: Store,
    efficiency: 0.72,
    rate: 2350,
    signature: 'Double-height storefronts and wide fire-rated escape stairs',
    description:
      'High-footfall plazas built around visibility, circulation and signage lines.',
    features: [
      'Frameless structural glass storefronts',
      'Heavy-duty anti-skid granite corridors',
      'High ceiling clearance for MEP ducting',
      'Facade signage and LED illumination lines',
    ],
  },
  {
    id: 'school',
    label: 'School',
    icon: GraduationCap,
    efficiency: 0.8,
    rate: 1950,
    signature: '8-foot corridors and cross-ventilated classroom blocks',
    description:
      'Campus blocks planned around daylight, assembly and child safety.',
    features: [
      'Wide 8-foot student safety corridors',
      'Acoustically insulated classrooms',
      'Dedicated physics, chemistry and computer labs',
      'Ramp accessibility and child-safe railings',
    ],
  },
  {
    id: 'hospital',
    label: 'Hospital',
    icon: Stethoscope,
    efficiency: 0.7,
    rate: 2750,
    signature: 'Lead-shielded imaging rooms and medical gas pipeline routing',
    description:
      'Healthcare floors built to medical compliance codes from the slab up.',
    features: [
      'Medical gas pipeline conduit routing',
      'Lead-shielded X-ray and CT room walls',
      'Stretcher-sized high-speed lift shafts',
      'Antibacterial seamless vinyl and epoxy',
    ],
  },
  {
    id: 'hotel',
    label: 'Hotel',
    icon: Hotel,
    efficiency: 0.68,
    rate: 2600,
    signature: 'Long-span beams for pillar-free banquet halls',
    description:
      'Hospitality structures built around gathering space and guest acoustics.',
    features: [
      'Long-span RCC beams for pillar-free halls',
      'Commercial kitchen drainage and grease traps',
      'Acoustic soundproofing between suites',
      'High-capacity overhead water storage',
    ],
  },
  {
    id: 'warehouse',
    label: 'Warehouse',
    icon: Warehouse,
    efficiency: 0.9,
    rate: 1450,
    signature: 'VDF laser-screed floors and high eave for multi-tier racking',
    description:
      'Pre-engineered steel and heavy RCC sheds rated for industrial floor loads.',
    features: [
      'Vacuum dewatered laser-screed flooring',
      'High eave height for multi-tier racking',
      'Container truck loading bays and docks',
      'Turbo ventilators and polycarbonate skylights',
    ],
  },
] as const

export const floorOptions = [
  { id: 'G', label: 'G', levels: 1 },
  { id: 'G+1', label: 'G+1', levels: 2 },
  { id: 'G+2', label: 'G+2', levels: 3 },
  { id: 'G+3', label: 'G+3', levels: 4 },
  { id: 'G+4', label: 'G+4', levels: 5 },
] as const

export interface FeasibilityInput {
  plotSqft: number
  far: number
  levels: number
  efficiency: number
  rate: number
}

export interface FeasibilityResult {
  /** Built-up permitted by FAR alone. */
  farCap: number
  /** Built-up the chosen floor count can physically deliver. */
  massingCap: number
  /** The binding one — this is what you can actually build. */
  builtUp: number
  usableCarpet: number
  indicativeCost: number
  /** True when floors, not FAR, are the limit — i.e. there is headroom left. */
  limitedByFloors: boolean
}

/**
 * Pure, so it is unit-testable and produces a correct figure with no motion.
 * Built-up is the lesser of what FAR permits and what the footprint × floors
 * can physically carry — the distinction is the whole point of the tool.
 */
export function calculateFeasibility(input: FeasibilityInput): FeasibilityResult {
  const { plotSqft, far, levels, efficiency, rate } = input

  const farCap = plotSqft * far
  const massingCap = plotSqft * FEASIBILITY.groundCoverage * levels
  const builtUp = Math.min(farCap, massingCap)

  return {
    farCap: Math.round(farCap),
    massingCap: Math.round(massingCap),
    builtUp: Math.round(builtUp),
    usableCarpet: Math.round(builtUp * efficiency),
    indicativeCost: Math.round(builtUp * rate),
    limitedByFloors: massingCap < farCap,
  }
}

/** §3 of the plan — the sanction path, as a checklist rather than a story. */
export const complianceSteps = [
  {
    title: 'Feasibility and by-law review',
    line: 'FAR, road setbacks, parking ratio and zoning for your plot.',
  },
  {
    title: 'Structural drafting',
    line: 'RCC frame designed in STAAD.Pro for commercial live loads and seismic zone.',
  },
  {
    title: 'Sanction drawing set',
    line: 'Multi-storey drawings prepared to Town Planning format.',
  },
  {
    title: 'Fire NOC documentation',
    line: 'Wet riser, sprinkler and escape provisions evidenced to NBC.',
  },
  {
    title: 'TUDA and Town Planning liaison',
    line: 'Submission, queries and follow-through until approval.',
  },
  {
    title: 'Commencement',
    line: 'Excavation begins against a sanctioned, stamped drawing set.',
  },
] as const

/** Structural capability table. Mirrors the commercial `specs` in services-data. */
export const capabilitySpecs = [
  {
    component: 'Structural steel',
    brand: 'JSW / Tata Tiscon',
    specification: 'Fe-550D TMT rebar and structural I-beams for wide clear spans',
  },
  {
    component: 'Concrete',
    brand: 'RMC, M25 – M40',
    specification: 'Computerised ready-mix with slump and cube strength batch reports',
  },
  {
    component: 'Flooring',
    brand: 'Kajaria heavy duty / Sadarahalli granite',
    specification: 'High-traffic full-body vitrified tile and flamed granite steps',
  },
  {
    component: 'Facade and glazing',
    brand: 'Saint-Gobain / Jindal Aluminium',
    specification: 'Silicone curtain wall with toughened DGU acoustic and solar glass',
  },
  {
    component: 'Electrical',
    brand: 'Schneider / L&T switchgear',
    specification: 'Three-phase busbar trunking, panel boards, dual-source changeover',
  },
  {
    component: 'Fire protection',
    brand: 'NBC compliant',
    specification: 'Sprinkler conduits, wet riser shafts, fire doors, external hydrants',
  },
] as const

/**
 * Programme strip. `start` and `span` are twelfths of the contract period, so
 * the bars stay proportional whatever the real duration turns out to be —
 * the page never claims a month count it cannot honour.
 */
export const programmeTracks = [
  {
    id: 'foundation',
    label: 'Foundation',
    start: 0,
    span: 3,
    note: 'Raft or pile excavation, steel cage binding, column grid set out.',
  },
  {
    id: 'structure',
    label: 'Structure',
    start: 2,
    span: 5,
    note: 'Slab decking floor by floor, with conduits and shafts cast in.',
  },
  {
    id: 'facade',
    label: 'Facade',
    start: 5,
    span: 4,
    note: 'Curtain wall and glazing follow the frame up, not after it.',
  },
  {
    id: 'mep',
    label: 'MEP',
    start: 4,
    span: 5,
    note: 'Electrical distribution, plumbing and HVAC provisions in parallel.',
  },
  {
    id: 'fitout',
    label: 'Fit-out',
    start: 8,
    span: 4,
    note: 'Flooring, finishing and tenant handover condition.',
  },
] as const

/**
 * Hero credibility line. Mirrors the commercial `trustBadges` already in
 * services-data — placeholder counts pending Phase 0 client confirmation, like
 * every other figure on the site.
 */
export const heroProof = [
  { value: '45+', label: 'Commercial deliveries' },
  { value: '100%', label: 'By-law compliant' },
  { value: 'TUDA', label: 'Sanction liaison in-house' },
] as const
