import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  RESEND_API_KEY: z.string().min(1),
  LEAD_NOTIFY_EMAIL: z.email(),
  REVALIDATE_SECRET: z.string().min(16),
  NEXT_PUBLIC_SITE_URL: z.url(),
})

// Next inlines NEXT_PUBLIC_* by literal reference only, so process.env cannot be
// spread or indexed dynamically here.
const parsed = envSchema.safeParse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  LEAD_NOTIFY_EMAIL: process.env.LEAD_NOTIFY_EMAIL,
  REVALIDATE_SECRET: process.env.REVALIDATE_SECRET,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
})

if (!parsed.success) {
  const detail = parsed.error.issues
    .map((issue) => `  ${issue.path.join('.')}: ${issue.message}`)
    .join('\n')

  throw new Error(`Invalid environment variables — see .env.example and CLAUDE.md §10:\n${detail}`)
}

export const env = parsed.data

export type Env = typeof env
