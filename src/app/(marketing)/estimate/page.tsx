import type { Metadata } from 'next'
import { Container } from '@/components/ui'
import { SmartCostCalculator } from '@/components/tools/SmartCostCalculator'
import { VastuAdvisor } from '@/components/tools/VastuAdvisor'
import { LoanEmiCalculator } from '@/components/tools/LoanEmiCalculator'
import { contact, site } from '@/content'
import { Calculator, Compass, Landmark, ShieldCheck, Clock, Award, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'House Construction Cost Calculator & Vastu Tools | Sneha Construction Tumkur',
  description:
    'Calculate exact house construction costs in Tumkur for 30x40, 30x50, and 40x60 plots. Explore 100% Vastu direction guidelines and calculate bank construction loan EMIs. Get free itemized BOQ.',
  keywords: [
    'house construction cost calculator tumkur',
    '30x40 house construction cost karnataka',
    'turnkey construction rate tumkur',
    'vastu plot direction advisor karnataka',
    'construction loan emi calculator sbi hdfc',
    'sneha construction tools',
  ],
}

export default function EstimatePage() {
  return (
    <div className="bg-[#F8F9FA] pb-24 text-slate-900">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-slate-900 py-16 text-white sm:py-20 lg:py-24">
        {/* Subtle decorative grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />

        <Container className="relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-pink-400/30 bg-pink-950/40 px-3.5 py-1 font-secondary text-xs font-bold tracking-[0.16em] text-[#FF65A8] uppercase backdrop-blur-md">
              <span className="inline-block h-2 w-2 rounded-full bg-[#FF65A8]" />
              INTERACTIVE PLANNING SUITE
            </div>

            <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Plan Your Dream Home with Precision &amp; Complete Transparency
            </h1>

            <p className="mt-4 text-base text-slate-300 sm:text-lg">
              Calculate instant turnkey budgets for Karnataka standard plots, verify cosmic Vastu
              alignments, and estimate your monthly bank construction loan EMIs.
            </p>

            {/* Quick Stats */}
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-8 sm:grid-cols-4">
              <div>
                <p className="font-display text-2xl font-black text-[#FF65A8]">₹1,875</p>
                <p className="text-xs text-slate-400">Turnkey Base / sq ft</p>
              </div>
              <div>
                <p className="font-display text-2xl font-black text-white">100%</p>
                <p className="text-xs text-slate-400">Vastu Compliant Layouts</p>
              </div>
              <div>
                <p className="font-display text-2xl font-black text-white">0%</p>
                <p className="text-xs text-slate-400">Escalation Guarantee</p>
              </div>
              <div>
                <p className="font-display text-2xl font-black text-white">25+ Yrs</p>
                <p className="text-xs text-slate-400">Tumkur Civil Legacy</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Tools Container */}
      <Container className="mt-12 space-y-16 sm:mt-16 sm:space-y-20">
        {/* Tool 1: Smart Cost Calculator */}
        <div id="cost-calculator">
          <div className="mb-4 flex items-center gap-2 text-xs font-bold tracking-wider text-[#CE1C73] uppercase">
            <Calculator size={16} />
            <span>TOOL 1 · INSTANT COST ESTIMATOR</span>
          </div>
          <SmartCostCalculator />
        </div>

        {/* Tool 2: Vastu Advisor */}
        <div id="vastu-advisor">
          <div className="mb-4 flex items-center gap-2 text-xs font-bold tracking-wider text-[#CE1C73] uppercase">
            <Compass size={16} />
            <span>TOOL 2 · 8-DIRECTION VASTU ADVISOR</span>
          </div>
          <VastuAdvisor />
        </div>

        {/* Tool 3: Construction Loan & EMI Calculator */}
        <div id="loan-calculator">
          <div className="mb-4 flex items-center gap-2 text-xs font-bold tracking-wider text-[#CE1C73] uppercase">
            <Landmark size={16} />
            <span>TOOL 3 · BANK CONSTRUCTION LOAN &amp; EMI</span>
          </div>
          <LoanEmiCalculator />
        </div>

        {/* Why Trust Sneha Section */}
        <section className="rounded-[24px] border border-slate-200 bg-white p-8 sm:p-12 shadow-sm">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
              Why Homeowners Across Tumkur Choose Sneha Construction
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Unlike generic contractors who provide rough estimates and inflate bills midway, our turnkey contracts guarantee zero price escalations.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#CE1C73] text-white">
                <ShieldCheck size={20} />
              </div>
              <h3 className="mt-4 font-display text-base font-bold text-slate-900">
                Tier-1 Certified Materials
              </h3>
              <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                We only source Tata Tiscon / Jindal FE-550D steel, 53-grade Ultratech cement, Finolex plumbing, and premium vitrified tiles with batch verification.
              </p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#CE1C73] text-white">
                <Clock size={20} />
              </div>
              <h3 className="mt-4 font-display text-base font-bold text-slate-900">
                Milestone-Based Delivery
              </h3>
              <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                Payments are linked strictly to physical milestone handovers. You inspect and approve each stage before disbursing next-phase funds.
              </p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#CE1C73] text-white">
                <Award size={20} />
              </div>
              <h3 className="mt-4 font-display text-base font-bold text-slate-900">
                5-Year Structural Warranty
              </h3>
              <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                Complete structural guarantee protecting against dampness, settlement cracks, plumbing leakages, and weather degradation.
              </p>
            </div>
          </div>

          {/* Need help banner */}
          <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl bg-slate-900 p-6 text-white sm:flex-row sm:p-8">
            <div>
              <h4 className="font-display text-lg font-bold sm:text-xl">
                Need an Architect to Inspect Your Site in Tumkur?
              </h4>
              <p className="mt-1 text-xs text-slate-300">
                We offer free soil assessment, dimension cross-checks, and custom 3D elevation renders.
              </p>
            </div>

            <a
              href={contact.phoneHref}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#CE1C73] px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-[#B81564] transition-all"
            >
              <Phone size={15} />
              <span>Call: {contact.phoneDisplay}</span>
            </a>
          </div>
        </section>
      </Container>
    </div>
  )
}
