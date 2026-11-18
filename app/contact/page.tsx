import { Suspense } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Navbar } from '@/components/navbar'
import { ContactForm } from '@/components/contact-form'
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Compass,
  ArrowUpRight,
} from 'lucide-react'

export const metadata = {
  title: 'Contact Sarrin Holidays | Bespoke Indian Luxury Travel',
  description:
    'Registered corporate headquarters in Nashik and Pan-India remote network. Initiate your confidential bespoke travel inquiry.',
}

export const dynamic = 'force-dynamic'

export default async function ContactPage() {
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
      </div>

      {/* Main 2-Column Container: max-w-6xl mx-auto py-20 px-6 */}
      <div className="relative z-10 max-w-6xl mx-auto pt-32 sm:pt-36 pb-20 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* =================================================================== */}
          {/* LEFT SIDE: Intro & Operational Presence & Direct Action Buttons     */}
          {/* =================================================================== */}
          <div className="lg:col-span-5 space-y-8">
            {/* Header / Intro */}
            <div className="space-y-3">
              <div className="inline-flex items-center rounded-sm border border-[#C5A059]/30 bg-[#C5A059]/10 px-3.5 py-1 text-[11px] font-sans font-medium uppercase tracking-[0.1em] text-[#C5A059]">
                Sarrin Holidays Atelier
              </div>

              <h1 className="font-serif font-medium text-3xl sm:text-4xl xl:text-5xl leading-[1.15] text-[#F4F2EC] tracking-tight">
                Every Grand Journey Begins with a Personal Conversation.
              </h1>

              <p className="text-sm sm:text-base text-[#E5E2DC] font-normal leading-relaxed pt-1">
                Whether you require living palace buyouts in Rajasthan, silent houseboat retreats in Kerala, or bespoke mountain aviation, our senior curatorial desk stands ready.
              </p>
            </div>

            {/* 2 Operational Presence Cards */}
            <div className="space-y-4">
              {/* Card 1: Registered Corporate Headquarters (Nashik) */}
              <div className="group rounded-sm border border-white/10 bg-[#141310] p-5 sm:p-6 transition-all duration-300 hover:border-[#C5A059]/50 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-sm bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30 shrink-0">
                      <Building2 className="size-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-sans uppercase tracking-[0.1em] text-[#C5A059]">
                        Central Operational Hub
                      </span>
                      <h3 className="font-serif text-lg text-[#F4F2EC] font-medium">
                        Registered Corporate Headquarters (Nashik)
                      </h3>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 self-start rounded-sm bg-[#C5A059]/10 px-2.5 py-0.5 text-[10px] font-sans font-medium text-[#C5A059] border border-[#C5A059]/20 whitespace-nowrap">
                    MSME Verified · UDYAM-MH-23-0433487
                  </span>
                </div>

                <div className="mt-4 space-y-2.5 text-xs text-[#E5E2DC] font-normal">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="size-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                    <span className="leading-snug">
                      Corporate Office: 42, Jagtap Complex, Satpur, Nashik, Maharashtra – 422012
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs">
                    <Phone className="size-3.5 text-[#C5A059] shrink-0" />
                    <a href="tel:+918419887730" className="hover:text-[#C5A059] transition-colors font-medium text-[#F4F2EC]">
                      +91 84198 87730
                    </a>
                    <span className="text-white/20">|</span>
                    <a href="https://wa.me/918419887730" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium">
                      WhatsApp (24/7)
                    </a>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs">
                    <Mail className="size-3.5 text-[#C5A059] shrink-0" />
                    <a href="mailto:help@sarrinholidays.com" className="hover:text-[#C5A059] transition-colors font-medium text-[#F4F2EC]">
                      help@sarrinholidays.com
                    </a>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-2">
                    {['Sole Physical Headquarters', 'VIP Hospitality', 'Direct Air & Rail Charters'].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-sm bg-white/5 px-2.5 py-0.5 text-[10px] font-sans uppercase tracking-wider text-[#E5E2DC] border border-white/10"
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

              {/* Card 2: Pan-India Remote & On-Ground Network */}
              <div className="group rounded-sm border border-white/10 bg-[#141310] p-5 sm:p-6 transition-all duration-300 hover:border-[#C5A059]/50 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-sm bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30 shrink-0">
                      <Compass className="size-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-sans uppercase tracking-[0.1em] text-[#C5A059]">
                        Nationwide Digital Atelier
                      </span>
                      <h3 className="font-serif text-lg text-[#F4F2EC] font-medium">
                        Pan-India Remote &amp; On-Ground Network
                      </h3>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 self-start rounded-sm bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-sans font-medium text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
                    100% Digital Curation · Zero Retail Storefronts
                  </span>
                </div>

                <p className="mt-4 text-xs text-[#E5E2DC] leading-relaxed font-normal">
                  Sarrin Holidays operates centrally from our Nashik headquarters with zero satellite street offices. Every journey across Rajasthan, Kerala, Ladakh, Goa, Varanasi, and Kashmir is planned remotely via private video/phone consultation and executed on the ground through our vetted palace, aviation, and local naturalist partners.
                </p>

                <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-2">
                  {['Rajasthan', 'Kerala', 'Ladakh', 'Goa', 'Varanasi', 'Kashmir'].map((region) => (
                    <span
                      key={region}
                      className="rounded-sm bg-white/5 px-2.5 py-0.5 text-[10px] font-sans uppercase tracking-wider text-[#E5E2DC] border border-white/10"
                    >
                      {region}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="space-y-2.5 pt-1">
              <span className="text-[10px] font-sans uppercase tracking-[0.1em] text-[#C5A059] font-medium block">
                Direct Atelier Communications
              </span>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5">
                <a
                  href="https://wa.me/918419887730?text=Hello%20Sarrin%20Holidays%2C%20I%20would%20like%20to%20inquire%20about%20a%20bespoke%20travel%20experience."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[46px] items-center justify-between gap-2 rounded-sm border border-emerald-500/30 bg-emerald-950/20 hover:bg-emerald-900/30 text-emerald-300 px-4 py-3 text-xs font-sans font-medium uppercase tracking-[0.1em] transition-all cursor-pointer shadow-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <Phone className="size-3.5 text-emerald-400" />
                    <span>Chat on WhatsApp: +91 84198 87730</span>
                  </div>
                  <ArrowUpRight className="size-3.5 text-emerald-400" />
                </a>

                <a
                  href="mailto:help@sarrinholidays.com?subject=Confidential%20Travel%20Inquiry%20-%20Sarrin%20Holidays"
                  className="flex min-h-[46px] items-center justify-between gap-2 rounded-sm border border-white/10 bg-[#141310] hover:border-[#C5A059]/50 hover:bg-white/[0.04] text-[#F4F2EC] hover:text-[#C5A059] px-4 py-3 text-xs font-sans font-medium uppercase tracking-[0.1em] transition-all cursor-pointer shadow-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <Mail className="size-3.5 text-[#C5A059]" />
                    <span>Email: help@sarrinholidays.com</span>
                  </div>
                  <ArrowUpRight className="size-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* =================================================================== */}
          {/* RIGHT SIDE: Clean 5-Field Inquiry Form                              */}
          {/* =================================================================== */}
          <div className="lg:col-span-7">
            <Suspense fallback={<div className="p-12 text-center text-xs font-sans uppercase tracking-[0.1em] text-[#C5A059]/70">Initializing Sarrin Holidays Desk...</div>}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  )
}
