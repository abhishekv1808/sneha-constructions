import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'

import service1Architecture from '@/assets/hero/detail-timber.jpg'
import service2Residential from '@/assets/services/service-2-residential.jpg'
import service3Turnkey from '@/assets/services/service-3-turnkey.jpg'
import service4Commercial from '@/assets/services/service-4-commercial.jpg'
import { Container } from '@/components/ui'

interface ServiceItem {
  id: string
  number: string
  title: string
  description: string
  href: string
  image: StaticImageData
}

const servicesData: ServiceItem[] = [
  {
    id: 'architectural-design',
    number: '01.',
    title: 'Architectural Planning & 3D Design',
    description: 'Vastu-compliant 2D/3D plans, blueprints & elevation renders.',
    href: '/services/turnkey',
    image: service1Architecture,
  },
  {
    id: 'residential-construction',
    number: '02.',
    title: 'Luxury Residential Construction',
    description: 'Custom duplexes & villas built with seismic structural mastery.',
    href: '/services/residential',
    image: service2Residential,
  },
  {
    id: 'turnkey-execution',
    number: '03.',
    title: 'Turnkey Build & Project Execution',
    description: 'End-to-end execution from excavation to turnkey handover.',
    href: '/services/turnkey',
    image: service3Turnkey,
  },
  {
    id: 'commercial-development',
    number: '04.',
    title: 'Commercial & Civil Development',
    description: 'Commercial hubs, plazas, and clinics on locked schedules.',
    href: '/services/commercial',
    image: service4Commercial,
  },
]

const servicePillTags = [
  'Modern Duplexes',
  'Luxury Villas',
  'Turnkey Homes',
  'Farmhouses',
  'Commercial Complexes',
  'Structural Renovation',
]

export function Services() {
  return (
    <section id="services" className="relative bg-[#FAFAF8] py-24 sm:py-32">
      <Container className="max-w-[1420px] px-4 sm:px-6 lg:px-8">
        {/* Centered Heading Block */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 font-secondary text-xs sm:text-[0.8125rem] font-bold tracking-[0.16em] text-[#CE1C73] uppercase">
            <span
              aria-hidden="true"
              className="inline-block h-2 w-2 rounded-[2px] bg-[#CE1C73]"
            />
            OUR SERVICES
          </div>

          <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.18] tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
            Architecture &amp; construction solutions{' '}
            <span className="font-playfair italic">designed for excellence</span>
          </h2>
          <p className="mt-4 text-base text-slate-600 sm:text-lg">
            High-performance engineering, turnkey craftsmanship, and complete peace of mind for
            families across Tumkur district.
          </p>
        </div>

        {/* 4 Cards Grid - Expanded Width */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {servicesData.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group flex flex-col justify-between overflow-hidden rounded-[20px] border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-slate-300"
            >
              {/* Upper Content Area */}
              <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-display text-[1.0625rem] font-semibold text-slate-900 leading-snug transition-colors group-hover:text-[#CE1C73]">
                      {item.title}
                    </h3>
                    <span className="font-display text-xl font-semibold text-slate-300 transition-colors group-hover:text-[#CE1C73]">
                      {item.number}
                    </span>
                  </div>

                  <div className="mt-3 h-px w-full bg-slate-100 transition-colors group-hover:bg-[#CE1C73]/40" />

                  <p className="mt-2.5 font-secondary text-[0.8125rem] leading-normal text-slate-500">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-slate-900">
                  <span>Explore Service</span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#CE1C73] text-white transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <ArrowUpRight size={13} strokeWidth={2.5} />
                  </span>
                </div>
              </div>

              {/* Lower Photographic Block */}
              <div className="relative h-56 sm:h-60 lg:h-64 w-full overflow-hidden bg-slate-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </Link>
          ))}
        </div>

        {/* Pill Tags Row */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2.5">
          {servicePillTags.map((tag) => (
            <span
              key={tag}
              className="inline-block rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Free Consultation Banner */}
        <div className="mt-10 rounded-[18px] border border-slate-200 bg-white p-5 text-center shadow-sm sm:p-6">
          <p className="flex flex-wrap items-center justify-center gap-2 text-sm font-medium text-slate-700 sm:text-base">
            Need custom architectural guidance? We provide a
            <span className="inline-flex items-center rounded-full bg-[#CE1C73] px-3 py-0.5 text-xs font-extrabold text-white uppercase tracking-wide">
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
