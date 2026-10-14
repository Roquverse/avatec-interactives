-- ==============================================================================
-- Avatec Interactives - Supabase Storage Configuration (Portfolio Bucket)
-- Run this in your Supabase SQL Editor to enable direct image uploads.
-- ==============================================================================

-- 1. Create public 'portfolio' bucket for images
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'portfolio',
  'portfolio',
  true,
  52428800, -- 50MB file size limit
  array['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp', 'image/svg+xml']
)
on conflict (id) do update set public = true;

-- 2. Storage RLS Policies (Idempotent)

-- Allow public read access to all portfolio images
drop policy if exists "Public Access to portfolio bucket" on storage.objects;
create policy "Public Access to portfolio bucket"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'portfolio');

-- Allow anon and authenticated users to upload project images
drop policy if exists "Allow upload to portfolio" on storage.objects;
create policy "Allow upload to portfolio"
  on storage.objects
  for insert
  to anon, authenticated
  with check (bucket_id = 'portfolio');

-- Allow update of existing portfolio images
drop policy if exists "Allow update on portfolio" on storage.objects;
create policy "Allow update on portfolio"
  on storage.objects
  for update
  to anon, authenticated
  using (bucket_id = 'portfolio');

-- Allow delete of portfolio images
drop policy if exists "Allow delete on portfolio" on storage.objects;
create policy "Allow delete on portfolio"
  on storage.objects
  for delete
  to anon, authenticated
  using (bucket_id = 'portfolio');
