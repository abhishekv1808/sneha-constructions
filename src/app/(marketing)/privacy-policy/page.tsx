import type { Metadata } from 'next'
import Link from 'next/link'
import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  Database,
  FileCheck,
  Lock,
  Mail,
  MapPin,
  Phone,
  Scale,
  Shield,
  UserCheck,
} from 'lucide-react'

import { LegalPageShell, type TocItem } from '@/components/legal/LegalPageShell'
import { contact, site } from '@/content'

export const metadata: Metadata = {
  title: `Privacy Policy | ${site.name}, Tumkur`,
  description:
    'Official Privacy Policy for Sneha Construction & Developers, Tumkur. Understand how we collect, safeguard, and process your personal data, construction inquiries, and site details.',
  alternates: { canonical: '/privacy-policy' },
  openGraph: {
    title: `Privacy Policy | ${site.name}`,
    description:
      'Learn how Sneha Construction & Developers protects your personal information, site measurements, and project details.',
    url: '/privacy-policy',
    siteName: site.name,
    locale: 'en_IN',
    type: 'website',
  },
}

const tocItems: TocItem[] = [
  { id: 'introduction', title: '1. Introduction & Scope' },
  { id: 'information-collected', title: '2. Information We Collect' },
  { id: 'purpose-of-processing', title: '3. Purpose of Processing' },
  { id: 'legal-grounds', title: '4. Legal Basis (DPDP Act)' },
  { id: 'whatsapp-communications', title: '5. Direct & WhatsApp Inquiries' },
  { id: 'data-sharing-disclosure', title: '6. Third-Party Disclosures' },
  { id: 'security-retention', title: '7. Data Security & Retention' },
  { id: 'cookies-analytics', title: '8. Cookies & Digital Tracking' },
  { id: 'user-rights', title: '9. Your Statutory Rights' },
  { id: 'grievance-officer', title: '10. Grievance Officer & Contact' },
]

export default function PrivacyPolicyPage() {
  const effectiveDate = 'March 1, 2026'
  const lastUpdated = 'September 15, 2026'

  return (
    <>
      {/* Schema.org WebPage & Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: `Privacy Policy | ${site.name}`,
            description:
              'Official Privacy Policy and Data Protection declaration of Sneha Construction & Developers in Tumkur, Karnataka.',
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/privacy-policy`,
            publisher: {
              '@type': 'Organization',
              name: site.name,
              telephone: contact.phoneDisplay,
              email: contact.email,
              address: {
                '@type': 'PostalAddress',
                streetAddress: contact.address.street,
                addressLocality: contact.address.locality,
                addressRegion: contact.address.region,
                postalCode: contact.address.postalCode,
                addressCountry: contact.address.country,
              },
            },
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: `${process.env.NEXT_PUBLIC_SITE_URL}`,
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Privacy Policy',
                  item: `${process.env.NEXT_PUBLIC_SITE_URL}/privacy-policy`,
                },
              ],
            },
          }),
        }}
      />

      <LegalPageShell
        title="Privacy Policy"
        badge="Data Privacy & Protection"
        effectiveDate={effectiveDate}
        lastUpdated={lastUpdated}
        lead="Sneha Construction & Developers values your trust above all else. This Privacy Policy details the exact nature of data we collect through our website, online construction cost calculators, WhatsApp channels, and on-site engineering consultations, and how we protect that information."
        tocItems={tocItems}
        alternateLegalLink={{
          label: 'Terms & Conditions',
          href: '/terms',
        }}
      >
        <div className="space-y-12 text-slate-700 leading-relaxed">
          {/* 1. Introduction */}
          <section id="introduction" className="scroll-mt-28 space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FDF2F8] text-xs font-bold text-[#CE1C73]">
                01
              </span>
              <h2 className="font-display text-2xl font-bold text-slate-900">
                Introduction &amp; Scope
              </h2>
            </div>
            <p>
              This Privacy Policy applies to all personal data collected and processed by{' '}
              <strong>{site.name}</strong> (&ldquo;Sneha Construction&rdquo;, &ldquo;we&rdquo;,
              &ldquo;our&rdquo;, or &ldquo;us&rdquo;), having our registered principal place of
              business at {contact.address.street}, {contact.address.locality}, {contact.address.region} –{' '}
              {contact.address.postalCode}, Karnataka, India.
            </p>
            <p>
              This document governs your interactions with our website (
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-800">
                snehaconstruction.com
              </code>
              ), our Build Cost Estimator, online quotation request forms, direct phone and
              WhatsApp communications, and physical on-site consultations across Tumkur, Gubbi,
              Kunigal, Sira, Tiptur, and surrounding districts in Karnataka.
            </p>
            <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-4 text-sm text-blue-900">
              <p className="font-semibold flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-600" />
                Our Core Privacy Guarantee
              </p>
              <p className="mt-1 text-xs text-blue-800 leading-normal">
                We never sell, rent, monetize, or broker your personal information, architectural
                drawings, property dimensions, or financial budgets to third-party telemarketers or
                commercial brokers.
              </p>
            </div>
          </section>

          {/* 2. Information We Collect */}
          <section id="information-collected" className="scroll-mt-28 space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FDF2F8] text-xs font-bold text-[#CE1C73]">
                02
              </span>
              <h2 className="font-display text-2xl font-bold text-slate-900">
                Information We Collect
              </h2>
            </div>
            <p>
              We only collect information necessary to fulfill your architectural and civil
              construction requirements, generate accurate engineering estimates, and provide
              responsive client services.
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4">
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                <h3 className="font-semibold text-slate-900 text-sm flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-[#CE1C73]" />
                  A. Contact &amp; Personal Identifiers
                </h3>
                <ul className="mt-2 space-y-1.5 text-xs text-slate-600 list-disc list-inside">
                  <li>Full name of the property owner or representative</li>
                  <li>Active mobile telephone number</li>
                  <li>WhatsApp messaging identifier</li>
                  <li>Email address for technical proposals</li>
                  <li>Current mailing or residential address</li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                <h3 className="font-semibold text-slate-900 text-sm flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-[#CE1C73]" />
                  B. Property &amp; Project Specifications
                </h3>
                <ul className="mt-2 space-y-1.5 text-xs text-slate-600 list-disc list-inside">
                  <li>Site location (village, taluk, ward, pin code)</li>
                  <li>Plot dimensions (e.g., 30×40, 40×60, corner plots)</li>
                  <li>Floor requirement (G+1, G+2, Duplex, Commercial)</li>
                  <li>Approximate project budget &amp; expected start date</li>
                  <li>Soil type &amp; existing structural status (if applicable)</li>
                </ul>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 mt-3">
              <h3 className="font-semibold text-slate-900 text-sm flex items-center gap-2">
                <Database className="h-4 w-4 text-[#CE1C73]" />
                C. Automated &amp; Technical Usage Data
              </h3>
              <p className="mt-2 text-xs text-slate-600">
                When you browse our platform, our servers automatically log non-identifying
                telemetry including your Internet Protocol (IP) address, operating system, browser
                variety, referring search query, and navigation actions across our pages to enhance
                mobile usability and prevent denial-of-service abuse.
              </p>
            </div>
          </section>

          {/* 3. Purpose of Processing */}
          <section id="purpose-of-processing" className="scroll-mt-28 space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FDF2F8] text-xs font-bold text-[#CE1C73]">
                03
              </span>
              <h2 className="font-display text-2xl font-bold text-slate-900">
                Purpose of Processing Your Data
              </h2>
            </div>
            <p>
              We collect and process your information exclusively for legitimate business,
              operational, and engineering purposes, including:
            </p>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#CE1C73] shrink-0 mt-0.5" />
                <span>
                  <strong>Cost Estimation &amp; Bill of Quantities (BOQ):</strong> Generating
                  transparent material breakdowns, steel/cement volume projections, and turnkey cost
                  estimates based on our verified rate (starting at ₹{site.baseRateSqft}/sq.ft.).
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#CE1C73] shrink-0 mt-0.5" />
                <span>
                  <strong>Site Inspection &amp; Soil Feasibility:</strong> Scheduling our certified
                  civil engineers and architects to visit your site in Tumkur district to inspect
                  access, soil bearing capacity, and boundary geometry.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#CE1C73] shrink-0 mt-0.5" />
                <span>
                  <strong>Architectural Planning &amp; Approvals:</strong> Developing 2D Vastu
                  layouts, 3D exterior elevations, structural load calculations, and municipal plan
                  sanction paperwork.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#CE1C73] shrink-0 mt-0.5" />
                <span>
                  <strong>Contract Fulfillment &amp; Progress Updates:</strong> Communicating
                  construction milestone photographic reports, concrete curing logs, and stage billing
                  summaries.
                </span>
              </li>
            </ul>
          </section>

          {/* 4. Legal Grounds (DPDP Act) */}
          <section id="legal-grounds" className="scroll-mt-28 space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FDF2F8] text-xs font-bold text-[#CE1C73]">
                04
              </span>
              <h2 className="font-display text-2xl font-bold text-slate-900">
                Legal Basis under Indian Law (DPDP Act &amp; IT Act)
              </h2>
            </div>
            <p>
              Our processing practices comply strictly with the{' '}
              <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong>, the{' '}
              <strong>Information Technology Act, 2000 (as amended)</strong>, and the Information
              Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or
              Information) Rules, 2011.
            </p>
            <p>Our grounds for handling your personal information include:</p>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Scale className="h-5 w-5 text-slate-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-slate-900">Voluntary Consent</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    When you submit a contact form, request a callback, or input plot details in our
                    Build Cost Estimator, you provide clear affirmative consent for us to respond.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 pt-3 border-t border-slate-200">
                <FileCheck className="h-5 w-5 text-slate-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-slate-900">Contractual Performance</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Processing necessary to prepare architectural quotes, enter into formal turnkey
                    construction agreements, and execute physical civil works.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 5. WhatsApp & Communications */}
          <section id="whatsapp-communications" className="scroll-mt-28 space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FDF2F8] text-xs font-bold text-[#CE1C73]">
                05
              </span>
              <h2 className="font-display text-2xl font-bold text-slate-900">
                Direct &amp; WhatsApp Communications
              </h2>
            </div>
            <p>
              Many property owners in Tumkur prefer communicating via WhatsApp and direct telephone
              calls. When you click our official WhatsApp quick-link (
              <code className="text-xs bg-slate-100 px-1 py-0.5 rounded text-slate-800">
                wa.me/{contact.whatsappNumber}
              </code>
              ) or call {contact.phoneDisplay}:
            </p>
            <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside">
              <li>
                We only communicate directly regarding your specific house construction query,
                architectural plans, or schedule.
              </li>
              <li>We do not enroll you in spam broadcast lists without your explicit agreement.</li>
              <li>
                You may request immediate cessation of WhatsApp communications at any time simply by
                replying &ldquo;STOP&rdquo; or notifying our support staff.
              </li>
            </ul>
          </section>

          {/* 6. Third-Party Disclosures */}
          <section id="data-sharing-disclosure" className="scroll-mt-28 space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FDF2F8] text-xs font-bold text-[#CE1C73]">
                06
              </span>
              <h2 className="font-display text-2xl font-bold text-slate-900">
                Third-Party Disclosures &amp; Service Partners
              </h2>
            </div>
            <p>
              We only disclose relevant client information to trusted technical infrastructure
              partners who adhere to enterprise data protection protocols:
            </p>
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-100 text-slate-900 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Partner Category</th>
                    <th className="p-3">Purpose</th>
                    <th className="p-3">Data Handled</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-600">
                  <tr>
                    <td className="p-3 font-medium text-slate-900">Cloud Infrastructure (Supabase)</td>
                    <td className="p-3">Encrypted database storage for leads &amp; estimate logs</td>
                    <td className="p-3">Form inputs, contact details, site dimensions</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-slate-900">Email Gateway (Resend)</td>
                    <td className="p-3">Automated dispatch of estimate PDF copies &amp; confirmations</td>
                    <td className="p-3">Email address, client name, estimate summary</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-slate-900">Municipal Liaison Partners</td>
                    <td className="p-3">Plan sanction, TUDA/Gram Panchayat approval processing</td>
                    <td className="p-3">Site survey sketches, ownership deed copies (with client consent)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 7. Data Security & Retention */}
          <section id="security-retention" className="scroll-mt-28 space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FDF2F8] text-xs font-bold text-[#CE1C73]">
                07
              </span>
              <h2 className="font-display text-2xl font-bold text-slate-900">
                Data Security &amp; Retention Schedules
              </h2>
            </div>
            <p>
              We apply strict administrative, technical, and physical safeguards to prevent
              unauthorized access, accidental loss, or alteration of your personal data:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/60">
                <div className="flex items-center gap-2 font-semibold text-slate-900">
                  <Lock className="h-4 w-4 text-[#CE1C73]" />
                  Technical Protections
                </div>
                <p className="mt-2 text-xs text-slate-600 leading-normal">
                  All digital communication is secured with 256-bit Transport Layer Security (TLS/SSL).
                  Database access is restricted via Row Level Security (RLS) and environment-level
                  service role keys.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/60">
                <div className="flex items-center gap-2 font-semibold text-slate-900">
                  <FileCheck className="h-4 w-4 text-[#CE1C73]" />
                  Retention Schedules
                </div>
                <p className="mt-2 text-xs text-slate-600 leading-normal">
                  Casual estimate inquiries without active contracts are retained for 18 months to
                  facilitate follow-up queries. Executed building project records are retained for the
                  statutory warranty and taxation period (minimum 7 years).
                </p>
              </div>
            </div>
          </section>

          {/* 8. Cookies & Analytics */}
          <section id="cookies-analytics" className="scroll-mt-28 space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FDF2F8] text-xs font-bold text-[#CE1C73]">
                08
              </span>
              <h2 className="font-display text-2xl font-bold text-slate-900">
                Cookies &amp; Digital Tracking
              </h2>
            </div>
            <p>
              Our website uses basic session cookies necessary for page state retention and
              anonymous aggregate analytics to understand which guides and service pages are most
              helpful to visitors.
            </p>
            <p className="text-sm text-slate-600">
              We do not deploy invasive cross-site tracking cookies. You may disable cookies through
              your browser preferences; however, certain interactive tools such as the Step-by-Step
              Cost Calculator may require local storage to maintain your current inputs across tabs.
            </p>
          </section>

          {/* 9. User Statutory Rights */}
          <section id="user-rights" className="scroll-mt-28 space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FDF2F8] text-xs font-bold text-[#CE1C73]">
                09
              </span>
              <h2 className="font-display text-2xl font-bold text-slate-900">
                Your Statutory Rights as a Data Principal
              </h2>
            </div>
            <p>
              Under the Digital Personal Data Protection Act, 2023, you hold the following rights:
            </p>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="font-bold text-[#CE1C73]">•</span>
                <span>
                  <strong>Right to Access:</strong> Request a summary of the personal data and site
                  details we hold about you.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-[#CE1C73]">•</span>
                <span>
                  <strong>Right to Correction &amp; Erasure:</strong> Update outdated contact numbers
                  or request permanent deletion of your inquiry logs.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-[#CE1C73]">•</span>
                <span>
                  <strong>Right of Grievance Redressal:</strong> Submit a complaint regarding data
                  handling to our designated Grievance Officer.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-[#CE1C73]">•</span>
                <span>
                  <strong>Right to Nominate:</strong> Designate a representative to exercise your data
                  rights in the event of incapacity.
                </span>
              </li>
            </ul>
          </section>

          {/* 10. Grievance Officer & Contact */}
          <section id="grievance-officer" className="scroll-mt-28 space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FDF2F8] text-xs font-bold text-[#CE1C73]">
                10
              </span>
              <h2 className="font-display text-2xl font-bold text-slate-900">
                Grievance Officer &amp; Contact Details
              </h2>
            </div>
            <p>
              In accordance with Rule 5(9) of the Information Technology (Reasonable Security
              Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 and
              Section 6 of the DPDP Act 2023, our designated Grievance Officer is:
            </p>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 space-y-3 text-sm">
              <div className="font-bold text-slate-900 text-base">
                Customer Support &amp; Grievance Redressal Cell
              </div>
              <div className="text-slate-600 font-medium">
                {site.name}
              </div>
              <div className="space-y-1.5 text-slate-600 text-xs sm:text-sm">
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#CE1C73] shrink-0" />
                  <span>
                    {contact.address.street}, {contact.address.locality}, {contact.address.region} –{' '}
                    {contact.address.postalCode}, India
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#CE1C73] shrink-0" />
                  <a href={contact.phoneHref} className="text-slate-900 font-semibold hover:underline">
                    {contact.phoneDisplay}
                  </a>
                  <span className="text-slate-400">({contact.hoursShort})</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#CE1C73] shrink-0" />
                  <a href={contact.emailHref} className="text-slate-900 font-semibold hover:underline">
                    {contact.email}
                  </a>
                </p>
              </div>
              <p className="text-xs text-slate-500 pt-2 border-t border-slate-200">
                We acknowledge grievances within 48 hours and resolve verified concerns within 30
                business days of receipt.
              </p>
            </div>
          </section>
        </div>
      </LegalPageShell>
    </>
  )
}
