/**
 * Blog content.
 *
 * Stored as typed blocks rather than MDX: it needs no new dependency (§9 keeps
 * the bundle honest), it renders through brand components rather than a
 * prose-reset stylesheet, and it stays type-checked. If the client later wants
 * to publish without a deploy, this shape maps cleanly onto a Supabase `posts`
 * table — `body` becomes a jsonb column.
 *
 * Every post is written for the audience in CLAUDE.md §1: a family or business
 * owner in Tumkur district planning a build. No filler, no generic
 * "top 10 construction trends" content.
 */

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: readonly string[] }
  | { type: 'ol'; items: readonly string[] }
  | { type: 'callout'; title: string; text: string }
  | { type: 'quote'; text: string; attribution?: string }
  | {
      type: 'table'
      head: readonly string[]
      rows: readonly (readonly string[])[]
      caption?: string
    }

export type CategoryId = 'cost' | 'approvals' | 'materials' | 'planning'

export interface Category {
  id: CategoryId
  label: string
}

export const categories: readonly Category[] = [
  { id: 'cost', label: 'Cost & budget' },
  { id: 'approvals', label: 'Approvals' },
  { id: 'materials', label: 'Materials' },
  { id: 'planning', label: 'Planning' },
] as const

export interface Post {
  slug: string
  title: string
  standfirst: string
  category: CategoryId
  /** ISO date. Used for <time> and Article schema. */
  published: string
  updated?: string
  author: string
  authorRole: string
  metaTitle: string
  metaDescription: string
  featured?: boolean
  /** Short, plain-language answers pulled out for the takeaways box. */
  takeaways: readonly string[]
  body: readonly Block[]
}

export const posts: readonly Post[] = [
  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'cost-to-build-a-house-in-tumkur',
    title: 'What it really costs to build a house in Tumkur',
    standfirst:
      'A 2,400 sq ft house at ₹1,875 per sq ft is ₹45 lakh of construction — and that is not the whole number. Here is the rest of it.',
    category: 'cost',
    published: '2026-08-18',
    author: 'Sneha Construction',
    authorRole: 'Engineering team, Tumkur',
    featured: true,
    metaTitle: 'Cost to Build a House in Tumkur (2026) — Full Breakdown',
    metaDescription:
      'What a house actually costs to build in Tumkur: the per-sq-ft rate explained, what it excludes, and the extra costs most first-time builders miss.',
    takeaways: [
      'Construction cost = built-up area × rate. Everything else is extra.',
      'Budget 8–12% on top for items outside the per-sq-ft rate.',
      'Sanction fees, BESCOM deposit and the compound wall are almost never included.',
    ],
    body: [
      {
        type: 'p',
        text: 'Almost every builder in Tumkur quotes a per-square-foot rate. It is a useful number and it is also an incomplete one, because it describes the building and not the project. Two quotes at the same rate can differ by six or seven lakh once you read what each one covers.',
      },
      { type: 'h2', text: 'How the rate works' },
      {
        type: 'p',
        text: 'You multiply the built-up area by the rate. Built-up area is the total floor area of every level including walls, staircase and balconies — not the carpet area you will actually walk on, and not the plot size.',
      },
      {
        type: 'callout',
        title: 'A worked example',
        text: 'A 30×40 plot with a G+1 build might give roughly 2,400 sq ft of built-up area. At ₹1,875 per sq ft that is ₹45,00,000 of construction. At a premium specification of ₹2,250 it is ₹54,00,000. The plot has not changed; the finish has.',
      },
      { type: 'h2', text: 'What the rate normally covers' },
      {
        type: 'ul',
        items: [
          'Excavation, foundation, RCC structure and roof slabs',
          'Brickwork, internal and external plaster',
          'Concealed wiring and plumbing with standard fittings',
          'Flooring, painting, doors and windows to the agreed specification',
          'Site supervision and the labour for all of the above',
        ],
      },
      { type: 'h2', text: 'What it usually does not' },
      {
        type: 'p',
        text: 'This is where budgets slip. None of the following is unreasonable to exclude — they vary too much by plot to sit inside a fixed rate — but they must be budgeted separately and in writing.',
      },
      {
        type: 'table',
        head: ['Item', 'Typical range', 'Notes'],
        rows: [
          ['Compound wall and gate', '₹1,200 – ₹1,800 / running ft', 'Depends on height and plot perimeter'],
          ['Borewell and sump', '₹1.5 – ₹3 lakh', 'Depth varies sharply across the district'],
          ['Sanction fees and deposits', 'Varies by authority', 'TUDA or Gram Panchayat, plus betterment charges'],
          ['BESCOM meter and deposit', '₹25,000 – ₹60,000', 'Load dependent'],
          ['Modular kitchen and wardrobes', '₹3 – ₹8 lakh', 'Excluded from almost every base rate'],
          ['Site levelling or rock cutting', 'Site specific', 'Only quotable after a soil test'],
        ],
        caption: 'Indicative ranges for Tumkur district. Confirm each against your own quote.',
      },
      { type: 'h2', text: 'Three questions to ask before you sign' },
      {
        type: 'ol',
        items: [
          'Is the rate on built-up area or carpet area? The difference is often 20% or more.',
          'What is the written exclusion list? If there is not one, that is your answer.',
          'What happens if steel or cement prices rise mid-build? A locked rate should say so explicitly.',
        ],
      },
      {
        type: 'p',
        text: 'A quote you can read is worth more than a quote that is cheap. Ask for the itemised bill of quantities before you commit to anything — any builder confident in their pricing will hand it over.',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'building-approvals-tumkur',
    title: 'Site to sanction: the approvals you need in Tumkur',
    standfirst:
      'Most delayed builds in the district are not delayed by concrete. They are delayed by paperwork that could have been started three months earlier.',
    category: 'approvals',
    published: '2026-07-29',
    author: 'Sneha Construction',
    authorRole: 'Engineering team, Tumkur',
    metaTitle: 'Building Plan Approval in Tumkur — TUDA & Panchayat Process',
    metaDescription:
      'The approvals needed before you start building in Tumkur: khata, plan sanction through TUDA or Gram Panchayat, and the documents to prepare first.',
    takeaways: [
      'Confirm which authority governs your plot before drawing anything.',
      'Title and khata problems take longest — start those first.',
      'Building without sanction risks penalties and blocks resale and home loans.',
    ],
    body: [
      {
        type: 'p',
        text: 'Which authority sanctions your plan depends on where your plot sits. Inside the Tumkur city limits it is generally the City Corporation or TUDA; outside, it is the Gram Panchayat with the relevant planning authority. Get this wrong and you will prepare the wrong drawing set.',
      },
      { type: 'h2', text: 'Start with the documents, not the drawings' },
      {
        type: 'p',
        text: 'Design is the fast part. Title is the slow part. Before an architect draws anything, assemble:',
      },
      {
        type: 'ul',
        items: [
          'Sale deed and the mother deed chain',
          'Khata certificate and khata extract in the current owner’s name',
          'Up-to-date tax paid receipts',
          'Encumbrance certificate covering the required period',
          'Approved layout plan, if the plot is part of a layout',
          'A recent survey sketch with plot dimensions',
        ],
      },
      {
        type: 'callout',
        title: 'The one that catches people',
        text: 'If the khata is still in a previous owner’s name, or the plot is on an unapproved layout, sanction stalls until it is fixed. This is worth checking before you buy, not after.',
      },
      { type: 'h2', text: 'What the sanction set contains' },
      {
        type: 'ul',
        items: [
          'Site plan showing setbacks on all four sides',
          'Floor plans for every level',
          'Sections and elevations',
          'Structural drawings and the engineer’s certification',
          'FAR and coverage calculations for the plot',
        ],
      },
      { type: 'h2', text: 'Setbacks and coverage decide your design' },
      {
        type: 'p',
        text: 'Setbacks are the mandatory open space around the building. They vary with plot size and the width of the road you front, and they are the reason a 30×40 does not give you a 30×40 footprint. Coverage and FAR then cap how much you can build in total. Design after you know these three numbers, not before.',
      },
      { type: 'h2', text: 'Why building without sanction is a false economy' },
      {
        type: 'p',
        text: 'An unsanctioned building can attract penalties, cannot reliably be regularised, is difficult to sell, and will usually not support a home loan. The saving is short-lived; the problem is permanent.',
      },
      {
        type: 'quote',
        text: 'Start the paperwork the week you decide to build. The drawings can wait for the documents; the documents cannot wait for the drawings.',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'check-steel-and-cement-on-site',
    title: 'How to check the steel and cement arriving at your own site',
    standfirst:
      'You do not need an engineering degree to catch the three most common material substitutions. You need five minutes and a phone camera.',
    category: 'materials',
    published: '2026-07-11',
    author: 'Sneha Construction',
    authorRole: 'Engineering team, Tumkur',
    metaTitle: 'How to Check TMT Steel and Cement Quality on Your Site',
    metaDescription:
      'A practical owner’s guide to verifying TMT steel grade, cement grade and freshness, and aggregate quality on a house construction site in Tumkur.',
    takeaways: [
      'Every TMT bar is rolled with its brand and grade — read it.',
      'Cement older than about 90 days from packing loses strength.',
      'Photograph every delivery challan. It costs nothing and settles arguments.',
    ],
    body: [
      {
        type: 'p',
        text: 'Material substitution is the quietest way a build loses quality, because it happens on delivery day when nobody is watching. These checks are simple enough to do yourself on a site visit.',
      },
      { type: 'h2', text: 'Steel: read the bar' },
      {
        type: 'p',
        text: 'TMT bars carry their manufacturer’s mark and grade rolled into the ribs, repeating along the length. Look for the grade — Fe 500, Fe 500D or Fe 550D. The D denotes higher ductility, which is what matters in a seismic zone. If the bars are unmarked, they are not from a primary producer, whatever the invoice says.',
      },
      {
        type: 'ul',
        items: [
          'Check the rolled brand and grade on the bar itself, not just the bundle tag',
          'Surface rust that dusts off is normal; flaking or pitting is not',
          'Bars should be uniformly ribbed with a consistent diameter',
          'Match the diameters delivered against the structural drawing',
        ],
      },
      { type: 'h2', text: 'Cement: read the bag' },
      {
        type: 'p',
        text: 'Every bag is printed with the grade, the week and year of packing, and an ISI mark. Cement absorbs moisture from the air and loses strength as it sits.',
      },
      {
        type: 'table',
        head: ['Check', 'What good looks like'],
        rows: [
          ['Packing date', 'Within about 90 days; fresher is better'],
          ['Grade', '53-grade OPC for structural concrete, PPC for masonry and plaster'],
          ['Feel', 'Cool and free-flowing; no lumps that resist finger pressure'],
          ['Storage on site', 'Off the floor on planks, away from walls, covered'],
        ],
      },
      {
        type: 'callout',
        title: 'The lump test',
        text: 'Press into the bag. Powder that flows and feels cool is fine. Hard lumps that will not crumble mean the cement has taken moisture and should be rejected, not "used for the compound wall".',
      },
      { type: 'h2', text: 'Sand and aggregate' },
      {
        type: 'p',
        text: 'Rub a pinch of sand between wet fingers. If it leaves a heavy brown silt film, the silt content is high and it will weaken your mortar. A simple jar test — sand, water, shake, let it settle — shows the silt as a distinct layer on top.',
      },
      { type: 'h2', text: 'The habit that matters most' },
      {
        type: 'p',
        text: 'Photograph every delivery challan and every stack of material as it lands. It takes seconds, it creates a dated record, and it makes the entire question of "what was actually delivered" answerable months later.',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'duplex-or-g-plus-1',
    title: 'Duplex or G+1? Choosing what to build on your plot',
    standfirst:
      'The two look similar on a drawing and behave very differently over twenty years. The right answer depends on who will live there, and when.',
    category: 'planning',
    published: '2026-06-24',
    author: 'Sneha Construction',
    authorRole: 'Engineering team, Tumkur',
    metaTitle: 'Duplex vs G+1 House: Which to Build on Your Tumkur Plot',
    metaDescription:
      'Duplex or G+1 with a separate floor? Compare cost, rental income, privacy and resale for a house plot in Tumkur district.',
    takeaways: [
      'A duplex is one home across two floors. A G+1 can be two independent units.',
      'If rental income matters, plan the separate staircase from day one.',
      'Retrofitting a second entrance later is expensive and usually looks it.',
    ],
    body: [
      {
        type: 'p',
        text: 'A duplex is a single house spread across two floors with an internal staircase. A G+1 built as two units is two separate homes stacked, each with its own entrance. The construction cost is close; the life you get from them is not.',
      },
      { type: 'h2', text: 'How they compare' },
      {
        type: 'table',
        head: ['', 'Duplex', 'G+1 as two units'],
        rows: [
          ['Living pattern', 'One family, whole house', 'Two households, or one plus tenant'],
          ['Staircase', 'Internal, part of the living space', 'External or separate, uses floor area'],
          ['Rental income', 'Difficult without conversion', 'Designed in from the start'],
          ['Privacy for elders', 'Shared, connected', 'Independent, self-contained'],
          ['Resale market', 'Families wanting a full house', 'Buyers wanting rental yield'],
        ],
      },
      { type: 'h2', text: 'Questions that actually decide it' },
      {
        type: 'ol',
        items: [
          'Will anyone else live independently in this house within ten years — parents, a married child, a tenant?',
          'Do you need rental income to service a loan?',
          'Is there someone who should not be climbing stairs daily?',
          'Are you likely to sell, and to whom?',
        ],
      },
      {
        type: 'callout',
        title: 'The middle path',
        text: 'Build as a duplex, but plan the structure and the plumbing risers so a separate upstairs entrance can be added later. It costs very little at design stage and almost nothing at construction stage. Retrofitting it after handover costs a great deal.',
      },
      { type: 'h2', text: 'Where the costs actually diverge' },
      {
        type: 'p',
        text: 'The per-square-foot rate is much the same either way. The difference sits in a handful of items that only the two-unit version needs, and they are easy to forget when comparing quotes.',
      },
      {
        type: 'ul',
        items: [
          'A second electricity meter and its BESCOM deposit',
          'An external or separately enclosed staircase, which consumes built-up area you are paying for',
          'A second kitchen, with its own plumbing stack and gas point',
          'Separate overhead tank draw, so one household cannot empty the other’s supply',
          'A second set of sanitary fittings and a second front door',
        ],
      },
      {
        type: 'p',
        text: 'Set against that, a duplex spends floor area on an internal staircase and a double-height space that a two-unit build would convert into rooms. The two roughly balance; what does not balance is the income one produces and the other does not.',
      },
      { type: 'h2', text: 'Be honest about the rental' },
      {
        type: 'p',
        text: 'Rental income is the usual argument for the two-unit build, and it is a real one — but only if the upstairs unit is genuinely lettable. That means an entrance a tenant can use without walking through your space, a kitchen and bathroom that are not shared, and parking that does not block yours. A "portion" that fails any of these rents slowly and at a discount.',
      },
      {
        type: 'p',
        text: 'It is also worth asking who you would be letting to. Near a college or a hospital, a self-contained upper floor lets easily. On a quieter residential road, demand can be thin, and you may have built a second kitchen you never use.',
      },
      { type: 'h2', text: 'Decide before the foundation drawing' },
      {
        type: 'p',
        text: 'Whichever you choose, decide early. The staircase position, the plumbing stack and the electrical distribution all follow from this one choice, and all three are set in concrete — literally — in the first few weeks of the build.',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'water-plan-sump-borewell-rainwater',
    title: 'The water plan most people leave until it is too late',
    standfirst:
      'Sump, borewell, overhead tank and rainwater recharge are decided at foundation stage, not at finishing. Leaving them late costs money and breaks floors.',
    category: 'planning',
    published: '2026-06-05',
    author: 'Sneha Construction',
    authorRole: 'Engineering team, Tumkur',
    metaTitle: 'Sump, Borewell & Rainwater Harvesting for a Tumkur House',
    metaDescription:
      'How to plan water storage, borewell placement and rainwater harvesting for a house in Tumkur — and why it has to be decided before the foundation.',
    takeaways: [
      'Sump position is a foundation-stage decision, not a finishing one.',
      'Size storage for the days supply fails, not for average use.',
      'Rainwater recharge is cheap during construction and disruptive afterwards.',
    ],
    body: [
      {
        type: 'p',
        text: 'Water is the system owners think about last and regret first. Everything in it interacts with the structure, so it belongs in the earliest drawings.',
      },
      { type: 'h2', text: 'Sizing the sump' },
      {
        type: 'p',
        text: 'Plan around 135 litres per person per day for normal domestic use. A family of five is therefore roughly 675 litres a day. The question is not average consumption but how many days of interruption you want to absorb — three days of buffer for that family is about 2,000 litres, plus the overhead tank.',
      },
      {
        type: 'ul',
        items: [
          'Underground sump for bulk storage, sized for the buffer you want',
          'Overhead tank for pressure and daily draw',
          'Separate line for the borewell if the water is hard, so it does not feed every tap',
        ],
      },
      { type: 'h2', text: 'Where things go' },
      {
        type: 'p',
        text: 'A sump sits below ground and near the structure, which means its excavation and walls interact with your foundation. Deciding its location after the footings are cast means either a compromised position or breaking work you have already paid for.',
      },
      {
        type: 'callout',
        title: 'Borewell first, foundation second',
        text: 'If you intend to sink a borewell, do it before the foundation goes in. Rig access to the middle of a finished site is difficult, and drilling next to a new foundation is not something you want to be arranging around scaffolding.',
      },
      { type: 'h2', text: 'Test the water before you plumb for it' },
      {
        type: 'p',
        text: 'Groundwater across much of Tumkur district is hard. Hardness does not make water unsafe to use, but it scales up geysers, shortens the life of taps and shower mixers, leaves deposits on tiles and glass, and makes washing use noticeably more soap.',
      },
      {
        type: 'p',
        text: 'A basic water test costs very little and tells you whether to plan for softening. If you do, the softener needs a position, a drain and a power point — all of which are trivial to allow for on a drawing and awkward to find afterwards.',
      },
      {
        type: 'ul',
        items: [
          'Keep borewell and municipal supply on separate inlets so you can choose which feeds what',
          'Run the harder source to the garden and washing area rather than to every tap',
          'Leave space and a drain point near the sump for a softener, even if you do not fit one yet',
        ],
      },
      { type: 'h2', text: 'The pump and the overhead tank' },
      {
        type: 'p',
        text: 'The overhead tank supplies pressure, not storage — that is the sump’s job. Size it for about a day of use, place it high enough to give reasonable pressure at the topmost shower, and make sure the slab beneath it was designed to carry it. A thousand litres of water is a tonne sitting on your roof.',
      },
      {
        type: 'callout',
        title: 'Leave the pump reachable',
        text: 'Pumps fail. Put the pump somewhere a person can stand and work — not in a sealed pit under a finished floor, and not behind the sump cover you will need two people to lift.',
      },
      { type: 'h2', text: 'Rainwater harvesting' },
      {
        type: 'p',
        text: 'Recharging groundwater through a simple filtered pit is inexpensive while the site is already open and trenches are being dug. The terrace slope, the downpipe positions and the pit location all need to be agreed before the slab is cast. Afterwards, every one of those becomes a retrofit — and in most urban local body areas some form of harvesting is a condition of sanction anyway, so it is not optional so much as better done early.',
      },
      {
        type: 'p',
        text: 'None of this is complicated. It is simply early. Ask for the water plan alongside the structural drawings and it will cost a fraction of what it costs as an afterthought.',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'reading-a-construction-agreement',
    title: 'Reading a construction agreement before you sign it',
    standfirst:
      'Six clauses decide whether a build goes smoothly. They are rarely the ones people read first.',
    category: 'cost',
    published: '2026-05-16',
    author: 'Sneha Construction',
    authorRole: 'Engineering team, Tumkur',
    metaTitle: 'Construction Agreement Checklist — What to Check Before Signing',
    metaDescription:
      'The clauses that matter in a house construction agreement: scope, exclusions, payment schedule, escalation, timeline and defect liability.',
    takeaways: [
      'Payments should follow completed work, never calendar dates.',
      'A missing exclusion list is the single biggest warning sign.',
      'Ask what happens on delay, in writing, before you sign.',
    ],
    body: [
      {
        type: 'p',
        text: 'A construction agreement is not primarily about price. It is about what happens when something is unclear, late or disputed. These are the clauses worth an hour of your attention.',
      },
      { type: 'h2', text: '1. Scope and specification' },
      {
        type: 'p',
        text: 'The agreement should name brands and grades, not adjectives. "Premium tiles" means nothing. "Double-charged vitrified, 800×800, from an agreed shortlist" means something. Anything described only by quality words will be interpreted in the builder’s favour, not yours.',
      },
      { type: 'h2', text: '2. The exclusion list' },
      {
        type: 'p',
        text: 'Every fixed rate excludes something. A good agreement lists exclusions plainly; a poor one leaves you to discover them one at a time. If there is no exclusion list, ask for one before anything else.',
      },
      { type: 'h2', text: '3. Payment schedule' },
      {
        type: 'p',
        text: 'Payments should be tied to completed, verifiable stages — foundation cast, slab poured, plastering complete — and never to dates on a calendar. A date-based schedule pays for time rather than progress.',
      },
      {
        type: 'callout',
        title: 'A fair structure',
        text: 'A modest advance on signing, then releases against milestones you can stand in front of and inspect, with a final balance held back until the handover checklist is signed off.',
      },
      { type: 'h2', text: '4. Escalation' },
      {
        type: 'p',
        text: 'If the rate is locked, the agreement should say so explicitly and state who absorbs steel and cement price movement. If it is not locked, it should say how increases are calculated and capped.',
      },
      { type: 'h2', text: '5. Timeline and delay' },
      {
        type: 'p',
        text: 'Look for a stated duration, a definition of what legitimately extends it — sanction delays, owner-driven design changes, weather — and what happens if it slips for reasons outside those.',
      },
      { type: 'h2', text: '6. Defect liability' },
      {
        type: 'p',
        text: 'A defect liability period after handover covers workmanship problems that only appear once the house is lived in — a leak in the first monsoon, a settling crack. Check its length and, more importantly, what it actually covers.',
      },
      {
        type: 'quote',
        text: 'If a clause is hard to get in writing, that is information. The unwillingness is the answer.',
      },
    ],
  },
] as const

// ── helpers ────────────────────────────────────────────────────────────────

const WORDS_PER_MINUTE = 200

function blockWords(block: Block): number {
  switch (block.type) {
    case 'p':
    case 'h2':
    case 'h3':
      return block.text.split(/\s+/).length
    case 'ul':
    case 'ol':
      return block.items.join(' ').split(/\s+/).length
    case 'callout':
      return `${block.title} ${block.text}`.split(/\s+/).length
    case 'quote':
      return `${block.text} ${block.attribution ?? ''}`.split(/\s+/).length
    case 'table':
      return [...block.head, ...block.rows.flat(), block.caption ?? ''].join(' ').split(/\s+/).length
  }
}

/** Derived rather than hand-written, so it can never drift from the body. */
export function readingMinutes(post: Post): number {
  const words = post.body.reduce((sum, block) => sum + blockWords(block), 0)
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug)
}

export function getCategory(id: CategoryId): Category {
  return categories.find((c) => c.id === id) ?? (categories[0] as Category)
}

/** Newest first. */
export function sortedPosts(): Post[] {
  return [...posts].sort((a, b) => b.published.localeCompare(a.published))
}

export function getFeaturedPost(): Post {
  return (posts.find((post) => post.featured) ?? sortedPosts()[0]) as Post
}

/** Same category first, then most recent, excluding the post itself. */
export function getRelatedPosts(post: Post, limit = 3): Post[] {
  return sortedPosts()
    .filter((candidate) => candidate.slug !== post.slug)
    .sort((a, b) => {
      const aMatch = a.category === post.category ? 0 : 1
      const bMatch = b.category === post.category ? 0 : 1
      return aMatch - bMatch
    })
    .slice(0, limit)
}

export function formatPostDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
