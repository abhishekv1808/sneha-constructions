import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import type { Metadata } from 'next'

import { ContactForm } from '@/components/sections/ContactForm'
import { Container, Rule } from '@/components/ui'
import { contact, serviceAreas, site } from '@/content'

// §12: unique title and description. Title pattern matches the root template.
export const metadata: Metadata = {
  title: 'Contact us',
  description: `Get a free quote or schedule a site visit. Call ${contact.phoneDisplay} or fill in the form — we serve ${serviceAreas.map((a) => a.name).join(', ')} and surrounding areas.`,
  alternates: { canonical: '/contact' },
}

/**
 * §7: /contact — Contact + form + map.
 *
 * Server component shell. The only client component is ContactForm, which has
 * form state and handlers (§9, §15). Everything else — headings, contact
 * details, the map iframe — is server-rendered.
 *
 * Layout: on desktop, a 12-column grid split 5/7 (contact details left, form
 * right). On mobile everything stacks. This matches the project's grid pattern
 * used in Services and the Hero.
 */
export default function ContactPage() {
  return (
    <>
      {/* JSON-LD — §12: LocalBusiness on the contact page with full NAP. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': ['LocalBusiness', 'GeneralContractor'],
            name: site.name,
            description: site.positioning,
            telephone: contact.phoneDisplay,
            email: contact.email,
            url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
            address: {
              '@type': 'PostalAddress',
              streetAddress: contact.address.street,
              addressLocality: contact.address.locality,
              addressRegion: contact.address.region,
              postalCode: contact.address.postalCode,
              addressCountry: contact.address.country,
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 13.3379,
              longitude: 77.1173,
            },
            openingHours: 'Mo-Sa 09:00-21:00',
            areaServed: serviceAreas.map((area) => ({
              '@type': 'City',
              name: area.name,
            })),
            priceRange: `From ₹${site.baseRateSqft}/sq ft`,
          }),
        }}
      />

      <section className="bg-plaster-100 py-24 md:py-32 lg:py-40">
        <Container>
          {/* §8.4's pattern: left-aligned heading with a short intro in the
              right column, deliberate departure from centred rhythm. */}
          <div className="grid grid-cols-12 gap-6 lg:gap-8">
            <div className="col-span-12 lg:col-span-6">
              <h1 className="max-w-[18ch] text-display-2 text-slate-900">Get in touch</h1>
            </div>
            <div className="col-span-12 lg:col-span-5 lg:col-start-8">
              <p className="max-w-[52ch] text-body-lg text-slate-600">
                Whether you&rsquo;re planning a new home, a commercial building or just have a
                question — we&rsquo;re here. Call, visit or fill in the form and we&rsquo;ll get
                back to you within one working day.
              </p>
            </div>
          </div>

          <Rule className="mt-12 lg:mt-16" />

          {/* Main content: contact details + map (left), form (right). */}
          <div className="mt-12 grid grid-cols-12 gap-12 lg:mt-16 lg:gap-8">
            {/* Left column — contact details and map. */}
            <div className="col-span-12 lg:col-span-5">
              <address className="flex flex-col gap-6 not-italic">
                <div className="flex gap-4">
                  <MapPin
                    size={20}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-oxide-600"
                  />
                  <div>
                    <p className="text-heading-4 text-slate-900">{contact.address.label}</p>
                    <p className="mt-2 text-body text-slate-600">
                      {contact.address.lines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Phone
                    size={20}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-oxide-600"
                  />
                  <div>
                    <p className="text-meta text-slate-600">Phone</p>
                    <a
                      href={contact.phoneHref}
                      className="mt-1 block text-body text-slate-900 transition-[color] duration-150 ease-out hover:text-oxide-600"
                    >
                      {contact.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Mail
                    size={20}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-oxide-600"
                  />
                  <div>
                    <p className="text-meta text-slate-600">Email</p>
                    <a
                      href={contact.emailHref}
                      className="mt-1 block text-body text-slate-900 transition-[color] duration-150 ease-out hover:text-oxide-600"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Clock
                    size={20}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-oxide-600"
                  />
                  <div>
                    <p className="text-meta text-slate-600">Working hours</p>
                    <p className="mt-1 text-body text-slate-900">{contact.hours}</p>
                  </div>
                </div>
              </address>

              {/* Google Maps embed — §14 Phase 0 notes coordinates as a client
                  blocker. Using approximate BG Patya Circle, Tumkur coordinates.
                  loading="lazy" keeps the iframe off the critical path (§13). */}
              <div className="mt-10 overflow-hidden rounded-card border border-plaster-200">
                <iframe
                  title="Sneha Construction office location on Google Maps"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.2!2d77.1173!3d13.3379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDIwJzE2LjQiTiA3N8KwMDcnMDIuMyJF!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Right column — the form. */}
            <div className="col-span-12 lg:col-span-6 lg:col-start-7">
              <h2 className="text-heading-3 text-slate-900">Send us a message</h2>
              <p className="mt-3 text-body text-slate-600">
                Phone is fastest — but if you prefer writing, we&rsquo;ll call you back.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
