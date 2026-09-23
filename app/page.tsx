import { Suspense } from "react"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { VirtualTour } from "@/components/virtual-tour-client"
import { CuratedByIntention } from "@/components/curated-by-intention"
import { PackagesGrid } from "@/components/packages-grid"
import { PublicContent } from "@/components/public-content"

export default function Page() {
  return (
    <main className="relative min-h-screen bg-background">
      <Navbar />
      <Hero />
      <VirtualTour />
      <CuratedByIntention />
      <Suspense
        fallback={
          <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
            <div className="animate-pulse space-y-4 text-center">
              <div className="mx-auto h-4 w-36 rounded-full bg-white/10" />
              <div className="mx-auto h-10 w-96 rounded-lg bg-white/10" />
            </div>
          </div>
        }
      >
        <PackagesGrid />
      </Suspense>
      <PublicContent />
    </main>
  )
}
