-- ---------------------------------------------------------------------------
-- Seed — the real client content extracted in CLAUDE.md §2. Nothing here is
-- invented copy; every promise line and sub-service is the client's own wording.
--
-- Idempotent: re-running upserts on the natural key rather than duplicating, so
-- this is safe to replay against a database that already has rows.
--
-- TWO ITEMS ARE NOT CLIENT-CONFIRMED AND ARE PARKED ACCORDINGLY:
--   1. The premium and luxury package rates. §14 Phase 0 lists "confirmation of
--      the ₹1875 rate structure and package tiers" as a blocking input, and §8.6
--      warns that a wrong figure here creates a dispute at handover. Both rows
--      are seeded is_active = false, so the "public reads active rates" policy
--      hides them until the client signs off on real numbers. Only the
--      advertised essential rate is live.
--   2. service_areas.intro is left null. §12 requires genuinely distinct content
--      per town; spinning one template with the name swapped is a thin-content
--      pattern that will not rank. Collect real copy in Phase 5.
-- ---------------------------------------------------------------------------

-- Services — §2, the three pillars -------------------------------------------

insert into services (slug, name, category, promise, sub_services, sort_order, is_published)
values
  (
    'residential',
    'Residential Construction',
    'residential',
    'Strong foundations. Elegant designs. Peaceful living spaces.',
    array['Duplex Houses','Farmhouses','Bungalows','Villas','Apartments','PGs & Hostels'],
    1,
    true
  ),
  (
    'commercial',
    'Commercial Construction',
    'commercial',
    'Perfectly planned commercial spaces built for success.',
    array['Schools & Colleges','Hotels & Restaurants','Shopping Malls','Office Buildings','Hospitals & Clinics'],
    2,
    true
  ),
  (
    'turnkey',
    'Turnkey Construction Solutions',
    'turnkey',
    'You dream it — we plan, build, and deliver it flawlessly.',
    array['Site Planning & Layout','3D Design & Architecture','Foundation & Structure Work','Electrical & Plumbing Installation','Flooring, Painting & Finishing','Quality Checks & Final Inspection'],
    3,
    true
  )
on conflict (slug) do update set
  name         = excluded.name,
  category     = excluded.category,
  promise      = excluded.promise,
  sub_services = excluded.sub_services,
  sort_order   = excluded.sort_order,
  is_published = excluded.is_published;

-- Materials & quality — §2, the five sub-pages -------------------------------

insert into material_categories (slug, name, promise, highlights, sort_order, is_published)
values
  (
    'foundation-structure',
    'Foundation & Structure',
    'High-quality cement, concrete and steel reinforcement engineered for long-term durability and load stability',
    array['Precision in foundation laying','Robust structural framework'],
    1,
    true
  ),
  (
    'walls-masonry',
    'Walls & Masonry',
    'Top-grade bricks, blocks and plastering with perfect alignment and premium finishing',
    array['Neat appearance & durable render','Soundproofing & thermal insulation'],
    2,
    true
  ),
  (
    'electrical-plumbing',
    'Electrical & Plumbing',
    'Safe, efficient wiring and long-lasting plumbing for proper flow and safety compliance',
    array['Quality fittings & earthing','PVC/CPVC piping, leak-proof systems'],
    3,
    true
  ),
  (
    'interiors-finishing',
    'Interiors & Finishing',
    'Smooth wall finishes, premium paints and tiles, interiors crafted for comfort and elegance',
    array['Premium paints & floor finishes','Attention to every last detail'],
    4,
    true
  ),
  (
    'roofing-waterproofing',
    'Roofing & Waterproofing',
    'Leak-proof, heat-resistant roofing with reinforced slabs and superior waterproofing',
    array['Advanced waterproof membranes','Heat-resistant durable roofing'],
    5,
    true
  )
on conflict (slug) do update set
  name         = excluded.name,
  promise      = excluded.promise,
  highlights   = excluded.highlights,
  sort_order   = excluded.sort_order,
  is_published = excluded.is_published;

-- Service areas — §2. intro stays null on purpose; see the header note. -------

insert into service_areas (slug, name, is_published)
values
  ('tumkur',  'Tumkur',  true),
  ('gubbi',   'Gubbi',   true),
  ('kunigal', 'Kunigal', true),
  ('sira',    'Sira',    true),
  ('tiptur',  'Tiptur',  true)
on conflict (slug) do update set
  name         = excluded.name,
  is_published = excluded.is_published;

-- Site settings — the canonical NAP block, §2 --------------------------------

insert into site_settings (key, value)
values
  -- §2: the tel: href carries no spaces and no encoded leading space. The live
  -- site's `tel:%20+91%2080014%2080064` fails on some Android dialers.
  ('phone', '{"display":"+91 80014 80064","href":"tel:+918001480064","e164":"+918001480064"}'::jsonb),
  ('whatsapp', '{"number":"918001480064","href":"https://wa.me/918001480064"}'::jsonb),
  -- Casing normalised to lowercase; the live site mixes three variants.
  ('email', '{"address":"info@snehaconstruction.com"}'::jsonb),
  ('address', '{
     "label":"Head Office",
     "lines":["4th Cross, Vinobanagar,","SS Temple Main Road, BG Patya Circle,","Tumkur – 572101, Karnataka"],
     "street":"4th Cross, Vinobanagar, SS Temple Main Road, BG Patya Circle",
     "locality":"Tumkur",
     "region":"Karnataka",
     "postal_code":"572101",
     "country":"IN"
   }'::jsonb),
  ('hours', '{"display":"Monday – Saturday, 9:00 AM – 9:00 PM","schema_org":"Mo-Sa 09:00-21:00"}'::jsonb),
  ('base_rate_sqft', '1875'::jsonb),
  -- §2: all three social links on the live site point at facebook.com. Nulls
  -- until the client supplies real URLs — the footer renders nothing for a null
  -- and a dead icon costs more trust than an absent one.
  ('social', '{"facebook":null,"twitter":null,"youtube":null,"instagram":null}'::jsonb)
on conflict (key) do update set
  value      = excluded.value,
  updated_at = now();

-- Estimator rates — §8.6 -----------------------------------------------------
-- location null = the default that applies to all five towns.

insert into estimator_rates (package, base_rate_sqft, location, location_multiplier, floor_multiplier, stage_breakdown, is_active)
values
  (
    'essential',
    1875,                                   -- the advertised, client-confirmed rate
    null,
    1.0,
    '{"G":1.0,"G+1":1.03,"G+2":1.06,"G+3":1.09}'::jsonb,
    '{"foundation":0.15,"structure":0.25,"masonry":0.15,"electrical_plumbing":0.12,"finishing":0.28,"external_works":0.05}'::jsonb,
    true
  ),
  (
    'premium',
    2350,                                   -- PLACEHOLDER — not client-confirmed
    null,
    1.0,
    '{"G":1.0,"G+1":1.03,"G+2":1.06,"G+3":1.09}'::jsonb,
    '{"foundation":0.14,"structure":0.24,"masonry":0.14,"electrical_plumbing":0.13,"finishing":0.30,"external_works":0.05}'::jsonb,
    false
  ),
  (
    'luxury',
    2950,                                   -- PLACEHOLDER — not client-confirmed
    null,
    1.0,
    '{"G":1.0,"G+1":1.03,"G+2":1.06,"G+3":1.09}'::jsonb,
    '{"foundation":0.13,"structure":0.22,"masonry":0.13,"electrical_plumbing":0.14,"finishing":0.33,"external_works":0.05}'::jsonb,
    false
  );

-- §10: stage_breakdown "must sum to 1". Nothing in the schema enforces that, so
-- the migration refuses to commit if any row drifts. Binary floating point is
-- not in play — jsonb numerics cast to exact numeric.
do $verify$
declare
  offender record;
begin
  for offender in
    select r.id,
           r.package,
           (select sum(v::numeric) from jsonb_each_text(r.stage_breakdown) as e(k, v)) as total
    from estimator_rates r
  loop
    if offender.total is distinct from 1::numeric then
      raise exception
        'estimator_rates.stage_breakdown must sum to exactly 1 (package %, id %, got %)',
        offender.package, offender.id, offender.total;
    end if;
  end loop;
end;
$verify$;
