import { materials, services } from './site'

export type NavChild = { href: string; label: string }
export type NavItem = { href: string; label: string; children?: readonly NavChild[] }

/** §8.1 — Home · About · Services ▾ · Materials ▾ · Projects · Contact. */
export const primaryNav: readonly NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  {
    href: '/services',
    label: 'Services',
    children: services.map((service) => ({
      href: `/services/${service.slug}`,
      label: service.name,
    })),
  },
  { href: '/blog', label: 'Blog' },
  {
    href: '/materials',
    label: 'Materials',
    children: materials.map((material) => ({
      href: `/materials/${material.slug}`,
      label: material.name,
    })),
  },
  { href: '/contact', label: 'Contact Us' },
]

/** Footer column 2 — §8.13. */
export const quickLinks: readonly NavChild[] = [
  { href: '/about', label: 'About us' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/estimate', label: 'Build cost estimator' },
  { href: '/contact', label: 'Contact' },
]

export const legalLinks: readonly NavChild[] = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms & Conditions' },
]

// Routes whose first section is a full-bleed photograph the header floats over
// (§8.1, §8.2). Everywhere else the header is opaque from the first pixel and
// the layout reserves its height.
export const heroRoutes: ReadonlySet<string> = new Set(['/', '/services/residential'])
