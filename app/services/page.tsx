import { supabase } from "@/lib/supabaseClient"
import { Navbar } from "@/components/navbar"
import { Phone } from "lucide-react"

export const dynamic = 'force-dynamic'

const CORE_SERVICES = [
  {
    number: '01',
    title: 'Visa Assistance',
    description: 'End-to-end support for Indian tourist visas, documentation, and consular appointments for domestic and international travellers.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#141310" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="size-5">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <path d="M12 3v18M3 12h18" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Passport Services',
    description: 'Fresh applications, renewals, re-issues, and tatkal passport processing coordinated through regional passport offices.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#141310" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="size-5">
        <path d="M3 5h18v14H3z" />
        <path d="M12 5v14" />
        <circle cx="7" cy="8" r="1" fill="#141310" />
        <circle cx="7" cy="11" r="1" fill="#141310" />
        <circle cx="7" cy="14" r="1" fill="#141310" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Car Rental & Chauffeur Fleet',
    description: 'Self-drive and chauffeur-driven luxury sedans, SUVs, and vintage cars for inter-city and local transfers across India.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#141310" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="size-5">
        <rect x="2" y="7" width="16" height="8" rx="2" />
        <circle cx="5.5" cy="17.5" r="2.5" fill="none" />
        <circle cx="18.5" cy="17.5" r="2.5" fill="none" />
        <path d="M7.5 11h9" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Hotels, Resorts & Palace Stays',
    description: 'Heritage palace suites, luxury resorts, boutique homestays, and private pool villas booked directly with property owners.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#141310" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="size-5">
        <path d="M3 8v9h18V8z" />
        <path d="M3 8l9-4 9 4" />
        <rect x="6" y="13" width="4" height="3" rx="1" />
        <rect x="14" y="13" width="4" height="3" rx="1" />
      </svg>
    ),
  },
  {
    number: '05',
    title: 'Ground Sports & Guided Expeditions',
    description: 'Trekking, wildlife safaris, desert camping, and adventure sports led by certified local naturalists and guides.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#141310" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="size-5">
        <path d="M3 12h18" />
        <path d="M12 3v18" />
        <path d="M6 6l6 6M18 6l-6 6" />
      </svg>
    ),
  },
  {
    number: '06',
    title: 'All Travel Amenities',
    description: 'Travel insurance, SIM cards, currency exchange, equipment rental, and concierge provisions for every journey need.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#141310" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="size-5">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <path d="M12 3v7M12 14v7M3 12h7M14 12h7" />
      </svg>
    ),
  },
  {
    number: '07',
    title: 'Complete Transport Logistics',
    description: 'Flights, trains, private transfers, and inter-city mobility coordinated end-to-end for seamless door-to-door travel.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#141310" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="size-5">
        <path d="M3 5h18v10H3z" />
        <path d="M9 15l3-3 3 3" />
        <circle cx="5" cy="17" r="2" fill="none" />
        <circle cx="19" cy="17" r="2" fill="none" />
      </svg>
    ),
  },
]

const WHATSAPP_MSG = encodeURIComponent(
  'Hello Sarrin Holidays, I would like to enquire about your core travel services. Please share details and pricing on request.'
)

export const metadata = {
  title: 'Core Travel Services | Sarrin Holidays',
  description: 'Sarrin Holidays core travel services: visa assistance, passport services, car rental, hotels, ground sports, travel amenities, and complete transport logistics across India.',
}

export default async function ServicesPage() {
  const [{ data: settings }] = await Promise.all([
    supabase.from('site_settings').select('navbar_logo_text').limit(1).maybeSingle(),
  ])

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
            Core Travel Services
          </span>

          {/* H1 Headline */}
          <h1 className="mt-5 font-serif font-medium text-4xl sm:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-[#F4F2EC]">
            Travel Services, Simplified
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg text-[#E5E2DC] leading-relaxed font-normal">
            From visas and passports to fleet cars, palace stays, guided expeditions, and complete transport logistics — every service arranged with care.
          </p>

          {/* Credential Trust Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-[#E5E2DC] font-sans uppercase tracking-[0.1em]">
            <span>Personal Guest Care</span>
            <span className="opacity-30">•</span>
            <span>24/7 Dedicated Liaison</span>
            <span className="opacity-30">•</span>
            <span>Palace &amp; Heritage Access</span>
          </div>
        </div>

        {/* 7 Core Services Grid */}
        <section className="mt-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {CORE_SERVICES.map((service) => (
                <div
                  key={service.number}
                  className="rounded-sm border border-white/10 bg-[#141310] p-6 sm:p-8 shadow-xl shadow-black/50 transition-all hover:border-[#C5A059]/50 hover:shadow-2xl"
                >
                  {/* Number & Icon */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-serif font-medium text-[18px] text-[#C5A059] tracking-tight">
                      {service.number}
                    </span>
                    <span className="text-[#C5A059]">&middot;</span>
                    {service.icon}
                  </div>

                  {/* Title */}
                  <h3 className="font-serif font-medium text-xl sm:text-2xl text-[#F4F2EC] tracking-tight mb-3">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#E5E2DC] font-normal leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={`https://wa.me/918419887730?text=${encodeURIComponent(`Hello Sarrin Holidays, I would like to enquire about ${service.title}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-sm bg-[#C5A059] hover:bg-[#D4B475] px-4 py-3 text-xs font-sans font-medium uppercase tracking-[0.1em] text-[#141310] shadow-md transition-all cursor-pointer text-center"
                    >
                      <span>WhatsApp Enquiry</span>
                    </a>
                    <a
                      href="tel:+918419887730"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-sm border border-white/20 bg-white/5 px-4 py-3 text-xs font-sans font-medium uppercase tracking-[0.1em] text-[#F4F2EC] transition-colors cursor-pointer text-center"
                    >
                      <Phone className="size-3.5 text-[#C5A059]" />
                      <span>Call Desk</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sarrin Holidays Desk & Operations Banner */}
        <section className="relative border-t border-white/10 bg-[#0C0B09] py-16 md:py-24 mt-20">
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
                  or personalized guest escorts.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full sm:w-auto">
                <a
                  href="mailto:concierge@sarrinholidays.com"
                  className="inline-flex items-center justify-center gap-2 rounded-sm border border-white/15 bg-white/[0.03] px-6 py-3.5 text-xs font-sans font-medium uppercase tracking-[0.1em] text-[#F4F2EC] hover:bg-white/[0.06] transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-4">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span>concierge@sarrinholidays.com</span>
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
      </section>
    </main>
  )
}
