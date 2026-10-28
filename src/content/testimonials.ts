// Homeowner testimonials for the home page.
//
// PLACEHOLDER — CONFIRM WITH CLIENT before launch (CLAUDE.md §8.9, §14). These
// carried over from the earlier build and have not been matched to real
// clients. Replace each with a genuine quote, name, town and project, with the
// client's permission to publish it. If fewer than two real ones exist, cut
// the section rather than ship these.
//
// Deliberately absent until the client supplies them: a Google rating, review
// count or "verified" badge. Those are claims about a third-party profile and
// must be copied from it, not estimated.

export interface Testimonial {
  id: string
  author: string
  projectType: string
  location: string
  quote: string
  /** Out of 5 — the star rating the client gave, if they gave one. */
  rating?: number
}

export const testimonials: readonly Testimonial[] = [
  {
    id: 'ramesh-kulkarni',
    author: 'Dr. Ramesh Kulkarni',
    projectType: '4BHK turnkey villa',
    location: 'Vinobanagar, Tumkur',
    rating: 5,
    quote:
      'Sneha Construction handled our home from the 3D plan to the final coat of paint. Material billing was transparent and the cost never went up. They handed over on schedule, before our Griha Pravesha, and the daily WhatsApp updates from site gave us complete peace of mind.',
  },
  {
    id: 'pooja-anand-gowda',
    author: 'Pooja & Anand Gowda',
    projectType: 'Modern duplex',
    location: 'Gubbi Extension',
    rating: 5,
    quote:
      'The 3D views and the vastu layout from their in-house architects made every decision easy. The steel, cement and woodwork are top quality, and the ₹1,875/sq ft rate we agreed had no surprises. We love every corner of our new home.',
  },
  {
    id: 'vikramaditya-hegde',
    author: 'Vikramaditya Hegde',
    projectType: '12,000 sq ft commercial complex',
    location: 'BG Patya Circle, Tumkur',
    rating: 5,
    quote:
      'A very professional engineering team. A civil engineer supervised our commercial complex on site every day, and soil tests and concrete cube tests were all done and shared with us. We couldn’t have asked for better partners in Tumkur.',
  },
  {
    id: 'chetan-kumar',
    author: 'Chetan Kumar & family',
    projectType: 'Family residence',
    location: 'SS Puram, Tumkur',
    rating: 5,
    quote:
      'After bad experiences with local contractors, choosing Sneha was our best decision. The fixed-rate agreement and an itemised BOQ meant we always knew where the money went. Handover was done in seven months, exactly as promised.',
  },
  {
    id: 'sunil-rekha-prasad',
    author: 'Sunil & Rekha Prasad',
    projectType: 'Contemporary villa',
    location: 'Kunigal Road',
    rating: 5,
    quote:
      'From the 3D elevation to excavation to handing over the keys, qualified engineers managed everything. We never had to chase anyone for an update. The foundation and plumbing work is excellent. We highly recommend their turnkey package.',
  },
  {
    id: 'ks-manjunath',
    author: 'K. S. Manjunath',
    projectType: 'Office & retail showroom',
    location: 'Sira Gate, Tumkur',
    rating: 5,
    quote:
      'They delivered our showroom two weeks ahead of schedule. A good team, genuine branded steel and every approval handled with the municipality.',
  },
]
