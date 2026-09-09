# CLAUDE.md — Sneha Construction & Developers

Project brief, design system and build contract for the website rebuild.
Read this file end-to-end before writing any code. Everything here is binding unless the client says otherwise.

---

## 1. Project at a glance

| | |
|---|---|
| **Client** | Sneha Construction & Developers |
| **Sector** | Residential + commercial civil construction, turnkey builds |
| **Base** | Tumkur (Tumakuru), Karnataka, India |
| **Current site** | https://snehaconstruction.com — WordPress + Elementor 4.1.4, built by Tech Webbed |
| **Visual reference** | https://demo.awaikenthemes.com/renovex/ (structure & rhythm only — see §4) |
| **New stack** | Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Supabase · Vercel |
| **Primary goal** | Turn organic + local search traffic into qualified quote requests and phone calls |
| **Primary KPI** | Quote-form submissions and `tel:` taps per 100 sessions |

### Who this is for

Not architects, and not an international design audience. The visitor is a **family in Tumkur / Gubbi / Kunigal / Sira / Tiptur planning to build a house on a site they already own**, or a local business owner planning a school, clinic or commercial block. They are price-sensitive, trust-driven, mostly on a mid-range Android phone over 4G, and they will decide based on: *does this look like a real company, have they built things near me, what will it cost, and can I call them right now.*

Every design decision below is answerable to that person. If a section does not help them trust, understand cost, or make contact — it does not ship.

---

## 2. Extracted client facts (from the live site — do not invent replacements)

### Identity
- **Legal / display name:** Sneha Construction & Developers
- **Tagline:** *Building Trust, Brick by Brick.*
- **Secondary headline in use:** *Building Trust, One Brick at a Time.*
- **Hero offer:** Build Your Dream Home at Just **₹1875/sq ft**
- **Positioning line:** "We are a leading construction company based in Tumkur, delivering premium-quality residential and commercial projects at affordable prices."
- **Logo asset:** `https://snehaconstruction.com/wp-content/uploads/2021/12/logo-removebg-preview.png` (transparent PNG, low-res)
  - ⚠️ **Open item:** the raw logo pixels could not be sampled programmatically. Before finalising tokens, open the PNG, eyedrop the two or three dominant hexes, and reconcile them with §5.1. If the logo is a different hue family than the palette below, the palette bends to the logo, not the other way round. Also request a vector (SVG/AI/PDF) from the client — the current PNG is a background-removed raster and will look soft on retina.

### Note on the current site's title tag
The live `<title>` reads **"SNEHA ONSTRUCTION & DEVELOPERSI"** — a typo (missing C, stray I) sitting on every page including the homepage. Flag this to the client as a quick win; it is currently what Google shows in results. The new build must not carry it over.

### Contact block (canonical — use verbatim everywhere)
```
Head Office
4th Cross, Vinobanagar,
SS Temple Main Road, BG Patya Circle,
Tumkur – 572101, Karnataka

Phone   +91 80014 80064
Email   info@snehaconstruction.com
Hours   Monday – Saturday, 9:00 AM – 9:00 PM
```
- Normalise the email casing to lowercase `info@snehaconstruction.com` (the live site mixes `Info@Snehaconstruction.com` and `info@Snehaconstruction.com`).
- `tel:` href must be `tel:+918001480064` — no spaces. The live site's `tel:%20+91%2080014%2080064` has a leading encoded space and can fail on some Android dialers. **Fix this.**

### Service areas
Tumkur · Gubbi · Kunigal · Sira · Tiptur & nearby areas.
Treat this as a first-class content axis: it drives local SEO and it is the single strongest trust signal for the audience ("they build near me").

### Social
Facebook, Twitter/X, YouTube are linked in the footer — but **all three currently point at `https://facebook.com`** (placeholder). Do not ship placeholder social links. Either collect the real URLs from the client or omit the icons entirely; a dead social icon costs more trust than an absent one.

### Service taxonomy (three pillars — keep this structure)

**1. Residential Construction**
Duplex Houses · Farmhouses · Bungalows · Villas · Apartments · PGs & Hostels
> *"Strong foundations. Elegant designs. Peaceful living spaces."*

**2. Commercial Construction**
Schools & Colleges · Hotels & Restaurants · Shopping Malls · Office Buildings · Hospitals & Clinics
> *"Perfectly planned commercial spaces built for success."*

**3. Turnkey Construction Solutions**
Site Planning & Layout · 3D Design & Architecture · Foundation & Structure Work · Electrical & Plumbing Installation · Flooring, Painting & Finishing · Quality Checks & Final Inspection
> *"You dream it — we plan, build, and deliver it flawlessly."*

### Materials & Quality (five sub-pages — each has its own URL today, preserve them)

| Category | Promise | Bullet points |
|---|---|---|
| Foundation & Structure | High-quality cement, concrete and steel reinforcement engineered for long-term durability and load stability | Precision in foundation laying · Robust structural framework |
| Walls & Masonry | Top-grade bricks, blocks and plastering with perfect alignment and premium finishing | Neat appearance & durable render · Soundproofing & thermal insulation |
| Electrical & Plumbing | Safe, efficient wiring and long-lasting plumbing for proper flow and safety compliance | Quality fittings & earthing · PVC/CPVC piping, leak-proof systems |
| Interiors & Finishing | Smooth wall finishes, premium paints and tiles, interiors crafted for comfort and elegance | Premium paints & floor finishes · Attention to every last detail |
| Roofing & Waterproofing | Leak-proof, heat-resistant roofing with reinforced slabs and superior waterproofing | Advanced waterproof membranes · Heat-resistant durable roofing |

This section is the client's real differentiator and it is buried on the current site. **Promote it.** For a first-time home builder, "what materials go into my house" is the highest-anxiety question and nobody local answers it well.

### Brand vision (as stated)
> Every building begins with a dream. Based in Tumkur, we deliver residential and commercial projects with professionalism and precision — from duplex houses to villas, apartments, schools, offices and shopping complexes. Our engineers, architects and craftsmen hold every project to the highest standards of quality, safety and design. We use only premium materials, keep pricing transparent, and deliver on time. We don't just construct buildings — we build trust, relationships and lasting value.

Four pillars distilled from that, to be used as the site's recurring proof spine:
**Premium materials · Transparent pricing · On-time delivery · In-house engineers & architects**

### Existing image assets (re-usable, but re-shoot recommended)
`s1.webp` `s2.webp` `s3.webp` `1.webp` `2.webp` `3.webp` `abs2.webp` `contact-image.png` — all under `/wp-content/uploads/2025/10/`.
These are low-resolution and generic. **Ask the client for real site photography**: completed handovers, work in progress, the team on site, and the owner with clients. Real Tumkur buildings beat stock renders for this audience by a wide margin. Until then, use what exists at reduced crop sizes rather than substituting foreign stock architecture (which is exactly what makes the reference theme feel like a template).

---

## 3. Reference analysis — Renovex (`demo.awaikenthemes.com/renovex`)

What the reference actually does, section by section, from the supplied screenshots:

**Header** — Sticky, transparent over the hero, logo left, centred nav with dropdown carets on Home/Pages, a high-contrast pill CTA ("Get In Touch") with a square dark arrow chip on the right.

**Hero** — Full-bleed architectural photograph, dark scrim, left-aligned copy stack: small dot-prefixed eyebrow → 3-line display headline → 2-line supporting paragraph → primary pill button + circular play button. A rotating circular "25+ Years Experience" badge sits mid-right. Three cards overlap the hero's bottom edge and break into the next section: a light editorial card with a tag pill, a full-bleed image card, and a dark stat card ("15K+ Happy Satisfied Customers") with an avatar cluster.

**Services** — Off-white section. Centred eyebrow + 2-line centred heading. Four equal cards, each: title left / large numeral right (`01.` `02.` ...), hairline rule, short description, then an image filling the lower two-thirds. Below: a row of pill tags, then a small centred CTA line with a highlighted "Free" chip and an underlined link.

**Video band** — Full-bleed image, dark scrim, centred eyebrow + centred 2-line heading, centred circular play button with rotating "Watch Our Story" text ring.

**Pricing** — Near-black section with a faint chevron pattern. Three cards; the middle one is inverted to solid accent yellow and carries a "Most Popular" chip. Each: icon chip, plan name, large price + `/Project`, "What's Included" list with square bullets, full-width CTA button with a dark arrow chip. Below: three reassurance items with icons.

**Blog** — White section, centred heading, three image cards with a category chip top-left and a gradient-scrimmed bottom holding date, title and a "Read More" link with a circular arrow chip.

**Marquee** — Full-width yellow scrolling strip of service keywords separated by asterisk glyphs.

**CTA band** — Full-bleed image, left-aligned heading + paragraph, two icon-and-label feature blocks, then a yellow "Call Us: +(123) 456-789" pill with a dark arrow chip.

**Footer** — Dark image-backed. Four columns: logo + working-hours table (label left, value right, hairline separated); Contact Information; Get In Touch (phone/email with icons); Newsletter with an inline arrow-chip submit. Then a divider, a "Follow On Socials" row of labelled chips, another divider, and a bottom bar with mini-nav left and copyright right.

**Recurring motifs**
Single small accent dot as an eyebrow prefix · a tiny floating accent dot at the top-left of nearly every section · arrow glyphs enclosed in square chips inside buttons · rotating circular text badges · centred headings for content sections and left-aligned for hero/CTA · 8–12px card radii · consistent accent-on-dark and dark-on-accent inversion for emphasis.

---

## 4. Differentiation contract — what we take, what we change

The client's instruction is explicit: **must not read as a copy of Renovex.** The rule we apply is *keep the skeleton, replace the skin and the voice.*

### Keep (structure — these are sound conversion patterns, not IP)
- Sticky transparent-over-hero header with a single high-contrast CTA
- Full-bleed hero with left-aligned copy stack over a photograph
- Cards that overlap the hero/section boundary to create depth
- Alternating light / dark section rhythm down the page
- A full-bleed CTA band with a phone-number button
- Multi-column dark footer with working hours, contact, and a bottom bar
- Scrolling keyword marquee as a section divider

### Change (everything that carries the reference's identity)

| Renovex | Sneha | Why |
|---|---|---|
| Lemon yellow `#FFD200` on pure black | **Red oxide `#A63A22` on blueprint navy `#101826`** | Yellow-on-black is the single most recognisable thing about the reference and also the most generic "construction site" cliché. Red oxide is the colour of traditional Karnataka flooring and of laterite brick — locally true, and it reads warmer and more residential. |
| Geometric grotesque throughout | **Bricolage Grotesque (display) + Instrument Sans (body)** | Bricolage has real width and optical-size axes; used at heavy widths for headlines it feels structural and built rather than corporate. |
| `01. 02. 03.` numerals on a services grid | Numerals only on the **build process timeline**, where the content genuinely is a sequence | Numbering non-sequential content is decoration. Our four services are not steps. |
| Three-tier "Pricing Plans" cards ($1999 / $2999 / $4999) | **Interactive build cost estimator** anchored on the real ₹1875/sq ft rate | The client's construction pricing is per-square-foot and site-dependent; fake tiers would be dishonest and would not survive a client review. The calculator is also our one bold element (§6). |
| Rotating circular text badges, floating accent dots everywhere | **Blueprint linework**: hairline grid rules, dimension-line brackets, and section corner ticks drawn in 1px | Draws from the client's own drawings rather than the theme's decoration vocabulary. |
| Arrow glyph inside a square chip on every button | Plain buttons; arrow reserved for the **one** primary CTA per viewport | The square-arrow-chip is the reference's most copyable tell. |
| ALL-CAPS tracked eyebrow above every heading | Sentence-case eyebrows, and only where they add information (e.g. a location, a year, a count) | |
| Stock international architecture photography | Real Tumkur project photography, cropped tight | |
| English-only | **English primary, Kannada for key CTAs and the location block** | Nothing signals "local, real, ours" faster to this audience. |

### The one-line test
If a screenshot of any section could be dropped into the Renovex demo without looking out of place, that section is wrong. Rebuild it.

---

## 5. Design system

### 5.1 Colour

Concept: **red oxide floors, lime plaster walls, blueprint ink.** Three materials from the client's own trade.

```css
/* app/globals.css — @theme block for Tailwind v4 */
@theme {
  /* Accent — red oxide */
  --color-oxide-50:  #FBEDE9;
  --color-oxide-100: #F4D5CB;
  --color-oxide-300: #DC8B72;
  --color-oxide-500: #C24A2C;   /* hover / lighter accent */
  --color-oxide-600: #A63A22;   /* PRIMARY accent */
  --color-oxide-700: #862D19;   /* pressed */
  --color-oxide-900: #4A1A0E;

  /* Dark surface — blueprint ink */
  --color-ink-950: #0A101B;     /* deepest, footer */
  --color-ink-900: #101826;     /* primary dark section */
  --color-ink-800: #16202F;
  --color-ink-700: #1D283A;     /* raised cards on dark */
  --color-ink-600: #2A374B;     /* hairlines on dark */

  /* Light surface — lime plaster */
  --color-plaster-50:  #FAFAF8;
  --color-plaster-100: #F3F2EE;  /* PRIMARY light section */
  --color-plaster-200: #E7E5DE;  /* hairlines on light */
  --color-plaster-300: #D5D2C8;

  /* Text */
  --color-slate-900: #131A24;   /* body text on light */
  --color-slate-600: #5A6472;   /* secondary text */
  --color-slate-400: #8C95A3;   /* tertiary / meta */

  /* Support */
  --color-brass-500: #B8873F;   /* rare: certifications, awards */
  --color-success:   #2E7D5B;
  --color-danger:    #B3261E;
}
```

**Usage rules**
- Oxide is an **accent, not a background**. Ceiling: roughly 8% of any viewport. Solid oxide fills are permitted on primary buttons, the estimator's active state, and exactly one full-bleed band per page.
- Never place oxide text on ink — the contrast fails. On dark surfaces, use `oxide-300` for text and `oxide-600` only for fills with white text on top.
- No pure `#000` and no pure `#FFF` for large surfaces. Ink and plaster carry every backdrop.
- Only one gradient exists in the system: the bottom scrim on photographic cards, `linear-gradient(to top, rgb(10 16 27 / 0.92) 0%, rgb(10 16 27 / 0.55) 35%, transparent 70%)`. No decorative gradient washes anywhere else.
- Dark mode is **out of scope**. The page already alternates light and dark by section; a theme toggle adds surface area with no benefit for this audience.

**Contrast floor:** every text/background pair must clear WCAG AA (4.5:1 body, 3:1 for ≥24px). `slate-600` on `plaster-100` and white on `oxide-600` both pass; verify anything new.

### 5.2 Typography

```
Primary    Space Grotesk   (variable: wght 300–700)   headlines + main reading text
Secondary  DM Sans         (variable: wght 100–1000)  UI chrome: meta, buttons, nav, labels
Kannada    Noto Sans Kannada  (subset, only for the phrases that need it)
```

Load via `next/font/google` with `display: 'swap'`, `preload: true` on Space Grotesk only, and `subsets: ['latin']` (+ `['kannada']` for Noto). Self-hosting through `next/font` is mandatory — no `<link>` to Google's CDN.

Space Grotesk is a **single-axis** variable font — wght only, no wdth. The type-scale rows below therefore set `font-weight` and never `font-variation-settings`; naming a `wdth` axis the file does not carry is silently ignored. Its 700 ceiling is the display weight.

The split is by role, not by size: everything the visitor *reads* is Space Grotesk, and DM Sans carries the interface around it. Buttons set the secondary face on the component rather than per size row, so a `sm` and an `lg` button never differ in typeface.

**Type scale** (1.25 minor third from 16px, clamped for fluid response):

| Token | Size | Family / weight | Use |
|---|---|---|---|
| `display-1` | `clamp(2.75rem, 6vw, 5.25rem)` | Space Grotesk 700, tracking -0.03em, leading 0.95 | Hero headline only |
| `display-2` | `clamp(2rem, 4vw, 3.25rem)` | Space Grotesk 600, tracking -0.02em, leading 1.05 | Section headings |
| `heading-3` | `clamp(1.375rem, 2vw, 1.75rem)` | Space Grotesk 600, leading 1.2 | Card titles, sub-sections |
| `heading-4` | `1.125rem` | Space Grotesk 600 | Small card titles, form legends |
| `body-lg` | `1.125rem / 1.65` | Space Grotesk 400 | Hero support, section intros |
| `body` | `1rem / 1.7` | Space Grotesk 400 | Default |
| `body-sm` | `0.875rem / 1.6` | Space Grotesk 400 | Captions, list items |
| `meta` | `0.8125rem / 1.4` | DM Sans 500, tracking 0.01em | Dates, labels, table headers |
| `numeral` | `clamp(2.5rem, 5vw, 4rem)` | Space Grotesk 700, tabular-nums | Stats, estimator output, ₹ figures |

**Rules**
- Max measure 68ch for body copy; 22ch for display headlines (forces the deliberate 2–3 line break).
- Never accent a single word inside a headline with colour, italics or a different weight. If a headline needs emphasis, restructure the sentence.
- Sentence case for everything including buttons and eyebrows. No tracked-out all-caps labels.
- `font-variant-numeric: tabular-nums` on every price, area, year and count so figures don't jitter during the estimator animation.
- Kannada strings sit at 1.05× the Latin size to optically match.

### 5.3 Spacing, radius, elevation

- **Spacing scale:** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160 px (Tailwind defaults are fine; stay on the scale).
- **Section rhythm:** `py-24 md:py-32 lg:py-40`. Bands that follow an overlapping card get `pt-40 lg:pt-56`.
- **Container:** `max-w-[1240px]`, gutters `px-5 md:px-8 lg:px-12`. One deliberate full-bleed break per two sections at most.
- **Grid:** 12-column, `gap-6 lg:gap-8`.
- **Radius — hierarchy carries meaning, do not use one value everywhere:**
  - `0px` — hairline rules, dividers, blueprint linework, table cells
  - `2px` — inputs, small chips, tags
  - `6px` — buttons
  - `12px` — cards, image containers
  - `999px` — only the WhatsApp float and avatar clusters
- **Elevation:** shadows are rare. Cards on light surfaces use a `1px solid plaster-200` border, not a shadow. Only two shadows exist:
  - `--shadow-lift: 0 12px 32px -8px rgb(19 26 36 / 0.14)` — cards overlapping a section boundary
  - `--shadow-sticky: 0 1px 0 0 rgb(19 26 36 / 0.08)` — the header once scrolled
- **Blueprint linework** (our signature decoration): 1px lines at `plaster-300` on light / `ink-600` on dark. Used as: corner tick marks on feature cards, dimension brackets around the estimator output, and a 96px-pitch faint grid behind the process timeline only. Never more than one instance per section.

### 5.4 Iconography & imagery
- **Icons:** Lucide React, 1.5px stroke, 20px default / 24px in feature blocks. No filled icons, no duotone, no icon-in-a-coloured-square chips (reference tell).
- **Photography:** always 4:3 or 3:2, never square. Crop tight on material and texture — brickwork, formwork, a finished stair, a handover. Faces of the actual team where available. Every image gets a descriptive alt describing the building and its location ("Completed 3BHK duplex at Gubbi, front elevation").
- **Image pipeline:** `next/image` with AVIF then WebP, `sizes` set per breakpoint, `priority` only on the hero, and a 12px blurred `placeholder="blur"` from a generated blurDataURL.

---

## 6. Motion

Motion intensity is **balanced — conversion first**, per the client's decision. Motion supports comprehension; it never gates content.

### Global rules
- **`prefers-reduced-motion: reduce` disables every non-essential animation.** Wrap in a `useReducedMotion()` hook and short-circuit variants; the reduced path must still show all content in final position.
- No animation delays the LCP element. The hero headline renders in its final position on first paint — only the supporting elements sequence in.
- Nothing animates on scroll-up. `viewport={{ once: true, amount: 0.3 }}` on every scroll-triggered variant.
- Total budget: **one orchestrated page-load sequence + one signature interaction per page.** Scattered fade-and-slide-up on every section is exactly the generic default we are avoiding.

### The one orchestrated moment — hero load
A single staggered reveal, 520ms total, `ease: [0.22, 1, 0.36, 1]`:
1. Photograph scrim lifts from 100% → 55% opacity (0–300ms)
2. Headline mask-reveals line by line, 60ms stagger, `clip-path: inset(0 0 100% 0)` → `inset(0)`
3. Support paragraph + buttons fade in together at 240ms
4. The overlapping stat cards rise 24px into place at 320ms, 80ms stagger

That is the whole page-load animation. No other section gets an entrance of its own beyond a plain 200ms opacity fade.

### The signature interaction — build cost estimator
This is where the boldness is spent. When the visitor drags the area slider:
- The ₹ figure counts with a spring (`stiffness: 180, damping: 26`), tabular numerals so nothing reflows
- A blueprint dimension bracket redraws its width to match the plot, with the sq-ft label sliding along it
- The per-stage cost breakdown bars re-length with a 40ms stagger

It must remain fully usable via keyboard (arrow keys on the slider, a number input as an equal-status alternative) and must produce a correct figure with JS motion disabled.

### Everything else
- **Header:** background fades from transparent to `ink-900/95` + backdrop-blur between 0 and 80px scroll. Transform only, no layout shift.
- **Marquee:** CSS `@keyframes` translate, `will-change: transform`, pauses on hover and on reduced-motion.
- **Buttons/cards:** 150ms `background-color` and `border-color` only. No lift, no scale, no shadow bloom on hover — that transition on every card is a generated-page tell.
- **Page transitions:** none. They cost perceived speed and this audience is on slow connections.
- **Lenis smooth scroll:** optional, and only if it measures clean on a mid-range Android. If it costs more than 8ms of INP, drop it. Disable entirely under reduced-motion.

Framer Motion import discipline: use `motion/react` lazy features (`domAnimation`) via `LazyMotion` so the full bundle never ships. Client components only where motion actually lives — the page shells stay server components.

---

## 7. Information architecture

```
/                          Home
/about                     About — story, pillars, team, service area map
/services                  Services overview
  /services/residential
  /services/commercial
  /services/turnkey
/materials                 Materials & Quality overview
  /materials/foundation-structure
  /materials/walls-masonry
  /materials/electrical-plumbing
  /materials/interiors-finishing
  /materials/roofing-waterproofing
/projects                  Portfolio grid, filterable by type + location
  /projects/[slug]         Case study
/estimate                  Build cost estimator (also embedded on home)
/contact                   Contact + form + map
/areas/[slug]              Location landing pages: tumkur, gubbi, kunigal, sira, tiptur
/privacy-policy
/terms
```

**Redirects from the WordPress site (301, in `next.config.ts`) — required, these URLs have accrued index equity:**
```
/about-us/               → /about
/services/               → /services
/materials-quality/      → /materials
/foundation-structure/   → /materials/foundation-structure
/walls-masonry/          → /materials/walls-masonry
/electrical-plumbing/    → /materials/electrical-plumbing
/interiors-finishing/    → /materials/interiors-finishing
/roofing-waterproofing/  → /materials/roofing-waterproofing
/projects/               → /projects
/contact-us/             → /contact
```
Also catch and 301 the `/wp-content/*`, `/wp-admin/*` and `/?p=` patterns to `/` to stop 404 noise.

---

## 8. Home page — section-by-section spec

Each block lists intent, layout, and the copy direction. Copy is a starting draft; run final wording past the client.

### 8.1 Header
Sticky, transparent over the hero, condenses to `ink-900/95` + blur after 80px.
Left: logo (SVG once supplied) at 40px height. Centre: Home · About · Services ▾ · Materials ▾ · Projects · Contact. Right: phone number as text (`+91 80014 80064`) followed by a solid oxide "Get a free quote" button.
Mobile: logo left, a persistent oxide **call** button and a hamburger right. The drawer is full-screen, ink-900, with the nav at `heading-3` size and the phone number and address pinned to the bottom.
The phone number stays visible at every breakpoint. It is the highest-intent action on the site.

### 8.2 Hero
Full-bleed photograph of a completed Sneha home (not a render), ink scrim at 55%.
Left-aligned stack, `max-w-[22ch]` on the headline:

> **Homes built to last, in Tumkur since day one.**
> Residential, commercial and complete turnkey construction across Tumkur, Gubbi, Kunigal, Sira and Tiptur — premium materials, transparent pricing, delivered on time.
> [ Get a free quote ] [ Call +91 80014 80064 ]

No rotating badge. No play button (the client has no story video; do not build UI for content that does not exist).

**Overlapping cards** breaking the hero's lower edge — three, on a 12-col grid (5/3/4):
1. **Rate card (light, plaster-100):** "From ₹1875 / sq ft" as `numeral`, sub-line "All-inclusive turnkey rate — see what's included", link to `/estimate`. This is the offer the whole business runs on; it gets the most prominent card.
2. **Image card:** a tight crop of finished brickwork or a stair detail, no text.
3. **Proof card (ink-900):** three stacked figures with hairline separators — years in business, projects delivered, towns served. **Get real numbers from the client before building this.** Do not ship invented counts; if the client cannot supply them, replace this card with the four-pillar list instead.

### 8.3 Trust strip
A single quiet row on plaster-100, hairline top and bottom: the four pillars as text with a 20px Lucide icon each — Premium materials · Transparent pricing · On-time delivery · In-house engineers & architects. No cards, no boxes.

### 8.4 What we build (services)
Plaster-100. Left-aligned heading (not centred — a deliberate departure from the reference's centred rhythm), with a short intro at `body-lg` in the right column.

Three cards, not four, matching the real taxonomy. Each: a 3:2 image, title at `heading-3`, one-line promise, then the sub-services as a plain comma-run in `body-sm` rather than a bulleted list (denser, less template-like), then a text link "See residential work →" pointing at the filtered projects grid.
No numerals on these cards.

### 8.5 How we build (process timeline)
Ink-900 with the faint blueprint grid. **This is where numerals belong** — it is a genuine sequence.
Six steps drawn as a horizontal timeline on desktop (a vertical rail on mobile), connected by a 1px `ink-600` line: Site visit & planning → 3D design & approvals → Foundation & structure → Electrical & plumbing → Finishing & interiors → Quality check & handover.
Each step: numeral in `oxide-300`, title, one sentence. The line between steps draws in on scroll (single `pathLength` animation, once).

### 8.6 Build cost estimator ⭐
The page's centrepiece. Plaster-50, blueprint dimension brackets framing the output.

Inputs: built-up area (slider 600–6000 sq ft + number input), floors (G / G+1 / G+2 / G+3), package (Essential / Premium / Luxury), location (the five towns).
Output: a total range in ₹, the effective per-sq-ft rate, and a stage-wise breakdown (foundation, structure, masonry, electrical & plumbing, finishing, external works) as horizontal bars.

Rate configuration lives in Supabase (`estimator_rates`), never hardcoded — the client must be able to revise rates without a deploy. Anchor the Essential package at the advertised ₹1875/sq ft.

Below the result: "Get this estimate on WhatsApp" and "Book a free site visit", both of which capture the lead with the estimate payload attached. **Always show a range, never a single figure, and carry a plain-language note that the final quote depends on soil, site access and design.** Overpromising here creates a dispute at handover — flag this framing to the client explicitly.

### 8.7 Materials & quality
Ink-900. The five categories in an asymmetric layout (two large, three small) rather than an even grid. Each: category name, the promise line, two bullets, "Read more" to its sub-page.
Heading direction: *"Ask what goes into the walls. We'll tell you."*

### 8.8 Recent projects
Plaster-100. Filter chips by type (Residential / Commercial / Turnkey) and by town. A three-column masonry-ish grid; each card is an image with a bottom scrim carrying town, type and a one-line title.
Empty state, if the client has not supplied projects yet: a single honest panel — "Project gallery coming soon. Call us to visit a site in person." — not skeleton placeholders.

### 8.9 Testimonials
Plaster-50. Two or three at most, as plain typeset quotes with a name, town and project type. No carousel, no star graphics, no stock avatars. If the client has fewer than two real testimonials, cut the section rather than filling it.

### 8.10 Service area
Ink-900, split layout. Left: a simple SVG map of Tumkur district with the five towns marked and linked to their `/areas/[slug]` pages. Right: the address block, working hours, phone, email, and a Kannada line ("ತುಮಕೂರು ಮತ್ತು ಸುತ್ತಮುತ್ತ" — get this proofread by the client, do not ship machine-translated Kannada).

### 8.11 Marquee
Full-width oxide-600 band, white text, scrolling. Keywords: Duplex houses · Villas · Farmhouses · Apartments · Schools · Hospitals · Office buildings · Turnkey construction. Separator is a 1px vertical rule, not an asterisk glyph.

### 8.12 CTA band
Full-bleed photo, ink scrim. Left-aligned: *"Planning to build this year? Let's start with a free site visit."* Support line, then the oxide phone button and a secondary ghost "Send us your plot details".

### 8.13 Footer
Ink-950, flat colour (no background photograph — that is a reference tell and it costs a needless image request).
Four columns: logo + positioning line + the ₹1875/sq ft line · Quick links · Materials & Quality links · Contact block with address, phone, email, hours.
Then a hairline, then the bottom bar: copyright left, privacy/terms right.
Social icons only if real URLs are supplied. Newsletter signup is **cut** — a local construction firm has no newsletter and an unused form is a trust leak.

### 8.14 Persistent mobile action bar
Below 768px, a fixed bottom bar (ink-900, hairline top): **Call** · **WhatsApp** · **Get quote**. It is the single highest-leverage conversion element on the site for this audience. Respect safe-area insets.

---

## 9. Tech stack & conventions

### Stack
```
next@15            App Router, React Server Components by default
typescript@5       strict: true, no `any`, no non-null assertions
tailwindcss@4      CSS-first config via @theme, no tailwind.config.js
framer-motion@12   imported as `motion/react`, wrapped in LazyMotion
@supabase/ssr      cookie-based auth, server + browser clients
zod                every form and every env var
react-hook-form    all forms
lucide-react       icons
next/font          Bricolage Grotesque, Instrument Sans, Noto Sans Kannada
resend             transactional email for lead notifications
```
Deliberately **not** used: GSAP, Three.js, Lenis-by-default, any UI kit, any carousel library, any animation library beyond Framer Motion. Each would need to earn its bytes against a 4G Android budget.

### Structure
```
src/
  app/
    (marketing)/            route group, shared marketing layout
      page.tsx
      about/page.tsx
      services/[slug]/page.tsx
      materials/[slug]/page.tsx
      projects/page.tsx
      projects/[slug]/page.tsx
      areas/[slug]/page.tsx
      estimate/page.tsx
      contact/page.tsx
    api/
      leads/route.ts        POST, rate-limited, server-side validated
      revalidate/route.ts   Supabase webhook → revalidateTag
    layout.tsx
    globals.css             @theme tokens live here
    sitemap.ts
    robots.ts
    opengraph-image.tsx
  components/
    layout/                 Header, Footer, MobileActionBar, Container
    sections/               Hero, Services, Process, Estimator, Materials, ...
    ui/                     Button, Input, Select, Slider, Card, Chip, Rule
    motion/                 MotionProvider, RevealText, CountUp, useReducedMotion
  lib/
    supabase/               client.ts, server.ts, admin.ts, types.ts (generated)
    estimator/              rates.ts, calculate.ts, calculate.test.ts
    validation/             schemas.ts (zod)
    seo/                    metadata.ts, jsonld.ts
    utils/                  cn.ts, format.ts (₹ + sq ft formatters)
  content/                  static copy that isn't client-editable
```

### Conventions
- Server Components by default. `'use client'` only on: the estimator, the header scroll state, the mobile drawer, forms, and the marquee. If a component has no state, no effect and no handler, it does not get the directive.
- No `useEffect` for data fetching. Server components fetch; client components receive props.
- Tailwind classes only — no CSS modules, no `styled-jsx`, no inline `style` except for dynamic transforms and CSS custom properties.
- Every colour, size and radius comes from a token. A raw hex or a magic pixel value in a component is a review blocker.
- Currency formatting through one helper: `formatINR(n)` producing Indian digit grouping (₹18,75,000 not ₹1,875,000). This matters — Western grouping reads as foreign to the audience.
- Commits: conventional commits. Branch per section during the build phase.
- `pnpm` as the package manager.

---

## 10. Supabase

### Tables

```sql
-- Content ---------------------------------------------------------------
create table services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  category text not null check (category in ('residential','commercial','turnkey')),
  promise text not null,
  description text,
  sub_services text[] default '{}',
  hero_image_path text,
  sort_order int default 0,
  is_published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table material_categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  promise text not null,
  body text,
  highlights text[] default '{}',
  image_path text,
  sort_order int default 0,
  is_published boolean default false
);

create table projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  project_type text not null check (project_type in ('residential','commercial','turnkey')),
  building_type text,                       -- 'duplex','villa','school',...
  location text not null,                   -- 'Tumkur','Gubbi',...
  built_up_area_sqft int,
  floors text,                              -- 'G+1'
  year_completed int,
  summary text,
  body text,
  cover_image_path text,
  is_featured boolean default false,
  is_published boolean default false,
  created_at timestamptz default now()
);

create table project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade,
  image_path text not null,
  alt_text text not null,
  caption text,
  sort_order int default 0
);

create table testimonials (
  id uuid primary key default gen_random_uuid(),
  author_name text not null,
  location text,
  project_type text,
  quote text not null,
  is_published boolean default false,
  sort_order int default 0
);

create table service_areas (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  intro text,
  is_published boolean default true
);

create table faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  topic text,
  sort_order int default 0,
  is_published boolean default false
);

create table site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz default now()
);
-- seeded with: phone, whatsapp, email, address, hours, base_rate_sqft, social urls

-- Estimator -------------------------------------------------------------
create table estimator_rates (
  id uuid primary key default gen_random_uuid(),
  package text not null check (package in ('essential','premium','luxury')),
  base_rate_sqft numeric not null,          -- essential seeds at 1875
  location text,                            -- null = default for all towns
  location_multiplier numeric default 1.0,
  floor_multiplier jsonb not null,          -- {"G":1.0,"G+1":1.03,...}
  stage_breakdown jsonb not null,           -- {"foundation":0.15,...} must sum to 1
  effective_from date default current_date,
  is_active boolean default true
);

-- Leads -----------------------------------------------------------------
create table leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text,
  service_type text,                        -- matches the live form's options
  location text,
  message text,
  source text not null default 'contact',   -- 'contact'|'estimator'|'quote'|'area-page'
  estimate_payload jsonb,                   -- area, floors, package, computed range
  page_path text,
  status text default 'new' check (status in ('new','contacted','quoted','won','lost')),
  internal_notes text,
  created_at timestamptz default now()
);
create index leads_created_at_idx on leads (created_at desc);
create index leads_status_idx on leads (status);
```

### RLS

Enable RLS on every table. No exceptions.

```sql
-- Published content: anonymous read only
alter table services enable row level security;
create policy "public reads published services"
  on services for select to anon, authenticated
  using (is_published = true);
-- repeat the same shape for material_categories, projects, project_images,
-- testimonials, service_areas, faqs

alter table estimator_rates enable row level security;
create policy "public reads active rates"
  on estimator_rates for select to anon, authenticated
  using (is_active = true);

-- Leads: nobody reads them from the client, ever.
alter table leads enable row level security;
-- NO select policy for anon or authenticated.
-- NO insert policy for anon either — inserts go through the service-role
-- key inside /api/leads only, after server-side zod validation and rate
-- limiting. Never expose an anon insert path on this table; it will be
-- found and spammed.

-- Admin: an `admins` table keyed on auth.uid() gates all write policies.
```

### Storage
Bucket `media`, public read, service-role write. Paths: `projects/<slug>/<uuid>.webp`, `services/`, `materials/`, `brand/`.
Upload originals at ≤2400px on the long edge. Serve through `next/image` with the Supabase loader; add the Supabase hostname to `next.config.ts` `images.remotePatterns`.

### Caching & revalidation
Fetch content in server components with `unstable_cache` tagged per entity (`projects`, `services`, `materials`, `settings`). A Supabase database webhook hits `/api/revalidate` with a shared secret on insert/update/delete and calls `revalidateTag`. Content is therefore statically served and still updates within seconds of an edit.

### Environment
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY      # server only — never referenced in a client component
RESEND_API_KEY
LEAD_NOTIFY_EMAIL              # client's inbox
REVALIDATE_SECRET
NEXT_PUBLIC_SITE_URL
```
Validate all of these through a zod schema in `lib/env.ts` that runs at module load, so a missing key fails the build rather than the request.

---

## 11. Forms & lead handling

- Fields on the main form mirror the existing site so the client's process doesn't change: Full name* · Phone* · Email · Service type (Residential / Commercial / Turnkey / Site visit request / General enquiry) · Message.
- Phone is the required field, not email — this audience calls. Validate as an Indian mobile: `/^(\+91[\s-]?)?[6-9]\d{9}$/`.
- Client-side validation with react-hook-form + zod; the **same** zod schema re-validates on the server. Never trust the client copy.
- Honeypot field plus a timing check (submissions under 2 seconds are dropped) instead of a CAPTCHA — CAPTCHAs cost conversions and this traffic volume does not warrant one.
- Rate limit `/api/leads` per IP (5 per 10 minutes).
- On success: insert to `leads`, fire a Resend notification to the client's inbox with the full payload, and show an inline success state that repeats the phone number ("We'll call you within one working day. In a hurry? Call +91 80014 80064.").
- Error copy states what happened and what to do: "Couldn't send that — check your phone number, or call us on +91 80014 80064." No apologies, no vagueness.
- WhatsApp deep link: `https://wa.me/918001480064?text=<prefilled>` with the estimate summary URL-encoded when it comes from the estimator.

---

## 12. SEO

- Per-route `generateMetadata` with unique title and description. Title pattern: `<Page> | Sneha Construction & Developers, Tumkur`.
- **JSON-LD:**
  - `LocalBusiness` / `GeneralContractor` on the homepage with `name`, `address` (full postal), `telephone`, `email`, `openingHours` (Mo-Sa 09:00-21:00), `areaServed` (the five towns), `priceRange`, `geo`.
  - `Service` on each service page, `FAQPage` where FAQs exist, `BreadcrumbList` sitewide, `ImageObject` on project galleries.
- `app/sitemap.ts` generating from Supabase published rows; `app/robots.ts` allowing all and pointing at the sitemap.
- Location pages (`/areas/[slug]`) carry genuinely distinct content per town — local projects, local context, the towns they border. Do not spin one template with the town name swapped; that is a thin-content pattern and it will not rank.
- Canonical on every page. Decide `www` vs apex once and 301 the other.
- Open Graph images generated per route with `opengraph-image.tsx` using the brand type and colours.
- Set up Google Business Profile alignment: the NAP on the site must match GBP character for character.

---

## 13. Performance & accessibility budget

**Targets (mobile, Moto G Power class, 4G throttle):**
| Metric | Target |
|---|---|
| LCP | < 2.0s |
| INP | < 200ms |
| CLS | < 0.05 |
| First-load JS (home) | < 130 KB gzipped |
| Lighthouse Performance | ≥ 92 |
| Lighthouse Accessibility | 100 |

**How we hold it**
- Hero image: `priority`, AVIF, correct `sizes`, explicit width/height. It is the LCP element and nothing may animate it into place.
- Fonts self-hosted via `next/font` with `size-adjust` fallbacks to prevent CLS on swap.
- `LazyMotion` + `domAnimation` so Framer ships ~5KB rather than ~35KB.
- The estimator is `next/dynamic` with `ssr: true` but a lightweight loading state, so it never blocks the hero.
- No third-party scripts above the fold. Analytics loads with `strategy="afterInteractive"`.
- Run `@next/bundle-analyzer` before every deploy to main.

**Accessibility floor (non-negotiable)**
- Semantic landmarks: one `<h1>` per page, correct heading order, `<nav>` / `<main>` / `<footer>`.
- Visible focus ring on every interactive element: `2px solid oxide-600` with a `2px` offset (`oxide-300` on dark surfaces).
- Full keyboard operation, including the estimator slider and the mobile drawer (focus trap, Escape closes, focus returns to the trigger).
- All images have meaningful alt text; decorative blueprint linework is `aria-hidden`.
- Form labels are real `<label>` elements, never placeholder-only. Errors are `aria-live="polite"` and referenced by `aria-describedby`.
- Touch targets ≥ 44×44px.
- `prefers-reduced-motion` fully honoured.

---

## 14. Build phases

**Phase 0 — Client inputs (blocking; chase these first)**
Vector logo · real project photography · actual years-in-business and project count · genuine testimonials · real social URLs · confirmation of the ₹1875 rate structure and package tiers · Kannada strings proofread · Google Maps embed coordinates for the office.
Until these land, build with clearly marked placeholders and never invent a statistic.

**Phase 1 — Foundation**
Next.js 15 scaffold, TypeScript strict, Tailwind v4 `@theme` tokens, fonts, `lib/utils`, Button/Input/Container/Rule primitives, Header, Footer, MobileActionBar. Deploy a skeleton to Vercel on day one so the client can watch it grow.

**Phase 2 — Supabase**
Schema migrations, RLS policies, seed data from §2, generated types, server/browser clients, storage bucket, revalidation webhook.

**Phase 3 — Home**
Sections 8.1 → 8.14 in order, each reviewed against §4's one-line test before moving on.

**Phase 4 — Estimator**
Pure calculation module first with unit tests, then the UI, then the lead capture. This is the highest-risk piece; give it its own review.

**Phase 5 — Inner pages**
Services, materials (5), projects + case studies, about, contact, area pages (5).

**Phase 6 — Leads, SEO, polish**
API route, Resend, rate limiting, JSON-LD, sitemap, redirects, OG images.

**Phase 7 — QA & launch**
Lighthouse on throttled mobile, axe-core pass, keyboard-only walkthrough, real-device check on a mid-range Android, form end-to-end test, 301 verification, then DNS cutover with the WordPress site kept live at a temporary subdomain for a week as a rollback.

---

## 15. Review checklist (run before any section is called done)

- [ ] Could this section be dropped into the Renovex demo unnoticed? If yes, rebuild it.
- [ ] Every colour, size, radius from a token — no raw hex, no magic numbers.
- [ ] Does anything here help the visitor trust, understand cost, or make contact? If not, cut it.
- [ ] Are all statistics, testimonials and images real, or clearly marked as placeholder?
- [ ] Keyboard-operable, visible focus, reduced-motion path shows all content.
- [ ] Contrast checked against §5.1.
- [ ] Phone number reachable within one tap from this viewport.
- [ ] Copy in sentence case, active voice, no filler, ₹ figures in Indian grouping.
- [ ] No entrance animation on the LCP element; no hover lift on cards.
- [ ] `'use client'` present only where state, effects or handlers actually exist.
