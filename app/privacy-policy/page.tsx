import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ShieldCheck, Lock, Eye, FileText, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy | Sarrin Holidays',
  description:
    'Our strict non-disclosure, data privacy, and personal information protection policies for luxury travelers.',
}

export default function PrivacyPolicyPage() {
  return (
    <main className="relative min-h-screen bg-[#0C0B09] text-[#F4F2EC] selection:bg-[#C5A059]/30 selection:text-[#C5A059] overflow-x-hidden">
      <Navbar />

      {/* Atmospheric Ambient Lighting */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-[#C5A059]/8 blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto pt-36 pb-24 px-6 sm:px-8">
        {/* Header Breadcrumb & Title */}
        <div className="border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 rounded-sm border border-[#C5A059]/30 bg-[#C5A059]/10 px-3 py-1 text-[11px] font-sans font-medium uppercase tracking-[0.1em] text-[#C5A059] mb-4">
            <ShieldCheck className="size-3.5" strokeWidth={1.5} />
            <span>LEGAL &amp; COMPLIANCE</span>
          </div>
          <h1 className="font-serif font-medium text-4xl sm:text-5xl text-[#F4F2EC] tracking-tight">
            Privacy Policy &amp; Data Custodianship
          </h1>
          <p className="mt-3 text-sm text-stone-400 font-normal">
            Last Updated · November 2026 · Sarrin Holidays Atelier Pvt. Ltd. (UDYAM-MH-23-0433487)
          </p>
        </div>

        {/* Content Body */}
        <div className="mt-12 space-y-10 text-sm sm:text-base text-stone-300 leading-relaxed font-normal">
          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-[#F4F2EC] font-medium tracking-tight flex items-center gap-2.5">
              <span className="font-mono text-sm text-[#C5A059]">01 ·</span>
              <span>Our Non-Disclosure Commitment</span>
            </h2>
            <p>
              At Sarrin Holidays, we operate under strict confidentiality protocols. Whether you commission living palace buyouts, private aviation charters, or discreet diplomatic wellness retreats, your identity, travel itineraries, guest lists, and billing records are guarded under institutional non-disclosure covenants.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-[#F4F2EC] font-medium tracking-tight flex items-center gap-2.5">
              <span className="font-mono text-sm text-[#C5A059]">02 ·</span>
              <span>Information We Collect</span>
            </h2>
            <p>
              We collect only the essential personal documentation necessary to execute travel arrangements, verify security clearances, and process carrier tickets:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-stone-400">
              <li>Full legal names, nationality, and government ID / passport documentation for permits and flight ticketing.</li>
              <li>Encrypted contact information (mobile, WhatsApp, and official email) for operational briefings and concierge dispatch.</li>
              <li>Dietary preferences, medical considerations, and accessibility accommodations for private chefs and retreat hosts.</li>
              <li>Financial records and corporate invoicing identifiers (GSTIN, corporate addresses) for tax compliance.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-[#F4F2EC] font-medium tracking-tight flex items-center gap-2.5">
              <span className="font-mono text-sm text-[#C5A059]">03 ·</span>
              <span>Usage of Personal Data</span>
            </h2>
            <p>
              All personal information collected is utilized strictly for the engineering and execution of your travel services:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-stone-400">
              <li>Filing high-altitude restricted area permits (RAP) and protected area permits (PAP) with state and defense authorities (e.g., Ladakh, Sikkim, Arunachal Pradesh).</li>
              <li>Direct hotel reservation allocations, private aviation tail clearances, and VIP security escorts.</li>
              <li>Dispatching 24/7 operational updates and flight tracking via encrypted channels.</li>
            </ul>
            <p className="pt-2 text-stone-400">
              We never sell, lease, or monetize your data with third-party advertising brokers or data exchanges.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-[#F4F2EC] font-medium tracking-tight flex items-center gap-2.5">
              <span className="font-mono text-sm text-[#C5A059]">04 ·</span>
              <span>Third-Party Partners &amp; Carrier Clearances</span>
            </h2>
            <p>
              Information is shared exclusively with accredited service partners directly involved in your journey: DGCA-approved chartered flight operators, luxury hotel chains (Taj, Oberoi, ITC, heritage estates), and verified uniformed chauffeurs. Each partner operates under written privacy and confidentiality undertakings.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-[#F4F2EC] font-medium tracking-tight flex items-center gap-2.5">
              <span className="font-mono text-sm text-[#C5A059]">05 ·</span>
              <span>Data Retention &amp; Right to Erasure</span>
            </h2>
            <p>
              Travelers retain the absolute right to inspect, correct, or request the permanent deletion of their profile and archived itinerary files following the completion of their expedition, subject to statutory tax and invoice retention obligations under Indian law.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-[#F4F2EC] font-medium tracking-tight flex items-center gap-2.5">
              <span className="font-mono text-sm text-[#C5A059]">06 ·</span>
              <span>Grievance Officer &amp; Contact Desk</span>
            </h2>
            <div className="rounded-sm border border-white/10 bg-[#141310] p-6 space-y-2 text-xs sm:text-sm">
              <p className="font-semibold text-white">Sarrin Holidays Compliance Desk</p>
              <p className="text-stone-400">Registered Headquarters: 42, Jagtap Complex, Satpur, Nashik, Maharashtra – 422012</p>
              <p className="text-stone-400">Official Email: <a href="mailto:help@sarrinholidays.com" className="text-[#C5A059] underline">help@sarrinholidays.com</a></p>
              <p className="text-stone-400">Official Desk: <a href="tel:+918419887730" className="text-[#C5A059] underline">+91 84198 87730</a></p>
            </div>
          </section>
        </div>

        {/* Back Link */}
        <div className="mt-14 pt-8 border-t border-white/10 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-sans font-medium uppercase tracking-[0.1em] text-[#C5A059] hover:text-[#D4B475] transition-colors"
          >
            <span>Return to Homepage</span>
          </Link>
          <Link
            href="/terms-and-conditions"
            className="inline-flex items-center gap-2 text-xs font-sans font-medium uppercase tracking-[0.1em] text-stone-300 hover:text-white transition-colors"
          >
            <span>Terms &amp; Conditions</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}
