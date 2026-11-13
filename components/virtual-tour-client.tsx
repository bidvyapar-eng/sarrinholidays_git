'use client'

import dynamic from 'next/dynamic'
import { Compass } from 'lucide-react'

// Next.js SSR Compatibility: Dynamically import VirtualTour with ssr: false
// to prevent 'window is not defined' or WebGL errors during server-side rendering
export const VirtualTour = dynamic(
  () => import('@/components/virtual-tour'),
  {
    ssr: false,
    loading: () => (
      <section id="virtual-tour" className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="mx-auto aspect-[16/10] w-full min-h-[500px] flex flex-col items-center justify-center rounded-[2.5rem] border border-white/15 bg-white/5 backdrop-blur-2xl">
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
      </section>
    ),
  }
)

export default VirtualTour
