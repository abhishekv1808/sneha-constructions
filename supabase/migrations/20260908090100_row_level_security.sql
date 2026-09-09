-- ---------------------------------------------------------------------------
-- Row level security — CLAUDE.md §10. "Enable RLS on every table. No
-- exceptions."
--
-- Read this before changing anything below:
--   `leads` has RLS enabled and ZERO policies, for anon and for authenticated
--   alike. That is deliberate. Inserts go through the service-role key inside
--   /api/leads only, after server-side zod validation and rate limiting. An
--   anon insert path on this table will be found and spammed, and an anon or
--   authenticated select path leaks every enquiry the business has ever
--   received. Do not add one "just for testing".
-- ---------------------------------------------------------------------------

-- security definer so the policies below can consult the roster without
-- recursing into admins' own RLS. search_path is pinned empty and every
-- reference is schema-qualified, per Supabase's linter.
create or replace function public.is_admin()
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

comment on function public.is_admin() is
  'True when the calling user appears in public.admins. Gates every write policy — CLAUDE.md §10.';

-- Enable RLS everywhere ------------------------------------------------------

alter table services            enable row level security;
alter table material_categories enable row level security;
alter table projects            enable row level security;
alter table project_images      enable row level security;
alter table testimonials        enable row level security;
alter table service_areas       enable row level security;
alter table faqs                enable row level security;
alter table site_settings       enable row level security;
alter table estimator_rates     enable row level security;
alter table leads               enable row level security;
alter table admins              enable row level security;

-- Published content: anonymous read only -------------------------------------

create policy "public reads published services"
  on services for select to anon, authenticated
  using (is_published = true);

create policy "public reads published material_categories"
  on material_categories for select to anon, authenticated
  using (is_published = true);

create policy "public reads published projects"
  on projects for select to anon, authenticated
  using (is_published = true);

-- project_images has no is_published column of its own, so it inherits the
-- parent project's. Without the EXISTS, gallery images for an unpublished
-- project would be readable through the storage paths they expose.
create policy "public reads images of published projects"
  on project_images for select to anon, authenticated
  using (
    exists (
      select 1 from projects p
      where p.id = project_images.project_id
        and p.is_published = true
    )
  );

create policy "public reads published testimonials"
  on testimonials for select to anon, authenticated
  using (is_published = true);

create policy "public reads published service_areas"
  on service_areas for select to anon, authenticated
  using (is_published = true);

create policy "public reads published faqs"
  on faqs for select to anon, authenticated
  using (is_published = true);

-- site_settings holds the NAP block that the header, footer and JSON-LD render,
-- so it is public by definition. Never put a secret in this table.
create policy "public reads site_settings"
  on site_settings for select to anon, authenticated
  using (true);

create policy "public reads active rates"
  on estimator_rates for select to anon, authenticated
  using (is_active = true);

-- Admin writes ---------------------------------------------------------------
-- `for all` rather than three policies per table: it also lets an admin select
-- unpublished drafts, which a preview UI needs. Policies are OR'd, so this sits
-- alongside the public read above rather than replacing it.

create policy "admins write services"
  on services for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "admins write material_categories"
  on material_categories for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "admins write projects"
  on projects for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "admins write project_images"
  on project_images for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "admins write testimonials"
  on testimonials for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "admins write service_areas"
  on service_areas for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "admins write faqs"
  on faqs for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "admins write site_settings"
  on site_settings for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "admins write estimator_rates"
  on estimator_rates for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- leads ----------------------------------------------------------------------
-- No policy. None. RLS is on and nothing satisfies it, so anon and
-- authenticated both get an empty result set on select and a violation on
-- insert. Only the service-role key reaches this table. §10, §11.
--
-- Note this also means the client's future admin inbox cannot read leads with a
-- user session — it has to go through a server route holding the service-role
-- key. That is the intended trade.

-- admins ---------------------------------------------------------------------
-- Also policy-free: the roster is managed with the service-role key, and
-- public.is_admin() is security definer so the policies above can still read it.
