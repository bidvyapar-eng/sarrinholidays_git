import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { JsonLd } from '@/components/json-ld'
import { supabase } from '@/lib/supabaseClient'
import {
  FileText,
  Mail,
  Download,
  ShieldCheck,
  Award,
  ArrowRight,
  Sparkles,
  Calendar,
  Building2,
  ExternalLink,
  Compass,
} from 'lucide-react'

export const dynamic = 'force-dynamic'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sarrinholidays.com'

export const metadata: Metadata = {
  title: 'Press Room & Media Kit | Sarrin Holidays Atelier',
  description:
    'Official press releases, media kits, high-resolution photography accreditation, and editorial liaisons for Sarrin Holidays — India’s bespoke luxury travel atelier.',
  alternates: {
    canonical: `${siteUrl}/press`,
  },
  openGraph: {
    title: 'Press Room & Media Kit | Sarrin Holidays',
    description:
      'Official press releases, media kits, and editorial liaisons for Sarrin Holidays — India’s bespoke luxury travel atelier.',
    url: `${siteUrl}/press`,
    siteName: 'Sarrin Holidays',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200',
        width: 1200,
        height: 630,
        alt: 'Sarrin Holidays Press Room & Media Kit',
      },
    ],
  },
}

const PRESS_RELEASES = [
  {
    id: 'pr-1',
    date: 'October 15, 2026',
    title: 'Sarrin Holidays Unlocks Point-to-Point Mountain Aviation Corridors Across the Indian Himalayas',
    excerpt:
      'New private helicopter agreements with exclusive estates in Rishikesh, Kedarnath, and Ladakh allow private clients to bypass commercial road transit and land directly on high-altitude retreat pads.',
    category: 'Aviation & Infrastructure',
    readTime: '4 Min Read',
  },
  {
    id: 'pr-2',
    date: 'September 22, 2026',
    title: 'Exclusive Rajputana Fortress Buyouts: Setting a New Standard for Sovereign Indian Travel',
    excerpt:
      'Partnering with royal family trusts across Mewar and Marwar, Sarrin Holidays formalizes complete full-property fortress buyouts with torchlit rampart dinners and 24/7 dedicated butler service.',
    category: 'Heritage Hospitality',
    readTime: '5 Min Read',
  },
  {
    id: 'pr-3',
    date: 'August 10, 2026',
    title: 'Ayurvedic Longevity Sabbaticals: Bespoke Kettuvallam Buyouts on Vembanad Lake',
    excerpt:
      'Merging indigenous timber houseboat craftsmanship with physician-led Panchakarma curation, Sarrin launches 7-day slow-living waterway retreats along Kerala’s secluded backwater lagoons.',
    category: 'Wellness & Sanctuaries',
    readTime: '3 Min Read',
  },
]

export default async function PressPage() {
  const { data: settings } = await supabase
    .from('site_settings')
    .select('navbar_logo_text')
    .limit(1)
    .maybeSingle()

  const pressSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    '@id': `${siteUrl}/press#press-room`,
    name: 'Sarrin Holidays Press Room',
    url: `${siteUrl}/press`,
    parentOrganization: {
      '@type': 'TravelAgency',
      name: 'Sarrin Holidays',
      url: siteUrl,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'press@sarrinholidays.com',
      contactType: 'Media Relations Desk',
      availableLanguage: ['English', 'Hindi'],
    },
  }

  return (
    <main className="relative min-h-screen bg-[#0C0B09] text-[#F4F2EC] overflow-hidden selection:bg-[#C5A059]/30 selection:text-[#C5A059]">
      <JsonLd data={pressSchema} id="press-room-schema" />
      <Navbar logoText={settings?.navbar_logo_text} />

      {/* Ambient background glows */}
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 size-[650px] rounded-full bg-[#C5A059]/8 blur-[140px]" />
      <div className="pointer-events-none absolute top-[700px] -right-40 size-[500px] rounded-full bg-amber-500/5 blur-[120px]" />

      {/* Hero Header */}
      <section className="relative pt-36 pb-14 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-sm border border-[#C5A059]/30 bg-[#C5A059]/10 px-4 py-1 text-xs font-sans uppercase tracking-[0.25em] text-[#C5A059] shadow-sm">
            <FileText className="size-3.5" />
            <span>Digital PR &amp; Editorial Bureau</span>
          </div>

          <h1 className="mt-6 font-serif font-light text-4xl sm:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-[#F4F2EC]">
            Press Room &amp; Media Kit
          </h1>

          <p className="mt-6 text-base sm:text-lg text-[#B8B4AA] leading-relaxed font-light">
            Official dispatches, high-resolution photography accreditation, executive bios,
            and press liaison contacts for international luxury travel editors and journalists.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-sans text-[#B8B4AA]">
            <span className="flex items-center gap-1.5">
              <Mail className="size-4 text-[#C5A059]" /> info@sarrinholidays.com
            </span>
            <span className="hidden sm:inline opacity-30">•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-[#C5A059]" /> Verified Fact Sheets &amp; Imagery
            </span>
            <span className="hidden sm:inline opacity-30">•</span>
            <span className="flex items-center gap-1.5">
              <Building2 className="size-4 text-[#C5A059]" /> BKC Bureau, Mumbai
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="relative pb-24 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left Column: Recent Press Releases (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="font-serif text-2xl text-[#F4F2EC] font-light">
                Recent Dispatches & Announcements
              </h2>
              <span className="text-xs font-sans text-[#C5A059] uppercase tracking-[0.16em]">
                Official Releases
              </span>
            </div>

            <div className="space-y-6">
              {PRESS_RELEASES.map((pr) => (
                <article
                  key={pr.id}
                  className="group rounded-sm border border-white/10 bg-[#141310] p-6 sm:p-8 transition-all duration-300 hover:border-[#C5A059]/50 shadow-xl"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-sans text-[#B8B4AA]/70 mb-3 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="size-3 text-[#C5A059]" />
                      {pr.date}
                    </span>
                    <span className="rounded-sm border border-[#C5A059]/30 bg-[#C5A059]/10 px-2.5 py-0.5 text-[#C5A059] text-[10px] uppercase font-medium">
                      {pr.category}
                    </span>
                  </div>

                  <h3 className="font-serif font-light text-xl sm:text-2xl text-[#F4F2EC] group-hover:text-[#C5A059] transition-colors leading-snug">
                    {pr.title}
                  </h3>

                  <p className="mt-3 text-sm text-[#B8B4AA] leading-relaxed font-light">
                    {pr.excerpt}
                  </p>

                  <div className="mt-5 flex items-center justify-between text-xs font-sans text-[#C5A059] pt-3 border-t border-white/5 uppercase tracking-wider">
                    <span>{pr.readTime}</span>
                    <a
                      href="mailto:info@sarrinholidays.com?subject=Press%20Inquiry:%20"
                      className="inline-flex items-center gap-1 hover:underline font-medium"
                    >
                      <span>Request Full Brief & Assets</span>
                      <ArrowRight className="size-3" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Right Column: Media Kit Downloads & Fact Sheet (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Media Kit Card */}
            <div className="rounded-sm border border-white/10 bg-[#141310] p-6 sm:p-8 shadow-xl">
              <h3 className="font-serif text-xl text-[#F4F2EC] font-light mb-2">
                Download Media Assets
              </h3>
              <p className="text-xs text-[#B8B4AA] leading-relaxed font-light mb-6">
                Official vector logo marks, founder portraiture, and high-resolution palace photography cleared for editorial publication.
              </p>

              <div className="space-y-3">
                <a
                  href="/sarrin-holidays-logo.png"
                  download="sarrin-holidays-press-kit-logo.png"
                  className="flex items-center justify-between p-3.5 rounded-sm border border-white/10 bg-white/5 hover:border-[#C5A059]/50 hover:bg-[#C5A059]/10 transition-all text-xs font-sans text-[#F4F2EC] group"
                >
                  <div className="flex items-center gap-2.5">
                    <Download className="size-4 text-[#C5A059]" />
                    <span>Vector Brand Insignia (PNG)</span>
                  </div>
                  <span className="text-[10px] text-[#B8B4AA] group-hover:text-[#C5A059] uppercase tracking-wider font-medium">Download</span>
                </a>

                <a
                  href="/llms.txt"
                  target="_blank"
                  className="flex items-center justify-between p-3.5 rounded-sm border border-white/10 bg-white/5 hover:border-[#C5A059]/50 hover:bg-[#C5A059]/10 transition-all text-xs font-sans text-[#F4F2EC] group"
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="size-4 text-[#C5A059]" />
                    <span>Brand Fact Sheet & Guidelines</span>
                  </div>
                  <ExternalLink className="size-3.5 text-[#B8B4AA] group-hover:text-[#C5A059]" />
                </a>
              </div>
            </div>

            {/* Editorial Contact Desk Card */}
            <div className="rounded-sm border border-white/10 bg-[#141310] p-6 sm:p-8 shadow-xl">
              <span className="text-xs font-sans uppercase tracking-[0.2em] text-[#C5A059] font-medium">
                Editorial Liaison
              </span>
              <h3 className="mt-2 font-serif text-xl text-[#F4F2EC] font-light">
                Journalist & Writer Desk
              </h3>
              <p className="mt-2 text-xs text-[#B8B4AA] leading-relaxed font-light">
                For press trips, interviews with our royal heritage historians, or bespoke data on luxury Indian travel trends:
              </p>

              <div className="mt-6 space-y-2 text-xs font-sans text-[#F4F2EC]">
                <div className="text-[#C5A059] font-medium">info@sarrinholidays.com</div>
                <div className="text-[#B8B4AA]">+91 8419887730</div>
                <div className="text-[#B8B4AA]/70 text-[10px] uppercase tracking-wider">Response window: &lt; 4 Hours</div>
              </div>

              <a
                href="mailto:info@sarrinholidays.com?subject=Press%20Inquiry%20from%20Publication"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-[#C5A059] hover:bg-[#D4B475] text-[#0C0B09] font-medium px-4 py-3 text-xs uppercase tracking-[0.16em] transition-all shadow-md shadow-[#C5A059]/20"
              >
                <span>Contact Press Office</span>
                <Mail className="size-3.5" />
              </a>
            </div>

            {/* Brand Boilerplate for Journalists */}
            <div className="rounded-sm border border-white/10 bg-[#141310] p-6 shadow-xl">
              <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#C5A059] block mb-2 font-medium">
                Media Boilerplate
              </span>
              <p className="text-[11px] text-[#B8B4AA] font-light leading-relaxed select-all">
                &ldquo;Sarrin Holidays is India’s premier bespoke luxury travel atelier, curating 18th-century living palace buyouts, private aviation charters, and transformative wellness sanctuaries across the Indian subcontinent under strict non-disclosure legal covenants.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
