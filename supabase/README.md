# Database & Storage Setup (Supabase & Cloudflare R2)

Avatec Interactives has been migrated to a serverless architecture using **Supabase** (PostgreSQL database & Auth) and **Cloudflare R2** (zero-egress object storage for portfolio images and assets). The Express/Node backend has been completely removed.

---

## 1. Seed Admin Login Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Root Admin** | `helpdesk@avatecinteractives.dev` | `Aduke@1992` |

> [!NOTE]
> This admin user is automatically configured in Supabase Auth. You can immediately log into the Admin Dashboard using these credentials.

---

## 2. Supabase Setup

### Step 1: Create a Project
1. Go to [Supabase](https://database.new) and create a new project.
2. Note your **Project URL** and **anon / public key** from `Project Settings -> API`.

### Step 2: Apply the Database Schema & Seed Data
1. In the Supabase Dashboard, open the **SQL Editor**.
2. Run [`schema.sql`](./schema.sql) to create:
   - `clients` table
   - `projects` table
   - `tasks` table
   - `blog_posts` table
   - `invoices` table
   - `schedule_events` table
   - Row Level Security (RLS) policies
   - Automated `updated_at` triggers
3. Run [`seed.sql`](./seed.sql) to seed the initial root admin (`helpdesk@avatecinteractives.dev` / `Aduke@1992`) and sample portfolio items.

---

## 3. Cloudflare R2 Setup (Image Uploads)

### Step 1: Create a Bucket
1. In the [Cloudflare Dashboard](https://dash.cloudflare.com/), navigate to **R2**.
2. Create a bucket named `portfolio` (or your choice).
3. Under bucket settings, enable **Public Access** (Custom Domain or `r2.dev` subdomain).

### Step 2: Upload Strategy
- **Option A (Direct Public Bucket)**: Set `VITE_R2_PUBLIC_URL` in `.env`.
- **Option B (Cloudflare Worker)**: Set `VITE_R2_WORKER_URL` in `.env` for authenticated presigned/upload handling.
- **Option C (Supabase Storage Fallback)**: If R2 is not yet configured, create a public bucket named `portfolio` in Supabase Storage. The admin panel automatically falls back to Supabase Storage.

---

## 4. Environment Variables Configuration

### `frontpage/.env`
```ini
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
```

### `admin/.env`
```ini
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
VITE_R2_PUBLIC_URL=https://pub-<id>.r2.dev
# Optional Cloudflare Worker upload proxy
# VITE_R2_WORKER_URL=https://r2-upload.<your-subdomain>.workers.dev
```

---

## 5. Running the Apps

- **Frontpage**:
  ```bash
  cd frontpage && npm run dev
  ```
- **Admin Dashboard**:
  ```bash
  cd admin && npm run dev
  ```
