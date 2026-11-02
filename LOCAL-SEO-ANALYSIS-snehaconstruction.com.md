# Local SEO analysis: Sneha Construction & Developers

**Audited:** 2 November 2026
**What was checked:** the new build (not yet live on the domain), the live WordPress site at snehaconstruction.com, and public web search

## Local SEO score: 33/100 (estimate)

The website itself is in reasonable shape. The score is low because the signals outside the website are missing or unverified: Google listing, reviews, directories and links. Most of the gain comes from work only the client can do.

| Dimension | Weight | Score | Points | Main reason |
|---|---|---|---|---|
| Google Business Profile | 25% | 20/100 | 5 | No listing found or linked, and the map pin is approximate |
| Reviews and reputation | 20% | 10/100 | 2 | No real reviews found, and the site's testimonials are placeholders |
| Local on-page | 20% | 65/100 | 13 | Good service pages and contact details, but no town pages and few local H1s |
| Name, address, phone consistency | 15% | 35/100 | 5 | Address spelling and hours differ between sources |
| Local schema | 10% | 70/100 | 7 | Correct type, but approximate location and no profile links |
| Local links and authority | 10% | 10/100 | 1 | No local authority signals found |
| **Total** | | | **33** | |

**Business type:** hybrid, with a physical head office plus service in five towns.
**Vertical:** home services and general contracting.

## Must fix before launch

### 1. The address may be misspelled across the new site

The new site says "BG **Patya** Circle". The evidence points to "BG **Palya** Circle":

| Source | Wording |
|---|---|
| New site, `CLAUDE.md`, Supabase seed | BG **Patya** Circle |
| Live WordPress site | near BG **Palya** Circle |
| onefivenine directory | B.G **Palya** Circle |
| ICICI Bank ATM listing | B. G**palya** Circle (PIN 572103) |
| Search for "BG Patya Circle" | No outside source uses this spelling |

**Next step:** the client confirms the exact address, including whether the PIN is 572101, and it must match the Google listing character for character. The spelling appears in `src/content/site.ts:33,36`, the `supabase/migrations/20260908090200_seed_client_content.sql` seed, `src/components/sections/ProjectsShowcase.tsx:68`, `src/content/services-data.ts:499`, `src/content/testimonials.ts:46` and `CLAUDE.md:47`.

### 2. Placeholder testimonials and unconfirmed claims

- **Testimonials:** `src/content/testimonials.ts` is marked as placeholder and includes named people, such as "Dr. Ramesh Kulkarni", with 5-star ratings. Publishing invented reviews is a legal and trust risk. Replace them with real ones or cut the section, as CLAUDE.md §8.9 says.
- **Named team:** `src/components/sections/about-page/AboutTeam.tsx` lists four named people with qualifications and years of experience. Confirm that they are real.
- **Conflicting figures:**
  - **Years in business:** 25+ on the About page. `site.ts` notes the site has also said 15+.
  - **Founding date:** `foundingDate: '1999'` in the structured data is unconfirmed.
  - **Homes delivered:** 250+ in the hero and services copy, but 200+ in the About timeline.

### 3. The map and location data point to the wrong place

The contact page map and `OFFICE_GEO` in `src/lib/seo/jsonld.ts:13` use approximate coordinates (13.3379, 77.1173). The code comment describes them as the city centre. A visitor following the map may not reach the office. Replace both with the exact pin and an embed of the real Google listing.

### 4. The live site is showing placeholder contact details

This affects the site customers see today, so it's worth fixing even before launch.

| Field | Live WordPress contact page | New site |
|---|---|---|
| Email | `hello@example.com` | info@snehaconstruction.com |
| Hours | Mon–Fri 9am–5pm, Sat–Sun closed | Mon–Sat 9 AM–9 PM |
| Phone links | `tel:8001480064` and also `tel:5550000000` | `tel:+918001480064` |

**Next step:** the client confirms the real hours. Google favours businesses open at search time, so the listing must be accurate.

## Google Business Profile checklist

Search could not confirm whether a listing exists, because Google Maps results aren't available through it. The client should check this first.

| Item | Status |
|---|---|
| Listing claimed and verified | Unknown, client to confirm |
| Primary category | Unknown. Suggested: "Construction company" or "Home builder", whichever best matches most of the work. Wrong primary category is the worst negative factor |
| Secondary categories | Unknown. Consider "General contractor" and related options offered in the profile |
| Business name | Must match the real business name, with no added keywords |
| Hours | Unconfirmed, see item 4 |
| Photos of real sites and team | Client to add. Real project photos are also needed for the site |
| Link from website to listing | Missing |
| Regular posts | Client to start |
| Q&A content | Google's Q&A was retired, so keep answers in the website FAQ, as the site already does |

## Reviews snapshot

| Item | Finding |
|---|---|
| Google reviews | Not verifiable from here |
| Justdial | Listing found. Search results reported no ratings yet |
| Other review sites | None found for this business |
| Rating in schema | Correctly absent. Add one only from real reviews |

**Target:** 10 real Google reviews first, then a steady flow. Ask every client at handover, using a QR code or WhatsApp link. Ask everyone, not only happy clients, because filtering who gets asked breaks Google's rules. Reply to every review.

## Name, address and phone audit

| Source | Name | Address | Phone |
|---|---|---|---|
| New site (visible) | Sneha Construction & Developers | 4th Cross, Vinobanagar, SS Temple Main Road, BG Patya Circle, Tumkur – 572101 | +91 80014 80064 |
| New site (home and contact schema) | Same | Same, split into fields | +918001480064 |
| New site (About schema) | Same | Same | +91 80014 80064 |
| Live WordPress | Sneha Construction and Developers | Vinobanagar 4th Cross, SS Temple Main Road, near BG Palya Circle, Tumkur | 8001480064 |
| Justdial (as reported by search) | Sneha Construction And Developers | S.S Temple, 4th Cross, Main Road, Vinobha Nagar, Tumkur-572101 | Not visible |
| Google listing | Not verifiable | Not verifiable | Not verifiable |

**Differences to resolve:** "&" against "and", Vinobanagar against Vinobha Nagar, and Patya against Palya. Choose one form from the Google listing and use it everywhere. The new site is consistent with itself across all pages checked.

## Citations

Yelp and BBB, the skill's standard checks, aren't useful for this market, so these are adapted for India.

| Directory | Status |
|---|---|
| Justdial | Listed, not fully inspected because the page blocked automated access. Claim it and correct the address |
| Facebook, Instagram, YouTube | None found. The old site's social links were placeholders |
| Sulekha, IndiaMART | Not found for this business |
| Bing Places | Unknown. Claim it, because it feeds Copilot and other AI tools |
| Apple Business Connect | Unknown. Claim it for iPhone users |

**Name confusion:** other firms called Sneha Construction(s) operate in Hyderabad, Pune, Kerala and elsewhere, some with similar web addresses (`snehaconstruction.co.in`, `snehaconstructions.in`, `snehaconstructions.net`). Always use the full name with Tumkur, and link all official profiles from the site's schema so search engines can tell them apart.

## On-page findings

**Working well:**
- Name, address and hours appear in the footer on every page checked
- `tel:` and WhatsApp links are on every page, with a mobile action bar
- Dedicated pages exist for residential, commercial and turnkey services
- Titles on service pages include Tumkur

**To improve:**

| Issue | Evidence | Fix |
|---|---|---|
| No town pages | `/areas/[slug]` doesn't exist, and towns appear only in lists | Build five pages with real local projects and detail. Five pages is well under the 30-page warning |
| Few H1s mention the location | Home: "Your dream home, built to last". Residential: "Homes built for families like yours". Turnkey: "Where every rupee actually goes". Commercial: "What can your plot actually yield?" | Add Tumkur to the home H1 at least. Keep the others if the copy matters more, and make sure the text just below names the service and town |
| Home title has no service keyword | "Sneha Construction & Developers, Tumkur" | "Construction Company in Tumkur \| Sneha Construction & Developers" |
| "Tumakuru" never appears | 0 mentions on 10 pages checked. It has been the official city name since 2014 | Use it naturally in a few places, such as the About page and the Tumkur town page |
| Phone not beside the address in the footer | `src/components/layout/Footer.tsx` shows the phone only in the card above | Add the phone to the head office block |
| Social links won't show in the footer | `Footer.tsx` doesn't use `socialLinks`, although the comment in `site.ts` says the row appears on its own | Add the row when real profile links arrive |
| Long titles | Many exceed 60 characters and may be cut off in results | Shorten the longest page titles |

## Local schema

**Present and correct:** `LocalBusiness` with `GeneralContractor`, on the home and contact pages, with name, address, phone, email, hours, `areaServed` and `priceRange`.

**Fix:**

- **Location:** replace the approximate coordinates, using at least 5 decimal places.
- **About page:** it describes the business as a second `Organization`, without the shared `@id`, so search engines may read it as a separate entity. Add the same `@id` and remove `foundingDate` until confirmed:

```ts
// src/app/(marketing)/about/page.tsx
{
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'GeneralContractor'],
  '@id': `${env.NEXT_PUBLIC_SITE_URL}/#business`,
  name: site.name,
  url: env.NEXT_PUBLIC_SITE_URL,
}
```

- **Profile links:** fill `socialLinks` with the Google listing and real profiles. The `sameAs` field then appears automatically.
- **Service pages:** check that their `Service` schema points to the same `@id` as the provider.

## Local authority

No local links, press, chamber of commerce membership or community activity were found.

**Good first targets:**
- Tumkur chamber or trade associations
- Local newspapers, such as a completed school or clinic project
- Material suppliers who list their contractors
- Architects and engineers in the area
- Local "best builders" lists, which also help with AI search

## Top 10 actions

| # | Priority | Action | Owner |
|---|---|---|---|
| 1 | Critical | Confirm the exact address, PIN, hours and business name, then correct the site and seed data | Client, then developer |
| 2 | Critical | Replace or remove placeholder testimonials, and confirm the team and all figures | Client, then developer |
| 3 | Critical | Claim and verify the Google listing with the correct primary category | Client |
| 4 | High | Fix the placeholder email, phone and hours on the live WordPress site | Client or developer |
| 5 | High | Use the exact office pin in the map and schema | Developer, after #3 |
| 6 | High | Start collecting real Google reviews at every handover | Client |
| 7 | High | Build the five town pages with real local projects | Developer and client |
| 8 | Medium | Claim and correct Justdial, then claim Bing Places and Apple Business Connect | Client |
| 9 | Medium | Fix the home title and H1, About schema, footer phone and social row | Developer |
| 10 | Medium | Earn local links and mentions, and create real social profiles | Client |

## What this analysis could not check

- **Google listing data:** whether a listing exists, its categories, its reviews and its Insights data. Client access or DataForSEO would fill this in.
- **Rankings:** map pack positions and rankings across town locations. These need a geo-grid tool such as Local Falcon or BrightLocal.
- **Backlinks and domain authority:** these need a tool such as Ahrefs or Semrush.
- **The Justdial page itself:** it blocked direct access, so those details come from search results.
- **Performance on the live domain:** the new site isn't deployed there yet.

The score is a judgement based on the skill's scoring guide, not a measurement.

## Sources

- [Justdial listing](https://www.justdial.com/Tumkur/Sneha-Construction-And-Developers-Vinobha-Nagar/9999PX816-X816-250206200130-D9Y6_BZDET)
- [onefivenine, TUDA Layout](https://www.onefivenine.com/india/villages/Tumkur/Tumkur/Tuda-Layout)
- [ICICI Bank ATM, Tumkur B.H Road](https://www.icici.bank.in/atm/karnataka/tumkur/bh-road/b1047)
- [Wikipedia, Tumkur](https://en.wikipedia.org/wiki/Tumkur)
- [snehaconstruction.co.in](https://snehaconstruction.co.in/), [snehaconstructions.in](http://www.snehaconstructions.in/), [snehaconstructions.net](https://snehaconstructions.net/about-us)
