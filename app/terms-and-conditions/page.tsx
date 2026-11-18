import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { FileText, ArrowRight, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms & Conditions | Sarrin Holidays',
  description:
    'Institutional booking, travel documentation, cancellation protocols, and legal terms governing Sarrin Holidays journeys.',
}

export default function TermsAndConditionsPage() {
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
            <FileText className="size-3.5" strokeWidth={1.5} />
            <span>LEGAL &amp; COMPLIANCE</span>
          </div>
          <h1 className="font-serif font-medium text-4xl sm:text-5xl text-[#F4F2EC] tracking-tight">
            Terms &amp; Conditions
          </h1>
          <p className="mt-3 text-sm text-stone-400 font-normal">
            Operational Agreement · Sarrin Holidays Atelier Pvt. Ltd. (UDYAM-MH-23-0433487)
          </p>
        </div>

        {/* Content Body */}
        <div className="mt-12 space-y-10 text-sm sm:text-base text-stone-300 leading-relaxed font-normal">
          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-[#F4F2EC] font-medium tracking-tight flex items-center gap-2.5">
              <span className="font-mono text-sm text-[#C5A059]">01 ·</span>
              <span>Scope of Travel Atelier Services</span>
            </h2>
            <p>
              Sarrin Holidays functions as a premier travel atelier and logistics coordinator. We curate bespoke holiday itineraries, palace suite allocations, private chauffeur fleets, air charter clearances, and standalone travel documentation services (visas, passports, amenities). Every engagement is subject to these terms upon confirmation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-[#F4F2EC] font-medium tracking-tight flex items-center gap-2.5">
              <span className="font-mono text-sm text-[#C5A059]">02 ·</span>
              <span>Bespoke Inquiries &amp; Quotation Validity</span>
            </h2>
            <p>
              All luxury itineraries, palace buyout options, and private aircraft allocations are customized individually. Proposed tariffs are valid for 72 hours from issuance unless specified otherwise, owing to dynamic carrier availability, peak seasonal palace demand, and flight landing slot clearances.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-[#F4F2EC] font-medium tracking-tight flex items-center gap-2.5">
              <span className="font-mono text-sm text-[#C5A059]">03 ·</span>
              <span>Travel Documentation, Passports &amp; Visas</span>
            </h2>
            <p>
              While Sarrin Holidays provides rigorous visa and passport file preparation, the final decision to grant entry visas or issue passports rests entirely with the sovereign consulates, embassies, and the Ministry of External Affairs. Travelers must hold valid passports with at least 6 months validity from the scheduled return date.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-[#F4F2EC] font-medium tracking-tight flex items-center gap-2.5">
              <span className="font-mono text-sm text-[#C5A059]">04 ·</span>
              <span>Chauffeur &amp; Private Fleet Conduct</span>
            </h2>
            <p>
              All road transit vehicles (Mercedes-Maybach, Toyota Vellfire, Innova Crysta, and luxury coaches) are operated by certified, verified chauffeurs. In compliance with safety regulations, driving hours and mountain pass speed limits must be respected at all times.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-[#F4F2EC] font-medium tracking-tight flex items-center gap-2.5">
              <span className="font-mono text-sm text-[#C5A059]">05 ·</span>
              <span>Force Majeure &amp; High-Altitude Weather</span>
            </h2>
            <p>
              In high-altitude Himalayan sectors (Spiti, Ladakh, Zoji La, Mana Pass, Nathu La), sudden weather shifts, landslides, military border drills, or snow closures may necessitate rerouting or schedule modifications. Sarrin Holidays coordinates alternate luxury accommodations and transport swiftly; additional costs directly arising from force majeure are billed transparently at actuals.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-[#F4F2EC] font-medium tracking-tight flex items-center gap-2.5">
              <span className="font-mono text-sm text-[#C5A059]">06 ·</span>
              <span>Governing Law &amp; Jurisdiction</span>
            </h2>
            <p>
              These Terms and any non-disclosure agreements shall be governed by and construed in accordance with the laws of India. Any disputes arising hereunder shall be subject to the exclusive jurisdiction of the competent courts in Nashik, Maharashtra, India.
            </p>
          </section>
        </div>

        {/* Back Link */}
        <div className="mt-14 pt-8 border-t border-white/10 flex items-center justify-between">
          <Link
            href="/privacy-policy"
            className="inline-flex items-center gap-2 text-xs font-sans font-medium uppercase tracking-[0.1em] text-stone-300 hover:text-white transition-colors"
          >
            <span>Privacy Policy</span>
          </Link>
          <Link
            href="/refund-policy"
            className="inline-flex items-center gap-2 text-xs font-sans font-medium uppercase tracking-[0.1em] text-[#C5A059] hover:text-[#D4B475] transition-colors"
          >
            <span>Refund &amp; Cancellation Policy</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}
