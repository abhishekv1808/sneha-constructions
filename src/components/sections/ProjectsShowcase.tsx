'use client'

import { ArrowUpRight } from 'lucide-react'
import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import showcasePavilion from '@/assets/hero/showcase-pavilion.jpg'
import detailTimber from '@/assets/hero/detail-timber.jpg'
import heroBg from '@/assets/hero/hero-bg.jpg'
import serviceResidential from '@/assets/placeholder/service-residential.jpg'
import serviceCommercial from '@/assets/placeholder/service-commercial.jpg'
import serviceTurnkey from '@/assets/placeholder/service-turnkey.jpg'
import { Container } from '@/components/ui'

interface ProjectItem {
  id: string
  title: string
  category: string
  categoryKey: 'villas' | 'duplexes' | 'turnkey' | 'commercial'
  location: string
  area: string
  image: StaticImageData
}

const projectsData: ProjectItem[] = [
  {
    id: '1',
    title: 'The Timber Wave Villa',
    category: 'Luxury Villa',
    categoryKey: 'villas',
    location: 'Vinobanagar, Tumkur',
    area: '4,800 sq ft',
    image: heroBg,
  },
  {
    id: '2',
    title: 'Sculptural Pavilion Duplex',
    category: 'Modern Duplex',
    categoryKey: 'duplexes',
    location: 'Gubbi Main Road, Tumkur',
    area: '3,200 sq ft',
    image: showcasePavilion,
  },
  {
    id: '3',
    title: 'Acoustic Curve Residence',
    category: 'Turnkey Residence',
    categoryKey: 'turnkey',
    location: 'Sira Road, Tumkur',
    area: '2,600 sq ft',
    image: detailTimber,
  },
  {
    id: '4',
    title: 'Contemporary Family Bungalow',
    category: 'Luxury Villa',
    categoryKey: 'villas',
    location: 'Kunigal Town, Tumkur',
    area: '3,800 sq ft',
    image: serviceResidential,
  },
  {
    id: '5',
    title: 'Zenith Commercial Complex',
    category: 'Commercial Hub',
    categoryKey: 'commercial',
    location: 'BG Patya Circle, Tumkur',
    area: '12,500 sq ft',
    image: serviceCommercial,
  },
  {
    id: '6',
    title: 'Urban Serenity Duplex',
    category: 'Turnkey Residence',
    categoryKey: 'turnkey',
    location: 'Tiptur Extension, Tumkur',
    area: '2,950 sq ft',
    image: serviceTurnkey,
  },
]

const categories = [
  { key: 'all', label: 'All Projects' },
  { key: 'villas', label: 'Luxury Villas' },
  { key: 'duplexes', label: 'Modern Duplexes' },
  { key: 'turnkey', label: 'Turnkey Builds' },
  { key: 'commercial', label: 'Commercial' },
]

export function ProjectsShowcase() {
  const [selectedFilter, setSelectedFilter] = useState('all')

  const filteredProjects =
    selectedFilter === 'all'
      ? projectsData
      : projectsData.filter((p) => p.categoryKey === selectedFilter)

  return (
    <section id="projects" className="relative bg-white py-16 sm:py-24 lg:py-32">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 font-secondary text-xs font-bold tracking-[0.16em] text-[#CE1C73] uppercase sm:text-[0.8125rem]">
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 rounded-[2px] bg-[#CE1C73]"
              />
              OUR PROJECTS
            </div>
            <h2 className="mt-4 font-display text-[1.625rem] leading-[1.18] font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
              A showcase of architecture that{' '}
              <span className="font-playfair italic">inspires and endures</span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="-mx-5 flex w-[calc(100%+2.5rem)] [scrollbar-width:none] items-center gap-2 overflow-x-auto px-5 md:mx-0 md:w-auto md:flex-wrap md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedFilter(cat.key)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold whitespace-nowrap transition-all ${
                  selectedFilter === cat.key
                    ? 'bg-[#CE1C73] text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-8 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl sm:rounded-[22px]"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-100">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div className="absolute top-2 left-2 sm:top-4 sm:left-4">
                  <span className="rounded-full border border-[#CE1C73]/40 bg-ink-950/80 px-2 py-0.5 text-[0.6875rem] font-bold text-white backdrop-blur-md sm:px-3 sm:py-1 sm:text-[0.6875rem]">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Card Meta */}
              <div className="flex flex-1 items-center justify-between gap-2 p-3 sm:p-6">
                <div>
                  <h3 className="font-display text-sm leading-snug font-semibold text-slate-900 transition-colors group-hover:text-[#CE1C73] sm:text-lg">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-[0.6875rem] text-slate-500 sm:text-xs">
                    {project.location} · {project.area}
                  </p>
                </div>

                <Link
                  href="/projects"
                  className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-900 transition-all duration-200 group-hover:bg-[#CE1C73] group-hover:text-white sm:flex"
                  aria-label={`View ${project.title}`}
                >
                  <ArrowUpRight size={18} strokeWidth={2.4} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
