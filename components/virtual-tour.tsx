'use client'

import dynamic from 'next/dynamic'
import { Sparkles, Eye, ShieldCheck, Compass } from 'lucide-react'
import type { VirtualTourScene } from '@/components/virtual-tour-viewer'

// Dynamic import with SSR disabled to guarantee safety with WebGL, canvas, and browser window APIs
const VirtualTourViewer = dynamic(() => import('@/components/virtual-tour-viewer'), {
  ssr: false,
  loading: () => (
    <div className="relative aspect-[16/10] w-full min-h-[500px] flex flex-col items-center justify-center rounded-[2.5rem] border border-white/15 bg-white/5 backdrop-blur-2xl">
      <div className="relative flex size-16 items-center justify-center">
        <span className="absolute size-full animate-ping rounded-full bg-primary/20" />
        <Compass className="size-10 animate-spin text-primary" />
      </div>
      <p className="mt-4 font-serif text-lg text-foreground/80">
        Initializing 360° VR Spatial Environment…
      </p>
      <span className="mt-1 text-xs uppercase tracking-[0.2em] text-primary">
        Sarrin Bespoke Curations
      </span>
    </div>
  ),
})

export const defaultScenes: VirtualTourScene[] = [
  {
    id: 'taj-palace-suite',
    title: 'The Heritage Grand Suite — Taj Mahal Palace',
    subtitle: 'Opulent Gilded Architecture Overlooking the Arabian Sea',
    location: 'Mumbai, Maharashtra',
    tag: 'Royal Heritage',
    panorama: '/panoramas/taj-mahal-palace.jpg',
    thumbnail: '/scene-snow.png',
    description:
      'Step inside the architectural crowning jewel of Mumbai. Featuring majestic grand staircases, Belgian chandeliers, and century-old vaulted ceilings reserved for dignitaries and royal delegations.',
    features: ['24/7 Private Butler', 'Panoramic Harbor Views', 'Heritage Antiques', 'Private Chauffeur'],
    hotspots: [
      {
        id: 'taj-harbor',
        title: 'Arabian Sea Harbor View',
        subtitle: 'Gateway of India panoramic vantage',
        description: 'Step out onto the heritage private balcony overlooking the historic Gateway of India and the Arabian Sea.',
        tag: 'Scenic View',
        position: { yaw: 0.35, pitch: 0.02 },
      },
      {
        id: 'taj-butler',
        title: 'Private Butler Station',
        subtitle: '24/7 dedicated royal butler service',
        description: 'A gilded private service pantry for personalized high teas, champagne pairings, and bespoke dining.',
        tag: 'Concierge',
        position: { yaw: -1.2, pitch: -0.15 },
      },
      {
        id: 'taj-chandelier',
        title: 'Belgian Crystal Chandelier',
        subtitle: '19th century hand-cut heirloom',
        description: 'Vaulted gold-leaf cornices illuminated by historic hand-blown Belgian crystal chandeliers.',
        tag: 'Heritage',
        position: { yaw: 1.6, pitch: 0.3 },
      },
    ],
  },
  {
    id: 'kerala-houseboat-lagoon',
    title: 'Bespoke Lake Villa & Houseboat Waterway',
    subtitle: 'Private Teak Sun-Decks Along Emerald Palm-Fringed Lagoons',
    location: 'Kumarakom, Kerala Backwaters',
    tag: 'Backwaters Sanctuary',
    panorama: '/panoramas/kerala-houseboat-waters.jpg',
    thumbnail: '/scene-waterfall.png',
    description:
      'Immerse in the rhythmic stillness of the Vembanad waters. Handcrafted teakwood interiors, open-air sun decks, and bespoke Ayurvedic culinary masters catering aboard your private vessel.',
    features: ['Private Vessel Master', 'On-Deck Sunset Dining', 'Ayurvedic Wellness Concierge', 'Rare Bird Sanctuary Access'],
    hotspots: [
      {
        id: 'kerala-spa',
        title: 'Ayurvedic Spa Deck',
        subtitle: 'Private herbal rejuvenation therapies',
        description: 'Open-air Ayurvedic massage deck where certified master practitioners provide herbal steam and oil treatments right on the calm waters.',
        tag: 'Ayurvedic Spa',
        position: { yaw: 0.5, pitch: -0.08 },
      },
      {
        id: 'kerala-sundeck',
        title: 'Teak Sun-Deck & Daybeds',
        subtitle: 'Panoramic Vembanad lagoon views',
        description: 'Handcrafted teakwood bow deck with cushioned daybeds designed for golden-hour birdwatching and gentle drifting.',
        tag: 'Relaxation',
        position: { yaw: -0.85, pitch: -0.14 },
      },
      {
        id: 'kerala-chef',
        title: 'Private Coastal Chef Galley',
        subtitle: 'Fresh catch & organic spice curations',
        description: 'Live artisanal galley where your personal chef prepares pearl spot fish, tiger prawns, and fresh appams.',
        tag: 'Gastronomy',
        position: { yaw: 2.1, pitch: -0.05 },
      },
    ],
  },
  {
    id: 'rajasthan-heritage-terrace',
    title: 'Imperial Courtyard & Terrace Suite',
    subtitle: 'Hand-Carved Jharokhas & Starlit Aravalli Mountain Vistas',
    location: 'Rajasthan Heritage Citadel',
    tag: 'Imperial Sanctuary',
    panorama: '/panoramas/luxury-resort-suite.jpg',
    thumbnail: '/scene-desert.png',
    description:
      'Centuries of royal hospitality reimagined for modern connoisseurs. Expansive marble terraces, private heated plunge pools, and intimate courtyards under desert constellations.',
    features: ['Private Plunge Pool', 'Starlit Courtyard Dining', 'Private Sitar Maestros', 'Helipad Arrival'],
    hotspots: [
      {
        id: 'rajasthan-pool',
        title: 'View Private Pool',
        subtitle: 'Carved marble plunge pool',
        description: 'An intimate temperature-controlled marble plunge pool perched directly over the ancient citadel ramparts facing the Aravalli hills.',
        tag: 'Private Pool',
        position: { yaw: 0.28, pitch: -0.16 },
      },
      {
        id: 'rajasthan-jharokha',
        title: 'Starlit Jharokha Balcony',
        subtitle: 'Hand-carved sandstone lattice',
        description: 'Intricately chiseled stone balconies providing breezy shade by day and celestial desert stargazing by night.',
        tag: 'Architecture',
        position: { yaw: -0.9, pitch: 0.05 },
      },
      {
        id: 'rajasthan-courtyard',
        title: 'Sitar Maestros Courtyard',
        subtitle: 'Candlelit classical acoustic amphitheater',
        description: 'A private marble terrace where classical sitar and flute maestros perform intimate evening ragas under desert constellations.',
        tag: 'Live Sitar',
        position: { yaw: 1.75, pitch: -0.1 },
      },
    ],
  },
]

export function VirtualTour() {
  return (
    <section id="virtual-tour" className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6">
      {/* Section Headline */}
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary backdrop-blur-md">
          <Eye className="size-3.5 text-primary" />
          Immersive Spatial Previews
        </span>
        <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Step inside our finest suites <span className="italic text-primary">in 360° VR</span>
        </h2>
        <p className="mt-4 text-pretty text-base leading-relaxed text-foreground/70 sm:text-lg">
          Before you embark, experience every corridor, hand-carved arch, and sun-drenched terrace. Drag or swipe to look around in high-fidelity equirectangular detail.
        </p>
      </div>

      {/* 360 Interactive Viewer Canvas */}
      <div className="mt-14">
        <VirtualTourViewer scenes={defaultScenes} />
      </div>

      {/* Trust & Concierge Bar */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-xl">
        <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-foreground/75">
          <ShieldCheck className="size-4 text-primary" />
          <span>True-Scale Spatial Curations • Certified Luxury Venues</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-foreground/60 hidden sm:inline">
            Need a bespoke walkthrough?
          </span>
          <a
            href="#about"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-foreground transition-all hover:bg-white/20 hover:scale-105"
          >
            <Sparkles className="size-3 text-primary" />
            Request Private Access
          </a>
        </div>
      </div>
    </section>
  )
}

export default VirtualTour

