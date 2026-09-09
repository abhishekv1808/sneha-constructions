-- ---------------------------------------------------------------------------
-- Storage — CLAUDE.md §10.
--
-- Bucket `media`, public read, service-role write. Paths:
--   projects/<slug>/<uuid>.webp
--   services/<...>
--   materials/<...>
--   brand/<...>
--
-- How the two halves of "public read / service-role write" are actually
-- enforced, because neither is a policy you can see in the dashboard:
--
--   READ  — `public = true` serves every object under
--           /storage/v1/object/public/media/... without consulting RLS. That is
--           the path next/image hits via the Supabase loader, so no select
--           policy is required. Listing the bucket's contents still is not
--           possible for anon, which is what we want.
--
--   WRITE — storage.objects has RLS enabled by Supabase already, and this
--           migration adds NO insert, update or delete policy for anon or
--           authenticated. Nothing satisfies RLS, so uploads are refused for
--           everyone except the service-role key, which bypasses RLS entirely.
--           Adding an authenticated insert policy here would let any signed-up
--           user write into a bucket the whole internet can read.
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = excluded.public;
