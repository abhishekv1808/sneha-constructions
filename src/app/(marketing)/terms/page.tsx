import type { Metadata } from 'next'
import Link from 'next/link'
import {
  AlertCircle,
  Building,
  CheckCircle2,
  FileSpreadsheet,
  FileText,
  HardHat,
  HelpCircle,
  Landmark,
  MapPin,
  Phone,
  Scale,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react'

import { LegalPageShell, type TocItem } from '@/components/legal/LegalPageShell'
import { contact, site } from '@/content'

export const metadata: Metadata = {
  title: `Terms & Conditions | ${site.name}, Tumkur`,
  description:
    'Official Terms and Conditions for Sneha Construction & Developers, Tumkur. Outlining our online estimator usage, site visit protocols, turnkey contracting standards, and material specifications.',
  alternates: { canonical: '/terms' },
  openGraph: {
    title: `Terms & Conditions | ${site.name}`,
    description:
      'Official terms governing construction estimates, site visits, turnkey civil agreements, and warranty standards across Tumkur district.',
    url: '/terms',
    siteName: site.name,
    locale: 'en_IN',
    type: 'website',
  },
}

const tocItems: TocItem[] = [
  { id: 'acceptance', title: '1. Acceptance of Terms' },
  { id: 'platform-services', title: '2. Digital Services & Scope' },
  { id: 'estimates-disclaimer', title: '3. Online Cost Estimator & Quotes' },
  { id: 'site-visits-surveys', title: '4. Site Visits & Consultations' },
  { id: 'formal-contracts', title: '5. Bilateral Construction Contracts' },
  { id: 'materials-quality', title: '6. Material Brand Standards' },
  { id: 'intellectual-property', title: '7. Architectural Designs & IP' },
  { id: 'warranties-handover', title: '8. Handover & Defect Liability' },
  { id: 'force-majeure-delays', title: '9. Delays & Force Majeure' },
  { id: 'governing-law', title: '10. Governing Law & Jurisdiction' },
]

export default function TermsAndConditionsPage() {
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
            name: `Terms & Conditions | ${site.name}`,
            description:
              'Official Terms and Conditions governing construction inquiries, estimates, and contracting engagements with Sneha Construction & Developers in Tumkur, Karnataka.',
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/terms`,
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
                  name: 'Terms & Conditions',
                  item: `${process.env.NEXT_PUBLIC_SITE_URL}/terms`,
                },
              ],
            },
          }),
        }}
      />

      <LegalPageShell
        title="Terms & Conditions"
        badge="Legal & Contractual Standards"
        effectiveDate={effectiveDate}
        lastUpdated={lastUpdated}
        lead="Welcome to Sneha Construction & Developers. These Terms and Conditions govern your use of our digital platform, online cost estimators, architectural consultation requests, and subsequent construction engagements across Tumkur and Karnataka."
        tocItems={tocItems}
        alternateLegalLink={{
          label: 'Privacy Policy',
          href: '/privacy-policy',
        }}
      >
        <div className="space-y-12 text-slate-700 leading-relaxed">
          {/* 1. Acceptance */}
          <section id="acceptance" className="scroll-mt-28 space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FDF2F8] text-xs font-bold text-[#CE1C73]">
                01
              </span>
              <h2 className="font-display text-2xl font-bold text-slate-900">
                Acceptance of Terms &amp; Entity Identification
              </h2>
            </div>
            <p>
              By accessing our website (
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-800">
                snehaconstruction.com
              </code>
              ), interacting with our digital cost estimators, submitting inquiries, or booking on-site
              engineering consultations, you acknowledge having read, understood, and agreed to be
              bound by these Terms and Conditions.
            </p>
            <p>
              These Terms constitute a legally valid agreement between you (&ldquo;Client&rdquo;,
              &ldquo;User&rdquo;, or &ldquo;You&rdquo;) and <strong>{site.name}</strong>{' '}
              (&ldquo;Sneha Construction&rdquo;, &ldquo;Company&rdquo;, &ldquo;we&rdquo;, or
              &ldquo;us&rdquo;), having our corporate office at {contact.address.street},{' '}
              {contact.address.locality}, {contact.address.region} – {contact.address.postalCode},
              Karnataka, India.
            </p>
            <p className="text-sm text-slate-600">
              If you do not agree with any provision of these Terms, please refrain from using our
              website and digital calculation tools.
            </p>
          </section>

          {/* 2. Platform Services */}
          <section id="platform-services" className="scroll-mt-28 space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FDF2F8] text-xs font-bold text-[#CE1C73]">
                02
              </span>
              <h2 className="font-display text-2xl font-bold text-slate-900">
                Digital Platform Services &amp; Information
              </h2>
            </div>
            <p>
              Our website provides educational material, architectural portfolios, material
              specification breakdowns, and interactive cost calculation tools for property owners
              planning residential or commercial construction in Tumkur, Gubbi, Kunigal, Sira, Tiptur,
              and neighboring regions.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                <span className="font-bold text-slate-900 block text-sm mb-1">Residential Builds</span>
                Turnkey duplexes, villas, farmhouses, and rental units built from ₹{site.baseRateSqft}/sq.ft.
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                <span className="font-bold text-slate-900 block text-sm mb-1">Commercial Spaces</span>
                Engineered office complexes, schools, healthcare clinics, and shopping centers.
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                <span className="font-bold text-slate-900 block text-sm mb-1">3D Architecture</span>
                Vastu-compliant 2D architectural plans, 3D exterior elevations, and structural drawings.
              </div>
            </div>
          </section>

          {/* 3. Estimates Disclaimer */}
          <section id="estimates-disclaimer" className="scroll-mt-28 space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FDF2F8] text-xs font-bold text-[#CE1C73]">
                03
              </span>
              <h2 className="font-display text-2xl font-bold text-slate-900">
                Nature of Online Estimates &amp; Cost Calculators
              </h2>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-5 text-amber-950 text-sm">
              <div className="flex items-center gap-2 font-bold text-amber-900">
                <AlertCircle className="h-5 w-5 text-amber-700 shrink-0" />
                Important Notice on Digital Estimates
              </div>
              <p className="mt-2 text-xs leading-relaxed text-amber-900">
                All numbers generated by our Build Cost Estimator, square-foot price calculators, or
                automated WhatsApp quotes are <strong>indicative planning estimates</strong> based on
                standard specifications (e.g., ₹{site.baseRateSqft}/sq.ft. base package). They do not
                constitute a legally binding tender, formal contract, or fixed price commitment until
                a detailed physical site survey, soil assessment, and bilateral construction contract
                are executed.
              </p>
            </div>
            <p className="text-sm text-slate-600">
              Actual final project cost may adjust depending on:
            </p>
            <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside">
              <li>
                <strong>Foundation depth &amp; soil strata:</strong> Loose soil, high water table, or
                rock excavation requiring specialized column footings or pile foundations.
              </li>
              <li>
                <strong>Custom interior finishes:</strong> Upgrades to Italian marble, customized
                teakwood joinery, designer sanitary ware, or high-end home automation.
              </li>
              <li>
                <strong>Site topography:</strong> Sloping plots requiring retaining walls, basement
                excavation, or extended approach roads for concrete transit.
              </li>
              <li>
                <strong>Statutory municipal fees:</strong> Plan approval sanction fees, TUDA/Gram
                Panchayat betterment charges, BESCOM electrical deposits, and water board connections.
              </li>
            </ul>
          </section>

          {/* 4. Site Visits & Surveys */}
          <section id="site-visits-surveys" className="scroll-mt-28 space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FDF2F8] text-xs font-bold text-[#CE1C73]">
                04
              </span>
              <h2 className="font-display text-2xl font-bold text-slate-900">
                Site Visits &amp; Client Obligations
              </h2>
            </div>
            <p>
              When requesting a complimentary initial site inspection or structural assessment:
            </p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#CE1C73] shrink-0 mt-0.5" />
                <span>
                  <strong>Lawful Ownership &amp; Access:</strong> The client affirms that they are the
                  legal owner or authorized custodian of the parcel and have the legal right to grant
                  our engineers physical access.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#CE1C73] shrink-0 mt-0.5" />
                <span>
                  <strong>Boundary Verification:</strong> The client is responsible for identifying
                  accurate physical boundary corner stones and survey markers prior to excavation.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#CE1C73] shrink-0 mt-0.5" />
                <span>
                  <strong>Site Utility Cooperation:</strong> For ongoing construction, the client
                  facilitates electricity connection and water sources for concrete curing as agreed in
                  the contract schedule.
                </span>
              </li>
            </ul>
          </section>

          {/* 5. Formal Construction Contracts */}
          <section id="formal-contracts" className="scroll-mt-28 space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FDF2F8] text-xs font-bold text-[#CE1C73]">
                05
              </span>
              <h2 className="font-display text-2xl font-bold text-slate-900">
                Bilateral Construction Contracts &amp; Milestone Billing
              </h2>
            </div>
            <p>
              All physical construction work undertaken by Sneha Construction is governed by a
              formal, signed <strong>Turnkey Construction Works Agreement</strong> on non-judicial
              stamp paper, which overrides any preliminary website discussions.
            </p>
            <p className="text-sm text-slate-600">
              Our projects operate on a transparent, milestone-linked payment structure tied to
              verifiable on-site progress:
            </p>

            <div className="overflow-hidden rounded-xl border border-slate-200 text-xs sm:text-sm">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-slate-900 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Stage #</th>
                    <th className="p-3">Milestone Event</th>
                    <th className="p-3">Verification &amp; Deliverable</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-600">
                  <tr>
                    <td className="p-3 font-semibold text-slate-900">Stage 1</td>
                    <td className="p-3 font-medium text-slate-900">Booking &amp; Architectural Design</td>
                    <td className="p-3">Vastu floor plans, 3D elevations, soil survey</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-900">Stage 2</td>
                    <td className="p-3 font-medium text-slate-900">Foundation &amp; Plinth Level</td>
                    <td className="p-3">Excavation, PCC, column footings, plinth beam casting</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-900">Stage 3</td>
                    <td className="p-3 font-medium text-slate-900">RCC Slab Castings</td>
                    <td className="p-3">Steel reinforcement check, shuttering, machine-mix slab casting</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-900">Stage 4</td>
                    <td className="p-3 font-medium text-slate-900">Masonry &amp; Conduiting</td>
                    <td className="p-3">Red brick/solid block walls, electrical &amp; plumbing conduits</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-900">Stage 5</td>
                    <td className="p-3 font-medium text-slate-900">Plastering &amp; Flooring</td>
                    <td className="p-3">Internal/external plaster, vitrified tiles, bathroom waterproofing</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-900">Stage 6</td>
                    <td className="p-3 font-medium text-slate-900">Final Handover</td>
                    <td className="p-3">120-point quality audit checklist, paint coats, key handover</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 6. Material Brand Standards */}
          <section id="materials-quality" className="scroll-mt-28 space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FDF2F8] text-xs font-bold text-[#CE1C73]">
                06
              </span>
              <h2 className="font-display text-2xl font-bold text-slate-900">
                Material Brand Standards &amp; Batch Verification
              </h2>
            </div>
            <p>
              Sneha Construction strictly rejects ambiguous adjectives like &ldquo;best
              quality&rdquo; in favor of explicit, named manufacturers and certified grades:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl border border-slate-200 p-3.5 bg-slate-50">
                <span className="font-bold text-slate-900 block text-sm">Steel &amp; Cement</span>
                Tata Tiscon 550D / JSW Neosteel TMT; Ultratech 53-grade / Zuari / Birla Super cement.
              </div>
              <div className="rounded-xl border border-slate-200 p-3.5 bg-slate-50">
                <span className="font-bold text-slate-900 block text-sm">Plumbing &amp; Electrical</span>
                Astral / Supreme CPVC/PVC pipes; Finolex / KEI fire-resistant copper wiring.
              </div>
              <div className="rounded-xl border border-slate-200 p-3.5 bg-slate-50">
                <span className="font-bold text-slate-900 block text-sm">Finishing &amp; Paints</span>
                Asian Paints Apex Ultima exterior; double-charged vitrified tiles; First-quality Teak woodwork.
              </div>
              <div className="rounded-xl border border-slate-200 p-3.5 bg-slate-50">
                <span className="font-bold text-slate-900 block text-sm">Testing &amp; Invoices</span>
                Original manufacturer test certificates and delivery challans are maintained for client inspection.
              </div>
            </div>
          </section>

          {/* 7. Intellectual Property */}
          <section id="intellectual-property" className="scroll-mt-28 space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FDF2F8] text-xs font-bold text-[#CE1C73]">
                07
              </span>
              <h2 className="font-display text-2xl font-bold text-slate-900">
                Architectural Designs, Drawings &amp; Intellectual Property
              </h2>
            </div>
            <p>
              All 3D architectural renders, AutoCAD structural drawings, floor layouts, website text,
              and photographs created by Sneha Construction remain the exclusive intellectual
              property of {site.name}.
            </p>
            <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside">
              <li>
                Custom drawings prepared for a contracted client are licensed exclusively for the
                construction of that specific property.
              </li>
              <li>
                Drawings, elevations, or estimators may not be copied, reproduced, or handed to third-party
                contractors without our prior written authorization.
              </li>
            </ul>
          </section>

          {/* 8. Warranties & Handover */}
          <section id="warranties-handover" className="scroll-mt-28 space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FDF2F8] text-xs font-bold text-[#CE1C73]">
                08
              </span>
              <h2 className="font-display text-2xl font-bold text-slate-900">
                Project Handover &amp; Defect Liability Period
              </h2>
            </div>
            <p>
              Upon reaching substantial completion, our head civil engineer conducts a joint
              120-point quality audit with the property owner covering plumb line alignment, water
              proofing, electrical continuity, and fixture operation.
            </p>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 text-emerald-950 text-sm">
              <div className="flex items-center gap-2 font-bold text-emerald-900">
                <ShieldCheck className="h-5 w-5 text-emerald-700 shrink-0" />
                Defect Liability &amp; Structural Warranty
              </div>
              <p className="mt-1 text-xs text-emerald-900 leading-relaxed">
                All turnkey builds include a dedicated <strong>Defect Liability Period (DLP)</strong>{' '}
                as specified in your agreement, during which our maintenance engineers rectify any
                contractual defects or settlement hairline anomalies without additional labor fees.
              </p>
            </div>
          </section>

          {/* 9. Force Majeure & Delays */}
          <section id="force-majeure-delays" className="scroll-mt-28 space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FDF2F8] text-xs font-bold text-[#CE1C73]">
                09
              </span>
              <h2 className="font-display text-2xl font-bold text-slate-900">
                Delays &amp; Force Majeure
              </h2>
            </div>
            <p>
              While Sneha Construction prides itself on on-time milestone delivery, we shall not be
              held in default for delays arising from circumstances beyond reasonable civil engineering
              control (&ldquo;Force Majeure&rdquo;):
            </p>
            <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside">
              <li>Severe natural disruptions (unseasonal heavy monsoon rainfall, flooding)</li>
              <li>Statewide quarry strikes or transport embargoes impacting sand/aggregate supply</li>
              <li>Unforeseen delays in municipal TUDA or Gram Panchayat statutory plan approvals</li>
              <li>Disputes regarding boundary titles initiated by adjacent plot owners</li>
            </ul>
          </section>

          {/* 10. Governing Law & Dispute Resolution */}
          <section id="governing-law" className="scroll-mt-28 space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FDF2F8] text-xs font-bold text-[#CE1C73]">
                10
              </span>
              <h2 className="font-display text-2xl font-bold text-slate-900">
                Governing Law &amp; Exclusive Jurisdiction
              </h2>
            </div>
            <p>
              These Terms, digital service usage, and all underlying contractual agreements shall be
              governed by and construed in accordance with the <strong>laws of the Republic of India</strong>.
            </p>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Landmark className="h-5 w-5 text-slate-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-slate-900">Exclusive Jurisdiction</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-normal">
                    Any claim, suit, controversy, or legal proceeding arising out of these Terms, our
                    website, or construction contracting services shall be subject to the{' '}
                    <strong>exclusive jurisdiction of the competent civil courts at Tumkur, Karnataka</strong>.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 pt-3 border-t border-slate-200">
                <Scale className="h-5 w-5 text-slate-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-slate-900">Amicable Conciliation First</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-normal">
                    In the spirit of partnership, both parties agree to resolve any operational
                    disputes through good-faith technical conciliation with senior engineering
                    representatives before initiating formal legal proceedings.
                  </p>
                </div>
              </div>
            </div>

            {/* Official Contact for Legal Enquiries */}
            <div className="pt-4 text-xs text-slate-600 space-y-1">
              <p className="font-semibold text-slate-900">Official Legal Enquiries:</p>
              <p>{site.name}</p>
              <p>{contact.address.street}, {contact.address.locality}, {contact.address.region} – {contact.address.postalCode}</p>
              <p>Phone: <a href={contact.phoneHref} className="text-[#CE1C73] underline">{contact.phoneDisplay}</a> | Email: <a href={contact.emailHref} className="text-[#CE1C73] underline">{contact.email}</a></p>
            </div>
          </section>
        </div>
      </LegalPageShell>
    </>
  )
}
