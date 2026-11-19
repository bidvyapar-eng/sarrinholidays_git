import { Navbar } from '@/components/navbar'

export const metadata = {
  title: 'Privacy Policy | Sarrin Holidays',
  description: 'Sarrin Holidays privacy policy — how we collect, use, and protect your personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <main className="relative min-h-screen bg-[#0C0B09] text-[#F4F2EC] overflow-x-hidden w-full max-w-[100vw]">
      <Navbar />

      <div className="relative z-10 max-w-3xl mx-auto pt-32 sm:pt-40 pb-24 px-6">
        <article className="prose-invert max-w-none">
          <h1 className="font-serif font-medium text-3xl sm:text-4xl text-[#F4F2EC] tracking-tight mb-6">
            Privacy Policy
          </h1>

          <p className="text-sm text-[#E5E2DC] font-normal leading-relaxed mb-6">
            Last updated: November 2026
          </p>

          <section className="mb-8">
            <h2 className="font-serif font-medium text-xl text-[#F4F2EC] mb-3">1. Information We Collect</h2>
            <p className="text-sm text-[#E5E2DC] font-normal leading-relaxed mb-3">
              Sarrin Holidays collects personal information you voluntarily provide when you submit an enquiry,
              complete our contact form, or message us via WhatsApp. This may include your name, phone number,
              email address, travel preferences, destination details, and any notes you share about your journey.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif font-medium text-xl text-[#F4F2EC] mb-3">2. How We Use Your Information</h2>
            <p className="text-sm text-[#E5E2DC] font-normal leading-relaxed mb-3">
              We use your information to respond to your enquiry, prepare customised travel proposals, coordinate
              bookings with our palace, aviation, and ground partners, and communicate about your itinerary. We do
              not sell or rent your personal data to third parties.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif font-medium text-xl text-[#F4F2EC] mb-3">3. Sharing & Disclosure</h2>
            <p className="text-sm text-[#E5E2DC] font-normal leading-relaxed mb-3">
              Your details may be shared with our vetted hospitality partners (hotels, transport operators, guides)
              strictly to the extent necessary to fulfil your travel request. All partners are bound by personal
              discretion and guest privacy expectations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif font-medium text-xl text-[#F4F2EC] mb-3">4. Data Security</h2>
            <p className="text-sm text-[#E5E2DC] font-normal leading-relaxed mb-3">
              We implement reasonable technical and organisational measures to protect your information from
              unauthorised access, alteration, or disclosure. All communications are handled with personal
              discretion by our Nashik desk.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif font-medium text-xl text-[#F4F2EC] mb-3">5. Your Rights</h2>
            <p className="text-sm text-[#E5E2DC] font-normal leading-relaxed mb-3">
              You may request access to, correction of, or deletion of your personal data at any time by contacting
              us at concierge@sarrinholidays.com or via WhatsApp at +91 84198 87730.
            </p>
          </section>

          <section className="mb-8">
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
