-- ---------------------------------------------------------------------------
-- Hardening: move is_admin() out of the PostgREST-exposed schema.
--
-- Supabase's security linter flagged public.is_admin() twice
-- (0028 / 0029): anything in `public` is reachable as an RPC endpoint, so
-- `POST /rest/v1/rpc/is_admin` was callable by anon and by any signed-in user.
--
-- The exposure was mild — the function only reports whether the *caller* is an
-- admin, and being SECURITY DEFINER it reads nothing else — but there is no
-- reason to publish it, and a clean advisor report is worth more than the
-- convenience of leaving it in `public`.
--
-- Revoking EXECUTE from `authenticated` is NOT an option: RLS policy
-- expressions are evaluated as the querying role, so that would break every
-- "admins write ..." policy. Moving the function to a schema PostgREST does not
-- expose achieves the same thing without that trade.
--
-- No policy semantics change here. Each policy is re-pointed at the same
-- predicate under its new name.
-- ---------------------------------------------------------------------------

create schema if not exists private;

-- authenticated needs USAGE + EXECUTE for the policies below to evaluate.
-- anon deliberately gets neither: no anon policy references this function.
grant usage on schema private to authenticated;

create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admins a where a.user_id = (select auth.uid())
  );
$$;

comment on function private.is_admin() is
  'True when the calling user appears in public.admins. Gates every write policy — CLAUDE.md §10. Lives in `private` so it is not exposed as a PostgREST RPC endpoint.';

revoke all on function private.is_admin() from public, anon;
grant execute on function private.is_admin() to authenticated;

alter policy "admins write services" on services
  using (private.is_admin()) with check (private.is_admin());

alter policy "admins write material_categories" on material_categories
  using (private.is_admin()) with check (private.is_admin());

alter policy "admins write projects" on projects
  using (private.is_admin()) with check (private.is_admin());

alter policy "admins write project_images" on project_images
  using (private.is_admin()) with check (private.is_admin());

alter policy "admins write testimonials" on testimonials
  using (private.is_admin()) with check (private.is_admin());

alter policy "admins write service_areas" on service_areas
  using (private.is_admin()) with check (private.is_admin());

alter policy "admins write faqs" on faqs
  using (private.is_admin()) with check (private.is_admin());

alter policy "admins write site_settings" on site_settings
  using (private.is_admin()) with check (private.is_admin());

alter policy "admins write estimator_rates" on estimator_rates
  using (private.is_admin()) with check (private.is_admin());

drop function if exists public.is_admin();
