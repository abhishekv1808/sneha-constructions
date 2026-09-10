-- Seed the prose body for the five material categories.
--
-- The rows already exist and are published (name, promise and highlights were
-- seeded from CLAUDE.md §2); only `body` was empty, which left the five
-- /materials/<slug> pages thin. Those five URLs carry index equity from the
-- WordPress site, so thin is the one thing they must not be.
--
-- Written to be client-editable from the Supabase dashboard afterwards. Blank
-- lines separate paragraphs; the page splits on them.
--
-- Idempotent: only fills rows whose body is currently null or empty, so
-- re-running never overwrites the client's own edits.

update material_categories
set body = $md$Every load-bearing element in your house traces back to two materials: the steel that resists tension and the concrete that resists compression. Get either wrong and nothing above it is safe, however good the finish looks.

We use Fe-550D TMT rebar from Tata Tiscon or A1 Gold, bought through authorised primary distributors rather than the open market. The D grade matters: it denotes higher ductility, which is what allows a frame to flex rather than snap under seismic load. Every bar carries its brand and grade rolled into the ribs, so you can verify it yourself on delivery day.

Concrete is a design mix, not a guessed one. Structural casting uses 53-grade OPC from UltraTech, ACC or Birla Super with double-washed M-sand and 20 mm aggregate conforming to IS 383. We take cube samples from the pour and send them for 7-day and 28-day compressive strength tests, and you get the certificates.

Foundation depth and type follow the soil, not a template. We test the bearing capacity of your plot before designing the footing, because a raft where a strip would do wastes your money, and a strip where a raft is needed costs far more than money.

Curing is where most local builds quietly lose strength. Concrete gains most of its strength in the first three weeks, and only if it stays wet. We cure for 21 regulated days and our site engineer signs off on it.$md$
where slug = 'foundation-structure' and coalesce(body, '') = '';

update material_categories
set body = $md$Walls do more than divide rooms. They carry load in places, keep heat out, keep sound in, and provide the flat true surface every finish after them depends on. A wall built out of plumb is a problem you pay for three more times before handover.

We build in table-moulded red kiln brick, sorted on delivery — under-burnt bricks get sent back rather than buried in an internal wall where nobody will see them. Solid concrete block goes into compound walls and non-load-bearing runs where it makes better sense.

Every course is checked for level and plumb as it goes up, not corrected afterwards with extra plaster. This is the single most common shortcut on a local site: build fast and hide the error in a thick render. It works until the plaster cracks along the line of the fault.

Plaster is PPC with M-sand — roughly 12 mm internally and 15 to 20 mm externally, applied in the correct number of coats and cured properly. Bonding agents and admixtures from Dr. Fixit or Fosroc are used where the substrate needs them, particularly at junctions between concrete and brick where cracks otherwise start.

Done properly, masonry earns you two things you will notice every day: a house that stays cooler than the street outside, and rooms that do not transmit every sound to the room next door.$md$
where slug = 'walls-masonry' and coalesce(body, '') = '';

update material_categories
set body = $md$These are the systems buried inside your walls. Once the plaster closes them in, fixing anything means breaking something — so this is the stage where shortcuts are least visible and most expensive.

Wiring is Polycab or Finolex FR-LSH: fire-retardant, low smoke and halogen. In a house fire the smoke reaches people long before the flame does, and ordinary PVC insulation is what makes it toxic. The cost difference is small. Everything runs in conduit, never buried loose in plaster.

The distribution board is Schneider, Legrand or Anchor, with independent MCBs for heavy appliances so a geyser fault does not take out your lighting. Earthing is done properly and tested, not assumed.

Water lines are Astral CPVC SDR-11, rated for hot and cold. Every line is pressure tested and held under pressure before a single trowel of plaster covers it, so a weeping joint is found while it costs nothing to fix. Drainage is Supreme or Astral PVC, laid to correct falls with inspection points at every junction — a drain without access is a drain you will eventually cut a floor open to reach.

We plan switch and socket positions with you before conduiting starts, on a walkthrough of the actual rooms. It is far easier to move a socket on a drawing than after the wall is closed.$md$
where slug = 'electrical-plumbing' and coalesce(body, '') = '';

update material_categories
set body = $md$This is the part of the house you actually touch. It is also the part where the difference between a careful builder and a fast one becomes obvious to anyone standing in the room.

Flooring is double-charged vitrified tile from Kajaria or Somany, laid to level with spacers and proper joint alignment. Double-charged means the pattern runs through the body of the tile rather than sitting on the surface, so it survives twenty years of traffic without wearing through.

Walls take two coats of Birla White putty before paint, which is what gives a finished wall its flatness. Paint is Asian Paints — Royale inside, Apex on the exterior where it has to survive sun and monsoon.

The main door frame is teakwood, five by three inches, with brass hardware. Internal doors are flush with laminate. Windows are three-track UPVC with mosquito mesh, which seals better than aluminium and does not corrode.

Sanitaryware is Jaquar, Cera or Parryware: dual-flush cisterns, chrome brass mixers, and a jet-black granite kitchen counter with a stainless steel sink and a two-foot dado above it.

None of this is exotic. It is simply specified, agreed in writing before work starts, and then actually installed — which is the part that varies.$md$
where slug = 'interiors-finishing' and coalesce(body, '') = '';

update material_categories
set body = $md$In this district the roof has two jobs: keep the monsoon out and keep the heat down. A slab that fails at either one makes the whole house harder to live in.

The slab itself is RCC in design-mix concrete, cured under water for 21 regulated days. Most terrace leaks are not waterproofing failures at all — they are curing failures, where the concrete developed shrinkage cracks in its first three weeks and no membrane applied later can bridge them.

Waterproofing is Dr. Fixit or Fosroc, applied to the terrace, every sunken slab and all wet areas. Sunken bathroom slabs are the second most common source of a leak that shows up on the ceiling below, usually a year after handover.

The terrace is finished in brickbat coba or tile-on-screed, laid to a deliberate fall so water actually reaches the outlet instead of standing in a corner. Standing water finds every weakness eventually. Brickbat coba has the additional benefit of adding thermal mass, which measurably reduces how much heat reaches the top floor.

Rainwater goes into PVC downpipes with leaf guards and is routed to a filtered recharge pit rather than onto the road. It is inexpensive to do while the site is open and awkward to retrofit afterwards — and in most urban local body areas some form of harvesting is a condition of sanction in any case.$md$
where slug = 'roofing-waterproofing' and coalesce(body, '') = '';
