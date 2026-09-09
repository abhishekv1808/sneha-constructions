import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// The §5.2 type scale ships as @utility rules named `text-<token>`, which
// collides with tailwind-merge's `text-*` parsing: it read `text-body-lg` as a
// TEXT COLOUR and silently dropped the `text-white` that came before it, so
// every size="lg" Button rendered slate-900 — invisible on an ink surface.
//
// Registering the tokens as font-size classes makes them conflict with each
// other, as intended, and leave colour alone.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'display-1',
            'display-2',
            'heading-3',
            'heading-4',
            'body-lg',
            'body',
            'body-sm',
            'meta',
            'numeral',
          ],
        },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
