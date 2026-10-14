-- ==============================================================================
-- Avatec Interactives - Initial Seed Data
-- ==============================================================================

-- 1. SEED ADMIN USER (Supabase Auth)
-- Email: helpdesk@avatecinteractives.dev
-- Password: Aduke@1992
create extension if not exists pgcrypto;

do $$
declare
  new_user_id uuid := 'a0000000-0000-0000-0000-000000000001'::uuid;
  admin_email text := 'helpdesk@avatecinteractives.dev';
  admin_password text := 'Aduke@1992';
  encrypted_pw text;
begin
  encrypted_pw := crypt(admin_password, gen_salt('bf'));

  if not exists (select 1 from auth.users where email = admin_email) then
    insert into auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      recovery_sent_at,
      last_sign_in_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    ) values (
      '00000000-0000-0000-0000-000000000000',
      new_user_id,
      'authenticated',
      'authenticated',
      admin_email,
      encrypted_pw,
      now(),
      now(),
      now(),
      '{"provider":"email","providers":["email"]}',
      '{"name":"Helpdesk Admin","role":"admin"}',
      now(),
      now(),
      '',
      '',
      '',
      ''
    );

    insert into auth.identities (
      id,
      user_id,
      identity_data,
      provider,
      last_sign_in_at,
      created_at,
      updated_at
    ) values (
      new_user_id,
      new_user_id,
      format('{"sub":"%s","email":"%s"}', new_user_id, admin_email)::jsonb,
      'email',
      now(),
      now(),
      now()
    );
  else
    update auth.users
    set encrypted_password = encrypted_pw,
        email_confirmed_at = coalesce(email_confirmed_at, now()),
        raw_user_meta_data = '{"name":"Helpdesk Admin","role":"admin"}'
    where email = admin_email;
  end if;
end $$;

-- 2. SEED PORTFOLIO PROJECTS (Idempotent: Only insert if not already present)
insert into public.projects (
  name,
  description,
  status,
  image_url,
  website_url,
  github_url,
  figma_url,
  optional_links,
  tags,
  is_portfolio,
  project_type,
  industry,
  platform,
  project_info,
  challenges,
  outcome,
  scope_of_work,
  gallery
)
select
  'Avatec Dashboard Redesign',
  'A complete overhaul of the internal management dashboard.',
  'COMPLETED',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
  'https://admin.avatecinteractives.dev',
  'https://github.com/avatec-interactives/dashboard',
  'https://figma.com/@avatec/dashboard',
  '[{"label":"GitHub","url":"https://github.com/avatec-interactives/dashboard"},{"label":"Figma","url":"https://figma.com/@avatec/dashboard"}]'::jsonb,
  array['React', 'TypeScript', 'Node.js', 'link:GitHub:::https://github.com/avatec-interactives/dashboard', 'link:Figma:::https://figma.com/@avatec/dashboard'],
  true,
  'Internal Tool',
  'Software',
  'Web Application',
  'The goal of this project was to modernize the legacy dashboard, improving load times by 40% and introducing a new design system.',
  'Migrating from a legacy monolithic architecture to a decoupled React frontend and Node backend without downtime.',
  'Successfully launched to 500+ internal users with a 98% satisfaction rate.',
  'Full-stack development, UX/UI redesign, and cloud infrastructure migration.',
  array[
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015',
    'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2076'
  ]
where not exists (select 1 from public.projects where name = 'Avatec Dashboard Redesign');

insert into public.projects (
  name,
  description,
  status,
  image_url,
  website_url,
  github_url,
  figma_url,
  optional_links,
  tags,
  is_portfolio,
  project_type,
  industry,
  platform,
  project_info,
  challenges,
  outcome,
  scope_of_work,
  gallery
)
select
  'E-Commerce Platform Expansion',
  'Scaling the e-commerce platform to support international markets.',
  'IN_DEVELOPMENT',
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop',
  'https://example.com/ecommerce',
  'https://github.com/avatec-interactives/payflow-ecommerce',
  'https://figma.com/@avatec/payflow',
  '[{"label":"GitHub","url":"https://github.com/avatec-interactives/payflow-ecommerce"},{"label":"Figma","url":"https://figma.com/@avatec/payflow"}]'::jsonb,
  array['Next.js', 'PostgreSQL', 'Stripe', 'link:GitHub:::https://github.com/avatec-interactives/payflow-ecommerce', 'link:Figma:::https://figma.com/@avatec/payflow'],
  true,
  'B2B Platform',
  'Financial Technology',
  'Web & API',
  'PayFlow provides seamless cross-border payment infrastructure for African businesses. The platform simplifies transactions across multiple currencies and local payment methods.',
  'The main challenge was unifying a fragmented financial ecosystem across different African countries, each with strict regulatory requirements, varied payment gateways, and slow traditional banking processes.',
  'We developed a unified API that handles multi-currency wallets, instant settlements, and compliance checks automatically. The platform now processes over $50M monthly with 99.9% uptime.',
  'In collaboration with PayFlow, we developed a comprehensive system covering brand identity, a powerful mobile app, and a resilient backend infrastructure. We created a bespoke design language that conveys trust and speed.',
  array[
    'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=2070',
    'https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?q=80&w=2070',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070'
  ]
where not exists (select 1 from public.projects where name = 'E-Commerce Platform Expansion');

insert into public.projects (
  name,
  description,
  status,
  image_url,
  website_url,
  github_url,
  figma_url,
  optional_links,
  tags,
  is_portfolio,
  project_type,
  industry,
  platform,
  project_info,
  challenges,
  outcome,
  scope_of_work,
  gallery
)
select
  'Financial Analytics App',
  'Mobile application for real-time financial data visualization.',
  'TESTING',
  'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop',
  'https://example.com/finance',
  'https://github.com/avatec-interactives/fin-analytics',
  null,
  '[{"label":"GitHub","url":"https://github.com/avatec-interactives/fin-analytics"},{"label":"Docs","url":"https://docs.avatecinteractives.dev/finance"}]'::jsonb,
  array['Flutter', 'Firebase', 'Data Vis', 'link:GitHub:::https://github.com/avatec-interactives/fin-analytics', 'link:Docs:::https://docs.avatecinteractives.dev/finance'],
  true,
  'Consumer App',
  'Wealth Management',
  'iOS & Android',
  'A new mobile app targeting retail investors, providing AI-driven insights and portfolio tracking.',
  'Ensuring real-time data synchronization with low latency while maintaining battery efficiency on mobile devices.',
  'Project is in the planning phase. Architecture review completed.',
  'Mobile application design and development, API integration, and real-time data synchronization architecture.',
  array[
    'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070'
  ]
where not exists (select 1 from public.projects where name = 'Financial Analytics App');

