import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { RefreshCw, ArrowRight, ShieldCheck, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy | Sarrin Holidays',
  description:
    'Transparent cancellation schedules, charter cancellation rules, and refund processing timelines for Sarrin Holidays.',
}

export default function RefundPolicyPage() {
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
            <RefreshCw className="size-3.5" strokeWidth={1.5} />
            <span>LEGAL &amp; COMPLIANCE</span>
          </div>
          <h1 className="font-serif font-medium text-4xl sm:text-5xl text-[#F4F2EC] tracking-tight">
            Refund &amp; Cancellation Policy
          </h1>
          <p className="mt-3 text-sm text-stone-400 font-normal">
            Operational Protocol · Sarrin Holidays Atelier Pvt. Ltd. (UDYAM-MH-23-0433487)
          </p>
        </div>

        {/* Content Body */}
        <div className="mt-12 space-y-10 text-sm sm:text-base text-stone-300 leading-relaxed font-normal">
          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-[#F4F2EC] font-medium tracking-tight flex items-center gap-2.5">
              <span className="font-mono text-sm text-[#C5A059]">01 ·</span>
              <span>General Cancellation Timelines</span>
            </h2>
            <p>
              Due to the bespoke nature of living palace suite buyouts, private jet clearances, and curated heritage reservations, cancellation charges reflect actual partner covenants:
            </p>
            <div className="rounded-sm border border-white/10 bg-[#141310] overflow-hidden text-xs sm:text-sm">
              <div className="grid grid-cols-2 p-3.5 border-b border-white/10 font-semibold text-white bg-white/[0.03]">
                <span>Notice Period Prior to Departure</span>
                <span>Cancellation Deduction</span>
              </div>
              <div className="grid grid-cols-2 p-3.5 border-b border-white/5 text-stone-300">
                <span>30 Days or More</span>
                <span className="text-[#C5A059]">10% Administrative Retainer</span>
              </div>
              <div className="grid grid-cols-2 p-3.5 border-b border-white/5 text-stone-300">
                <span>15 to 29 Days</span>
                <span className="text-[#C5A059]">25% + Non-refundable hotel deposits</span>
              </div>
              <div className="grid grid-cols-2 p-3.5 border-b border-white/5 text-stone-300">
                <span>7 to 14 Days</span>
                <span className="text-[#C5A059]">50% of Total Booking Value</span>
              </div>
              <div className="grid grid-cols-2 p-3.5 text-stone-300">
                <span>Less than 7 Days / No-Show</span>
                <span className="text-red-400">100% Non-refundable</span>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-[#F4F2EC] font-medium tracking-tight flex items-center gap-2.5">
              <span className="font-mono text-sm text-[#C5A059]">02 ·</span>
              <span>Private Aviation &amp; Helicopter Charters</span>
            </h2>
            <p>
              Dedicated charter flights and twin-engine helicopter bookings are subject to DGCA slot approvals and operator cancellation terms. If a flight cannot operate due to adverse weather or airport military airspace restrictions, 100% of the air operator refund received is credited back to the traveler.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-[#F4F2EC] font-medium tracking-tight flex items-center gap-2.5">
              <span className="font-mono text-sm text-[#C5A059]">03 ·</span>
              <span>Visa &amp; Passport Services</span>
            </h2>
            <p>
              Government statutory fees, embassy visa fees, biometric center charges, and courier clearances are disbursed directly to authorities and are strictly non-refundable once appointments are scheduled.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-[#F4F2EC] font-medium tracking-tight flex items-center gap-2.5">
              <span className="font-mono text-sm text-[#C5A059]">04 ·</span>
              <span>Refund Processing &amp; Disbursement</span>
            </h2>
            <p>
              Approved refunds are credited directly to the original bank account or corporate credit facility within 7 to 14 business days of formal written settlement. All refunds include an official credit note itemizing supplier payouts.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-[#F4F2EC] font-medium tracking-tight flex items-center gap-2.5">
              <span className="font-mono text-sm text-[#C5A059]">05 ·</span>
              <span>Concierge Assistance for Modifications</span>
            </h2>
            <p>
              We always prioritize rescheduling over cancellation whenever dates need shifting. Reach out to our senior operations desk to discuss flexible date transfers:
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="tel:+918419887730"
                className="inline-flex items-center gap-2 rounded-sm bg-[#C5A059] px-5 py-2.5 text-xs font-sans font-medium uppercase tracking-[0.1em] text-[#0C0B09] hover:bg-[#D4B475] transition-colors"
              >
                <Phone className="size-3.5" />
                <span>+91 84198 87730</span>
              </a>
              <a
                href="mailto:help@sarrinholidays.com"
                className="inline-flex items-center gap-2 rounded-sm border border-white/15 bg-white/[0.03] px-5 py-2.5 text-xs font-sans font-medium uppercase tracking-[0.1em] text-white hover:bg-white/[0.08] transition-colors"
              >
                <span>help@sarrinholidays.com</span>
              </a>
            </div>
          </section>
        </div>

        {/* Back Link */}
        <div className="mt-14 pt-8 border-t border-white/10 flex items-center justify-between">
          <Link
            href="/terms-and-conditions"
            className="inline-flex items-center gap-2 text-xs font-sans font-medium uppercase tracking-[0.1em] text-stone-300 hover:text-white transition-colors"
          >
            <span>Terms &amp; Conditions</span>
          </Link>
          <Link
            href="/sitemap"
            className="inline-flex items-center gap-2 text-xs font-sans font-medium uppercase tracking-[0.1em] text-[#C5A059] hover:text-[#D4B475] transition-colors"
          >
            <span>HTML Sitemap</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}
