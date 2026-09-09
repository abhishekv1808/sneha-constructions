'use client'

import { Play, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import videoBg from '@/assets/video/video-band-bg.jpg'
import { Container } from '@/components/ui'

const statsData = [
  { value: '250+', label: 'Homes Delivered' },
  { value: '100%', label: 'Vastu & Safety Compliance' },
  { value: '₹1,875', label: 'Starting Turnkey Rate / sq ft' },
  { value: '15+', label: 'Years Of Structural Mastery' },
]

export function VideoBand() {
  const [videoOpen, setVideoOpen] = useState(false)

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#FAFAF8] py-24 sm:py-32 border-y border-slate-200">
        {/* Background Image with light subtle overlay */}
        <Image
          src={videoBg}
          alt="Cinematic modern luxury residence in Tumkur"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-15"
        />

        {/* Light Scrim */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAF8]/95 via-[#FAFAF8]/85 to-[#FAFAF8]/95" />

        <Container className="relative z-10 text-center text-slate-900">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 font-secondary text-xs sm:text-[0.8125rem] font-bold tracking-[0.16em] text-[#CE1C73] uppercase">
            <span
              aria-hidden="true"
              className="inline-block h-2 w-2 rounded-[2px] bg-[#CE1C73]"
            />
            WATCH OUR STORY
          </div>

          {/* Heading */}
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-bold leading-[1.18] tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
            Tailored architectural and construction solutions for every budget
          </h2>

          {/* Centered Circular Play Button with Rotating Text Ring */}
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => setVideoOpen(true)}
              className="group relative flex items-center justify-center p-2 focus:outline-none"
              aria-label="Play architectural story video"
            >
              {/* Rotating outer text ring */}
              <div className="animate-spin-slow">
                <svg viewBox="0 0 160 160" className="h-36 w-36 sm:h-44 sm:w-44">
                  <path
                    id="videoRingPath"
                    d="M 80, 80 m -62, 0 a 62,62 0 1,1 124,0 a 62,62 0 1,1 -124,0"
                    fill="none"
                  />
                  <text className="fill-slate-700 text-[10px] font-bold tracking-[0.24em] uppercase font-secondary transition-colors group-hover:fill-[#CE1C73]">
                    <textPath href="#videoRingPath" startOffset="0%">
                      • WATCH OUR STORY • PLAY VIDEO • WATCH OUR STORY • PLAY VIDEO
                    </textPath>
                  </text>
                </svg>
              </div>

              {/* Inner Play Button Circle */}
              <div className="absolute flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-[#CE1C73] text-white shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-slate-900 group-hover:text-white">
                <Play size={26} className="fill-current ml-1" />
              </div>
            </button>
          </div>

          {/* Key Milestone Stat Strip */}
          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-8 border-t border-slate-200 pt-12 sm:grid-cols-4">
            {statsData.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="font-display text-3xl font-black text-slate-900 sm:text-4xl lg:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs font-medium text-slate-600 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Video Modal */}
      {videoOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-ink-900 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 text-white">
              <h3 className="font-display text-base font-bold">
                Sneha Construction — Quality &amp; Precision in Tumkur
              </h3>
              <button
                type="button"
                onClick={() => setVideoOpen(false)}
                className="rounded-full p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <div className="relative aspect-video w-full overflow-hidden bg-ink-950">
              <Image
                src={videoBg}
                alt="Video thumbnail"
                fill
                className="object-cover opacity-75"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-ink-950/40">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#CE1C73] text-white shadow-xl mb-4">
                  <Play size={28} className="fill-current ml-1" />
                </div>
                <p className="text-xl font-bold text-white">Project Tour &amp; Client Story</p>
                <p className="text-sm text-slate-300 mt-1">
                  Discover how we transform ideas into enduring landmarks
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
