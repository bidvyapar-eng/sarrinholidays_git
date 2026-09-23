-- ==============================================================================
-- Migration: Strict Row Level Security (RLS) Lockdown for inquiries table
-- Project: Sarrin Holidays Luxury Travel Portal
-- Date: 2026-09-22
-- ==============================================================================

-- 1. Ensure RLS is active on public.inquiries
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing permissive policies
DROP POLICY IF EXISTS "Allow operations full access to inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Allow public insert into inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Allow anon and authenticated insert inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Allow authenticated select inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Allow authenticated update inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Allow authenticated delete inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Public can insert inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Authenticated users can read inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Authenticated users can update inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Authenticated users can delete inquiries" ON public.inquiries;

-- 3. Policy: Public (anon) and authenticated can INSERT inquiries
-- Enables unauthenticated website visitors to submit contact forms, VIP requests, and booking inquiries
CREATE POLICY "Allow anon and authenticated insert inquiries"
ON public.inquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 4. Policy: Only authenticated admin users can SELECT inquiries
-- Protects confidential HNW client dossiers, contact info, and itineraries from public inspection
CREATE POLICY "Allow authenticated select inquiries"
ON public.inquiries
FOR SELECT
TO authenticated
USING (auth.role() = 'authenticated');

-- 5. Policy: Only authenticated admin users can UPDATE inquiries
-- Allows dispatch team to triage status (pending -> contacted -> closed) and add operational notes
CREATE POLICY "Allow authenticated update inquiries"
ON public.inquiries
FOR UPDATE
TO authenticated
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- 6. Policy: Only authenticated admin users can DELETE inquiries
-- Restricts deletion of lead records strictly to verified administrators
CREATE POLICY "Allow authenticated delete inquiries"
ON public.inquiries
FOR DELETE
TO authenticated
USING (auth.role() = 'authenticated');

-- 7. Grant proper table permissions
GRANT INSERT ON public.inquiries TO anon;
GRANT INSERT, SELECT, UPDATE, DELETE ON public.inquiries TO authenticated;

-- 8. Auto-confirm admin email in Supabase auth if unconfirmed
-- Confirms admin@sarrinholidays.com so password sign-in is immediately operational
UPDATE auth.users
SET email_confirmed_at = COALESCE(email_confirmed_at, now()),
    updated_at = now()
WHERE email = 'admin@sarrinholidays.com';

