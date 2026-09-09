import {
  About,
  ArchitecturalEvolution,
  BuildingCarousel,
  CtaBand,
  FaqSection,
  FeaturesEstimator,
  Hero,
  Marquee,
  ProjectsShowcase,
  Services,
  Testimonials,
  VideoBand,
} from '@/components/sections'

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Section with 3 Overlapping Feature Cards */}
      <Hero />

      {/* 2. First of all: User watches the real projects built by the company */}
      <div className="pt-12 sm:pt-16 lg:pt-20">
        <BuildingCarousel />
      </div>

      {/* 3. About Us Section */}
      <About />

      {/* 4. Services 4-Card Numbered Grid */}
      <Services />

      {/* 4. Infinite Horizontal Scrolling Marquee */}
      <Marquee />

      {/* 5. Scroll-Driven 4K Time-Lapse: 2D Blueprint to Real Luxury Duplex Villa */}
      <ArchitecturalEvolution />

      {/* 6. Watch Our Story Video Band with Milestones */}
      <VideoBand />

      {/* 6. Features & Interactive Build Cost Estimator with Pricing Tiers */}
      <FeaturesEstimator />

      {/* 7. Filterable Projects Showcase Portfolio */}
      <ProjectsShowcase />

      {/* 8. Verified Homeowner Testimonials */}
      <Testimonials />

      {/* 9. Frequently Asked Questions Accordion */}
      <FaqSection />

      {/* 10. High-Impact Call to Action Banner */}
      <CtaBand />
    </>
  )
}
