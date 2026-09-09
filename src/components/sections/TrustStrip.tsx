import { CalendarCheck, DraftingCompass, Layers, Receipt } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { Container } from '@/components/ui'
import { pillars } from '@/content'

/**
 * §8.3 — one quiet row on plaster-100, hairline top and bottom. No cards, no
 * boxes, no shadows, no entrance animation: the whole point is that it reads as
 * a rule of text rather than a component.
 *
 * The four pillars are the §2 proof spine and live in the static content module,
 * not Supabase — they are distilled from the brand vision rather than being
 * client-editable rows, and there is no table for them.
 *
 * ⚠ These same four phrases also render in the hero's third card (§8.2, where
 * they stand in for the proof card until the client supplies real counts), so
 * they currently appear twice within one viewport. The fix is to swap the hero
 * card back to the proof card once the numbers land, at which point this strip
 * becomes their only appearance.
 */
const icons: Record<string, LucideIcon> = {
  'Premium materials': Layers,
  'Transparent pricing': Receipt,
  'On-time delivery': CalendarCheck,
  'In-house engineers & architects': DraftingCompass,
}

export function TrustStrip() {
  return (
    <section
      aria-label="Why people choose us"
      className="border-y border-plaster-200 bg-plaster-100"
    >
      <Container>
        <ul className="flex flex-col gap-x-12 gap-y-4 py-8 sm:flex-row sm:flex-wrap sm:justify-between">
          {pillars.map((pillar) => {
            const Icon = icons[pillar] ?? Layers

            return (
              <li key={pillar} className="flex items-center gap-3 text-body-sm text-slate-600">
                <Icon
                  size={20}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="shrink-0 text-oxide-600"
                />
                {pillar}
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
