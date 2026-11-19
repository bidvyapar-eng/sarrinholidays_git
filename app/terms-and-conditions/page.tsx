import { Navbar } from '@/components/navbar'

export const metadata = {
  title: 'Terms & Conditions | Sarrin Holidays',
  description: 'Sarrin Holidays terms and conditions governing travel enquiries, bookings, and service use.',
}

export default function TermsAndConditionsPage() {
  return (
    <main className="relative min-h-screen bg-[#0C0B09] text-[#F4F2EC] overflow-x-hidden w-full max-w-[100vw]">
      <Navbar />

      <div className="relative z-10 max-w-3xl mx-auto pt-32 sm:pt-40 pb-24 px-6">
        <article className="prose-invert max-w-none">
          <h1 className="font-serif font-medium text-3xl sm:text-4xl text-[#F4F2EC] tracking-tight mb-6">
            Terms & Conditions
          </h1>

          <p className="text-sm text-[#E5E2DC] font-normal leading-relaxed mb-6">
            Last updated: November 2026
          </p>

          <section className="mb-8">
            <h2 className="font-serif font-medium text-xl text-[#F4F2EC] mb-3">1. Acceptance of Terms</h2>
            <p className="text-sm text-[#E5E2DC] font-normal leading-relaxed mb-3">
              By submitting an enquiry or engaging with Sarrin Holidays, you agree to these terms and conditions.
              If you do not agree, please do not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif font-medium text-xl text-[#F4F2EC] mb-3">2. Travel Enquiries & Quotations</h2>
            <p className="text-sm text-[#E5E2DC] font-normal leading-relaxed mb-3">
              All itineraries and tariffs are provided &ldquo;on request&rdquo; and are tailored to your party size,
              room categories, travel dates, and seasonal availability. Quotations are not binding until confirmed
              in writing by Sarrin Holidays.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif font-medium text-xl text-[#F4F2EC] mb-3">3. Booking & Confirmation</h2>
            <p className="text-sm text-[#E5E2DC] font-normal leading-relaxed mb-3">
              A booking is considered confirmed only upon receipt of a written confirmation from Sarrin Holidays
              and any required deposit. All palace, aviation, and ground reservations are subject to availability.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif font-medium text-xl text-[#F4F2EC] mb-3">4. Payments</h2>
            <p className="text-sm text-[#E5E2DC] font-normal leading-relaxed mb-3">
              Payments are accepted via wire transfer, credit card, or UPI. Payment schedules and amounts are
              specified in your confirmed quotation. All applicable taxes are payable by the client.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif font-medium text-xl text-[#F4F2EC] mb-3">5. Cancellation & Refunds</h2>
            <p className="text-sm text-[#E5E2DC] font-normal leading-relaxed mb-3">
              Cancellation terms vary by supplier (palace, airline, transport operator) and are detailed in your
              quotation. Please refer to our Refund Policy for further details.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif font-medium text-xl text-[#F4F2EC] mb-3">6. Guest Conduct</h2>
            <p className="text-sm text-[#E5E2DC] font-normal leading-relaxed mb-3">
              Guests are expected to conduct themselves respectfully at all partner properties and during all
              arranged experiences. Sarrin Holidays reserves the right to terminate services without refund in
              cases of misconduct.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif font-medium text-xl text-[#F4F2EC] mb-3">7. Limitation of Liability</h2>
            <p className="text-sm text-[#E5E2DC] font-normal leading-relaxed mb-3">
              Sarrin Holidays acts as an intermediary between clients and independent service providers. We are not
              liable for delays, cancellations, or disruptions caused by third parties, weather, or circumstances
              beyond our reasonable control.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif font-medium text-xl text-[#F4F2EC] mb-3">8. Governing Law</h2>
            <p className="text-sm text-[#E5E2DC] font-normal leading-relaxed mb-3">
              These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of
              the courts in Nashik, Maharashtra.
            </p>
          </section>

          <section>
            <h2 className="font-serif font-medium text-xl text-[#F4F2EC] mb-3">9. Contact Us</h2>
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
