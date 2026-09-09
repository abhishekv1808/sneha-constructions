import Image, { type StaticImageData } from 'next/image'

import avatarFounder from '@/assets/hero/avatars/avatar-2.jpg'
import avatarArchitect from '@/assets/hero/avatars/avatar-3.jpg'
import avatarEngineer from '@/assets/hero/avatars/avatar-4.jpg'
import avatarSiteHead from '@/assets/hero/avatars/avatar-5.jpg'
import { Container } from '@/components/ui'

interface TeamMember {
  name: string
  role: string
  experience: string
  education: string
  bio: string
  image: StaticImageData
}

const team: TeamMember[] = [
  {
    name: 'N. R. Shiva Kumar',
    role: 'Founder & Managing Director',
    experience: '25+ Years Experience',
    education: 'B.E. Civil Engineering',
    bio: 'Pioneered Sneha Constructions with an uncompromising commitment to structural honesty, zero escalation pricing, and customer trust across Tumkur district.',
    image: avatarFounder,
  },
  {
    name: 'Ar. Keerthi V. Prasad',
    role: 'Chief Architectural Designer',
    experience: '12+ Years Experience',
    education: 'B.Arch, Council of Architecture',
    bio: 'Specialist in modern parametric elevations, luxury interior volumes, and traditional Vastu Shastra harmonization for custom duplexes and villas.',
    image: avatarArchitect,
  },
  {
    name: 'Er. Manjunath Swamy',
    role: 'Senior Structural Engineer',
    experience: '18+ Years Experience',
    education: 'M.Tech Structural Engineering',
    bio: 'Directs soil analysis, seismic RCC load calculations, and TUDA sanction liaison, ensuring every column and beam exceeds national safety tolerances.',
    image: avatarEngineer,
  },
  {
    name: 'Er. Harish Gowda',
    role: 'Head of Quality Assurance & Sites',
    experience: '15+ Years Experience',
    education: 'D.C.E. Construction Technology',
    bio: 'Commands on-site quality control, batch testing of cement and TMT steel, concrete curing schedules, and milestone-guaranteed project handovers.',
    image: avatarSiteHead,
  },
]

export function AboutTeam() {
  return (
    <section className="relative bg-white py-24 sm:py-32">
      <Container>
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 font-secondary text-xs sm:text-[0.8125rem] font-bold tracking-[0.18em] text-[#CE1C73] uppercase">
            <span
              aria-hidden="true"
              className="inline-block h-2 w-2 rounded-[2px] bg-[#CE1C73]"
            />
            OUR LEADERSHIP &amp; ENGINEERS
          </div>

          <h2 className="mt-4 font-display text-3xl font-bold leading-[1.18] tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
            The structural minds dedicated to building your home
          </h2>

          <p className="mt-4 text-base text-slate-600 sm:text-lg">
            Experienced civil engineers, licensed architects, and certified construction managers
            overseeing every millimeter of your project.
          </p>
        </div>

        {/* Team Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, i) => (
            <div
              key={i}
              className="group flex flex-col justify-between rounded-[22px] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#CE1C73] hover:shadow-xl"
            >
              <div>
                {/* Photo with Accent Ring */}
                <div className="relative mx-auto aspect-square w-full max-w-[200px] overflow-hidden rounded-2xl ring-2 ring-slate-100 transition-all duration-300 group-hover:ring-[#CE1C73]">
                  <Image
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-2 left-2 rounded-md bg-[#0A0E17]/80 px-2 py-0.5 text-[0.6875rem] font-medium text-[#CE1C73] backdrop-blur-sm">
                    {member.experience}
                  </div>
                </div>

                {/* Name & Role */}
                <div className="mt-6 text-center">
                  <h3 className="font-display text-lg font-bold text-slate-900 transition-colors group-hover:text-ink-950">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-[#CE1C73] uppercase tracking-wider">
                    {member.role}
                  </p>
                  <p className="mt-1 text-[0.6875rem] text-slate-400 font-mono">
                    {member.education}
                  </p>
                </div>

                {/* Bio */}
                <p className="mt-4 text-center text-xs leading-relaxed text-slate-600">
                  {member.bio}
                </p>
              </div>

              {/* Bottom In-House Guarantee Badge */}
              <div className="mt-6 border-t border-slate-100 pt-4 text-center">
                <span className="inline-flex items-center gap-1.5 text-[0.6875rem] font-bold text-slate-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Full-Time On-Site Lead
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
