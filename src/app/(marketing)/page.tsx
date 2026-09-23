import {
  About,
  ArchitecturalEvolution,
  BrandLogos,
  BuildingCarousel,
  ConstructionGuideLeadMagnet,
  CtaBand,
  FaqSection,
  FeaturesEstimator,
  Hero,
  Marquee,
  PackageComparison,
  ProjectsShowcase,
  PromiseVsRealitySlider,
  Services,
  Testimonials,
  TumkurCoverageExplorer,
  VideoBand,
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

      {/* "They build near me" — the strongest trust signal for this audience */}
      <TumkurCoverageExplorer />

      {/* Breather band — resets attention before social proof */}
      <Marquee />

      {/* People like me, from towns I know, vouch for them */}
      <Testimonials />

      {/* ── 4. COST ───────────────────────────────────────────────────────── */}
      {/* Main lead capture: the visitor's own number, gated by contact details */}
      <FeaturesEstimator />

      {/* What each rate actually includes — removes "hidden cost" fear */}
      <PackageComparison />

      {/* Branded materials behind those prices */}
      <BrandLogos />

      {/* ── 5. QUALITY ────────────────────────────────────────────────────── */}
      {/* "Will it look like the 3D render?" — render vs. real handover */}
      <PromiseVsRealitySlider />

      {/* How a drawing becomes a house — process confidence */}
      <ArchitecturalEvolution />

      {/* More finished work, filterable by type, for the visitor still evaluating */}
      <ProjectsShowcase />

      {/* ── 6. SOFT CATCH ─────────────────────────────────────────────────── */}
      {/* Not ready to call? Take the free guide on WhatsApp instead */}
      <ConstructionGuideLeadMagnet />

      {/* Company story for the visitor who reads everything */}
      <VideoBand />

      {/* ── 7. OBJECTIONS ─────────────────────────────────────────────────── */}
      <FaqSection />

      {/* ── 8. ACTION ─────────────────────────────────────────────────────── */}
      <CtaBand />
    </>
  )
}
