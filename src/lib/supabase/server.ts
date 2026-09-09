import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

import { env } from '@/lib/env'

import type { Database } from './types'

/**
 * Server client for Server Components, Route Handlers and Server Actions.
 * Anon key plus the request's cookies, so RLS still applies — this is not a
 * privileged client.
 *
 * Must be called per request. Never hoist the returned client to module scope:
 * it closes over one request's cookies and would leak a session between users.
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies()

  return createServerClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options)
            }
          } catch {
            // Server Components cannot set cookies. Safe to swallow: the only
            // writes here are auth token refreshes, and middleware refreshes
            // those on the next request.
          }
        },
      },
    },
  )
}
