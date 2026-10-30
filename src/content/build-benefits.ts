// The three working promises shown on the home page ("How we build for you").
//
// Images: each benefit has an empty image slot until a photo is supplied. To
// add one, put the file in public/benefits/ and set `image` below to its path,
// e.g. image: '/benefits/payment-slabs.jpg'. Landscape (4:3) works best.
//
// CONFIRM WITH CLIENT: the payment wording says 8–10 instalments. The turnkey
// page's payment ladder (sections/turnkey/turnkey-data.ts) lists 7 stages —
// the two must agree with the agreement the client actually signs.

export interface BuildBenefit {
  id: 'payments' | 'engineer' | 'updates'
  title: string
  text: string
  points: readonly string[]
  /** Path under /public, or null to leave the image slot empty. */
  image: string | null
  imageAlt: string
}

export const buildBenefits: readonly BuildBenefit[] = [
  {
    id: 'payments',
    title: 'Pay in 8–10 easy slabs',
    text: 'No large lump sum. You pay stage by stage as your house goes up, so your money always matches the work you can see on site.',
    points: [
      'Each instalment is linked to a finished stage of work',
      'The full payment schedule is in your agreement before work starts',
      'Easier to plan with your savings or home loan disbursements',
    ],
    image: '/benefits/payment-slabs.jpg',
    imageAlt:
      'Tumakuru homeowner couple reviewing the stage-wise payment schedule with the Sneha Construction team',
  },
  {
    id: 'engineer',
    title: 'A dedicated site engineer for your house',
    text: 'One engineer is assigned to your house from the first day to handover. They know every detail of your build, and you always know who to call.',
    points: [
      'The same engineer from foundation to handover',
      'Checks the work on site at every stage',
      'Your direct contact for any question about your house',
    ],
    image: '/benefits/dedicated-engineer.jpg',
    imageAlt: 'Sneha Construction site engineer checking column alignment on a residential house in Tumakuru',
  },
  {
    id: 'updates',
    title: 'Regular construction updates on WhatsApp',
    text: 'Photos and progress notes from your site, sent straight to your phone. Follow your house from anywhere — even if you live in another city.',
    points: [
      'Photos of the actual work, at every stage',
      'Know what is done and what comes next',
      'Share the updates easily with your family',
    ],
    image: '/benefits/whatsapp-updates.jpg',
    imageAlt: 'Tumakuru homeowner happily viewing construction progress photos on WhatsApp',
  },
]
