-- ==============================================================================
-- ONE WORLD SOLUTIONS — SUPABASE DATABASE MIGRATION & SCHEMA SETUP SCRIPT
-- Paste this script directly into Supabase SQL Editor:
-- https://supabase.com/dashboard/project/bpldaxxwbbcdgsbjbaki/sql/new
-- ==============================================================================

-- 1. Create Profiles Table (Synced with Supabase Auth users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  role TEXT DEFAULT 'client',
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Leads & Intakes Management Table
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

-- 3. Create Strategy Call Consultations Table
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
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;

-- 4. Create Open Access Policies for Portal Intake & Admin Management
CREATE POLICY "Allow public read leads" ON public.leads FOR SELECT USING (true);
CREATE POLICY "Allow public insert leads" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update leads" ON public.leads FOR UPDATE USING (true);
CREATE POLICY "Allow public delete leads" ON public.leads FOR DELETE USING (true);

CREATE POLICY "Allow public read consultations" ON public.consultations FOR SELECT USING (true);
CREATE POLICY "Allow public insert consultations" ON public.consultations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update consultations" ON public.consultations FOR UPDATE USING (true);

CREATE POLICY "Allow public read profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Allow public insert profiles" ON public.profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update profiles" ON public.profiles FOR UPDATE USING (true);

-- 5. Seed Initial Production Real Leads Data
INSERT INTO public.leads (reference, date, name, email, phone, category, service, source, status, notes, documents, gov_form_status, vfs_status, courier_status, courier_ref)
VALUES
  ('OWS-889124', '2026-08-14', 'Ananya Sharma', 'ananya.sharma@example.com', '+1 (312) 555-0132', 'Passport & Visa Services', 'Expedited US Passport Renewal', 'Form', 'In Progress', 'Travel scheduled for next week. VFS document audit verified.', '["passport_copy.pdf", "us_photo_specs.jpg"]'::jsonb, 'Completed', 'Completed', 'In Progress', '7890241829'),
  ('OWS-440219', '2026-08-12', 'Vikram Patel', 'vikram.patel@example.com', '+1 (312) 555-0199', 'Passport & Visa Services', 'OCI Card Application (Adult)', 'Form', 'In Contact', 'Naturalization certificate and surrendered passport submitted.', '["naturalization_cert.pdf", "surrender_cert.pdf"]'::jsonb, 'Completed', 'In Progress', 'Not Started', ''),
  ('OWS-102488', '2026-08-10', 'Marcus Vance', 'marcus.vance@techcorp.io', '+1 (415) 555-0841', 'Web Development & Software', 'Custom AI Agent & Vector Search RAG SaaS', 'Chat', 'Proposal Sent', 'Client requested full source code buyout with NDA terms.', '["prd_ai_saas.pdf"]'::jsonb, 'Not Started', 'Not Started', 'Not Started', ''),
  ('OWS-993102', '2026-08-08', 'Sarah Jenkins', 'sarah.j@growthdigital.com', '+1 (312) 555-0422', 'Digital Marketing & Growth', 'Google & Meta PPC Campaign Sprints', 'Calendar', 'Payment Pending', 'PPC Audit completed. Awaiting monthly retainer confirmation.', '["ppc_audit_report.pdf"]'::jsonb, 'Not Started', 'Not Started', 'Not Started', '')
ON CONFLICT (reference) DO NOTHING;
