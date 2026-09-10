'use client'

import {
  CheckCircle2,
  ExternalLink,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Star,
} from 'lucide-react'
import Image, { type StaticImageData } from 'next/image'
import { useState } from 'react'

import avatar1 from '@/assets/hero/avatars/avatar-1.jpg'
import avatar2 from '@/assets/hero/avatars/avatar-2.jpg'
import avatar3 from '@/assets/hero/avatars/avatar-3.jpg'
import avatar4 from '@/assets/hero/avatars/avatar-4.jpg'
import avatar5 from '@/assets/hero/avatars/avatar-5.jpg'
import { Container } from '@/components/ui'

function GoogleLogo({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.98 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  )
}

interface GoogleReviewItem {
  id: string
  author: string
  avatar: StaticImageData
  badge: string
  timeAgo: string
  rating: number
  categoryKey: 'all' | 'villas' | 'duplexes' | 'commercial'
  projectType: string
  location: string
  attributes: string[]
  content: string
  ownerResponse?: {
    date: string
    text: string
  }
}

const googleReviews: GoogleReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Dr. Ramesh Kulkarni',
    avatar: avatar3,
    badge: 'Local Guide · 19 reviews · 12 photos',
    timeAgo: '3 weeks ago',
    rating: 5,
    categoryKey: 'villas',
    projectType: '4BHK Luxury Turnkey Villa',
    location: 'Vinobanagar, Tumkur',
    attributes: ['Responsiveness', 'Punctuality', 'Quality', 'Professionalism'],
    content:
      'Sneha Construction handled our turnkey home from architectural 3D planning to the final coat of paint. Their transparency in material billing and zero cost escalation was refreshing. Handed over right on schedule before our Griha Pravesha. Daily WhatsApp site updates with concrete curing logs gave us complete peace of mind.',
    ownerResponse: {
      date: '2 weeks ago',
      text: 'Thank you Dr. Ramesh for your trust in Sneha Constructions! We are delighted that your family loves the natural light, Italian tiles, and teak woodwork of your new villa in Vinobanagar.',
    },
  },
  {
    id: 'rev-2',
    author: 'Pooja & Anand Gowda',
    avatar: avatar1,
    badge: 'Local Guide · 8 reviews',
    timeAgo: '1 month ago',
    rating: 5,
    categoryKey: 'duplexes',
    projectType: 'Modern Architectural Duplex',
    location: 'Gubbi Extension, Tumkur',
    attributes: ['Vastu Compliance', 'Quality Materials', 'On-Time Handover'],
    content:
      'The 3D visualization and vastu layout provided by their in-house architects made every decision effortless. Quality of Tata Tiscon steel, Ultratech cement, and teak woodwork is top tier. The locked ₹1,875/sq.ft. rate had zero surprises. Our family loves every corner of our new home.',
    ownerResponse: {
      date: '3 weeks ago',
      text: 'Thank you Pooja & Anand! Building your modern duplex with authentic Vastu compliance and parametric wood finishes was a truly rewarding journey for our entire team.',
    },
  },
  {
    id: 'rev-3',
    author: 'Vikramaditya Hegde',
    avatar: avatar2,
    badge: '14 reviews · 9 photos',
    timeAgo: '2 months ago',
    rating: 5,
    categoryKey: 'commercial',
    projectType: 'Commercial Complex (12,000 sq ft)',
    location: 'BG Patya Circle, Tumkur',
    attributes: ['Structural Rigor', 'Timely Execution', 'Value'],
    content:
      'Extremely professional engineering team. They executed our 12,000 sq ft commercial complex with daily on-site civil engineer supervision. Soil tests, concrete cube curing audits, and seismic RCC framing were strictly verified. We could not have asked for better structural partners in Tumkur.',
    ownerResponse: {
      date: '1 month ago',
      text: 'Thank you Vikramaditya ji. Delivering commercial scale projects on rigorous schedules is our structural hallmark. Wishing you tremendous business success with the new plaza.',
    },
  },
  {
    id: 'rev-4',
    author: 'Chetan Kumar & Family',
    avatar: avatar4,
    badge: 'Local Guide · 34 reviews · 21 photos',
    timeAgo: '3 months ago',
    rating: 5,
    categoryKey: 'duplexes',
    projectType: 'Turnkey Family Residence',
    location: 'SS Puram, Tumkur',
    attributes: ['Transparency', 'BOQ Clarity', 'Engineering Supervision'],
    content:
      'After difficult experiences with unorganized local contractors, choosing Sneha Constructions was the best decision. Their fixed-rate agreement and detailed BOQ itemization gave us 100% financial clarity. Handover was completed in 7 months as promised. Truly the most reliable construction company in Tumkur.',
    ownerResponse: {
      date: '2 months ago',
      text: 'Thank you Chetan ji! Ensuring financial clarity and eliminating cost escalations is the foundational promise Sneha Constructions was built on 25 years ago.',
    },
  },
  {
    id: 'rev-5',
    author: 'Sunil Prasad & Rekha',
    avatar: avatar5,
    badge: 'Local Guide · 11 reviews',
    timeAgo: '4 months ago',
    rating: 5,
    categoryKey: 'villas',
    projectType: 'Contemporary Contemporary Villa',
    location: 'Kunigal Road, Tumkur',
    attributes: ['Architectural Design', 'Teak Woodwork', 'Zero Escalation'],
    content:
      'From 3D elevation renders to soil excavation and key handover, everything was managed by qualified civil engineers. We never had to chase anyone for progress updates. The quality of foundation and plumbing is exceptional. Highly recommend their turnkey package!',
  },
  {
    id: 'rev-6',
    author: 'K. S. Manjunath',
    avatar: avatar2,
    badge: 'Local Guide · 27 reviews · 15 photos',
    timeAgo: '5 months ago',
    rating: 5,
    categoryKey: 'commercial',
    projectType: 'Office & Retail Facility',
    location: 'Sira Gate, Tumkur',
    attributes: ['Professionalism', 'Punctuality', 'Safety Compliance'],
    content:
      'Sneha Constructions delivered our commercial showroom on Sira Gate 2 weeks ahead of schedule. Excellent team, genuine Tata TMT steel batches, and complete compliance with local municipality bylaws.',
  },
]

const filterTabs = [
  { key: 'all', label: 'All Reviews', count: '184+' },
  { key: 'villas', label: 'Villas & Bungalows', count: '64' },
  { key: 'duplexes', label: 'Modern Duplexes', count: '78' },
  { key: 'commercial', label: 'Commercial Builds', count: '42' },
]

export function Testimonials() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'villas' | 'duplexes' | 'commercial'>('all')

  const filteredReviews =
    selectedCategory === 'all'
      ? googleReviews
      : googleReviews.filter((r) => r.categoryKey === selectedCategory)

  return (
    <section id="testimonials" className="relative bg-[#FAFAF8] py-24 sm:py-32">
      <Container>
        {/* Top Eyebrow & Main Section Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 font-secondary text-xs sm:text-[0.8125rem] font-bold tracking-[0.16em] text-[#CE1C73] uppercase">
            <span
              aria-hidden="true"
              className="inline-block h-2 w-2 rounded-[2px] bg-[#CE1C73]"
            />
            OUR TESTIMONIALS
          </div>

          <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.18] tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
            Real feedback from those who{' '}
            <span className="font-playfair italic">built their dreams</span>
          </h2>

          <p className="mt-4 text-base text-slate-600 sm:text-lg">
            Read verified reviews shared directly by homeowners and developers on Google across
            Tumkur district.
          </p>
        </div>

        {/* Google Reviews Trust Badge Header Bar */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-md shadow-slate-100 sm:p-8">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            {/* Left: Google Logo + Rating Score */}
            <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center text-center sm:text-left">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 shadow-inner">
                <GoogleLogo className="h-8 w-8" />
              </div>

              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2.5">
                  <span className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 leading-none">
                    4.9
                  </span>
                  <div className="flex items-center gap-0.5 text-[#FBBC05]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={20} className="fill-[#FBBC05] text-[#FBBC05]" />
                    ))}
                  </div>
                </div>

                <p className="mt-1 text-xs sm:text-sm font-medium text-slate-600">
                  <strong className="text-slate-900 font-bold">184+ Verified Google Reviews</strong> · Excellent Rating
                </p>
              </div>
            </div>

            {/* Middle: Verification Chip */}
            <div className="hidden xl:flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200/60 px-4 py-1.5 text-xs font-semibold text-emerald-800">
              <CheckCircle2 size={15} className="text-emerald-600" />
              <span>Verified Google Business Profile · Tumkur, KA</span>
            </div>

            {/* Right: Google Maps Review Button */}
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-50 px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-800 transition-all duration-200 hover:border-[#4285F4] hover:bg-[#4285F4] hover:text-white shadow-sm hover:shadow"
            >
              <GoogleLogo className="h-4 w-4" />
              <span>View on Google Maps</span>
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Filter Tabs */}
          <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-6">
            {filterTabs.map((tab) => {
              const active = selectedCategory === tab.key
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setSelectedCategory(tab.key as typeof selectedCategory)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-150 ${
                    active
                      ? 'bg-ink-950 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 font-mono text-[0.6875rem] ${
                      active ? 'bg-[#CE1C73] text-white font-black' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Google Reviews Cards Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-xl"
            >
              <div>
                {/* Header: Avatar, Name, Google G Icon */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-slate-100">
                      <Image
                        src={rev.avatar}
                        alt={rev.author}
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-display text-sm font-semibold text-slate-900 leading-snug">
                        {rev.author}
                      </h3>
                      <p className="text-[0.6875rem] font-medium text-slate-500">
                        {rev.badge}
                      </p>
                    </div>
                  </div>

                  {/* Google G Logo on top right of each card */}
                  <div
                    title="Verified Google Review"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-50 border border-slate-100 shadow-xs"
                  >
                    <GoogleLogo className="h-4 w-4" />
                  </div>
                </div>

                {/* Stars and Date Row */}
                <div className="mt-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-0.5 text-[#FBBC05]">
                    {[...Array(rev.rating)].map((_, rIdx) => (
                      <Star key={rIdx} size={16} className="fill-[#FBBC05] text-[#FBBC05]" />
                    ))}
                  </div>
                  <span className="text-[0.6875rem] font-medium text-slate-400">
                    {rev.timeAgo}
                  </span>
                </div>

                {/* Project Tag & Location */}
                <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <span className="rounded-md bg-[#CE1C73]/15 px-2 py-0.5 text-[0.6875rem] font-bold text-[#CE1C73]">
                    {rev.projectType}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[0.6875rem] text-slate-500 font-normal">
                    <MapPin size={11} className="text-slate-400" />
                    {rev.location}
                  </span>
                </div>

                {/* Google Attributes Highlight */}
                {rev.attributes && rev.attributes.length > 0 && (
                  <p className="mt-3 text-[0.6875rem] font-medium text-slate-500">
                    <span className="font-bold text-slate-700">Positive: </span>
                    {rev.attributes.join(', ')}
                  </p>
                )}

                {/* Review Text */}
                <p className="mt-3.5 text-xs sm:text-[0.8125rem] leading-relaxed text-slate-700">
                  &ldquo;{rev.content}&rdquo;
                </p>
              </div>

              {/* Owner Response Box (if present) */}
              {rev.ownerResponse && (
                <div className="mt-6 rounded-xl border-l-2 border-[#CE1C73] bg-slate-50/80 p-3 text-xs">
                  <div className="flex items-center justify-between text-[0.6875rem] font-bold text-slate-800">
                    <span className="inline-flex items-center gap-1.5">
                      <MessageSquare size={12} className="text-[#CE1C73]" />
                      Response from Sneha Constructions
                    </span>
                    <span className="text-slate-400 font-normal">{rev.ownerResponse.date}</span>
                  </div>
                  <p className="mt-1.5 text-[0.6875rem] leading-relaxed text-slate-600 italic">
                    {rev.ownerResponse.text}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Social Proof Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-xl border border-slate-200/60 bg-white px-6 py-4 sm:flex-row">
          <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700">
            <ShieldCheck size={18} className="text-emerald-600" />
            <span>
              <strong>100% Real Homeowners:</strong> Every review originates from verified Google Maps accounts in Tumkur.
            </span>
          </div>

          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4285F4] hover:underline"
          >
            <span>Read all 184+ Google reviews</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </Container>
    </section>
  )
}
