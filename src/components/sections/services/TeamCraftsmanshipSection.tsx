import Image from 'next/image'
import { HardHat, CheckCircle2, Quote } from 'lucide-react'
import { Container } from '@/components/ui'
import type { ServiceDetail } from '@/content/services-data'
import engineersPlanningSite from '@/assets/team/engineers-planning-site.jpg'
import architectInspectingSite from '@/assets/team/architect-inspecting-site.jpg'
import indianWorkersCraft from '@/assets/team/indian-workers-craft.jpg'
import engineerLookingUp from '@/assets/team/engineer-looking-up.jpg'

interface TeamCraftsmanshipSectionProps {
  service: ServiceDetail
}

export function TeamCraftsmanshipSection({ service }: TeamCraftsmanshipSectionProps) {
  const teamMoments = [
    {
      title: 'Architectural & Structural Planning',
      lead: 'Er. Anand & Structural Design Team',
      desc: 'Collaborative analysis of load calculations, soil bearing reports, and seismic reinforcement framing before excavation.',
      image: engineersPlanningSite,
      badge: 'Scientific Pre-Planning',
    },
    {
      title: 'On-Site Architectural Precision',
      lead: 'Chief Architect Site Verification',
      desc: 'Checking 3D digital elevations against physical formwork, ensuring every window lintel and ceiling height matches design.',
      image: architectInspectingSite,
      badge: 'Zero Elevation Errors',
    },
    {
      title: 'Skilled Masonry & Rebar Craftsmanship',
      lead: 'Local Tumkur Master Artisans',
      desc: 'Certified masons aligning solid concrete blocks with spirit levels and tying Tata Tiscon Fe550D TMT rebar with millimeter tolerance.',
      image: indianWorkersCraft,
      badge: 'Master Craftsmanship',
    },
    {
      title: 'Final Quality Inspection & Handover',
      lead: 'Project Engineer Structural Sign-Off',
      desc: 'Rigorous 120-point quality audit covering waterproofing, plumbing pressure tests, and flawless paint finish before key handover.',
      image: engineerLookingUp,
      badge: '10-Yr Guarantee Sign-Off',
    },
  ]

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28 border-b border-slate-200">
      {/* Background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-pink-50/50 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-slate-50 blur-3xl"
      />

      <Container className="relative z-10">
        {/* Section Header with Emotion */}
        <div className="mx-auto max-w-3xl text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50 px-4 py-1.5 text-xs font-bold text-[#CE1C73] font-secondary">
            <HardHat className="h-3.5 w-3.5" />
            <span className="tracking-wide uppercase">The Human Heart Behind Every Structure</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.5rem] font-bold tracking-tight text-slate-900 leading-tight">
            Built with Passion by Indian Engineers, Architects &amp; Local Artisans
          </h2>

          <p className="font-secondary text-base sm:text-lg text-slate-600 leading-relaxed">
            Our strongest foundation is not just cement and steel—it is the dedicated minds and
            experienced hands who treat your project with the same sacred care as building their own
            family home in Tumkur.
          </p>
        </div>

        {/* 4-Card Photo Storytelling Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {teamMoments.map((moment, idx) => (
            <div
              key={moment.title}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-[#FAFAF8] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Photo Frame */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <Image
                  src={moment.image}
                  alt={moment.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                {/* Badge */}
                <div className="absolute top-3 left-3 rounded-full bg-white/95 backdrop-blur-xs px-2.5 py-1 text-[10px] font-bold text-slate-900 shadow-xs font-secondary">
                  {moment.badge}
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="font-secondary text-[10px] font-semibold uppercase tracking-wider text-pink-200 block">
                    Step 0{idx + 1}
                  </span>
                  <p className="font-display text-xs font-bold text-white line-clamp-1">{moment.lead}</p>
                </div>
              </div>

              {/* Text Description */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h3 className="font-display text-sm font-bold text-slate-900 group-hover:text-[#CE1C73] transition-colors leading-snug">
                    {moment.title}
                  </h3>
                  <p className="font-secondary text-xs text-slate-600 leading-relaxed mt-1.5">{moment.desc}</p>
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 font-secondary">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  <span>On-Site Quality Checked</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Authentic Client Family Testimonial Card */}
        <div className="relative overflow-hidden rounded-3xl border border-amber-200/80 bg-gradient-to-br from-amber-50/40 via-white to-pink-50/30 p-6 md:p-10 shadow-lg">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-amber-100/30 blur-2xl"
          />

          <div className="relative grid items-center gap-6 md:grid-cols-12">
            <div className="md:col-span-1 flex items-center justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#CE1C73]/10 text-[#CE1C73]">
                <Quote className="h-8 w-8" />
              </div>
            </div>

            <div className="md:col-span-8 space-y-2">
              <span className="font-secondary text-xs font-bold uppercase tracking-wider text-[#CE1C73]">
                Real Tumkur Family Story
              </span>
              <p className="font-secondary text-base sm:text-lg italic text-slate-800 leading-relaxed">
                &ldquo;{service.clientFamilyStory.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-1 font-secondary">
                <span className="font-display text-sm font-bold text-slate-900">
                  {service.clientFamilyStory.name}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs font-medium text-slate-600">
                  {service.clientFamilyStory.location}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs font-semibold text-emerald-700">
                  {service.clientFamilyStory.year}
                </span>
              </div>
            </div>

            <div className="md:col-span-3 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6 text-center font-secondary">
              <div className="flex text-amber-400 text-lg mb-1">★★★★★</div>
              <p className="font-display text-xs font-bold text-slate-900">5.0 Star Client Rating</p>
              <p className="text-[11px] text-slate-500">Verified Tumkur Homeowner</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
