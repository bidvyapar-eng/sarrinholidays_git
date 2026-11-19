import { supabase } from '@/lib/supabaseClient'
import { Navbar } from '@/components/navbar'
import { ContactForm } from '@/components/contact-form'
import {
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
} from 'lucide-react'

export const metadata = {
  title: 'Contact Sarrin Holidays | Bespoke Indian Luxury Travel',
  description:
    'Registered headquarters in Nashik, Maharashtra. All other Indian destinations operate remotely with zero street locations. Initiate your travel inquiry.',
}

export const dynamic = 'force-dynamic'

export default async function ContactPage() {
  const { data: settings } = await supabase
    .from('site_settings')
    .select('navbar_logo_text')
    .limit(1)
    .maybeSingle()

  return (
    <main className="relative min-h-screen bg-[#0C0B09] text-[#F4F2EC] overflow-x-hidden w-full max-w-[100vw]">
      {/* Floating Glass Navbar */}
      <Navbar logoText={settings?.navbar_logo_text} />

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto pt-32 sm:pt-40 pb-24 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* =================================================================== */}
          {/* LEFT SIDE: Nashik HQ Card + Remote Note + Direct Action Buttons     */}
          {/* =================================================================== */}
          <div className="lg:col-span-5 space-y-8">
            {/* Header / Intro */}
            <div className="space-y-3">
              <div className="inline-flex items-center rounded-sm border border-[#C5A059]/30 bg-[#C5A059]/10 px-3.5 py-1 text-[11px] font-sans font-medium uppercase tracking-[0.1em] text-[#C5A059]">
                Sarrin Holidays Desk
              </div>

              <h1 className="font-serif font-medium text-3xl sm:text-4xl xl:text-5xl leading-[1.15] text-[#F4F2EC] tracking-tight">
                Every Grand Journey Begins with a Conversation.
              </h1>

              <p className="text-sm sm:text-base text-[#E5E2DC] font-normal leading-relaxed pt-1">
                Our single office in Nashik, Maharashtra coordinates every journey across India.
                All other destinations are managed 100% remotely — there are zero street storefronts.
              </p>
            </div>

            {/* Single Nashik HQ Card */}
            <div className="group rounded-sm border border-white/10 bg-[#141310] p-6 sm:p-8 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-sm bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30 shrink-0">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-sans uppercase tracking-[0.1em] text-[#C5A059]">
                      Registered Headquarters
                    </span>
                    <h3 className="font-serif text-lg text-[#F4F2EC] font-medium">
                      Nashik Headquarters
                    </h3>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 self-start rounded-sm bg-[#C5A059]/10 px-2.5 py-0.5 text-[10px] font-sans font-medium text-[#C5A059] border border-[#C5A059]/20 whitespace-nowrap">
                  MSME Verified · UDYAM-MH-23-0433487
                </span>
              </div>

              <div className="mt-5 space-y-3 text-sm text-[#E5E2DC] font-normal">
                <div className="flex items-start gap-2.5">
                  <MapPin className="size-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <span className="leading-snug">
                    42, Jagtap Complex, Satpur, Nashik, Maharashtra – 422012
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="size-4 text-[#C5A059] shrink-0" />
                  <a href="tel:+918419887730" className="hover:text-[#F4F2EC] transition-colors font-medium">
                    +91 84198 87730
                  </a>
                  <span className="text-[#F4F2EC]/30">|</span>
                  <a href="https://wa.me/918419887730" target="_blank" rel="noopener noreferrer" className="text-[#C5A059] hover:text-[#D4B475] transition-colors font-medium">
                    WhatsApp Concierge
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="size-4 text-[#C5A059] shrink-0" />
                  <a href="mailto:concierge@sarrinholidays.com" className="hover:text-[#F4F2EC] transition-colors font-medium">
                    concierge@sarrinholidays.com
                  </a>
                </div>
              </div>

              {/* Remote Operations Note */}
              <div className="mt-6 rounded-sm border border-[#C5A059]/20 bg-[#C5A059]/5 p-5">
                <div className="flex items-start gap-2.5">
                  <span className="text-[10px] font-sans uppercase tracking-wider text-[#C5A059] font-medium block">
                    Operational Note
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#E5E2DC] leading-relaxed mt-2 font-normal">
                  All other destinations across India — Rajasthan, Kerala, Ladakh, Goa, Varanasi, Kashmir,
                  and beyond — operate 100% remotely from our Nashik desk. There are zero street
                  storefronts, satellite offices, or physical branches outside Nashik.
                </p>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="space-y-2.5 pt-1">
              <span className="text-[10px] font-sans uppercase tracking-[0.1em] text-[#C5A059] font-medium block">
                Direct Communications
              </span>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <a
                  href="https://wa.me/918419887730?text=Hello%20Sarrin%20Holidays%2C%20I%20would%20like%20to%20inquire%20about%20a%20bespoke%20travel%20experience."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[46px] items-center justify-between gap-2 rounded-sm border border-emerald-500/30 bg-emerald-950/20 hover:bg-emerald-900/30 text-emerald-300 px-4 py-3 text-xs font-sans font-medium uppercase tracking-[0.1em] transition-all cursor-pointer shadow-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <Phone className="size-3.5 text-emerald-400" />
                    <span>Chat on WhatsApp</span>
                  </div>
                  <ArrowUpRight className="size-3.5 text-emerald-400" />
                </a>

                <a
                  href="mailto:concierge@sarrinholidays.com?subject=Travel%20Inquiry%20-%20Sarrin%20Holidays"
                  className="flex min-h-[46px] items-center justify-between gap-2 rounded-sm border border-white/10 bg-[#141310] hover:border-[#C5A059]/50 hover:bg-white/[0.04] text-[#F4F2EC] hover:text-[#C5A059] px-4 py-3 text-xs font-sans font-medium uppercase tracking-[0.1em] transition-all cursor-pointer shadow-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <Mail className="size-3.5 text-[#C5A059]" />
                    <span>Email Concierge</span>
                  </div>
                  <ArrowUpRight className="size-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* =================================================================== */}
          {/* RIGHT SIDE: Clean 4-Field Enquiry Form                                */}
          {/* =================================================================== */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  )
}
