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
          <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#C5A059] font-medium block">
            The Private Services Atelier
          </span>

          {/* H1 Headline with Deep Serif Typography */}
          <h1 className="mt-5 font-serif font-light text-4xl sm:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-[#F4F2EC]">
            Crafted for the Discerning, Delivered with Precision
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg text-[#B8B4AA] leading-relaxed font-light">
            From high-altitude Himalayan aviation charters to closed-door palace buyouts across Rajasthan,
            experience ultra-luxury travel engineering executed with sovereign discretion.
          </p>

          {/* Credential Trust Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-[#B8B4AA] font-sans uppercase tracking-[0.18em]">
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

      {/* Concierge Desk & Operations Banner */}
      <section className="relative border-t border-white/10 bg-slate-950/80 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 rounded-3xl border border-white/12 bg-white/5 p-8 md:p-12 backdrop-blur-xl">
            <div className="max-w-xl text-center md:text-left">
              <span className="text-xs uppercase tracking-[0.25em] text-primary font-mono">
                Direct Concierge Desk
              </span>
              <h2 className="mt-2 font-serif text-3xl text-foreground sm:text-4xl">
                Ready to Architect an Extraordinary Escape?
              </h2>
              <p className="mt-3 text-sm text-foreground/70 leading-relaxed">
                Connect directly with our senior travel curators for custom flight routes, private island buyouts,
                or confidential security escorts.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full sm:w-auto">
              <a
                href="mailto:concierge@sarrinholidays.com"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-foreground hover:bg-white/10 transition-colors"
              >
                <Mail className="size-4 text-primary" />
                <span>concierge@sarrinholidays.com</span>
              </a>

              <a
                href="tel:+918419887730"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 transition-transform hover:scale-105"
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
