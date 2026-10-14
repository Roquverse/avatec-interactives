import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { uploadToR2 } from '../lib/r2'

// ============================================================================
// DATA NORMALIZATION HELPERS (snake_case <-> camelCase)
// ============================================================================

export function toCamelProject(p: any) {
  if (!p) return null
  const rawTags = Array.isArray(p.tags) ? p.tags : []
  const cleanTags = rawTags.filter((t: string) => typeof t === 'string' && !t.startsWith('link:'))
  const optionalLinks = rawTags
    .filter((t: string) => typeof t === 'string' && t.startsWith('link:'))
    .map((t: string) => {
      const rest = t.slice(5)
      const sep = rest.indexOf(':::')
      return sep !== -1 ? { label: rest.slice(0, sep), url: rest.slice(sep + 3) } : { label: 'Link', url: rest }
    })

  return {
    id: String(p.id),
    name: p.name || '',
    description: p.description || '',
    status: p.status || 'PLANNED',
    imageUrl: p.image_url || p.imageUrl || '',
    websiteUrl: p.website_url || p.websiteUrl || '',
    tags: cleanTags,
    optionalLinks,
    clientId: p.client_id || p.clientId || null,
    client: p.client ? { id: p.client.id, name: p.client.name, email: p.client.email } : undefined,
    companyName: p.company_name || p.companyName || '',
    country: p.country || '',
    category: p.category || '',
    startDate: p.start_date || p.startDate || null,
    endDate: p.end_date || p.endDate || null,
    progress: typeof p.progress === 'number' ? p.progress : 0,
    isPortfolio: Boolean(p.is_portfolio ?? p.isPortfolio),
    projectInfo: p.project_info || p.projectInfo || '',
    challenges: p.challenges || '',
    outcome: p.outcome || '',
    scopeOfWork: p.scope_of_work || p.scopeOfWork || '',
    gallery: Array.isArray(p.gallery) ? p.gallery : [],
    projectType: p.project_type || p.projectType || '',
    industry: p.industry || '',
    platform: p.platform || '',
    tasks: Array.isArray(p.tasks)
      ? p.tasks.map((t: any) => ({
          id: String(t.id),
          projectId: t.project_id || t.projectId,
          title: t.title,
          status: t.status,
          createdAt: t.created_at || t.createdAt,
          updatedAt: t.updated_at || t.updatedAt,
        }))
      : [],
    createdAt: p.created_at || p.createdAt,
    updatedAt: p.updated_at || p.updatedAt,
  }
}

export function toCamelClient(c: any) {
  if (!c) return null
  return {
    id: String(c.id),
    name: c.name || '',
    email: c.email || '',
    phone: c.phone || '',
    company: c.company || '',
    createdAt: c.created_at || c.createdAt,
    updatedAt: c.updated_at || c.updatedAt,
  }
}

export function toCamelBlog(b: any) {
  if (!b) return null
  return {
    id: String(b.id),
    title: b.title || '',
    content: b.content || '',
    author: b.author || '',
    tags: Array.isArray(b.tags) ? b.tags : [],
    published: Boolean(b.published),
    createdAt: b.created_at || b.createdAt,
    updatedAt: b.updated_at || b.updatedAt,
  }
}

export function toCamelInvoice(inv: any) {
  if (!inv) return null
  return {
    id: String(inv.id),
    clientId: inv.client_id || inv.clientId,
    client: inv.client ? toCamelClient(inv.client) : undefined,
    amount: Number(inv.amount || 0),
    status: inv.status || 'DRAFT',
    dueDate: inv.due_date || inv.dueDate || null,
    lineItems: Array.isArray(inv.line_items) ? inv.line_items : (Array.isArray(inv.lineItems) ? inv.lineItems : []),
    createdAt: inv.created_at || inv.createdAt,
    updatedAt: inv.updated_at || inv.updatedAt,
  }
}

// Convert camelCase object to Supabase snake_case fields
function toSnakeCasePayload(payload: any): Record<string, any> {
  const result: Record<string, any> = {}
  const mapping: Record<string, string> = {
    imageUrl: 'image_url',
    websiteUrl: 'website_url',
    clientId: 'client_id',
    companyName: 'company_name',
    startDate: 'start_date',
    endDate: 'end_date',
    isPortfolio: 'is_portfolio',
    projectInfo: 'project_info',
    scopeOfWork: 'scope_of_work',
    projectType: 'project_type',
    lineItems: 'line_items',
    dueDate: 'due_date',
    projectId: 'project_id',
  }

  for (const [key, value] of Object.entries(payload)) {
    if (value === undefined || key === 'optionalLinks') continue
    const targetKey = mapping[key] || key
    result[targetKey] = value
  }

  // Handle optionalLinks serialization into tags array
  if (Array.isArray(payload.optionalLinks)) {
    const existingTags = Array.isArray(result.tags)
      ? result.tags.filter((t: string) => typeof t === 'string' && !t.startsWith('link:'))
      : (Array.isArray(payload.tags) ? payload.tags.filter((t: string) => typeof t === 'string' && !t.startsWith('link:')) : [])
    const linkTags = payload.optionalLinks
      .filter((l: any) => l && l.url && String(l.url).trim())
      .map((l: any) => `link:${(l.label || 'Link').trim()}:::${String(l.url).trim()}`)
    result.tags = [...existingTags, ...linkTags]
  }

  // Handle gallery if provided as string or array
  if (payload.gallery !== undefined) {
    if (typeof payload.gallery === 'string') {
      result.gallery = payload.gallery.split(',').map((s: string) => s.trim()).filter(Boolean)
    } else if (Array.isArray(payload.gallery)) {
      result.gallery = payload.gallery.filter(Boolean)
    }
  }

  return result
}

// ============================================================================
// LOCAL STORAGE MOCK STORE (For offline / pre-configuration development)
// ============================================================================

const MOCK_STORAGE_KEY = 'avatec_mock_db'

function getMockDB() {
  try {
    const raw = localStorage.getItem(MOCK_STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) {
    // ignore
  }

  const initialDB = {
    clients: [
      { id: 'c1', name: 'Acme Corp', email: 'contact@acme.com', phone: '+1 555-0199', company: 'Acme International', created_at: new Date().toISOString() },
      { id: 'c2', name: 'PayFlow Africa', email: 'tech@payflow.ng', phone: '+234 800 123 4567', company: 'PayFlow Inc.', created_at: new Date().toISOString() },
    ],
    projects: [
      {
        id: 'p1',
        name: 'Avatec Dashboard Redesign',
        description: 'A complete overhaul of the internal management dashboard.',
        status: 'ACTIVE',
        image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070',
        website_url: 'https://admin.avatecinteractives.dev',
        tags: ['React', 'TypeScript', 'Node.js'],
        client_id: 'c1',
        is_portfolio: true,
        project_type: 'Internal Tool',
        industry: 'Software',
        platform: 'Web Application',
        project_info: 'Modernize legacy dashboard with improved performance.',
        challenges: 'Zero downtime database migration.',
        outcome: '98% user satisfaction.',
        scope_of_work: 'Full-stack development & UI redesign.',
        gallery: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070'],
        created_at: new Date().toISOString(),
        tasks: [
          { id: 't1', project_id: 'p1', title: 'Complete Supabase migration', status: 'DONE' },
          { id: 't2', project_id: 'p1', title: 'Configure Cloudflare R2 bucket', status: 'TODO' },
        ],
      },
      {
        id: 'p2',
        name: 'E-Commerce Platform Expansion',
        description: 'Cross-border multi-currency payment checkout.',
        status: 'ACTIVE',
        image_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070',
        website_url: 'https://example.com/ecommerce',
        tags: ['Next.js', 'PostgreSQL', 'Stripe'],
        client_id: 'c2',
        is_portfolio: true,
        project_type: 'B2B Platform',
        industry: 'Financial Technology',
        platform: 'Web & API',
        project_info: 'Simplified transactions across African currencies.',
        challenges: 'Regulatory compliance and multi-gateway fallbacks.',
        outcome: 'Over $50M processed monthly.',
        scope_of_work: 'Unified API and merchant portal.',
        gallery: ['https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070'],
        created_at: new Date().toISOString(),
        tasks: [],
      },
    ],
    blog_posts: [
      {
        id: 'b1',
        title: 'Building Resilient Cloud Architectures with Supabase & R2',
        content: 'How modern serverless databases and zero-egress object stores simplify full-stack web applications.',
        author: 'Avatec Engineering',
        tags: ['Architecture', 'Supabase', 'Cloudflare'],
        published: true,
        created_at: new Date().toISOString(),
      },
    ],
    invoices: [
      {
        id: 'inv1',
        client_id: 'c2',
        amount: 8500,
        status: 'PAID',
        due_date: new Date(Date.now() + 14 * 86400000).toISOString(),
        line_items: [{ description: 'Frontend Development Milestone 1', amount: 8500 }],
        created_at: new Date().toISOString(),
      },
    ],
  }

  try {
    localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(initialDB))
  } catch (e) {
    // ignore
  }
  return initialDB
}

function saveMockDB(db: any) {
  try {
    localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(db))
  } catch (e) {
    // ignore
  }
}

// ============================================================================
// SUPABASE & R2 API ADAPTER (Drop-in Axios Replacement)
// ============================================================================

export const api = {
  // Mock interceptors to prevent errors from existing interceptor registrations
  interceptors: {
    request: { use: (_fn?: any) => 0, eject: (_id?: any) => {} },
    response: { use: (_fn?: any, _errFn?: any) => 0, eject: (_id?: any) => {} },
  },

  async get(url: string, _config?: any): Promise<{ data: any }> {
    const cleanUrl = url.replace(/^\/?api\/?/, '/')

    // 1. PROJECTS
    if (cleanUrl.startsWith('/projects')) {
      const isPortfolioOnly = cleanUrl.includes('portfolio=true')

      if (isSupabaseConfigured) {
        let query = supabase
          .from('projects')
          .select('*, client:clients(*), tasks(*)')
          .order('created_at', { ascending: false })

        if (isPortfolioOnly) {
          query = query.or('is_portfolio.eq.true,status.eq.COMPLETED')
        }

        const { data, error } = await query
        if (error) {
          console.warn('[Supabase API] Failed to fetch projects, falling back to mock:', error.message)
        } else if (data) {
          return { data: data.map(toCamelProject) }
        }
      }

      // Mock DB Fallback
      const db = getMockDB()
      let list = db.projects || []
      if (isPortfolioOnly) {
        list = list.filter((p: any) => p.is_portfolio || p.status === 'COMPLETED')
      }
      // attach client & tasks
      const fullList = list.map((p: any) => ({
        ...p,
        client: db.clients?.find((c: any) => c.id === p.client_id),
      }))
      return { data: fullList.map(toCamelProject) }
    }

    // 2. CLIENTS
    if (cleanUrl.startsWith('/clients')) {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase
          .from('clients')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) {
          console.warn('[Supabase API] Failed to fetch clients:', error.message)
        } else if (data) {
          return { data: data.map(toCamelClient) }
        }
      }

      const db = getMockDB()
      return { data: (db.clients || []).map(toCamelClient) }
    }

    // 3. BLOGS
    if (cleanUrl.startsWith('/blogs')) {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) {
          console.warn('[Supabase API] Failed to fetch blog posts:', error.message)
        } else if (data) {
          return { data: data.map(toCamelBlog) }
        }
      }

      const db = getMockDB()
      return { data: (db.blog_posts || []).map(toCamelBlog) }
    }

    // 4. INVOICES
    if (cleanUrl.startsWith('/invoices')) {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase
          .from('invoices')
          .select('*, client:clients(*)')
          .order('created_at', { ascending: false })

        if (error) {
          console.warn('[Supabase API] Failed to fetch invoices:', error.message)
        } else if (data) {
          return { data: data.map(toCamelInvoice) }
        }
      }

      const db = getMockDB()
      const list = (db.invoices || []).map((inv: any) => ({
        ...inv,
        client: db.clients?.find((c: any) => c.id === inv.client_id),
      }))
      return { data: list.map(toCamelInvoice) }
    }

    return { data: [] }
  },

  async post(url: string, payload?: any, _config?: any): Promise<{ data: any }> {
    const cleanUrl = url.replace(/^\/?api\/?/, '/')

    // 1. AUTH LOGIN
    if (cleanUrl.includes('/auth/login')) {
      const email = payload?.email || ''
      const password = payload?.password || ''

      if (isSupabaseConfigured) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) {
          const err: any = new Error(error.message)
          err.response = { status: 400, data: { error: error.message } }
          throw err
        }

        return {
          data: {
            token: data.session?.access_token || 'supabase-token',
            admin: {
              id: data.user.id,
              email: data.user.email,
              name: data.user.user_metadata?.name || data.user.email?.split('@')[0] || 'Admin',
            },
          },
        }
      }

      // Demo/Fallback Mode: allow access so admin is usable immediately
      return {
        data: {
          token: 'demo-token-' + Date.now(),
          admin: {
            id: 'admin-seed-user',
            email: email || 'helpdesk@avatecinteractives.dev',
            name: email ? (email.includes('helpdesk') ? 'Helpdesk Admin' : email.split('@')[0]) : 'Helpdesk Admin',
          },
        },
      }
    }

    // 2. FILE UPLOAD (R2 / Supabase Storage)
    if (cleanUrl.includes('/upload')) {
      let file: File | null = null
      if (payload instanceof FormData) {
        file = (payload.get('image') || payload.get('file')) as File | null
      } else if (payload?.image instanceof File) {
        file = payload.image
      } else if (payload?.file instanceof File) {
        file = payload.file
      }

      if (!file) {
        throw new Error('No file provided in upload request')
      }

      const imageUrl = await uploadToR2(file)
      return { data: { imageUrl } }
    }

    // 3. CREATE PROJECT
    if (cleanUrl.startsWith('/projects')) {
      const snakeData = toSnakeCasePayload(payload)
      if (snakeData.status === 'COMPLETED' && snakeData.is_portfolio === undefined) {
        snakeData.is_portfolio = true
      }

      if (isSupabaseConfigured) {
        const { data, error } = await supabase
          .from('projects')
          .insert([snakeData])
          .select('*, client:clients(*), tasks(*)')
          .single()

        if (error) {
          console.error('[Supabase API] Error creating project:', error)
          throw error
        }
        return { data: toCamelProject(data) }
      }

      // Mock DB
      const db = getMockDB()
      const newProj = {
        ...snakeData,
        id: 'p-' + Date.now(),
        created_at: new Date().toISOString(),
        tasks: [],
      }
      db.projects = [newProj, ...(db.projects || [])]
      saveMockDB(db)
      return { data: toCamelProject(newProj) }
    }

    // 4. CREATE CLIENT
    if (cleanUrl.startsWith('/clients')) {
      const snakeData = {
        name: payload.name,
        email: payload.email,
        phone: payload.phone || null,
        company: payload.company || null,
      }

      if (isSupabaseConfigured) {
        const { data, error } = await supabase
          .from('clients')
          .insert([snakeData])
          .select()
          .single()

        if (error) {
          console.error('[Supabase API] Error creating client:', error)
          throw error
        }
        return { data: toCamelClient(data) }
      }

      const db = getMockDB()
      const newClient = {
        ...snakeData,
        id: 'c-' + Date.now(),
        created_at: new Date().toISOString(),
      }
      db.clients = [newClient, ...(db.clients || [])]
      saveMockDB(db)
      return { data: toCamelClient(newClient) }
    }

    // 5. CREATE TASK
    if (cleanUrl.startsWith('/tasks')) {
      const snakeData = {
        project_id: payload.projectId,
        title: payload.title,
        status: payload.status || 'TODO',
      }

      if (isSupabaseConfigured) {
        const { data, error } = await supabase
          .from('tasks')
          .insert([snakeData])
          .select()
          .single()

        if (error) {
          console.error('[Supabase API] Error creating task:', error)
          throw error
        }
        return { data }
      }

      const db = getMockDB()
      const newTask = {
        id: 't-' + Date.now(),
        ...snakeData,
        created_at: new Date().toISOString(),
      }
      const project = db.projects?.find((p: any) => p.id === payload.projectId)
      if (project) {
        project.tasks = [...(project.tasks || []), newTask]
      }
      saveMockDB(db)
      return { data: newTask }
    }

    // 6. CREATE BLOG POST
    if (cleanUrl.startsWith('/blogs')) {
      const snakeData = {
        title: payload.title,
        content: payload.content || '',
        author: payload.author || '',
        tags: Array.isArray(payload.tags) ? payload.tags : [],
        published: Boolean(payload.published),
      }

      if (isSupabaseConfigured) {
        const { data, error } = await supabase
          .from('blog_posts')
          .insert([snakeData])
          .select()
          .single()

        if (error) {
          console.error('[Supabase API] Error creating blog post:', error)
          throw error
        }
        return { data: toCamelBlog(data) }
      }

      const db = getMockDB()
      const newBlog = {
        id: 'b-' + Date.now(),
        ...snakeData,
        created_at: new Date().toISOString(),
      }
      db.blog_posts = [newBlog, ...(db.blog_posts || [])]
      saveMockDB(db)
      return { data: toCamelBlog(newBlog) }
    }

    // 7. CREATE INVOICE
    if (cleanUrl.startsWith('/invoices')) {
      const snakeData = {
        client_id: payload.clientId,
        amount: Number(payload.amount || 0),
        status: payload.status || 'DRAFT',
        due_date: payload.dueDate || null,
        line_items: Array.isArray(payload.lineItems) ? payload.lineItems : [],
      }

      if (isSupabaseConfigured) {
        const { data, error } = await supabase
          .from('invoices')
          .insert([snakeData])
          .select('*, client:clients(*)')
          .single()

        if (error) {
          console.error('[Supabase API] Error creating invoice:', error)
          throw error
        }
        return { data: toCamelInvoice(data) }
      }

      const db = getMockDB()
      const newInvoice = {
        id: 'inv-' + Date.now(),
        ...snakeData,
        client: db.clients?.find((c: any) => c.id === payload.clientId),
        created_at: new Date().toISOString(),
      }
      db.invoices = [newInvoice, ...(db.invoices || [])]
      saveMockDB(db)
      return { data: toCamelInvoice(newInvoice) }
    }

    return { data: {} }
  },

  async put(url: string, payload?: any, _config?: any): Promise<{ data: any }> {
    const cleanUrl = url.replace(/^\/?api\/?/, '/')

    // 1. UPDATE PROJECT
    if (cleanUrl.startsWith('/projects/')) {
      const id = cleanUrl.split('/projects/')[1].split('?')[0]
      const snakeData = toSnakeCasePayload(payload)
      if (snakeData.status === 'COMPLETED' && snakeData.is_portfolio === undefined) {
        snakeData.is_portfolio = true
      }

      if (isSupabaseConfigured) {
        const { data, error } = await supabase
          .from('projects')
          .update(snakeData)
          .eq('id', id)
          .select('*, client:clients(*), tasks(*)')
          .single()

        if (error) {
          console.error('[Supabase API] Error updating project:', error)
          throw error
        }
        return { data: toCamelProject(data) }
      }

      const db = getMockDB()
      const idx = db.projects?.findIndex((p: any) => String(p.id) === String(id))
      if (idx !== -1 && idx !== undefined) {
        db.projects[idx] = { ...db.projects[idx], ...snakeData }
        saveMockDB(db)
        return { data: toCamelProject(db.projects[idx]) }
      }
      return { data: { id, ...payload } }
    }

    // 2. UPDATE TASK
    if (cleanUrl.startsWith('/tasks/')) {
      const id = cleanUrl.split('/tasks/')[1].split('?')[0]
      const snakeData = toSnakeCasePayload(payload)

      if (isSupabaseConfigured) {
        const { data, error } = await supabase
          .from('tasks')
          .update(snakeData)
          .eq('id', id)
          .select()
          .single()

        if (error) {
          console.error('[Supabase API] Error updating task:', error)
          throw error
        }
        return { data }
      }

      const db = getMockDB()
      db.projects?.forEach((p: any) => {
        const task = p.tasks?.find((t: any) => String(t.id) === String(id))
        if (task) {
          Object.assign(task, snakeData)
        }
      })
      saveMockDB(db)
      return { data: { id, ...payload } }
    }

    // 3. UPDATE BLOG
    if (cleanUrl.startsWith('/blogs/')) {
      const id = cleanUrl.split('/blogs/')[1].split('?')[0]
      const snakeData = toSnakeCasePayload(payload)

      if (isSupabaseConfigured) {
        const { data, error } = await supabase
          .from('blog_posts')
          .update(snakeData)
          .eq('id', id)
          .select()
          .single()

        if (error) {
          console.error('[Supabase API] Error updating blog post:', error)
          throw error
        }
        return { data: toCamelBlog(data) }
      }

      const db = getMockDB()
      const idx = db.blog_posts?.findIndex((b: any) => String(b.id) === String(id))
      if (idx !== -1 && idx !== undefined) {
        db.blog_posts[idx] = { ...db.blog_posts[idx], ...snakeData }
        saveMockDB(db)
        return { data: toCamelBlog(db.blog_posts[idx]) }
      }
      return { data: { id, ...payload } }
    }

    // 4. UPDATE INVOICE
    if (cleanUrl.startsWith('/invoices/')) {
      const id = cleanUrl.split('/invoices/')[1].split('?')[0]
      const snakeData = toSnakeCasePayload(payload)

      if (isSupabaseConfigured) {
        const { data, error } = await supabase
          .from('invoices')
          .update(snakeData)
          .eq('id', id)
          .select('*, client:clients(*)')
          .single()

        if (error) {
          console.error('[Supabase API] Error updating invoice:', error)
          throw error
        }
        return { data: toCamelInvoice(data) }
      }

      const db = getMockDB()
      const idx = db.invoices?.findIndex((inv: any) => String(inv.id) === String(id))
      if (idx !== -1 && idx !== undefined) {
        db.invoices[idx] = { ...db.invoices[idx], ...snakeData }
        saveMockDB(db)
        return { data: toCamelInvoice(db.invoices[idx]) }
      }
      return { data: { id, ...payload } }
    }

    return { data: {} }
  },

  async delete(url: string, _config?: any): Promise<{ data: any }> {
    const cleanUrl = url.replace(/^\/?api\/?/, '/')

    // 1. DELETE PROJECT
    if (cleanUrl.startsWith('/projects/')) {
      const id = cleanUrl.split('/projects/')[1].split('?')[0]

      if (isSupabaseConfigured) {
        const { error } = await supabase.from('projects').delete().eq('id', id)
        if (error) {
          console.error('[Supabase API] Error deleting project:', error)
          throw error
        }
        return { data: { success: true } }
      }

      const db = getMockDB()
      db.projects = (db.projects || []).filter((p: any) => String(p.id) !== String(id))
      saveMockDB(db)
      return { data: { success: true } }
    }

    // 2. DELETE TASK
    if (cleanUrl.startsWith('/tasks/')) {
      const id = cleanUrl.split('/tasks/')[1].split('?')[0]

      if (isSupabaseConfigured) {
        const { error } = await supabase.from('tasks').delete().eq('id', id)
        if (error) {
          console.error('[Supabase API] Error deleting task:', error)
          throw error
        }
        return { data: { success: true } }
      }

      const db = getMockDB()
      db.projects?.forEach((p: any) => {
        p.tasks = (p.tasks || []).filter((t: any) => String(t.id) !== String(id))
      })
      saveMockDB(db)
      return { data: { success: true } }
    }

    // 3. DELETE BLOG
    if (cleanUrl.startsWith('/blogs/')) {
      const id = cleanUrl.split('/blogs/')[1].split('?')[0]

      if (isSupabaseConfigured) {
        const { error } = await supabase.from('blog_posts').delete().eq('id', id)
        if (error) {
          console.error('[Supabase API] Error deleting blog post:', error)
          throw error
        }
        return { data: { success: true } }
      }

      const db = getMockDB()
      db.blog_posts = (db.blog_posts || []).filter((b: any) => String(b.id) !== String(id))
      saveMockDB(db)
      return { data: { success: true } }
    }

    // 4. DELETE INVOICE
    if (cleanUrl.startsWith('/invoices/')) {
      const id = cleanUrl.split('/invoices/')[1].split('?')[0]

      if (isSupabaseConfigured) {
        const { error } = await supabase.from('invoices').delete().eq('id', id)
        if (error) {
          console.error('[Supabase API] Error deleting invoice:', error)
          throw error
        }
        return { data: { success: true } }
      }

      const db = getMockDB()
      db.invoices = (db.invoices || []).filter((inv: any) => String(inv.id) !== String(id))
      saveMockDB(db)
      return { data: { success: true } }
    }

    return { data: { success: true } }
  },
}

export default api
