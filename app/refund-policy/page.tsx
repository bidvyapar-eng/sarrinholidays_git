import { Navbar } from '@/components/navbar'

export const metadata = {
  title: 'Refund Policy | Sarrin Holidays',
  description: 'Sarrin Holidays refund and cancellation policy for travel bookings and enquiries.',
}

export default function RefundPolicyPage() {
  return (
    <main className="relative min-h-screen bg-[#0C0B09] text-[#F4F2EC] overflow-x-hidden w-full max-w-[100vw]">
      <Navbar />

      <div className="relative z-10 max-w-3xl mx-auto pt-32 sm:pt-40 pb-24 px-6">
        <article className="prose-invert max-w-none">
          <h1 className="font-serif font-medium text-3xl sm:text-4xl text-[#F4F2EC] tracking-tight mb-6">
            Refund Policy
          </h1>

          <p className="text-sm text-[#E5E2DC] font-normal leading-relaxed mb-6">
            Last updated: November 2026
          </p>

          <section className="mb-8">
            <h2 className="font-serif font-medium text-xl text-[#F4F2EC] mb-3">1. Cancellation Policy</h2>
            <p className="text-sm text-[#E5E2DC] font-normal leading-relaxed mb-3">
              All cancellations must be submitted in writing to concierge@sarrinholidays.com or via WhatsApp at
              +91 84198 87730. Cancellation fees depend on the supplier and how close to the travel date the
              cancellation is made.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif font-medium text-xl text-[#F4F2EC] mb-3">2. Supplier-Based Refunds</h2>
            <p className="text-sm text-[#E5E2DC] font-normal leading-relaxed mb-3">
              Refund amounts are determined by our partner properties (palaces, hotels, airlines, transport
              operators). Each supplier has its own cancellation schedule, which will be disclosed in your
              confirmed quotation.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif font-medium text-xl text-[#F4F2EC] mb-3">3. Deposits & Prepayments</h2>
            <p className="text-sm text-[#E5E2DC] font-normal leading-relaxed mb-3">
              Deposits are required to secure palace buyouts, private aviation charters, and exclusive
              experiences. Deposits may be non-refundable once confirmed with the supplier.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif font-medium text-xl text-[#F4F2EC] mb-3">4. Refund Processing</h2>
            <p className="text-sm text-[#E5E2DC] font-normal leading-relaxed mb-3">
              Approved refunds are processed to the original payment method within 7–14 business days, depending
              on your bank or card issuer.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif font-medium text-xl text-[#F4F2EC] mb-3">5. Force Majeure</h2>
            <p className="text-sm text-[#E5E2DC] font-normal leading-relaxed mb-3">
              In the event of force majeure (natural disasters, political unrest, pandemics, government
              restrictions), Sarrin Holidays will work with suppliers to offer rescheduling or credit notes where
              refunds are not available.
            </p>
          </section>

          <section>
            <h2 className="font-serif font-medium text-xl text-[#F4F2EC] mb-3">6. Contact Us</h2>
            <p className="text-sm text-[#E5E2DC] font-normal leading-relaxed">
              Sarrin Holidays Atelier Pvt. Ltd.<br />
              42, Jagtap Complex, Satpur, Nashik, Maharashtra – 422012<br />
              Email: concierge@sarrinholidays.com<br />
              Phone/WhatsApp: +91 84198 87730
            </p>
          </section>
        </article>
      </div>
    </main>
  )
}
