import { supabase } from "@/lib/supabaseClient"
import { Navbar } from "@/components/navbar"
import { fallbackServices, type ServiceItem } from "@/lib/cms"
import { ServicesBentoGrid } from "@/components/services-bento-grid"
import { Phone, Mail } from "lucide-react"

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Bespoke Services & Private Aviation | Sarrin Holidays',
  description: 'Private aviation, royal palace celebrations, wellness retreats, and VIP executive chauffeur services across the Indian subcontinent.',
}

export default async function ServicesPage() {
  // Parallel fetch site settings and live services
  const [{ data: settings }, { data: dbServices }] = await Promise.all([
    supabase.from('site_settings').select('navbar_logo_text').limit(1).maybeSingle(),
    supabase.from('services').select('*').eq('is_published', true).order('sort_order', { ascending: true }),
  ])

  const services: ServiceItem[] =
    dbServices && dbServices.length > 0 ? (dbServices as ServiceItem[]) : fallbackServices

  return (
    <main className="relative min-h-screen bg-background overflow-hidden selection:bg-primary/30 selection:text-primary">
      {/* Navbar */}
      <Navbar logoText={settings?.navbar_logo_text} />

      {/* Ambient background glows */}
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 size-[650px] rounded-full bg-primary/8 blur-[140px]" />
      <div className="pointer-events-none absolute top-[600px] -right-40 size-[500px] rounded-full bg-amber-500/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-40 -left-40 size-[500px] rounded-full bg-primary/5 blur-[120px]" />

      {/* Hero Header Section */}
      <section className="relative pt-36 pb-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto">
          {/* Eyebrow */}
          <span className="text-xs font-sans uppercase tracking-[0.1em] text-[#C5A059] font-medium block">
            The Private Services Atelier
          </span>

          {/* H1 Headline with Deep Serif Typography */}
          <h1 className="mt-5 font-serif font-medium text-4xl sm:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-[#F4F2EC]">
            Crafted for the Discerning, Delivered with Precision
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg text-[#E5E2DC] leading-relaxed font-normal">
            From high-altitude Himalayan aviation charters to closed-door palace buyouts across Rajasthan,
            experience ultra-luxury travel engineering executed with sovereign discretion.
          </p>

          {/* Credential Trust Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-[#E5E2DC] font-sans uppercase tracking-[0.1em]">
            <span>Strict NDA Protocol</span>
            <span className="opacity-30">•</span>
            <span>24/7 Dedicated Liaison</span>
            <span className="opacity-30">•</span>
            <span>Sovereign Palace Access</span>
          </div>
        </div>

        {/* Bento Box Grid Section */}
        <div className="mt-16">
          <ServicesBentoGrid services={services} />
        </div>
      </section>

      {/* Sarrin Holidays Desk & Operations Banner */}
      <section className="relative border-t border-white/10 bg-[#0C0B09] py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 rounded-sm border border-white/10 bg-[#141310] p-8 md:p-12 shadow-2xl">
            <div className="max-w-xl text-center md:text-left">
              <span className="text-xs uppercase tracking-[0.1em] text-[#C5A059] font-sans font-medium">
                Direct Sarrin Holidays Desk
              </span>
              <h2 className="mt-3 font-serif font-medium text-3xl sm:text-4xl text-[#F4F2EC] tracking-tight">
                Ready to Architect an Extraordinary Escape?
              </h2>
              <p className="mt-3 text-base text-[#E5E2DC] leading-relaxed font-normal">
                Connect directly with our senior travel curators for custom flight routes, private island buyouts,
                or confidential security escorts.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full sm:w-auto">
              <a
                href="mailto:help@sarrinholidays.com"
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-white/15 bg-white/[0.03] px-6 py-3.5 text-xs font-sans font-medium uppercase tracking-[0.1em] text-[#F4F2EC] hover:bg-white/[0.06] transition-colors"
              >
                <Mail className="size-4 text-[#C5A059]" />
                <span>help@sarrinholidays.com</span>
              </a>

              <a
                href="tel:+918419887730"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#C5A059] hover:bg-[#D4B475] px-6 py-3.5 text-xs font-sans font-medium uppercase tracking-[0.1em] text-[#0C0B09] shadow-lg shadow-[#C5A059]/20 transition-colors"
              >
                <Phone className="size-4" />
                <span>+91 84198 87730</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
