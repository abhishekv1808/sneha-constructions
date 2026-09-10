/**
 * Brand roster per material category.
 *
 * The prose for each category lives in Supabase (`material_categories.body`) so
 * the client can edit it without a deploy. These brand rows stay in code for
 * now because the table has no column for them — promoting them to a jsonb
 * column is a small migration and a sensible follow-up.
 *
 * Every brand here already appears in `services-data.ts`. Keep the two in step:
 * a visitor who sees "UltraTech" on the turnkey page and something else here
 * loses exactly the trust this section exists to build.
 */

export interface MaterialSpec {
  component: string
  brand: string
  note: string
}

export const materialSpecs: Readonly<Record<string, readonly MaterialSpec[]>> = {
  'foundation-structure': [
    {
      component: 'TMT steel',
      brand: 'Tata Tiscon / A1 Gold Fe-550D',
      note: 'High-ductility rebar from authorised primary distributors',
    },
    {
      component: 'Cement',
      brand: 'UltraTech / ACC / Birla Super',
      note: '53-grade OPC for structural casting',
    },
    {
      component: 'Aggregate & sand',
      brand: 'Certified quarry M-sand, 20 mm jelly',
      note: 'Double-washed, conforming to IS 383',
    },
    {
      component: 'Concrete',
      brand: 'M20 – M25 design mix',
      note: 'Cube samples tested at 7 and 28 days',
    },
  ],
  'walls-masonry': [
    {
      component: 'Bricks',
      brand: 'Table-moulded red kiln brick',
      note: 'Sorted on delivery; under-burnt rejected',
    },
    {
      component: 'Blocks',
      brand: 'Solid concrete block where specified',
      note: 'Used for compound and non-load-bearing runs',
    },
    {
      component: 'Plaster',
      brand: 'PPC with M-sand',
      note: '12 mm internal, 15–20 mm external, cured',
    },
    {
      component: 'Chemicals',
      brand: 'Dr. Fixit / Fosroc',
      note: 'Bonding agents and plaster admixtures',
    },
  ],
  'electrical-plumbing': [
    {
      component: 'Wiring',
      brand: 'Polycab / Finolex FR-LSH',
      note: 'Fire-retardant, low smoke, concealed in conduit',
    },
    {
      component: 'Switchgear',
      brand: 'Schneider / Legrand / Anchor',
      note: 'Independent MCBs for heavy appliances',
    },
    {
      component: 'Water lines',
      brand: 'Astral CPVC SDR-11',
      note: 'Pressure tested before plaster closes them in',
    },
    {
      component: 'Drainage',
      brand: 'Supreme / Astral PVC',
      note: 'Correct falls, inspection points at every junction',
    },
  ],
  'interiors-finishing': [
    {
      component: 'Flooring',
      brand: 'Kajaria / Somany vitrified',
      note: 'Double-charged, laid to level with spacers',
    },
    {
      component: 'Paint',
      brand: 'Asian Paints Royale / Apex',
      note: 'Over two coats of Birla White putty',
    },
    {
      component: 'Doors & windows',
      brand: 'Teakwood frame, 3-track UPVC',
      note: 'Teak main frame; UPVC with mosquito mesh',
    },
    {
      component: 'Sanitaryware',
      brand: 'Jaquar / Cera / Parryware',
      note: 'Dual-flush cisterns, chrome brass mixers',
    },
  ],
  'roofing-waterproofing': [
    {
      component: 'Slab',
      brand: 'RCC with design-mix concrete',
      note: 'Regulated 21-day water curing',
    },
    {
      component: 'Waterproofing',
      brand: 'Dr. Fixit / Fosroc',
      note: 'Sunken slabs, terrace and all wet areas',
    },
    {
      component: 'Terrace finish',
      brand: 'Brickbat coba or tile-on-screed',
      note: 'Laid to fall so water reaches the outlet',
    },
    {
      component: 'Rainwater',
      brand: 'PVC downpipes with leaf guards',
      note: 'Routed to a filtered recharge pit',
    },
  ],
}

export function getMaterialSpecs(slug: string): readonly MaterialSpec[] {
  return materialSpecs[slug] ?? []
}
