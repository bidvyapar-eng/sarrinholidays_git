import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Compass, ArrowLeft, MessageCircle } from 'lucide-react'

export const metadata = {
  title: '404 · Page Not Found | Sarrin Holidays',
  description: 'The requested route is off our map. Return to Sarrin Holidays or reach our private travel desk.',
}

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-[#0C0B09] text-[#F4F2EC] flex flex-col justify-between selection:bg-[#C5A059]/30 selection:text-[#C5A059] overflow-x-hidden w-full max-w-[100vw]">
      {/* Header */}
      <Navbar />

      {/* Atmospheric Ambient Lighting */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-[#C5A059]/8 blur-[140px]" />
      </div>

      {/* Centered Editorial Section */}
      <section className="relative z-10 min-h-[70vh] flex flex-col items-center justify-center text-center px-6 pt-36 pb-24">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A059]/30 bg-[#C5A059]/10 px-4 py-1.5 text-xs font-sans uppercase tracking-[0.2em] text-[#C5A059] font-medium mb-6">
            <Compass className="w-3.5 h-3.5 text-[#C5A059]" strokeWidth={1.5} />
            <span>404 · PAGE NOT FOUND</span>
          </div>

          {/* Heading */}
          <h1 className="font-serif font-medium text-4xl sm:text-5xl lg:text-6xl text-[#F4F2EC] tracking-tight leading-[1.15]">
            This Route Is Off Our Map
          </h1>

          {/* Calm 1-sentence note */}
          <p className="mt-5 text-base sm:text-lg text-[#B8B4AA] font-normal leading-relaxed max-w-xl">
            The page you are looking for has moved or does not exist, but our travel desk is ready to assist you.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm bg-[#C5A059] hover:bg-[#b08d4b] text-[#0C0B09] font-sans font-medium text-sm tracking-wide transition-colors"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
              <span>Return to Homepage</span>
            </Link>

            <a
              href="https://wa.me/918419887730?text=Hello%20Sarrin%20Holidays,%20I%20reached%20a%20missing%20route%20and%20would%20like%20assistance."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm border border-white/20 bg-white/5 hover:bg-white/10 text-white font-sans font-medium text-sm tracking-wide transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#C5A059]" strokeWidth={1.5} />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Quick Links */}
          <div className="mt-12 pt-8 border-t border-white/10 w-full max-w-md">
            <span className="block text-[11px] font-sans uppercase tracking-[0.15em] text-[#8E8B82] mb-3">
              Explore Available Circuits
            </span>
            <div className="flex items-center justify-center gap-4 sm:gap-6 text-sm text-[#EAE6DF]">
              <Link
                href="/#destinations"
                className="hover:text-[#C5A059] transition-colors py-1"
              >
                Destinations
              </Link>
              <span className="text-[#8E8B82] text-xs">·</span>
              <Link
                href="/services"
                className="hover:text-[#C5A059] transition-colors py-1"
              >
                Services
              </Link>
              <span className="text-[#8E8B82] text-xs">·</span>
              <Link
                href="/contact"
                className="hover:text-[#C5A059] transition-colors py-1"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
