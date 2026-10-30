import {
  About,
  BrandLogos,
  BuildBenefits,
  BuildingCarousel,
  CtaBand,
  FaqSection,
  Hero,
  Marquee,
  PackageComparison,
  ProjectsShowcase,
  Services,
  SiteProgress,
  Testimonials,
} from '@/components/sections'
import { localBusinessJsonLd, serializeJsonLd } from '@/lib/seo'

/**
 * Section order follows the visitor's decision journey — a Tumkur family (or a
 * local business) deciding whether to call a builder:
 *
 *   1. Hook       — what is this, what does it cost, how do I reach them
 *   2. Relevance  — "do they build the kind of thing I need?"
 *   3. Trust      — "are they real, are they local, do people like me vouch for them?"
 *   4. Cost       — the highest-anxiety question, answered with the main lead tool
 *   5. Quality    — "will what I pay for be what I get?"
 *   6. Soft catch — a low-commitment offer for visitors not ready to call yet
 *   7. Objections — the questions that stop a call
 *   8. Action     — one last, clear ask
 *
 * Trust is deliberately built *before* pricing: a price seen before trust
 * reads as a sales pitch; seen after, it reads as an answer.
 */
export default function HomePage() {
  return (
    <>
      {/* §12: LocalBusiness / GeneralContractor — the homepage is what ranks for
          "construction company in Tumkur", so it carries the full NAP. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(localBusinessJsonLd()) }}
      />

      {/* ── 1. HOOK ───────────────────────────────────────────────────────── */}
      {/* Offer, primary CTA, phone, and trust figures in the first viewport */}
      <Hero />

      {/* ── 2. RELEVANCE ──────────────────────────────────────────────────── */}
      {/* Instant visual proof: finished buildings, no reading required */}
      <BuildingCarousel />

      {/* "Do they build what I need?" — residential, commercial, turnkey */}
      <Services />

      {/* ── 3. TRUST ──────────────────────────────────────────────────────── */}
      {/* Who they are: a real company with engineers and a way of working */}
      <About />

      {/* Real sites mid-build — proof the work is theirs, not renders */}
      <SiteProgress />

      {/* Staged payments, one site engineer, WhatsApp updates — the day-to-day fears */}
      <BuildBenefits />

      {/* Breather band — resets attention before social proof */}
      <Marquee />

      {/* Brands the visitor already trusts — borrowed credibility before the
          testimonials */}
      <BrandLogos />

      {/* People like me, from towns I know, vouch for them */}
      <Testimonials />

      {/* ── 4. COST ───────────────────────────────────────────────────────── */}
      {/* What each rate actually includes — removes "hidden cost" fear. Its
          buttons lead to the full calculator on /estimate. */}
      <PackageComparison />

      {/* ── 5. QUALITY ────────────────────────────────────────────────────── */}
      {/* More finished work, filterable by type, for the visitor still evaluating */}
      <ProjectsShowcase />

      {/* ── 7. OBJECTIONS ─────────────────────────────────────────────────── */}
      <FaqSection />

      {/* ── 8. ACTION ─────────────────────────────────────────────────────── */}
      <CtaBand />
    </>
  )
}
