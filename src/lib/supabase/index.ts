// `types.ts` is generated — run `pnpm db:types` after any migration, never edit
// it by hand. That script needs the CLI authenticated and the project linked:
//
//     npx supabase login
//     npx supabase link --project-ref hoeuizaapzehtkcfsvew
//
export { createSupabaseAdminClient } from './admin'
export { createSupabaseBrowserClient } from './client'
export { createSupabaseServerClient } from './server'
export type { Database, Json, Tables, TablesInsert, TablesUpdate } from './types'
