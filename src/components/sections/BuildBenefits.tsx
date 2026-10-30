import { Check, HardHat, MessageCircle, Phone, ReceiptText } from 'lucide-react'
import Image from 'next/image'
import type { ReactNode } from 'react'

import wallCuringPhoto from '@/assets/benefits/site-update-wall-curing.jpg'
import { Container } from '@/components/ui'
import { contact, whatsappUrl } from '@/content'
import { buildBenefits, type BuildBenefit } from '@/content/build-benefits'
import { cn } from '@/lib/utils/cn'

import {
  BuildBenefitsMotionScope,
  ChatSequence,
  LiveDot,
  PopIn,
  Reveal,
  SlabBar,
  StaggerList,
} from './BuildBenefitsMotion'

const ICONS = { payments: ReceiptText, engineer: HardHat, updates: MessageCircle } as const

/** Slabs drawn in the payment visual — mid-point of the promised 8–10. */
const SLAB_COUNT = 9
/** How many of them read as "paid so far" in the illustration. */
const SLABS_PAID = 4

/* ── Small visuals, one per benefit ──────────────────────────────────────── */

function PaymentSlabs() {
  return (
    <div className="rounded-2xl bg-white p-4 ring-1 ring-plaster-200 sm:p-5">
      <div className="flex items-baseline justify-between font-secondary text-xs text-slate-600">
        <span className="font-semibold text-slate-900">Your payment schedule</span>
        <span className="tabular-nums">8–10 slabs</span>
      </div>
      {/* The paid slabs fill one after another as the card scrolls in */}
      <SlabBar count={SLAB_COUNT} paid={SLABS_PAID} />
      <div className="mt-2 flex justify-between font-secondary text-[0.6875rem] text-slate-500">
        <span>Agreement</span>
        <span className="hidden sm:inline">Foundation</span>
        <span>Slabs</span>
        <span className="hidden sm:inline">Finishing</span>
        <span>Handover</span>
      </div>
    </div>
  )
}

function SiteEngineerCard() {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-plaster-200 sm:p-5">
      <span
        aria-hidden="true"
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-500 ring-1 ring-brand-100"
      >
        <HardHat size={22} strokeWidth={1.75} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-display text-sm font-semibold text-slate-900">Your site engineer</p>
        <p className="font-secondary text-xs text-slate-600">Assigned from day one to handover</p>
      </div>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 font-secondary text-[0.6875rem] font-semibold text-emerald-700">
        <LiveDot />
        On your site
      </span>
    </div>
  )
}

function WhatsAppPreview() {
  return (
    <figure className="overflow-hidden rounded-2xl bg-white ring-1 ring-plaster-200">
      <div className="flex items-center gap-2.5 border-b border-plaster-200 px-4 py-3">
        <span
          aria-hidden="true"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366] text-white"
        >
          <MessageCircle size={16} strokeWidth={2} />
        </span>
        <div>
          <p className="font-display text-sm font-semibold text-slate-900">
            Your house · Site updates
          </p>
          <p className="font-secondary text-[0.6875rem] text-slate-500">Sneha Construction</p>
        </div>
      </div>
      <div className="bg-plaster-50 p-3 sm:p-4">
        {/* Messages arrive one at a time, with a typing indicator between */}
        <ChatSequence
          messages={[
            // Photo message — a real site photo, so the caption describes what it shows
            <div
              key="photo"
              className="max-w-[78%] rounded-xl rounded-tl-sm bg-white p-1.5 shadow-sm"
            >
              <div className="relative aspect-video overflow-hidden rounded-lg bg-plaster-200">
                <Image
                  src={wallCuringPhoto}
                  alt="Site worker watering newly built concrete block walls to cure them"
                  fill
                  sizes="(min-width: 1024px) 400px, 70vw"
                  placeholder="blur"
                  className="object-cover"
                />
              </div>
              <p className="px-1.5 pt-1.5 pb-0.5 text-[0.8125rem] text-slate-700">
                Curing the new ground-floor block walls today. We keep them wet so they set strong.
              </p>
            </div>,
            <div
              key="next"
              className="max-w-[85%] rounded-xl rounded-tl-sm bg-white px-3 py-2 text-[0.8125rem] text-slate-700 shadow-sm"
            >
              Next up: plastering, once curing is done. We&rsquo;ll send photos as it starts.
            </div>,
          ]}
        />
      </div>
      <figcaption className="border-t border-plaster-200 px-4 py-2 font-secondary text-[0.6875rem] text-slate-500">
        Example of the updates you&rsquo;ll receive
      </figcaption>
    </figure>
  )
}

const VISUALS: Record<BuildBenefit['id'], ReactNode> = {
  payments: <PaymentSlabs />,
  engineer: <SiteEngineerCard />,
  updates: <WhatsAppPreview />,
}

/* ── Section ─────────────────────────────────────────────────────────────── */

/**
 * The three working promises — staged payments, one site engineer, WhatsApp
 * updates — as alternating image / text rows. Server component; the motion
 * (slide-ins, staggered checklists, filling payment slabs, a chat that types)
 * lives in the client islands in BuildBenefitsMotion.tsx. Image slots stay
 * empty (a plain panel) until `image` is set in content/build-benefits.ts.
 */
export function BuildBenefits() {
  return (
    <section
      id="how-we-build"
      aria-labelledby="how-we-build-heading"
      data-track-location="how-we-build"
      // overflow-x-clip: the image panels slide in from the sides, and must not
      // widen the page while they do. clip, not hidden, keeps sticky intact.
      className="overflow-x-clip bg-plaster-50 py-16 sm:py-24 lg:py-32"
    >
      <BuildBenefitsMotionScope>
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="inline-flex items-center gap-2 font-secondary text-[0.8125rem] font-semibold text-brand-500">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              How we build for you
            </p>
            <h2
              id="how-we-build-heading"
              className="mt-3 font-display text-[clamp(1.625rem,4vw,3rem)] leading-[1.1] font-semibold tracking-[-0.02em] text-slate-900"
            >
              Building a house, without the stress
            </h2>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-slate-600 sm:text-lg">
              Three things every Sneha homeowner gets, from the first payment to the day you move
              in.
            </p>
          </Reveal>

          <div className="mt-10 space-y-12 sm:mt-16 sm:space-y-20 lg:space-y-24">
            {buildBenefits.map((benefit, i) => {
              const Icon = ICONS[benefit.id]
              const flip = i % 2 === 1
              return (
                <article
                  key={benefit.id}
                  className="grid grid-cols-1 items-center gap-6 sm:gap-10 lg:grid-cols-2 lg:gap-16"
                >
                  {/* Image slot — an empty panel until a photo is added. Slides in
                    from its own side of the row. */}
                  <Reveal from={flip ? 'right' : 'left'} scale className={cn(flip && 'lg:order-2')}>
                    <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-plaster-200/70 ring-1 ring-plaster-200 sm:aspect-[4/3]">
                      {benefit.image && (
                        <Image
                          src={benefit.image}
                          alt={benefit.imageAlt}
                          fill
                          sizes="(min-width: 1024px) 560px, 100vw"
                          className="object-cover"
                        />
                      )}
                    </div>
                  </Reveal>

                  <Reveal delay={0.1} className={cn(flip && 'lg:order-1')}>
                    <div className="flex items-center gap-3">
                      <PopIn className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-500 text-white">
                        <Icon aria-hidden="true" size={20} strokeWidth={1.75} />
                      </PopIn>
                      <span className="font-secondary text-sm font-semibold text-slate-400 tabular-nums">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-[1.375rem] leading-snug font-semibold text-slate-900 sm:text-[1.75rem]">
                      {benefit.title}
                    </h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-slate-600 sm:text-base">
                      {benefit.text}
                    </p>
                    <StaggerList
                      items={benefit.points}
                      className="mt-5 space-y-2.5"
                      itemClassName="flex gap-2.5 text-sm text-slate-700"
                      icon={
                        <Check
                          aria-hidden="true"
                          size={18}
                          strokeWidth={2}
                          className="mt-px shrink-0 text-brand-500"
                        />
                      }
                    />
                    <Reveal delay={0.3} className="mt-6">
                      {VISUALS[benefit.id]}
                    </Reveal>
                  </Reveal>
                </article>
              )
            })}
          </div>

          <Reveal className="mt-14 flex flex-col items-center gap-3 text-center sm:mt-20">
            <p className="font-display text-lg font-semibold text-slate-900 sm:text-xl">
              Have a question about payments or updates?
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={whatsappUrl(
                  'Hi Sneha Construction, I would like to know more about your payment slabs and site updates.',
                )}
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-emerald-700 px-5 font-secondary text-sm font-semibold text-white transition-colors duration-150 hover:bg-emerald-800"
              >
                <MessageCircle aria-hidden="true" size={17} strokeWidth={2} />
                Ask on WhatsApp
              </a>
              <a
                href={contact.phoneHref}
                className="inline-flex min-h-11 items-center gap-2 rounded-full px-5 font-secondary text-sm font-semibold text-slate-900 ring-1 ring-plaster-300 transition-colors duration-150 hover:bg-white"
              >
                <Phone aria-hidden="true" size={16} strokeWidth={1.75} />
                <span className="tabular-nums">{contact.phoneDisplay}</span>
              </a>
            </div>
          </Reveal>
        </Container>
      </BuildBenefitsMotionScope>
    </section>
  )
}
