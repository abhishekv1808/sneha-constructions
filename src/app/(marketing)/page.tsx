import {
  About,
  ArchitecturalEvolution,
  BuildingCarousel,
  CtaBand,
  FaqSection,
  FeaturesEstimator,
  Hero,
  Marquee,
  PackageComparison,
  ProjectsShowcase,
  Services,
  SiteShortsCarousel,
  Testimonials,
  VideoBand,
} from '@/components/sections'

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Section with Interactive Multi-Step Quick Estimator */}
      <Hero />

      {/* 2. Real Completed Projects Carousel */}
      <div className="pt-12 sm:pt-16 lg:pt-20">
        <BuildingCarousel />
      </div>

      {/* 3. About Us Section */}
      <About />

      {/* 4. Services 4-Card Numbered Grid */}
      <Services />

      {/* 5. "In 60 Seconds" Tumkur Site Video Reels / Shorts Carousel */}
      <SiteShortsCarousel />

      {/* 6. Infinite Horizontal Scrolling Material Brands Marquee */}
      <Marquee />

      {/* 7. Scroll-Driven 4K Time-Lapse: 2D Blueprint to Real Luxury Duplex Villa */}
      <ArchitecturalEvolution />

      {/* 8. Interactive Plot-to-House Cost Estimator with Teaser Gate & BOQ */}
      <FeaturesEstimator />

      {/* 9. Comprehensive Package Comparison & Material Specifications Matrix */}
      <PackageComparison />

      {/* 10. Watch Our Story Video Band with Milestones */}
      <VideoBand />

      {/* 11. Filterable Projects Showcase Portfolio */}
      <ProjectsShowcase />

      {/* 12. Verified Homeowner Testimonials */}
      <Testimonials />

      {/* 13. Frequently Asked Questions Accordion */}
      <FaqSection />

      {/* 14. High-Impact Call to Action Banner */}
      <CtaBand />
    </>
  )
}
