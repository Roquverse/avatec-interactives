import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  !supabaseUrl.includes('placeholder') &&
  !supabaseUrl.includes('your-project')
)

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
)

export interface OptionalLink {
  label: string
  url: string
}

export interface Project {
  id: string
  name: string
  companyName?: string
  description?: string
  country?: string
  category?: string
  tags?: string[]
  optionalLinks?: OptionalLink[]
  imageUrl: string
  client?: { name: string }
  projectInfo?: string
  challenges?: string
  outcome?: string
  scopeOfWork?: string
  gallery?: string[]
  projectType?: string
  industry?: string
  platform?: string
  websiteUrl?: string
}

export function normalizeProject(raw: any): Project {
  const rawTags = Array.isArray(raw.tags) ? raw.tags : []
  const cleanTags = rawTags.filter((t: string) => typeof t === 'string' && !t.startsWith('link:'))
  const optionalLinks: OptionalLink[] = rawTags
    .filter((t: string) => typeof t === 'string' && t.startsWith('link:'))
    .map((t: string) => {
      const rest = t.slice(5)
      const sep = rest.indexOf(':::')
      return sep !== -1 ? { label: rest.slice(0, sep), url: rest.slice(sep + 3) } : { label: 'Link', url: rest }
    })

  return {
    id: String(raw.id),
    name: raw.name || '',
    companyName: raw.company_name || raw.companyName || '',
    description: raw.description || '',
    country: raw.country || '',
    category: raw.category || '',
    tags: cleanTags,
    optionalLinks,
    imageUrl: raw.image_url || raw.imageUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070',
    client: raw.client ? { name: raw.client.name } : undefined,
    projectInfo: raw.project_info || raw.projectInfo || '',
    challenges: raw.challenges || '',
    outcome: raw.outcome || '',
    scopeOfWork: raw.scope_of_work || raw.scopeOfWork || '',
    gallery: Array.isArray(raw.gallery) ? raw.gallery : [],
    projectType: raw.project_type || raw.projectType || '',
    industry: raw.industry || '',
    platform: raw.platform || '',
    websiteUrl: raw.website_url || raw.websiteUrl || '',
  }
}

// Static fallback data if Supabase keys aren't provided yet
export const FALLBACK_PROJECTS: Project[] = [
  {
    id: 'avatec-dashboard-redesign',
    name: 'Avatec Dashboard Redesign',
    description: 'A complete overhaul of the internal management dashboard.',
    category: 'Internal Tool',
    country: 'Global',
    tags: ['React', 'TypeScript', 'Node.js'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    websiteUrl: 'https://admin.avatecinteractives.dev',
    projectType: 'Internal Tool',
    industry: 'Software',
    platform: 'Web Application',
    projectInfo: 'The goal of this project was to modernize the legacy dashboard, improving load times by 40% and introducing a new design system.',
    challenges: 'Migrating from a legacy monolithic architecture to a decoupled React frontend and Node backend without downtime.',
    outcome: 'Successfully launched to 500+ internal users with a 98% satisfaction rate.',
    scopeOfWork: 'Full-stack development, UX/UI redesign, and cloud infrastructure migration.',
    gallery: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2076'
    ]
  },
  {
    id: 'e-commerce-platform-expansion',
    name: 'E-Commerce Platform Expansion',
    description: 'Scaling the e-commerce platform to support international markets with multi-currency checkout.',
    category: 'Fintech',
    country: 'UK',
    tags: ['Next.js', 'PostgreSQL', 'Stripe'],
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop',
    websiteUrl: 'https://example.com/ecommerce',
    projectType: 'B2B Platform',
    industry: 'Financial Technology',
    platform: 'Web & API',
    projectInfo: 'PayFlow provides seamless cross-border payment infrastructure for African businesses. The platform simplifies transactions across multiple currencies and local payment methods.',
    challenges: 'The main challenge was unifying a fragmented financial ecosystem across different African countries, each with strict regulatory requirements, varied payment gateways, and slow traditional banking processes.',
    outcome: 'We developed a unified API that handles multi-currency wallets, instant settlements, and compliance checks automatically. The platform now processes over $50M monthly with 99.9% uptime.',
    scopeOfWork: 'In collaboration with PayFlow, we developed a comprehensive system covering brand identity, a powerful mobile app, and a resilient backend infrastructure.',
    gallery: [
      'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=2070',
      'https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?q=80&w=2070'
    ]
  },
  {
    id: 'financial-analytics-app',
    name: 'Financial Analytics App',
    description: 'Mobile application for real-time financial data visualization and AI portfolio recommendations.',
    category: 'Fintech',
    country: 'US',
    tags: ['Flutter', 'Firebase', 'Data Vis'],
    imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop',
    websiteUrl: 'https://example.com/finance',
    projectType: 'Consumer App',
    industry: 'Wealth Management',
    platform: 'iOS & Android',
    projectInfo: 'A new mobile app targeting retail investors, providing AI-driven insights and portfolio tracking.',
    challenges: 'Ensuring real-time data synchronization with low latency while maintaining battery efficiency on mobile devices.',
    outcome: 'Architecture review completed with sub-second websocket streaming pipelines.',
    scopeOfWork: 'Mobile application design and development, API integration, and real-time data synchronization architecture.',
    gallery: [
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974'
    ]
  }
]
