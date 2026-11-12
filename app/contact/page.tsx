import { Suspense } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Navbar } from '@/components/navbar'
import { ContactForm } from '@/components/contact-form'
import { GlobalConciergeRouting } from '@/components/global-concierge-routing'
import {
  Building2,
  Crown,
  Clock,
  MapPin,
  Phone,
  Mail,
  Compass,
  ArrowUpRight,
  Calendar,
} from 'lucide-react'

import { ENABLE_GLOBAL_CONCIERGE } from '@/lib/features.config'

export const metadata = {
  title: 'Contact Our Private Concierge Atelier | Sarrin Holidays',
  description:
    'Discreet corporate headquarters in Mumbai and heritage atelier in Rajasthan. Initiate your confidential bespoke travel inquiry.',
}

export const dynamic = 'force-dynamic'

interface ContactPageProps {
  searchParams?: Promise<{ desk?: string }>
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = searchParams ? await searchParams : undefined
  const activeDesk = params?.desk === 'domestic' ? 'domestic' : 'nri'

  // Fetch branding settings
  const { data: settings } = await supabase
    .from('site_settings')
    .select('navbar_logo_text')
    .limit(1)
    .maybeSingle()

  return (
    <main className="relative min-h-screen bg-[#0C0B09] text-[#F4F2EC] selection:bg-[#C5A059]/30 selection:text-[#C5A059] overflow-x-hidden w-full max-w-[100vw]">
      {/* Floating Glass Navbar */}
      <Navbar logoText={settings?.navbar_logo_text} />

      {/* Atmospheric Ambient Lighting */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-1/4 left-1/10 size-96 rounded-full bg-[#C5A059]/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/10 size-96 rounded-full bg-amber-600/10 blur-[140px]" />
        <div className="absolute top-3/4 left-1/3 size-80 rounded-full bg-[#141310]/60 blur-[100px]" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-36 sm:pt-44 pb-20 sm:pb-32 space-y-16">
        {/* =================================================================== */}
        {/* TOP: GLOBAL CONCIERGE ROUTING SYSTEM (CONTROLLED BY FEATURE FLAG) */}
        {/* =================================================================== */}
        {ENABLE_GLOBAL_CONCIERGE && (
          <section className="relative overflow-hidden rounded-sm border border-white/10 bg-[#141310] p-6 sm:p-10 shadow-2xl">
            <GlobalConciergeRouting variant="full" activeDesk={activeDesk} />
          </section>
        )}

        {/* Main Split-Screen Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* =================================================================== */}
          {/* LEFT SIDE: Immersive Editorial Typography & Luxury Office Details */}
          {/* =================================================================== */}
          <div className="lg:col-span-6 xl:col-span-5 space-y-12">
            {/* Header / Editorial Intro */}
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-sm border border-[#C5A059]/30 bg-[#C5A059]/10 px-3.5 py-1 text-[11px] font-sans font-medium uppercase tracking-[0.22em] text-[#C5A059]">
                Concierge Desk &amp; Sovereign Atelier
              </div>

              <h1 className="font-serif font-light text-4xl sm:text-5xl xl:text-6xl leading-[1.12] text-[#F4F2EC] tracking-tight">
                Every Grand Journey Begins with a Discreet Conversation.
              </h1>

              <p className="text-base sm:text-lg text-[#B8B4AA] font-light leading-relaxed pt-2">
                Whether you require high-altitude Himalayan aviation clearances, an exclusive heritage palace buyout across Rajasthan, or fortified executive motorcades through Mumbai&apos;s financial corridors, our Private Operations Ateliers stand ready.
              </p>
            </div>

            {/* Corporate Office Dossiers (Registered HQ & Luxury Ateliers) */}
            <div className="space-y-6 pt-2">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#C5A059] font-sans font-medium block">
                Official Registered Office &amp; Operations Desks
              </span>

              {/* Office 1: Registered Central Headquarters (Nashik) */}
              <div className="group rounded-sm border border-white/10 bg-[#141310] p-6 sm:p-7 transition-all duration-300 hover:border-[#C5A059]/50 shadow-xl">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-sm bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30">
                      <Building2 className="size-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-sans uppercase tracking-[0.16em] text-[#C5A059]">
                        Central Registered Office
                      </span>
                      <h3 className="font-serif text-xl text-[#F4F2EC] font-light">
                        Sarrin Holidays Headquarters
                      </h3>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 rounded-sm bg-[#C5A059]/10 px-2.5 py-0.5 text-[10px] font-sans font-medium text-[#C5A059] border border-[#C5A059]/20">
                    MSME Verified
                  </span>
                </div>

                <div className="mt-5 space-y-3 text-xs sm:text-sm text-[#B8B4AA] font-light">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="size-4 text-[#C5A059] shrink-0 mt-0.5" />
                    <span className="leading-snug">
                      Shop No 42, Jagtap Complex, Satpur, Nashik, Maharashtra - 422012
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs">
                    <Phone className="size-3.5 text-[#C5A059] shrink-0" />
                    <a href="tel:+918419887730" className="hover:text-[#C5A059] transition-colors font-medium text-[#F4F2EC]">
                      +91 8419887730
                    </a>
                    <span className="text-white/20">|</span>
                    <a href="https://wa.me/918419887730" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                      WhatsApp 24/7
                    </a>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs">
                    <Mail className="size-3.5 text-[#C5A059] shrink-0" />
                    <a href="mailto:info@sarrinholidays.com" className="hover:text-[#C5A059] transition-colors">
                      info@sarrinholidays.com
                    </a>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-2">
                    {['Curated Circuits', 'VIP Hospitality', 'Direct Air Bookings'].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-sm bg-white/5 px-2.5 py-0.5 text-[10px] font-sans uppercase tracking-wider text-[#B8B4AA] border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-[10px] font-sans text-[#C5A059]/80 uppercase tracking-wider">
                    Reg: UDYAM-MH-23-0433487
                  </span>
                </div>
              </div>

              {/* Office 2: Metropolitan Liaison Desk */}
              <div className="group rounded-sm border border-white/10 bg-[#141310] p-6 sm:p-7 transition-all duration-300 hover:border-[#C5A059]/50 shadow-xl">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-sm bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30">
                      <Building2 className="size-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-sans uppercase tracking-[0.16em] text-[#C5A059]">
                        Metropolitan Liaison
                      </span>
                      <h3 className="font-serif text-xl text-[#F4F2EC] font-light">
                        Mumbai Operations Hub
                      </h3>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 rounded-sm bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-sans font-medium text-emerald-400 border border-emerald-500/20">
                    24/7 Operations
                  </span>
                </div>

                <div className="mt-5 space-y-3 text-xs sm:text-sm text-[#B8B4AA] font-light">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="size-4 text-[#C5A059] shrink-0 mt-0.5" />
                    <span className="leading-snug">
                      BKC Financial Corridor &amp; Mumbai International Transit Liaison
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs">
                    <Phone className="size-3.5 text-[#C5A059] shrink-0" />
                    <a href="tel:+918419887730" className="hover:text-[#C5A059] transition-colors">
                      +91 8419887730
                    </a>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs">
                    <Mail className="size-3.5 text-[#C5A059] shrink-0" />
                    <a href="mailto:mumbai.ops@sarrinholidays.com" className="hover:text-[#C5A059] transition-colors">
                      mumbai.ops@sarrinholidays.com
                    </a>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-2">
                  {['Private Aviation', 'Diplomatic Clearances', 'VIP Chauffeur Fleets'].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-sm bg-white/5 px-2.5 py-0.5 text-[10px] font-sans uppercase tracking-wider text-[#B8B4AA] border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Office 3: Rajasthan Heritage Atelier */}
              <div className="group rounded-sm border border-white/10 bg-[#141310] p-6 sm:p-7 transition-all duration-300 hover:border-[#C5A059]/50 shadow-xl">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-sm bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30">
                      <Crown className="size-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-sans uppercase tracking-[0.16em] text-[#C5A059]">
                        Royal Buyout Concierge
                      </span>
                      <h3 className="font-serif text-xl text-[#F4F2EC] font-light">
                        Rajasthan Heritage Atelier
                      </h3>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 rounded-sm bg-white/10 px-2.5 py-0.5 text-[10px] font-sans text-[#F4F2EC] border border-white/10">
                    Daily 08:00 - 22:00 IST
                  </span>
                </div>

                <div className="mt-5 space-y-3 text-xs sm:text-sm text-[#B8B4AA] font-light">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="size-4 text-[#C5A059] shrink-0 mt-0.5" />
                    <span className="leading-snug">
                      Palace Road, Near City Palace &amp; Lake Pichola, Udaipur, Rajasthan 313001
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs">
                    <Phone className="size-3.5 text-[#C5A059] shrink-0" />
                    <a href="tel:+912942427700" className="hover:text-[#C5A059] transition-colors">
                      +91 (0) 294 242 7700
                    </a>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs">
                    <Mail className="size-3.5 text-[#C5A059] shrink-0" />
                    <a href="mailto:rajasthan.desk@sarrinholidays.com" className="hover:text-[#C5A059] transition-colors">
                      rajasthan.desk@sarrinholidays.com
                    </a>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-2">
                  {['Palace Buyouts', 'Desert Glamping', 'Ceremonial Banquets'].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-sm bg-white/5 px-2.5 py-0.5 text-[10px] font-sans uppercase tracking-wider text-[#B8B4AA] border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Domestic Holiday Calendar Advisory Card */}
              <div className="rounded-sm border border-white/10 bg-[#141310] p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[10px] font-sans uppercase tracking-[0.2em] text-[#C5A059]">
                    <Calendar className="size-3.5" /> Indian Holiday Calendar &amp; Urgency
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-sm bg-red-500/10 px-2.5 py-0.5 text-[10px] font-sans font-medium text-red-300 border border-red-500/20">
                    High Festive Scarcity
                  </span>
                </div>

                <h4 className="font-serif text-lg text-[#F4F2EC] font-light">
                  Domestic Palace &amp; Aviation Windows
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-sm border border-white/10 bg-white/[0.02] space-y-1.5">
                    <div className="flex items-center justify-between">
                      <strong className="text-[#F4F2EC] font-normal">Diwali Break</strong>
                      <span className="text-[9px] font-sans font-medium text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded-sm border border-red-500/20">Oct – Nov</span>
                    </div>
                    <p className="text-[11px] text-[#B8B4AA] leading-snug font-light">
                      Severe scarcity across Udaipur &amp; Jaipur heritage wings.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-sm border border-white/10 bg-white/[0.02] space-y-1.5">
                    <div className="flex items-center justify-between">
                      <strong className="text-[#F4F2EC] font-normal">Year-End Festive</strong>
                      <span className="text-[9px] font-sans font-medium text-[#C5A059] bg-[#C5A059]/10 px-1.5 py-0.5 rounded-sm border border-[#C5A059]/20">Dec 20 – Jan 05</span>
                    </div>
                    <p className="text-[11px] text-[#B8B4AA] leading-snug font-light">
                      Peak desert luxury camps &amp; royal gala soirees.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-sm border border-white/10 bg-white/[0.02] space-y-1.5">
                    <div className="flex items-center justify-between">
                      <strong className="text-[#F4F2EC] font-normal">Summer Holidays</strong>
                      <span className="text-[9px] font-sans font-medium text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded-sm border border-cyan-500/20">Apr – Jun</span>
                    </div>
                    <p className="text-[11px] text-[#B8B4AA] leading-snug font-light">
                      Kashmir alpine estates &amp; Ladakh helicopter charters.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-sm border border-white/10 bg-white/[0.02] space-y-1.5">
                    <div className="flex items-center justify-between">
                      <strong className="text-[#F4F2EC] font-normal">Long Weekends</strong>
                      <span className="text-[9px] font-sans font-medium text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-sm border border-emerald-500/20">3–4 Days</span>
                    </div>
                    <p className="text-[11px] text-[#B8B4AA] leading-snug font-light">
                      Rapid dispatch for Holi, Republic &amp; Dussehra retreats.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sovereign Commitments Badges */}
            <div className="rounded-sm border border-white/10 bg-[#141310] p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1">
                <div className="text-[#C5A059] font-medium font-sans text-[11px] uppercase tracking-[0.16em]">
                  Strict NDA
                </div>
                <p className="text-[#B8B4AA] text-[11px] leading-relaxed font-light">
                  Sovereign client privacy covenants and diplomatic non-disclosure.
                </p>
              </div>

              <div className="space-y-1 sm:border-l sm:border-white/10 sm:pl-4">
                <div className="text-[#C5A059] font-medium font-sans text-[11px] uppercase tracking-[0.16em]">
                  2-Hour SLA
                </div>
                <p className="text-[#B8B4AA] text-[11px] leading-relaxed font-light">
                  Fast response times for rapid mountain and jet dispatch.
                </p>
              </div>

              <div className="space-y-1 sm:border-l sm:border-white/10 sm:pl-4">
                <div className="text-[#C5A059] font-medium font-sans text-[11px] uppercase tracking-[0.16em]">
                  White Glove
                </div>
                <p className="text-[#B8B4AA] text-[11px] leading-relaxed font-light">
                  Direct senior curator management on every bespoke manifest.
                </p>
              </div>
            </div>
          </div>

          {/* =================================================================== */}
          {/* RIGHT SIDE: Sleek Glassmorphism Form & Interactive Quick Actions */}
          {/* =================================================================== */}
          <div className="lg:col-span-6 xl:col-span-7">
            <Suspense fallback={<div className="p-12 text-center text-xs font-sans uppercase tracking-[0.16em] text-[#C5A059]/70">Initializing Atelier Concierge...</div>}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  )
}
