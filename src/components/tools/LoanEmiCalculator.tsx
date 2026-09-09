'use client'

import React, { useState, useId } from 'react'
import {
  Landmark,
  BadgePercent,
  Calendar,
  Wallet,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  HelpCircle,
  FileCheck,
} from 'lucide-react'
import { formatINR } from '@/lib/utils/format'
import { useQuoteModal } from '@/components/providers/QuoteModalProvider'
import { site, whatsappUrl } from '@/content'

const APPROVED_BANKS = [
  { name: 'State Bank of India (SBI)', rate: '8.50% – 8.75%' },
  { name: 'HDFC Bank', rate: '8.70% – 8.95%' },
  { name: 'Canara Bank (Tumkur)', rate: '8.60% – 8.85%' },
  { name: 'ICICI Bank', rate: '8.75% – 9.00%' },
]

export function LoanEmiCalculator() {
  const { openQuoteModal } = useQuoteModal()
  const budgetSliderId = useId()
  const tenureSliderId = useId()
  const interestSliderId = useId()

  const [budget, setBudget] = useState(4500000) // ₹45 Lakhs
  const [downPaymentPercent, setDownPaymentPercent] = useState(20) // 20%
  const [interestRate, setInterestRate] = useState(8.65) // 8.65%
  const [tenureYears, setTenureYears] = useState(20) // 20 Years

  // Financial calculations
  const downPaymentAmount = Math.round(budget * (downPaymentPercent / 100))
  const loanPrincipal = budget - downPaymentAmount

  const monthlyRate = interestRate / 12 / 100
  const totalMonths = tenureYears * 12

  // EMI formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
  const emi = Math.round(
    (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1),
  )

  const totalPayment = emi * totalMonths
  const totalInterest = totalPayment - loanPrincipal

  const principalPercent = Math.round((loanPrincipal / totalPayment) * 100)
  const interestPercent = 100 - principalPercent

  const handleApplyLoanEstimate = () => {
    openQuoteModal({
      serviceType: 'Turnkey',
      estimatedCost: formatINR(budget),
      source: 'Bank Construction Loan Calculator',
      message: `Construction Budget: ${formatINR(budget)} | Down Payment: ${downPaymentPercent}% (${formatINR(downPaymentAmount)}) | Loan: ${formatINR(loanPrincipal)} | Tenure: ${tenureYears} Years @ ${interestRate}% (Est. EMI: ${formatINR(emi)}/mo). Requesting Bank Sanction BOQ & approved civil contractor documentation.`,
    })
  }

  const waLoanMessage = `Hi ${site.shortName}, I calculated my construction loan on your website:
• *Total Budget:* ${formatINR(budget)}
• *Loan Amount Required:* ${formatINR(loanPrincipal)}
• *Tenure:* ${tenureYears} Years @ ${interestRate}%
• *Estimated EMI:* ${formatINR(emi)}/month

Can you provide the stage-wise estimation & approved contractor documentation for bank sanction in Tumkur?`

  return (
    <div className="w-full rounded-[24px] border border-slate-200 bg-white p-6 shadow-xl sm:p-8 lg:p-10">
      {/* Header */}
      <div className="flex flex-col gap-3 pb-6 border-b border-slate-100 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#CE1C73] text-white shadow-sm">
            <Landmark size={22} strokeWidth={2.2} />
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-slate-900 sm:text-2xl">
              Construction Loan &amp; EMI Estimator
            </h3>
            <p className="text-xs text-slate-500">
              Calculate monthly installments and down payments for turnkey home construction in Tumkur
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-full self-start sm:self-auto">
          <FileCheck size={14} />
          <span>Stage-Wise Bank BOQ Documentation</span>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* Left Column: Sliders (7 cols) */}
        <div className="space-y-6 lg:col-span-7">
          {/* 1. Total Construction Budget */}
          <div>
            <div className="flex items-baseline justify-between">
              <label htmlFor={budgetSliderId} className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-slate-700 uppercase">
                <Wallet size={14} className="text-[#CE1C73]" />
                <span>Estimated Construction Budget</span>
              </label>
              <span className="font-display text-2xl font-extrabold text-[#CE1C73]">
                {formatINR(budget)}
              </span>
            </div>
            <input
              id={budgetSliderId}
              type="range"
              min="1500000"
              max="20000000"
              step="100000"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-[#CE1C73]"
            />
            <div className="mt-1 flex justify-between text-[11px] text-slate-400">
              <span>₹15 Lakhs</span>
              <span>₹1 Crore</span>
              <span>₹2 Crores</span>
            </div>
          </div>

          {/* 2. Down Payment Percentage */}
          <div>
            <div className="flex items-baseline justify-between">
              <label className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-slate-700 uppercase">
                <BadgePercent size={14} className="text-[#CE1C73]" />
                <span>Down Payment (Self Funding): {downPaymentPercent}%</span>
              </label>
              <span className="font-display text-base font-bold text-slate-800">
                {formatINR(downPaymentAmount)}
              </span>
            </div>
            <div className="mt-2.5 grid grid-cols-4 gap-2">
              {[10, 20, 25, 30].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setDownPaymentPercent(pct)}
                  className={`rounded-xl border py-2 text-xs font-semibold transition-all ${
                    downPaymentPercent === pct
                      ? 'border-2 border-[#CE1C73] bg-[#CE1C73]/5 text-[#CE1C73]'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {pct}% ({formatINR(Math.round(budget * (pct / 100)))})
                </button>
              ))}
            </div>
            <p className="mt-1.5 text-[11px] text-slate-400">
              Banks typically sanction 75% – 85% of total construction cost against verified civil estimates.
            </p>
          </div>

          {/* 3. Loan Tenure */}
          <div>
            <div className="flex items-baseline justify-between">
              <label htmlFor={tenureSliderId} className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-slate-700 uppercase">
                <Calendar size={14} className="text-[#CE1C73]" />
                <span>Loan Tenure: {tenureYears} Years ({tenureYears * 12} Months)</span>
              </label>
            </div>
            <input
              id={tenureSliderId}
              type="range"
              min="5"
              max="30"
              step="1"
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-[#CE1C73]"
            />
            <div className="mt-1 flex justify-between text-[11px] text-slate-400">
              <span>5 Years</span>
              <span>15 Years</span>
              <span>30 Years</span>
            </div>
          </div>

          {/* 4. Interest Rate */}
          <div>
            <div className="flex items-baseline justify-between">
              <label htmlFor={interestSliderId} className="text-xs font-bold tracking-wider text-slate-700 uppercase">
                Indicative Interest Rate (% p.a.)
              </label>
              <span className="font-display text-base font-bold text-slate-900">
                {interestRate}%
              </span>
            </div>
            <input
              id={interestSliderId}
              type="range"
              min="7.5"
              max="12.0"
              step="0.05"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-[#CE1C73]"
            />
          </div>

          {/* Bank Tie-ups Note */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-bold text-slate-800 uppercase">
              Current Benchmark Rates in Tumkur:
            </p>
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-slate-600 sm:grid-cols-2">
              {APPROVED_BANKS.map((b, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-lg bg-white p-2 border border-slate-200/80">
                  <span className="font-medium truncate">{b.name}</span>
                  <span className="font-bold text-slate-900 shrink-0 ml-1">{b.rate}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: EMI Output & Sanction Assistance Card (5 cols) */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-[#FBFBFC] p-6 shadow-inner lg:col-span-5 sm:p-8">
          <div>
            <div className="pb-4 border-b border-slate-200">
              <span className="text-xs font-bold text-slate-500 uppercase">Estimated Monthly Installment:</span>
              <p className="mt-2 font-display text-4xl font-extrabold tracking-tight text-[#CE1C73] sm:text-5xl">
                {formatINR(emi)} <span className="text-xs font-normal text-slate-500">/ month</span>
              </p>
            </div>

            {/* Financial Summary Breakdown */}
            <div className="mt-6 space-y-3 rounded-xl border border-slate-200/80 bg-white p-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">Loan Principal (Bank Funding):</span>
                <span className="font-bold text-slate-900">{formatINR(loanPrincipal)}</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">Down Payment (Self Funded):</span>
                <span className="font-bold text-slate-900">{formatINR(downPaymentAmount)}</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">Total Interest Payable:</span>
                <span className="font-bold text-amber-700">{formatINR(totalInterest)}</span>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 font-bold">
                <span className="text-slate-800">Total Payment (Principal + Interest):</span>
                <span className="text-slate-900">{formatINR(totalPayment)}</span>
              </div>

              {/* Visual Proportion Bar */}
              <div className="pt-2">
                <div className="flex justify-between text-[11px] text-slate-500 pb-1">
                  <span>Principal: {principalPercent}%</span>
                  <span>Interest: {interestPercent}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 flex">
                  <div className="h-full bg-[#CE1C73]" style={{ width: `${principalPercent}%` }} />
                  <div className="h-full bg-slate-400" style={{ width: `${interestPercent}%` }} />
                </div>
              </div>
            </div>

            {/* Stage-wise Disbursement Highlight */}
            <div className="mt-6 space-y-2 rounded-xl bg-indigo-50/70 p-3.5 text-xs text-indigo-950 border border-indigo-100">
              <p className="font-bold flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-indigo-600 shrink-0" />
                <span>How Construction Loans Disburse:</span>
              </p>
              <p className="text-[11px] text-indigo-900/80 leading-relaxed">
                Banks release funds in 5–6 milestones (Foundation, Plinth, Lintel, Roof Slab, Plastering, Handover) based on site engineer inspection certificates. Sneha handles all bank documentation and stage audits.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 space-y-3">
            <a
              href={whatsappUrl(waLoanMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#20ba59]"
            >
              <MessageCircle size={18} />
              <span>Discuss Loan BOQ on WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={handleApplyLoanEstimate}
              className="group flex w-full items-center justify-center rounded-full bg-[#CE1C73] py-3 text-sm font-bold text-white shadow-md shadow-[#CE1C73]/20 transition-all hover:bg-[#B81564]"
            >
              <span>Get Bank Sanction Support</span>
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
