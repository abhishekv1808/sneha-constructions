import { createClient, type SupabaseClient } from '@supabase/supabase-js'

import { env } from '@/lib/env'

import type { Database } from './types'

/**
 * Stateless anon client for cached public content reads.
 *
 * Why this exists alongside `createSupabaseServerClient`: `unstable_cache`
 * throws if its callback touches a dynamic data source, and the server client
 * awaits `cookies()`. Every fetcher in `queries.ts` runs inside a cache scope,
 * so it needs a client that reads no request state at all.
 *
 * That is also correct on the merits — published content is identical for every
 * visitor, so binding it to a session would be wrong even if it were allowed.
 * Anything that depends on who is asking must use the server client and must
 * not be cached.
 *
 * Held as a module singleton: no cookies, no session, nothing request-scoped to
 * leak between users.
 */
let client: SupabaseClient<Database> | null = null

export function getSupabaseAnonClient(): SupabaseClient<Database> {
  client ??= createClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    },
  )

  return client
}
