# Sitemap validation report

**Site:** Sneha Construction & Developers
**Audited:** 2 November 2026, against a local production build
**Sources:** `src/app/sitemap.ts`, `src/app/robots.ts`, and the live WordPress sitemap at snehaconstruction.com

**Result:** the sitemap is valid, and all 23 URLs return 200 with a matching canonical. Two items are still open: the real `/projects` page and the five town pages.

## Not checked

The site's production address wasn't available, so these need re-running after deploy:

- The sitemap and robots.txt as served in production
- The value of `NEXT_PUBLIC_SITE_URL` in Vercel

The local build used `https://snehaconstruction.com` as its address.

## Open

| Severity | Issue | Next step |
|---|---|---|
| High | **No real `/projects` page.** It temporarily redirects (307) to the home page's projects section. `/projects/` is on the live WordPress sitemap, so this should be replaced before or soon after launch. | Build the page once the client supplies real projects and photos. Then delete the redirect in `next.config.ts`, repoint the `/#projects` links and add the page to `src/app/sitemap.ts`. |
| Medium | **The five `/areas/[slug]` town pages don't exist.** CLAUDE.md §1 and §12 treat towns as the main local SEO axis. | Build them with distinct content per town, then add them to the sitemap. Five pages is well below the 30-page warning gate. |
| Low | **17 of 23 URLs have no `<lastmod>`.** Only blog posts have real dates, and the code omits the field rather than stamping a false "now". | Leave as is until page content has real edit dates. |

## Fixed

| Issue | Fix |
|---|---|
| `/projects` returned 404 from the home and residential project cards | Those links now go straight to `/#projects`, and old links to `/projects` temporarily redirect there |
| Old WordPress `/?p=<id>` links redirected forever and ended in a browser error | The rule now stops after one redirect |
| A wrong `NEXT_PUBLIC_SITE_URL` could put localhost URLs in the sitemap and canonicals, and a trailing slash produced `//about` | Vercel production builds now fail unless the address is `https://`, and trailing slashes are stripped |
| About, Privacy and Terms read the site URL directly, skipping that check | They now use the validated `env` |
| No canonical on `/` or `/estimate` | Added |
| The brand repeated in most page titles, up to three times | Pages now give only their own title and the layout template adds the brand once |
| About page structured data pointed to a logo that doesn't exist (`/icon.png`) | Now uses `/sneha-constructions-logo.png` |
| `<changefreq>`, `<priority>` and the robots `Host:` line, all ignored by Google | Removed |

## What passed

| Check | Result |
|---|---|
| Valid XML | Pass |
| Under 50,000 URLs | Pass: 23 URLs, no index file needed |
| Duplicate URLs | None |
| All URLs return 200 | Pass: 23 of 23, none redirected |
| Noindexed URLs in the sitemap | None |
| Canonicals match the listed URL | Pass: 23 of 23 |
| Brand appears once per title | Pass: 23 of 23 |
| HTTPS URLs and no double slashes | Pass, using the address given above |
| Sitemap referenced in robots.txt | Pass |
| Routes missing from the sitemap | None: only `/kitchen-sink` is left out, deliberately |
| `<lastmod>` values | Pass: 6 distinct blog dates, none in the future |
| Image entries | 16 listed, the 2 sampled return 200 |

## WordPress URL check

The live WordPress sitemap lists 5 pages. Each was requested on the new build:

| Old URL | Result on the new build |
|---|---|
| `/` | 200 |
| `/about/` | Redirects to `/about`, 200 |
| `/contact/` | Redirects to `/contact`, 200 |
| `/services/` | Redirects to `/services`, 200 |
| `/projects/` | Redirects to `/projects`, then temporarily to `/#projects`, 200 |

## Needs the client

- **"25+ Years" in the About page title:** years in business is an open client input in CLAUDE.md §14, so confirm this figure before launch.

## After launch

1. Re-run this check against the production address.
2. Submit the new sitemap in Google Search Console.
3. Confirm the old `wp-sitemap.xml` address no longer serves the WordPress list.
