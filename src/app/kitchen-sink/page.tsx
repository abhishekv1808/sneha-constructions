import type { Metadata } from 'next'

import { Button, Chip, Container, Input, Rule, Select, Textarea } from '@/components/ui'
import { formatINR, formatSqft } from '@/lib/utils/format'

import { MotionDemo } from './MotionDemo'

export const metadata: Metadata = {
  title: 'Kitchen sink',
  robots: { index: false, follow: false },
}

const buttonSizes = ['sm', 'md', 'lg'] as const
const towns = ['Tumkur', 'Gubbi', 'Kunigal', 'Sira', 'Tiptur']

function SectionHeading({ children, tone }: { children: string; tone: 'light' | 'dark' }) {
  return (
    <>
      <h2 className={tone === 'dark' ? 'text-heading-3 text-white' : 'text-heading-3'}>
        {children}
      </h2>
      <Rule tone={tone} className="mt-4 mb-8" />
    </>
  )
}

export default function KitchenSinkPage() {
  return (
    <main>
      {/* ---------------------------------------------------------------- */}
      {/* Light surface — plaster                                          */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-plaster-100 py-24">
        <Container>
          <p className="text-meta text-slate-600">Sneha Construction &amp; Developers</p>
          <h1 className="mt-2 text-display-2">UI primitives</h1>
          <p className="mt-4 max-w-[68ch] text-body-lg text-slate-600">
            Every primitive in every variant, on both surfaces. Tab through the page to check focus
            rings.
          </p>

          <div className="mt-20">
            <SectionHeading tone="light">Type scale — §5.2</SectionHeading>
            <div className="flex flex-col gap-8">
              <div>
                <p className="text-meta text-slate-400">display-1 · Bricolage 700 · wdth 85</p>
                <p className="mt-2 text-display-1">Homes built to last</p>
              </div>
              <div>
                <p className="text-meta text-slate-400">display-2 · Bricolage 600 · wdth 90</p>
                <p className="mt-2 text-display-2">Ask what goes into the walls</p>
              </div>
              <div>
                <p className="text-meta text-slate-400">heading-3 · Bricolage 600</p>
                <p className="mt-2 text-heading-3">Turnkey construction solutions</p>
              </div>
              <div>
                <p className="text-meta text-slate-400">heading-4 · Instrument Sans 600</p>
                <p className="mt-2 text-heading-4">Foundation &amp; structure</p>
              </div>
              <div>
                <p className="text-meta text-slate-400">body-lg · Instrument Sans 400</p>
                <p className="mt-2 max-w-[68ch] text-body-lg">
                  Residential, commercial and complete turnkey construction across Tumkur, Gubbi,
                  Kunigal, Sira and Tiptur.
                </p>
              </div>
              <div>
                <p className="text-meta text-slate-400">body · Instrument Sans 400</p>
                <p className="mt-2 max-w-[68ch] text-body">
                  We use only premium materials, keep pricing transparent, and deliver on time.
                </p>
              </div>
              <div>
                <p className="text-meta text-slate-400">body-sm · Instrument Sans 400</p>
                <p className="mt-2 max-w-[68ch] text-body-sm">
                  Duplex houses, farmhouses, bungalows, villas, apartments, PGs and hostels.
                </p>
              </div>
              <div>
                <p className="text-meta text-slate-400">meta · Instrument Sans 500</p>
                <p className="mt-2 text-meta">Monday – Saturday, 9:00 AM – 9:00 PM</p>
              </div>
              <div>
                <p className="text-meta text-slate-400">numeral · Bricolage 700 · tabular-nums</p>
                <p className="mt-2 text-numeral">{formatINR(1875000)}</p>
                <p className="mt-2 text-numeral">{formatSqft(2400)}</p>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <SectionHeading tone="light">Button</SectionHeading>
            <div className="flex flex-col gap-8">
              <div>
                <p className="mb-3 text-meta text-slate-400">primary</p>
                <div className="flex flex-wrap items-center gap-4">
                  {buttonSizes.map((size) => (
                    <Button key={size} variant="primary" size={size}>
                      Get a free quote
                    </Button>
                  ))}
                  <Button variant="primary" disabled>
                    Disabled
                  </Button>
                </div>
              </div>
              <div>
                <p className="mb-3 text-meta text-slate-400">secondary</p>
                <div className="flex flex-wrap items-center gap-4">
                  {buttonSizes.map((size) => (
                    <Button key={size} variant="secondary" size={size}>
                      Send us your plot details
                    </Button>
                  ))}
                  <Button variant="secondary" disabled>
                    Disabled
                  </Button>
                </div>
              </div>
              <div>
                <p className="mb-3 text-meta text-slate-400">
                  as a link — renders an anchor, same styling
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <Button href="tel:+918001480064" variant="primary">
                    Call +91 80014 80064
                  </Button>
                  <Button href="/estimate" variant="secondary">
                    Build cost estimator
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <SectionHeading tone="light">Chip</SectionHeading>
            <div className="flex flex-wrap items-center gap-3">
              <Chip selected>Residential</Chip>
              <Chip>Commercial</Chip>
              <Chip>Turnkey</Chip>
              {towns.map((town) => (
                <Chip key={town}>{town}</Chip>
              ))}
            </div>
          </div>

          <div className="mt-20">
            <SectionHeading tone="light">Form controls</SectionHeading>
            <div className="grid max-w-[640px] gap-6">
              <Input id="ks-name" label="Full name" placeholder="Your name" required />
              <Input
                id="ks-phone"
                label="Phone"
                type="tel"
                inputMode="tel"
                placeholder="98860 12345"
                hint="We call back within one working day."
                required
              />
              <Input
                id="ks-email"
                label="Email"
                type="email"
                defaultValue="not-an-email"
                error="Enter a valid email address, or leave this blank."
              />
              <Select id="ks-service" label="Service type" required defaultValue="">
                <option value="" disabled>
                  Choose one
                </option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="turnkey">Turnkey</option>
                <option value="site-visit">Site visit request</option>
                <option value="general">General enquiry</option>
              </Select>
              <Select id="ks-location" label="Location" error="Choose a town so we can route you.">
                <option value="">Choose a town</option>
                {towns.map((town) => (
                  <option key={town} value={town.toLowerCase()}>
                    {town}
                  </option>
                ))}
              </Select>
              <Textarea
                id="ks-message"
                label="Message"
                placeholder="Plot size, floors, and when you want to start."
                hint="Optional."
              />
              <Textarea
                id="ks-message-error"
                label="Message with error"
                error="That message was too long — keep it under 1000 characters."
              />
              <Input id="ks-disabled" label="Disabled input" defaultValue="Not editable" disabled />
            </div>
          </div>

          <div className="mt-20">
            <SectionHeading tone="light">Motion — §6</SectionHeading>
            <MotionDemo />
          </div>

          <div className="mt-20">
            <SectionHeading tone="light">Rule &amp; Container</SectionHeading>
            <Rule />
            <p className="mt-4 text-body-sm text-slate-600">
              1px hairline on plaster-200. The Container caps at 1240px with px-5 / md:px-8 /
              lg:px-12 gutters — the outer edge of this text is its gutter.
            </p>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Dark surface — ink                                               */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-ink-900 py-24 on-ink">
        <Container>
          <h2 className="text-display-2 text-white">On ink</h2>
          <p className="mt-4 max-w-[68ch] text-body-lg text-slate-400">
            Same primitives on ink-900. The focus ring switches to oxide-300 here — oxide-600 on ink
            measures 2.2:1 and fails the 3:1 floor for a graphical control.
          </p>

          <div className="mt-16">
            <SectionHeading tone="dark">Button</SectionHeading>
            <div className="flex flex-col gap-8">
              <div>
                <p className="mb-3 text-meta text-slate-400">dark (ghost)</p>
                <div className="flex flex-wrap items-center gap-4">
                  {buttonSizes.map((size) => (
                    <Button key={size} variant="dark" size={size}>
                      Send us your plot details
                    </Button>
                  ))}
                  <Button variant="dark" disabled>
                    Disabled
                  </Button>
                </div>
              </div>
              <div>
                <p className="mb-3 text-meta text-slate-400">
                  primary on ink — ring retinted by the section
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  {buttonSizes.map((size) => (
                    <Button key={size} variant="primary" size={size}>
                      Call +91 80014 80064
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <SectionHeading tone="dark">Type scale</SectionHeading>
            <p className="text-display-1 text-white">Built near you</p>
            <p className="mt-6 text-numeral text-oxide-300">{formatINR(1875)}</p>
            <p className="mt-2 text-body text-slate-400">per sq ft, Essential package</p>
          </div>

          <div className="mt-16">
            <SectionHeading tone="dark">Chip</SectionHeading>
            <div className="flex flex-wrap items-center gap-3">
              <Chip tone="dark" selected>
                Residential
              </Chip>
              <Chip tone="dark">Commercial</Chip>
              <Chip tone="dark">Turnkey</Chip>
              {towns.map((town) => (
                <Chip key={town} tone="dark">
                  {town}
                </Chip>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <SectionHeading tone="dark">Form controls</SectionHeading>
            <div className="grid max-w-[640px] gap-6">
              <Input
                id="ks-dark-name"
                tone="dark"
                label="Full name"
                placeholder="Your name"
                required
              />
              <Input
                id="ks-dark-phone"
                tone="dark"
                label="Phone"
                type="tel"
                placeholder="98860 12345"
                hint="We call back within one working day."
                required
              />
              <Input
                id="ks-dark-email"
                tone="dark"
                label="Email"
                defaultValue="not-an-email"
                error="Enter a valid email address, or leave this blank."
              />
              <Select id="ks-dark-location" tone="dark" label="Location">
                <option value="">Choose a town</option>
                {towns.map((town) => (
                  <option key={town} value={town.toLowerCase()}>
                    {town}
                  </option>
                ))}
              </Select>
              <Textarea
                id="ks-dark-message"
                tone="dark"
                label="Message"
                placeholder="Plot size, floors, and when you want to start."
              />
            </div>
          </div>

          <div className="mt-16">
            <SectionHeading tone="dark">Rule</SectionHeading>
            <Rule tone="dark" />
            <p className="mt-4 text-body-sm text-slate-400">1px hairline on ink-600.</p>
          </div>
        </Container>
      </section>
    </main>
  )
}
