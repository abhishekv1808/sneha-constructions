import { createBrowserClient } from '@supabase/ssr'

import { env } from '@/lib/env'

import type { Database } from './types'

/**
 * Browser client, for the handful of client components that talk to Supabase
 * directly. Carries the anon key, so it only ever sees what the RLS policies in
 * `supabase/migrations` allow — published content and active estimator rates.
 *
 * It cannot read or write `leads`; that table has no policy at all (§10).
 */
export function createSupabaseBrowserClient() {
  return createBrowserClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  )
}
