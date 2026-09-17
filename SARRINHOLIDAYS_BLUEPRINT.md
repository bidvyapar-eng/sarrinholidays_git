# 🗺️ Master Project Blueprint: Sarrinholidays Web Platform

This master specification document outlines the exact architecture, copy matrices, cloud database schema, and full-stack implementation directives for the **Sarrinholidays** travel engineering framework.

---

## 🛠️ 1. Technical Stack & Core Tokens
* **Frontend Framework:** Next.js (App Router, React 19)
* **Styling Engine:** Tailwind CSS + Radix UI / Shadcn primitives
* **Database & Auth Layer:** Supabase (Cloud Relational PostgreSQL Engine)
* **Design Philosophy:** High-End Luxury Aesthetic, "Glassmorphism" layer accents, sharp structural tracking, micro-borders, and high-fidelity media containers.

---

## 📂 2. Target File Directory Structure
The application codebase must map uniformly to the following modular tree:

```text
sarrinholidays/
├── app/
│   ├── layout.tsx         # Global fonts, metadata providers, and layout wrapping
│   ├── page.tsx           # Public-facing high-end responsive landing page matrix
│   ├── globals.css        # Tailwind core configs, variables, and glassmorphism blurs
│   └── admin/
│       └── page.tsx       # Protected Package Admin Management Panel Dashboard
├── components/
│   ├── navbar.tsx         # Premium Glassmorphism Floating Navigation Header
│   ├── hero.tsx           # High-impact Hero UI Canvas containing the core value prop
│   ├── search-filter.tsx  # Dynamic interactive location/duration layout filter bar
│   └── packages-grid.tsx  # Dynamic database relational data card fetching matrix
├── lib/
│   ├── utils.ts           # Class variance merge scripts (clsx / tailwind-merge)
│   └── supabaseClient.ts  # Singleton Database Handshake Instance
└── .env.local             # Secured system cloud credentials keys
```

---

## 📝 3. Content Copy Matrix (Locked Copy Elements)
* **Primary Hero Headline (H1):** `Sarrinholidays: The Intelligent Itinerary & Operations Platform for Bespoke Travel Curators.`
* **Hero Body Text:** `Elevate the Craft of Travel Curation. Extraordinary journeys do not happen by chance—they are architected with precision, vision, and care. Sarrinholidays provides boutique agencies, independent curators, and luxury travel consultants with the technology and real-time infrastructure needed to design unforgettable, seamless itineraries. Spend less time managing operational friction and more time delivering bespoke journeys that inspire loyalty.`
* **Primary Call-To-Action (CTA):** `Request Private Access` (Must be styled visually as an elite, high-contrast border button with micro-shadowing).

---

## 🗄️ 4. Supabase Database Schema
Execute the following script inside the **Supabase SQL Editor console** to securely establish the target relations and configure Row Level Security (RLS):

```sql
-- Create the premium holiday packages catalog table
CREATE TABLE public.packages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    destination TEXT NOT NULL,
    duration TEXT NOT NULL,
    price NUMERIC NOT NULL,
    image_url TEXT,
    description TEXT
);

-- Enable Row Level Security (RLS) for data isolation and security
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;

-- Allow unrestricted public read access so any advisor can view package data
CREATE POLICY "Allow public read access" ON public.packages 
    FOR SELECT USING (true);

-- Restrict state mutations (INSERT/DELETE) strictly to authenticated session users
CREATE POLICY "Allow admin full access" ON public.packages 
    FOR ALL USING (auth.role() = 'authenticated');
```

---

## 🎨 5. Component Visual & Responsiveness Specifications
* **Packages Grid Breakpoints:** Utilize strict Tailwind mappings to transition fluidly: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`.
* **Card UI Style Sheet:** Applied wrappers must feature custom card parameters:
  * Border radii matching `rounded-2xl`.
  * Background blurs matching `bg-white/10 backdrop-blur-md border border-white/20`.
  * Image transformations matching `hover:scale-105 transition-transform duration-500 overflow-hidden`.
  * Micro-gradient pill badges fixed to the top corner highlighting the duration.

---

## 🚀 6. Phase 3 System Generation Prompt
*Copy and paste this final block directly into your next workspace chat session with your AI developer tool to begin generating the code:*

```text
Act as a Principal Full-Stack Engineer. Review the attached Sarrinholidays Master Project Blueprint and open the existing Next.js frontend code repository. We are launching into Phase 3: Core Engineering & Code Generation.

Generate the remaining full-stack backend components by executing these development phases sequentially:
1. Initialize 'lib/supabaseClient.ts' to safely instantiate and export the '@supabase/supabase-js' client using 'process.env.NEXT_PUBLIC_SUPABASE_URL' and 'process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY'.
2. Complete 'app/page.tsx' to cleanly render the Navbar, Hero, and SearchFilter components alongside a newly introduced '<PackagesGrid />' container component.
3. Code 'components/packages-grid.tsx' as a client-side component using React's 'useEffect' and 'useState'. Query the Supabase 'packages' database table, safely stream the metadata array, and dynamically map the elements onto the premium 3-column glassmorphism cards generated in our v0 file.
4. Construct 'app/admin/page.tsx' to act as an operations dashboard panel. Build a split-screen dashboard:
   - Left Side Form: A package ingestion form matching our schema (Title, Destination, Duration, Price, Image URL, Description) with a submission engine that executes a database insertion mutation.
   - Right Side Table: A management grid displaying active package entries side-by-side with an active, click-triggered delete action linked to the targeted unique row ID.

Ensure all exports use standard Next.js App Router conventions and that all error handlers are cleanly accounted for. Let's begin generating the code files step-by-step.
```
