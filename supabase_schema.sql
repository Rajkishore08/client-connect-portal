-- ==============================================================================
-- ONE WORLD SOLUTIONS — SUPABASE DATABASE MIGRATION & SCHEMA SETUP SCRIPT
-- Copy & Paste this entire script into your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/bpldaxxwbbcdgsbjbaki/sql/new
-- ==============================================================================

-- 1. Ensure Profiles Table Exists (Synced with Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  role TEXT DEFAULT 'client',
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create / Upgrade Leads & Service Intakes Table
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  reference TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  date TEXT DEFAULT CURRENT_DATE::TEXT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  category TEXT NOT NULL,
  service TEXT NOT NULL,
  source TEXT DEFAULT 'Form',
  status TEXT DEFAULT 'New',
  priority TEXT DEFAULT 'Normal',
  is_special_request BOOLEAN DEFAULT FALSE,
  engagement_model TEXT DEFAULT '',
  progress_percent INT DEFAULT 25,
  milestones JSONB DEFAULT '[]'::jsonb,
  notes TEXT DEFAULT '',
  documents JSONB DEFAULT '[]'::jsonb,
  gov_form_status TEXT DEFAULT 'Not Started',
  gov_form_ref TEXT DEFAULT '',
  vfs_status TEXT DEFAULT 'Not Started',
  vfs_ref TEXT DEFAULT '',
  courier_status TEXT DEFAULT 'Not Started',
  courier_ref TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Blogs & SEO Articles Table
CREATE TABLE IF NOT EXISTS public.blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  summary TEXT,
  content TEXT,
  cover_image TEXT,
  author TEXT DEFAULT 'One World Solutions Editorial Team',
  date TEXT DEFAULT CURRENT_DATE::TEXT,
  read_time_minutes INT DEFAULT 5,
  status TEXT DEFAULT 'Published',
  meta_description TEXT,
  keywords JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create Strategy Call Consultations Table
CREATE TABLE IF NOT EXISTS public.consultations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  client_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  date TEXT NOT NULL,
  time_slot TEXT NOT NULL,
  topic TEXT DEFAULT 'Strategy Consultation',
  status TEXT DEFAULT 'Confirmed',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;

-- 5. Create RLS Policies for Open Access Intake & CMS Management
DROP POLICY IF EXISTS "Allow public read leads" ON public.leads;
DROP POLICY IF EXISTS "Allow public insert leads" ON public.leads;
DROP POLICY IF EXISTS "Allow public update leads" ON public.leads;
DROP POLICY IF EXISTS "Allow public delete leads" ON public.leads;

CREATE POLICY "Allow public read leads" ON public.leads FOR SELECT USING (true);
CREATE POLICY "Allow public insert leads" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update leads" ON public.leads FOR UPDATE USING (true);
CREATE POLICY "Allow public delete leads" ON public.leads FOR DELETE USING (true);

DROP POLICY IF EXISTS "Allow public read blogs" ON public.blogs;
DROP POLICY IF EXISTS "Allow public insert blogs" ON public.blogs;
DROP POLICY IF EXISTS "Allow public update blogs" ON public.blogs;
DROP POLICY IF EXISTS "Allow public delete blogs" ON public.blogs;

CREATE POLICY "Allow public read blogs" ON public.blogs FOR SELECT USING (true);
CREATE POLICY "Allow public insert blogs" ON public.blogs FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update blogs" ON public.blogs FOR UPDATE USING (true);
CREATE POLICY "Allow public delete blogs" ON public.blogs FOR DELETE USING (true);

DROP POLICY IF EXISTS "Allow public read consultations" ON public.consultations;
DROP POLICY IF EXISTS "Allow public insert consultations" ON public.consultations;
DROP POLICY IF EXISTS "Allow public update consultations" ON public.consultations;

CREATE POLICY "Allow public read consultations" ON public.consultations FOR SELECT USING (true);
CREATE POLICY "Allow public insert consultations" ON public.consultations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update consultations" ON public.consultations FOR UPDATE USING (true);

-- 6. Seed Initial Production Data
INSERT INTO public.blogs (title, slug, category, summary, content, cover_image, author, date, read_time_minutes, status, meta_description, keywords)
VALUES
  (
    'Complete 2026 Guide to International Passport Renewal & Expedited Visas in the USA',
    'international-passport-renewal-usa-2026-guide',
    'Passport & Visa Guides',
    'Step-by-step checklist for renewing your international passport in the United States. Covers Government Consular forms, document audit rules, photo dimensions, and expedited priority filing.',
    '# Complete 2026 Guide to International Passport Renewal in the USA\n\nRenewing your passport from the United States requires navigating official Government Consular portals and submission rules...',
    'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    'Elena Rostova (Senior Consular Specialist)',
    '2026-08-10', 6, 'Published',
    'Comprehensive 2026 guide for international passport renewal in USA.',
    '["Passport Renewal USA", "Consular Services", "Expedited Passport Renewal"]'::jsonb
  ),
  (
    'How We Build Enterprise SaaS Products with Next.js 15, Supabase & AI Agents',
    'building-enterprise-saas-nextjs-supabase-ai',
    'Web Development & AI',
    'An architectural blueprint for building scalable, high-performance web applications. Learn how Supabase PostgreSQL RLS and OpenAI Vector Embeddings power modern software platforms.',
    '# Building Enterprise SaaS Products with Next.js 15, Supabase & AI\n\nModern web app development demands speed, strict type safety, real-time sync, and intelligent AI capabilities...',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    'Alex Rivera (Lead Full Stack Architect)',
    '2026-08-12', 8, 'Published',
    'Learn how to build modern SaaS web applications using Next.js 15, Supabase PostgreSQL, and AI agent automation.',
    '["Nextjs 15 SaaS Architecture", "Supabase PostgreSQL RLS", "AI Agent Integration"]'::jsonb
  )
ON CONFLICT (slug) DO NOTHING;
