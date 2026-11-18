import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Compass, MapPin, Building2, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Site Directory & Circuit Index | Sarrin Holidays',
  description:
    'Complete architectural directory of Sarrin Holidays tour packages, bespoke travel services, experiential circuits, and legal documentation.',
}

export default function SitemapPage() {
  const sections = [
    {
      category: 'Signature Holiday Packages & Circuits',
      icon: Compass,
      links: [
        { label: 'Kerala — God’s Own Country (8D/7N)', href: '/packages/kerala-gods-own-country-8d', desc: 'Munnar tea hills, Periyar wildlife cruise, and Alleppey houseboat.' },
        { label: 'Kashmir — Paradise Valleys (7D/6N)', href: '/packages/kashmir-paradise-valleys-7d', desc: 'Dal Lake luxury shikara, Gulmarg gondola, and Sonamarg glacier.' },
        { label: 'Kerala Backwaters & Mist Hills (5D/4N)', href: '/packages/kerala-backwaters-hills-5d', desc: 'Boutique plantations and secluded waterway buyouts.' },
        { label: 'Blissful Goa Coastal & Heritage Escape (4D/3N)', href: '/packages/blissful-goa-beach-getaway-4d', desc: 'Latin quarter mansions, private catamaran, and beachfront villas.' },
        { label: 'Varanasi Dev Deepawali Sacred Ghats (3D/2N)', href: '/packages/experience-varanasi-dev-deepawali-3d', desc: 'Exclusive bajra boat ghat views and VIP Ganga Aarti passes.' },
        { label: 'All Curated Expeditions Directory', href: '/#destinations', desc: 'Browse all active circuits across India.' },
      ],
    },
    {
      category: 'Seven Core Travel Services',
      icon: Building2,
      links: [
        { label: '01 · Visa Assistance', href: '/services#travel-services', desc: 'Tourist & business visa files and embassy appointments.' },
        { label: '02 · Passport Services', href: '/services#travel-services', desc: 'Fresh passport applications and Tatkaal renewals.' },
        { label: '03 · Chauffeur & Car Rental', href: '/services#travel-services', desc: 'Luxury sedans, Vellfire, and touring coaches with drivers.' },
        { label: '04 · Hotels & Heritage Stays', href: '/services#travel-services', desc: 'Taj, Oberoi, and living Rajputana palace reservations.' },
        { label: '05 · Ground Sports & Adventure', href: '/services#travel-services', desc: 'Trans-Himalayan biking, safaris, and rafting.' },
        { label: '06 · All Travel Amenities', href: '/services#travel-services', desc: 'Airport lounge access, comfort kits, and dining setups.' },
        { label: '07 · Complete Transport Desk', href: '/services#travel-services', desc: 'Domestic & international flights and luxury rail.' },
        { label: 'Full Services Atelier Overview', href: '/services', desc: 'Private aviation, palace celebrations, and VIP concierge.' },
      ],
    },
    {
      category: 'Experiential Atelier & Private Corridors',
      icon: MapPin,
      links: [
        { label: '360° VR Spatial Tour of India', href: '/#virtual-tour', desc: 'Immersive VR previews of heritage landmarks.' },
        { label: 'Trans-Himalayan Rider’s Circuit', href: '/#experiences', desc: 'Scroll-driven pass clearance tracker (Spiti to Nathu La).' },
        { label: 'Cartographic Discovery Map', href: '/#destinations', desc: 'Interactive geographic exploration across Indian states.' },
        { label: 'The Sarrin Philosophy & Atelier', href: '/#about', desc: 'Heritage custodianship and sovereign discretion.' },
        { label: 'The Private Journal & Gazette', href: '/blog', desc: 'Dispatches on palace suites, aviation, and cultural encounters.' },
      ],
    },
    {
      category: 'Corporate, Legal & Compliance',
      icon: ShieldCheck,
      links: [
        { label: 'Registered Headquarters & Contact Desk', href: '/contact', desc: 'Nashik HQ, Pan-India remote network, WhatsApp desk.' },
        { label: 'Privacy Policy & Data Custodianship', href: '/privacy-policy', desc: 'Institutional non-disclosure covenants and data security.' },
        { label: 'Terms & Conditions', href: '/terms-and-conditions', desc: 'Operational agreement, tariffs, and transit governance.' },
        { label: 'Refund & Cancellation Policy', href: '/refund-policy', desc: 'Notice schedules, charter refund rules, and settlement.' },
        { label: 'XML Machine-Readable Sitemap', href: '/sitemap.xml', desc: 'Live dynamic sitemap for search engines.' },
        { label: 'RSS News & Gazette Feed', href: '/feed.xml', desc: 'Syndicated XML feed of luxury travel updates.' },
      ],
    },
  ]

  return (
    <main className="relative min-h-screen bg-[#0C0B09] text-[#F4F2EC] selection:bg-[#C5A059]/30 selection:text-[#C5A059] overflow-x-hidden">
      <Navbar />

      {/* Atmospheric Ambient Lighting */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 size-[650px] rounded-full bg-[#C5A059]/8 blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto pt-36 pb-24 px-6 sm:px-8">
        {/* Header Breadcrumb & Title */}
        <div className="border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 rounded-sm border border-[#C5A059]/30 bg-[#C5A059]/10 px-3 py-1 text-[11px] font-sans font-medium uppercase tracking-[0.1em] text-[#C5A059] mb-4">
            <Compass className="size-3.5" strokeWidth={1.5} />
            <span>ARCHITECTURAL DIRECTORY</span>
          </div>
          <h1 className="font-serif font-medium text-4xl sm:text-5xl lg:text-6xl text-[#F4F2EC] tracking-tight">
            Site Directory &amp; Circuit Index
          </h1>
          <p className="mt-3 text-sm sm:text-base text-stone-300 font-normal max-w-2xl leading-relaxed">
            A comprehensive architectural index of all Sarrin Holidays flagship tour circuits, standalone logistics divisions, and legal documentation.
          </p>
        </div>

        {/* Directory Sections */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {sections.map((sec) => {
            const Icon = sec.icon
            return (
              <div
                key={sec.category}
                className="rounded-sm border border-white/10 bg-[#141310] p-6 sm:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 pb-5 border-b border-white/10">
                    <div className="size-9 rounded-sm border border-white/15 bg-white/[0.03] flex items-center justify-center text-[#C5A059]">
                      <Icon className="size-4" strokeWidth={1.25} />
                    </div>
                    <h2 className="font-serif text-xl sm:text-2xl text-white font-medium tracking-tight">
                      {sec.category}
                    </h2>
                  </div>

                  <ul className="mt-5 space-y-4">
                    {sec.links.map((link) => (
                      <li key={link.label} className="group">
                        <Link
                          href={link.href}
                          className="flex items-start justify-between gap-3 text-sm font-medium text-[#E5E2DC] group-hover:text-[#C5A059] transition-colors"
                        >
                          <div>
                            <span className="block leading-snug">{link.label}</span>
                            <span className="text-xs text-stone-400 font-normal leading-relaxed block mt-0.5">
                              {link.desc}
                            </span>
                          </div>
                          <ArrowRight className="size-3.5 text-stone-500 group-hover:text-[#C5A059] group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>

        {/* Central Dispatch Strip */}
        <div className="mt-12 rounded-sm border border-white/10 bg-[#141310] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-[#C5A059]">
              SARRIN HOLIDAYS HEADQUARTERS
            </span>
            <p className="text-xs sm:text-sm text-stone-300 font-normal mt-1">
              Registered Office: 42, Jagtap Complex, Satpur, Nashik, Maharashtra – 422012
            </p>
          </div>
          <a
            href="https://wa.me/918419887730"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm bg-[#C5A059] px-5 py-3 text-xs font-sans font-semibold uppercase tracking-[0.1em] text-[#0C0B09] hover:bg-[#D4B475] transition-colors shadow-md shrink-0"
          >
            <span>Connect on WhatsApp</span>
            <ArrowRight className="size-3.5" />
          </a>
        </div>
      </div>

      <Footer />
    </main>
  )
}
