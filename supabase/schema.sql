-- ==============================================================================
-- Avatec Interactives - Supabase PostgreSQL Schema
-- ==============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. CLIENTS TABLE
create table if not exists public.clients (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text unique not null,
  phone text,
  company text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- 2. PROJECTS TABLE
create table if not exists public.projects (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  status text default 'PLANNED' not null,
  image_url text,
  website_url text,
  github_url text,
  figma_url text,
  optional_links jsonb default '[]'::jsonb,
  tags text[] default '{}'::text[],
  client_id uuid references public.clients(id) on delete set null,
  company_name text,
  country text,
  category text,
  start_date timestamptz,
  end_date timestamptz,
  progress integer default 0 not null,
  is_portfolio boolean default false not null,
  project_info text,
  challenges text,
  outcome text,
  scope_of_work text,
  gallery text[] default '{}'::text[],
  project_type text,
  industry text,
  platform text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- 3. TASKS TABLE
create table if not exists public.tasks (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid not null references public.projects(id) on delete cascade,
  title text not null,
  status text default 'TODO' not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- 4. BLOG POSTS TABLE
create table if not exists public.blog_posts (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  content text,
  author text,
  tags text[] default '{}'::text[],
  published boolean default false not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- 5. INVOICES TABLE
create table if not exists public.invoices (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid not null references public.clients(id) on delete cascade,
  amount numeric(12, 2) not null default 0.00,
  status text default 'DRAFT' not null,
  due_date timestamptz,
  line_items jsonb default '[]'::jsonb,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- 6. SCHEDULE EVENTS TABLE
create table if not exists public.schedule_events (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  date timestamptz not null,
  end_date timestamptz,
  attendees text[] default '{}'::text[],
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Indexes for performance
create index if not exists idx_projects_is_portfolio on public.projects(is_portfolio);
create index if not exists idx_projects_client_id on public.projects(client_id);
create index if not exists idx_tasks_project_id on public.tasks(project_id);
create index if not exists idx_invoices_client_id on public.invoices(client_id);
create index if not exists idx_blog_posts_published on public.blog_posts(published);

-- Trigger function for updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Migration helper for existing databases: Ensure all newer columns exist
alter table public.projects add column if not exists website_url text;
alter table public.projects add column if not exists github_url text;
alter table public.projects add column if not exists figma_url text;
alter table public.projects add column if not exists optional_links jsonb default '[]'::jsonb;
alter table public.projects add column if not exists gallery text[] default '{}'::text[];
alter table public.projects add column if not exists project_info text;
alter table public.projects add column if not exists challenges text;
alter table public.projects add column if not exists outcome text;
alter table public.projects add column if not exists scope_of_work text;
alter table public.projects add column if not exists project_type text;
alter table public.projects add column if not exists industry text;
alter table public.projects add column if not exists platform text;

-- Apply updated_at triggers idempotently
drop trigger if exists set_clients_updated_at on public.clients;
create trigger set_clients_updated_at before update on public.clients for each row execute function public.handle_updated_at();

drop trigger if exists set_projects_updated_at on public.projects;
create trigger set_projects_updated_at before update on public.projects for each row execute function public.handle_updated_at();

drop trigger if exists set_tasks_updated_at on public.tasks;
create trigger set_tasks_updated_at before update on public.tasks for each row execute function public.handle_updated_at();

drop trigger if exists set_blog_posts_updated_at on public.blog_posts;
create trigger set_blog_posts_updated_at before update on public.blog_posts for each row execute function public.handle_updated_at();

drop trigger if exists set_invoices_updated_at on public.invoices;
create trigger set_invoices_updated_at before update on public.invoices for each row execute function public.handle_updated_at();

drop trigger if exists set_schedule_events_updated_at on public.schedule_events;
create trigger set_schedule_events_updated_at before update on public.schedule_events for each row execute function public.handle_updated_at();

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

alter table public.clients enable row level security;
alter table public.projects enable row level security;
alter table public.tasks enable row level security;
alter table public.blog_posts enable row level security;
alter table public.invoices enable row level security;
alter table public.schedule_events enable row level security;

-- 1. Public Read Policies (for Frontpage)
-- Public can read any project marked as portfolio or completed
drop policy if exists "Public can view portfolio projects" on public.projects;
create policy "Public can view portfolio projects"
  on public.projects
  for select
  to anon, authenticated
  using (is_portfolio = true or status = 'COMPLETED');

-- Public can view client basic details referenced by portfolio projects
drop policy if exists "Public can view clients for portfolio projects" on public.clients;
create policy "Public can view clients for portfolio projects"
  on public.clients
  for select
  to anon, authenticated
  using (true);

-- Public can read published blog posts
drop policy if exists "Public can view published blogs" on public.blog_posts;
create policy "Public can view published blogs"
  on public.blog_posts
  for select
  to anon, authenticated
  using (published = true);

-- 2. Authenticated Admin Policies (Full access to all tables)
drop policy if exists "Admin full access on clients" on public.clients;
create policy "Admin full access on clients"
  on public.clients
  for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Admin full access on projects" on public.projects;
create policy "Admin full access on projects"
  on public.projects
  for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Admin full access on tasks" on public.tasks;
create policy "Admin full access on tasks"
  on public.tasks
  for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Admin full access on blog_posts" on public.blog_posts;
create policy "Admin full access on blog_posts"
  on public.blog_posts
  for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Admin full access on invoices" on public.invoices;
create policy "Admin full access on invoices"
  on public.invoices
  for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Admin full access on schedule_events" on public.schedule_events;
create policy "Admin full access on schedule_events"
  on public.schedule_events
  for all
  to authenticated
  using (true)
  with check (true);

-- ==============================================================================
-- STORAGE CONFIGURATION (portfolio bucket)
-- ==============================================================================

-- 1. Create public 'portfolio' bucket for images if not already present
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'portfolio',
  'portfolio',
  true,
  52428800, -- 50MB
  array['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp', 'image/svg+xml']
)
on conflict (id) do update set public = true;

-- 2. Storage RLS Policies
drop policy if exists "Public Access to portfolio bucket" on storage.objects;
create policy "Public Access to portfolio bucket"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'portfolio');

drop policy if exists "Allow upload to portfolio" on storage.objects;
create policy "Allow upload to portfolio"
  on storage.objects
  for insert
  to anon, authenticated
  with check (bucket_id = 'portfolio');

drop policy if exists "Allow update on portfolio" on storage.objects;
create policy "Allow update on portfolio"
  on storage.objects
  for update
  to anon, authenticated
  using (bucket_id = 'portfolio');

drop policy if exists "Allow delete on portfolio" on storage.objects;
create policy "Allow delete on portfolio"
  on storage.objects
  for delete
  to anon, authenticated
  using (bucket_id = 'portfolio');


