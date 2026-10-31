import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import commercial from '@/assets/services/cutouts/commercial.png'
import commercialSketch from '@/assets/services/cutouts/commercial-sketch.png'
import design from '@/assets/services/cutouts/design.png'
import designSketch from '@/assets/services/cutouts/design-sketch.png'
import residential from '@/assets/services/cutouts/residential.png'
import residentialSketch from '@/assets/services/cutouts/residential-sketch.png'
import turnkey from '@/assets/services/cutouts/turnkey.png'
import turnkeySketch from '@/assets/services/cutouts/turnkey-sketch.png'
import { Container } from '@/components/ui'
import { site } from '@/content'

import { ServiceBuildCard, type ServiceBuildCardProps } from './ServiceBuildCard'

/*
 * The building cut-outs are STAND-INS, keyed out of our elevation renders.
 * To replace one, drop a transparent PNG over the same filename in
 * src/assets/services/cutouts and run `pnpm service-sketches` — it trims the
 * PNG and regenerates the matching line drawing. Update the alt text below.
 */
const services: Omit<ServiceBuildCardProps, 'index'>[] = [
  {
    tag: 'Design',
    title: 'Architectural planning & 3D design',
    description:
      'Vastu-compliant plans, structural drawings and 3D elevations — see your home before a brick is laid.',
    chips: ['Vastu plans', '2D layouts', '3D elevations', 'Approval drawings'],
    href: '/services/turnkey',
    cta: 'Explore design',
    image: design,
    sketch: designSketch,
    alt: '3D elevation of a contemporary two-storey house with a glass balcony and terrace planters',
  },
  {
    tag: 'Homes',
    title: 'Residential construction',
    description: `Duplexes, villas and farmhouses on strong foundations, from ₹${site.baseRateSqft.toLocaleString('en-IN')}/sq ft.`,
    chips: ['Duplex houses', 'Villas', 'Farmhouses', 'Apartments'],
    href: '/services/residential',
    cta: 'Explore homes',
    image: residential,
    sketch: residentialSketch,
    alt: '3D render of a modern duplex with white and grey cladding and wooden accents',
  },
  {
    tag: 'Turnkey',
    title: 'Turnkey construction',
    description:
      'One team from site plan to handover — structure, plumbing, finishing and the final inspection.',
    chips: ['Site planning', 'Structure', 'Electrical & plumbing', 'Finishing'],
    href: '/services/turnkey',
    cta: 'Explore turnkey',
    image: turnkey,
    sketch: turnkeySketch,
    alt: '3D elevation of a three-storey house with a floral jali panel and balconies',
  },
  {
    tag: 'Commercial',
    title: 'Commercial construction',
    description:
      'Schools, clinics, offices and shopping complexes, planned for business and built on schedule.',
    chips: ['Schools', 'Hospitals', 'Offices', 'Shopping complexes'],
    href: '/services/commercial',
    cta: 'Explore commercial',
    image: commercial,
    sketch: commercialSketch,
    alt: '3D render of a four-storey commercial building with a glass facade',
  },
]

export function Services() {
  return (
    <section id="services" className="relative bg-[#FAFAF8] py-16 sm:py-24 lg:py-32">
      <Container className="max-w-[1420px] px-4 sm:px-6 lg:px-8">
        {/* Centered Heading Block */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 font-secondary text-xs font-bold tracking-[0.16em] text-[#CE1C73] uppercase sm:text-[0.8125rem]">
            <span aria-hidden="true" className="inline-block h-2 w-2 rounded-[2px] bg-[#CE1C73]" />
            OUR SERVICES
          </div>

          <h2 className="mt-4 font-display text-[1.625rem] leading-[1.18] font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
            Architecture &amp; construction solutions{' '}
            <span className="font-playfair italic">designed for excellence</span>
          </h2>
          <p className="mt-4 text-[0.9375rem] text-slate-600 sm:text-lg">
            From the first drawing to the finished building — watch each one go up.
          </p>
        </div>

        {/* Phones: a swipeable row with the next card peeking in.
            sm and up: a 2-column, then 4-column grid. */}
        <div className="-mx-4 mt-10 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:mt-14 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden">
          {services.map((service, index) => (
            <ServiceBuildCard key={service.title} index={index} {...service} />
          ))}
        </div>

        {/* Free Consultation Banner */}
        <div className="mt-8 rounded-[18px] border border-slate-200 bg-white p-4 text-center shadow-sm sm:mt-12 sm:p-6">
          <p className="flex flex-wrap items-center justify-center gap-2 text-sm font-medium text-slate-700 sm:text-base">
            Need custom architectural guidance? We provide a
            <span className="inline-flex items-center rounded-full bg-[#CE1C73] px-3 py-0.5 text-xs font-extrabold tracking-wide text-white uppercase">
              Free
            </span>
            initial site inspection and 3D layout estimate.
            <Link
              href="/contact"
              className="inline-flex items-center gap-1 font-bold text-slate-900 underline decoration-[#CE1C73] decoration-2 underline-offset-4 hover:text-[#CE1C73]"
            >
              Request Free Estimate <ArrowRight size={16} />
            </Link>
          </p>
        </div>
      </Container>
    </section>
  )
}
