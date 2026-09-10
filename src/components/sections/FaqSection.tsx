'use client'

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

import { Container } from '@/components/ui'

interface FaqItem {
  question: string
  answer: string
}

const faqs: FaqItem[] = [
  {
    question: 'What is included in your ₹1,875/sq ft turnkey construction package?',
    answer:
      'Our turnkey rate is fully comprehensive: complete architectural 2D & 3D vastu layouts, soil testing, foundation, RCC structural framework with Tata Tiscon steel, Ultratech cement, brickwork, plastering, premium electrical wiring, CPVC plumbing, vitrified tile flooring, internal & exterior painting, and full sanitary fixture installations.',
  },
  {
    question: 'How do you guarantee zero cost escalation during construction?',
    answer:
      'Before starting work, we deliver an itemized Bill of Quantities (BOQ) with locked material brands and specifications. As long as the structural design and material tiers remain unchanged, the total square-foot rate agreed upon in the contract is fixed from day one until key handover.',
  },
  {
    question: 'Do you assist with municipal building permits and plan sanctions in Tumkur?',
    answer:
      'Yes. Our in-house liaison and architectural team prepares the blueprint drawings strictly as per TUDA (Tumkur Urban Development Authority) and local Gram Panchayat bylaws, handling documentation and submission for fast-track approvals.',
  },
  {
    question: 'What is the average timeline to construct a 3BHK or 4BHK duplex house?',
    answer:
      'A typical 2,500 to 3,500 sq ft residential duplex takes between 6 to 9 months from excavation to final painting. We provide a milestone-linked timeline chart so you can track concrete curing, masonry, and finishing progress week by week.',
  },
  {
    question: 'Can we visit your ongoing and completed construction sites in Tumkur?',
    answer:
      'Absolutely! We actively encourage prospective home builders to visit our active sites in Tumkur, Gubbi, and Kunigal to inspect concrete quality, brickwork alignment, and interact with our on-site civil engineers firsthand.',
  },
]

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  const toggleFaq = (index: number) => {
    setOpenIdx((current) => (current === index ? null : index))
  }

  return (
    <section id="faqs" className="relative bg-white py-24 sm:py-32">
      <Container>
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 font-secondary text-xs sm:text-[0.8125rem] font-bold tracking-[0.16em] text-[#CE1C73] uppercase">
            <span
              aria-hidden="true"
              className="inline-block h-2 w-2 rounded-[2px] bg-[#CE1C73]"
            />
            FREQUENTLY ASKED QUESTIONS
          </div>

          <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.18] tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
            We&apos;re here to provide{' '}
            <span className="font-playfair italic">clear and helpful answers</span>
          </h2>
          <p className="mt-4 text-base text-slate-600 sm:text-lg">
            Everything you need to know about building your home with Sneha Construction in Tumkur.
          </p>
        </div>

        {/* Accordion List */}
        <div className="mx-auto mt-14 max-w-3xl space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-[18px] border border-slate-200 bg-white transition-all duration-200 hover:border-slate-300 shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="flex w-full items-center justify-between p-6 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-base font-semibold text-slate-900 sm:text-lg">
                    {faq.question}
                  </span>
                  <span
                    className={`ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#CE1C73] text-white' : ''
                    }`}
                  >
                    <ChevronDown size={18} strokeWidth={2.5} />
                  </span>
                </button>

                {isOpen && (
                  <div className="border-t border-slate-100 px-6 pt-4 pb-6 text-sm leading-relaxed text-slate-600 sm:text-base">
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
