import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'
import { Navbar } from '@/components/navbar'

const WHATSAPP_MSG = encodeURIComponent(
  'Hello Sarrin Holidays, I reached a page that could not be found. Could you help me find the right destination or service?'
)

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-[#0C0B09] text-[#F4F2EC] flex flex-col overflow-x-hidden w-full max-w-[100vw]">
      {/* Navbar */}
      <Navbar />

      {/* 404 Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-20">
        <div className="max-w-2xl text-center">
          <div className="inline-flex items-center rounded-sm border border-[#C5A059]/30 bg-[#C5A059]/10 px-3.5 py-1 text-[11px] font-sans font-medium uppercase tracking-[0.1em] text-[#C5A059] mb-6">
            404 · Route Off Our Map
          </div>

          <h1 className="font-serif font-medium text-4xl sm:text-6xl leading-tight tracking-tight text-[#F4F2EC] mb-4">
            This route is off our map.
          </h1>

          <p className="text-base text-[#E5E2DC] font-normal leading-relaxed mb-10">
            The destination you&rsquo;re looking for doesn&rsquo;t exist. Let us help you find the right journey instead.
          </p>

          {/* Quick Destination Links */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <Link
              href="/packages/kerala-gods-own-country-8d"
              className="inline-flex items-center gap-2 rounded-sm border border-white/10 bg-[#141310] px-4 py-2.5 text-xs font-sans font-medium text-[#E5E2DC] hover:border-[#C5A059]/50 hover:text-[#F4F2EC] transition-colors"
            >
              Kerala — God&rsquo;s Own Country
            </Link>
            <Link
              href="/packages/kashmir-paradise-valleys-7d"
              className="inline-flex items-center gap-2 rounded-sm border border-white/10 bg-[#141310] px-4 py-2.5 text-xs font-sans font-medium text-[#E5E2DC] hover:border-[#C5A059]/50 hover:text-[#F4F2EC] transition-colors"
            >
              Kashmir — Paradise Valleys
            </Link>
            <Link
              href="/packages/royal-rajasthan-tour"
              className="inline-flex items-center gap-2 rounded-sm border border-white/10 bg-[#141310] px-4 py-2.5 text-xs font-sans font-medium text-[#E5E2DC] hover:border-[#C5A059]/50 hover:text-[#F4F2EC] transition-colors"
            >
              Rajasthan — Palaces & Forts
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-sm border border-white/10 bg-[#141310] px-4 py-2.5 text-xs font-sans font-medium text-[#E5E2DC] hover:border-[#C5A059]/50 hover:text-[#F4F2EC] transition-colors"
            >
              Private Services
            </Link>
          </div>

          {/* Primary Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#C5A059] hover:bg-[#D4B475] px-6 py-3 text-xs font-sans font-medium uppercase tracking-[0.1em] text-[#0C0B09] shadow-lg shadow-[#C5A059]/20 transition-all cursor-pointer"
            >
              <ArrowRight className="size-4" />
              <span>Return Home</span>
            </a>
            <a
              href={`https://wa.me/918419887730?text=${WHATSAPP_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-emerald-500/30 bg-emerald-950/20 hover:bg-emerald-900/30 text-emerald-300 px-6 py-3 text-xs font-sans font-medium uppercase tracking-[0.1em] transition-all cursor-pointer"
            >
              <Phone className="size-3.5 text-emerald-400" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
