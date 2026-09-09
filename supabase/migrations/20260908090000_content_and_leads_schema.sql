-- ---------------------------------------------------------------------------
-- Schema — CLAUDE.md §10. Tables are created exactly as specified there,
-- including the check constraints and the two leads indexes.
--
-- Deliberately NOT added here, because §10 does not specify them (raise with
-- the client before adding):
--   * updated_at triggers. `updated_at` carries a default only, so it records
--     insert time and never moves. Wire moddatetime if edits need real
--     timestamps.
--   * an index on project_images.project_id. Postgres does not index a foreign
--     key automatically and Supabase's performance advisor will flag it.
-- ---------------------------------------------------------------------------

-- Content -------------------------------------------------------------------

create table services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  category text not null check (category in ('residential','commercial','turnkey')),
  promise text not null,
  description text,
  sub_services text[] default '{}',
  hero_image_path text,
  sort_order int default 0,
  is_published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table material_categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  promise text not null,
  body text,
  highlights text[] default '{}',
  image_path text,
  sort_order int default 0,
  is_published boolean default false
);

create table projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  project_type text not null check (project_type in ('residential','commercial','turnkey')),
  building_type text,                       -- 'duplex','villa','school',...
  location text not null,                   -- 'Tumkur','Gubbi',...
  built_up_area_sqft int,
  floors text,                              -- 'G+1'
  year_completed int,
  summary text,
  body text,
  cover_image_path text,
  is_featured boolean default false,
  is_published boolean default false,
  created_at timestamptz default now()
);

create table project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade,
  image_path text not null,
  alt_text text not null,
  caption text,
  sort_order int default 0
);

create table testimonials (
  id uuid primary key default gen_random_uuid(),
  author_name text not null,
  location text,
  project_type text,
  quote text not null,
  is_published boolean default false,
  sort_order int default 0
);

create table service_areas (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  intro text,
  is_published boolean default true
);

create table faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  topic text,
  sort_order int default 0,
  is_published boolean default false
);

create table site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz default now()
);
-- seeded with: phone, whatsapp, email, address, hours, base_rate_sqft, social urls

-- Estimator -----------------------------------------------------------------

create table estimator_rates (
  id uuid primary key default gen_random_uuid(),
  package text not null check (package in ('essential','premium','luxury')),
  base_rate_sqft numeric not null,          -- essential seeds at 1875
  location text,                            -- null = default for all towns
  location_multiplier numeric default 1.0,
  floor_multiplier jsonb not null,          -- {"G":1.0,"G+1":1.03,...}
  stage_breakdown jsonb not null,           -- {"foundation":0.15,...} must sum to 1
  effective_from date default current_date,
  is_active boolean default true
);

-- Leads ---------------------------------------------------------------------

create table leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text,
  service_type text,                        -- matches the live form's options
  location text,
  message text,
  source text not null default 'contact',   -- 'contact'|'estimator'|'quote'|'area-page'
  estimate_payload jsonb,                   -- area, floors, package, computed range
  page_path text,
  status text default 'new' check (status in ('new','contacted','quoted','won','lost')),
  internal_notes text,
  created_at timestamptz default now()
);
create index leads_created_at_idx on leads (created_at desc);
create index leads_status_idx on leads (status);

-- Admin roster --------------------------------------------------------------
-- §10: "an `admins` table keyed on auth.uid() gates all write policies."

create table admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  email text,
  created_at timestamptz default now()
);
