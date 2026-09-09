'use client'

import Image from 'next/image'

import showcasePavilion from '@/assets/hero/showcase-pavilion.jpg'
import heroBg from '@/assets/hero/hero-bg.jpg'
import detailTimber from '@/assets/hero/detail-timber.jpg'
import service2Residential from '@/assets/services/service-2-residential.jpg'
import service3Turnkey from '@/assets/services/service-3-turnkey.jpg'
import service4Commercial from '@/assets/services/service-4-commercial.jpg'
import videoBg from '@/assets/video/video-band-bg.jpg'
import serviceResidential from '@/assets/placeholder/service-residential.jpg'
import serviceCommercial from '@/assets/placeholder/service-commercial.jpg'
import serviceTurnkey from '@/assets/placeholder/service-turnkey.jpg'

// Bespoke real buildings built by the company
import residentialHeroVilla from '@/assets/services/bespoke/residential-hero-villa.jpg'
import commercialHeroBuilding from '@/assets/services/bespoke/commercial-hero-building.jpg'
import turnkeyHeroResidence from '@/assets/services/bespoke/turnkey-hero-residence.jpg'

const buildingImages = [
  { id: 'b-res-villa', src: residentialHeroVilla, alt: 'Completed luxury modern duplex villa in Tumkur' },
  { id: 'b-turnkey-home', src: turnkeyHeroResidence, alt: 'Finished turnkey designer villa in Tumkur' },
  { id: 'b-comm-plaza', src: commercialHeroBuilding, alt: '5-Storey commercial retail plaza in Tumkur' },
  { id: 'b1', src: heroBg, alt: 'Luxury curved timber villa built in Tumkur' },
  { id: 'b2', src: showcasePavilion, alt: 'Sculptural pavilion modern duplex' },
  { id: 'b3', src: service2Residential, alt: 'Contemporary multi-storey residential project' },
  { id: 'b4', src: service3Turnkey, alt: 'Turnkey architectural residential estate' },
  { id: 'b5', src: service4Commercial, alt: 'Modern commercial plaza and office hub' },
  { id: 'b6', src: videoBg, alt: 'Illuminated custom villa project delivered in Tumkur' },
  { id: 'b7', src: detailTimber, alt: 'Custom architectural facade and residence' },
  { id: 'b8', src: serviceResidential, alt: 'Modern bungalow and duplex residence' },
  { id: 'b9', src: serviceCommercial, alt: 'Engineered commercial development' },
  { id: 'b10', src: serviceTurnkey, alt: 'Urban turnkey family home' },
]

export function BuildingCarousel() {
  return (
    <section
      aria-label="Buildings built by Sneha Construction"
      className="relative overflow-hidden bg-white py-12 sm:py-16"
    >
      {/* Subtle edge fades for seamless infinite illusion */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-28 md:w-36 bg-gradient-to-r from-white via-white/80 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-28 md:w-36 bg-gradient-to-l from-white via-white/80 to-transparent"
      />

      {/* Infinite scrolling track */}
      <div className="flex w-max items-center animate-marquee-buildings hover:[animation-play-state:paused]">
        {/* First track */}
        <div className="flex items-center gap-5 sm:gap-7 px-2.5 sm:px-3.5">
          {buildingImages.map((building) => (
            <div
              key={building.id}
              className="group relative h-[220px] w-[310px] sm:h-[280px] sm:w-[410px] md:h-[320px] md:w-[480px] shrink-0 overflow-hidden rounded-[20px] border border-slate-200/90 bg-slate-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-slate-300"
            >
              <Image
                src={building.src}
                alt={building.alt}
                fill
                sizes="(min-width: 768px) 480px, 310px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* Second track for seamless infinite loop */}
        <div className="flex items-center gap-5 sm:gap-7 px-2.5 sm:px-3.5" aria-hidden="true">
          {buildingImages.map((building) => (
            <div
              key={`dup-${building.id}`}
              className="group relative h-[220px] w-[310px] sm:h-[280px] sm:w-[410px] md:h-[320px] md:w-[480px] shrink-0 overflow-hidden rounded-[20px] border border-slate-200/90 bg-slate-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-slate-300"
            >
              <Image
                src={building.src}
                alt={building.alt}
                fill
                sizes="(min-width: 768px) 480px, 310px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
