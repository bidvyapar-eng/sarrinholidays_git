-- ==============================================================================
-- Migration: Ensure inquiries table schema and RLS policies for Sarrin Holidays
-- Table: public.inquiries
-- Date: 2026-09-22
-- ==============================================================================

-- 1. Create inquiries table if it doesn't already exist
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    notes TEXT,
    source TEXT DEFAULT 'General Contact' NOT NULL,
    status TEXT DEFAULT 'new' NOT NULL
);

-- 2. Add source and subject columns if table already exists without them
ALTER TABLE public.inquiries 
    ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'General Contact',
    ADD COLUMN IF NOT EXISTS subject TEXT,
    ADD COLUMN IF NOT EXISTS notes TEXT,
    ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new';

-- 3. Comments
COMMENT ON TABLE public.inquiries IS 'Confidential client inquiries received via Contact Us, Service Detail, and Bento Hub.';
COMMENT ON COLUMN public.inquiries.source IS 'The origin source tag (e.g., General Contact, Private Aviation, Royal Celebrations).';

-- 4. Row Level Security (RLS)
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Allow public unauthenticated submission into inquiries table
DROP POLICY IF EXISTS "Allow public insert into inquiries" ON public.inquiries;
CREATE POLICY "Allow public insert into inquiries" ON public.inquiries 
    FOR INSERT 
    WITH CHECK (true);

-- Allow administrative full access
DROP POLICY IF EXISTS "Allow operations full access to inquiries" ON public.inquiries;
CREATE POLICY "Allow operations full access to inquiries" ON public.inquiries 
    FOR ALL 
    USING (true)
    WITH CHECK (true);
