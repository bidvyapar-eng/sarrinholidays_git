'use client'

import dynamic from 'next/dynamic'
import { Compass } from 'lucide-react'
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
      <span className="mt-1 text-xs uppercase tracking-[0.1em] text-primary">
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
        tag: 'Sarrin Holidays',
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
    features: ['Private Vessel Master', 'On-Deck Sunset Dining', 'Ayurvedic Wellness Host', 'Rare Bird Sanctuary Access'],
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
    <section id="virtual-tour" className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-24">
      {/* Section Headline */}
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-xs font-sans uppercase tracking-[0.1em] text-[#C5A059] font-medium block">
          Spatial Previews
        </span>
        <h2 className="mt-4 font-serif font-medium text-4xl leading-tight tracking-tight text-[#F4F2EC] sm:text-5xl lg:text-6xl">
          Step inside our finest living palace suites
        </h2>
        <p className="mt-4 text-pretty text-base leading-relaxed text-[#E5E2DC] sm:text-lg">
          Before you embark, experience every corridor, hand-carved arch, and sun-drenched terrace. Drag or swipe to look around in high-fidelity equirectangular detail.
        </p>
      </div>

      {/* 360 Interactive Viewer Canvas */}
      <div className="mt-14">
        <VirtualTourViewer scenes={defaultScenes} />
      </div>
    </section>
  )
}

export default VirtualTour

