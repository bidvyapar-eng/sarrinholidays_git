import Link from 'next/link'
import { Navbar } from '@/components/navbar'

export const metadata = {
  title: 'Sitemap | Sarrin Holidays',
  description: 'Sarrin Holidays sitemap — all pages, packages, services, and journal articles.',
}

export default function SitemapPage() {
  return (
    <main className="relative min-h-screen bg-[#0C0B09] text-[#F4F2EC] overflow-x-hidden w-full max-w-[100vw]">
      <Navbar />

      <div className="relative z-10 max-w-4xl mx-auto pt-32 sm:pt-40 pb-24 px-6">
        <div className="space-y-12">
          <div>
            <h1 className="font-serif font-medium text-3xl sm:text-4xl text-[#F4F2EC] tracking-tight mb-2">
              Sitemap
            </h1>
            <p className="text-sm text-[#E5E2DC] font-normal">
              Navigate all sections of the Sarrin Holidays website.
            </p>
          </div>

          {/* Core Pages */}
          <section>
            <h2 className="text-xs font-sans uppercase tracking-[0.1em] text-[#C5A059] font-semibold mb-4">
              Core Pages
            </h2>
            <ul className="space-y-2 text-sm text-[#E5E2DC] font-normal">
              <li>
                <Link href="/" className="hover:text-[#C5A059] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-[#C5A059] transition-colors">
                  Curated Expeditions
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#C5A059] transition-colors">
                  Core Travel Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#C5A059] transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#C5A059] transition-colors">
                  The Journal
                </Link>
              </li>
            </ul>
          </section>

          {/* Packages */}
          <section>
            <h2 className="text-xs font-sans uppercase tracking-[0.1em] text-[#C5A059] font-semibold mb-4">
              Curated Expeditions
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-[#E5E2DC] font-normal">
              <li>
                <Link href="/packages/kerala-gods-own-country-8d" className="hover:text-[#C5A059] transition-colors">
                  Kerala — God&rsquo;s Own Country (8D)
                </Link>
              </li>
              <li>
                <Link href="/packages/kerala-backwaters-hills-5d" className="hover:text-[#C5A059] transition-colors">
                  Kerala Backwaters & Hills (5D)
                </Link>
              </li>
              <li>
                <Link href="/packages/kashmir-paradise-valleys-7d" className="hover:text-[#C5A059] transition-colors">
                  Kashmir — Paradise Valleys (7D)
                </Link>
              </li>
              <li>
                <Link href="/packages/blissful-goa-beach-getaway-4d" className="hover:text-[#C5A059] transition-colors">
                  Goa Coastal & Heritage Escape (4D)
                </Link>
              </li>
              <li>
                <Link href="/packages/experience-varanasi-dev-deepawali-3d" className="hover:text-[#C5A059] transition-colors">
                  Varanasi Dev Deepawali (3D)
                </Link>
              </li>
              <li>
                <Link href="/packages/royal-rajasthan-tour" className="hover:text-[#C5A059] transition-colors">
                  Rajasthan Palaces Grand Tour (10D)
                </Link>
              </li>
              <li>
                <Link href="/packages/kerala-houseboat-retreat" className="hover:text-[#C5A059] transition-colors">
                  Backwaters & Coastal Sanctuaries (7D)
                </Link>
              </li>
              <li>
                <Link href="/packages/himalayan-wellness-escapade" className="hover:text-[#C5A059] transition-colors">
                  Himalayan Wellness Escapade (8D)
                </Link>
              </li>
              <li>
                <Link href="/packages/wild-untamed-tiger-safari" className="hover:text-[#C5A059] transition-colors">
                  Royal Tiger Safaris (9D)
                </Link>
              </li>
            </ul>
          </section>

          {/* Services */}
          <section>
            <h2 className="text-xs font-sans uppercase tracking-[0.1em] text-[#C5A059] font-semibold mb-4">
              Private Services
            </h2>
            <ul className="space-y-2 text-sm text-[#E5E2DC] font-normal">
              <li>
                <Link href="/services/private-aviation-charters" className="hover:text-[#C5A059] transition-colors">
                  Private Aviation & Helicopters
                </Link>
              </li>
              <li>
                <Link href="/services/royal-celebrations-weddings" className="hover:text-[#C5A059] transition-colors">
                  Palace Buyouts & Celebrations
                </Link>
              </li>
              <li>
                <Link href="/services/wellness-ayurveda-sanctuaries" className="hover:text-[#C5A059] transition-colors">
                  Wellness & Ayurveda Sanctuaries
                </Link>
              </li>
              <li>
                <Link href="/services/vip-chauffeur-security" className="hover:text-[#C5A059] transition-colors">
                  VIP Chauffeur & Private Fleet
                </Link>
              </li>
            </ul>
          </section>

          {/* Legal */}
          <section>
            <h2 className="text-xs font-sans uppercase tracking-[0.1em] text-[#C5A059] font-semibold mb-4">
              Legal & Policies
            </h2>
            <ul className="space-y-2 text-sm text-[#E5E2DC] font-normal">
              <li>
                <Link href="/privacy-policy" className="hover:text-[#C5A059] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-[#C5A059] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-[#C5A059] transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  )
}
