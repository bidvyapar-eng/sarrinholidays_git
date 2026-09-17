import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { PackagesGrid } from "@/components/packages-grid"
import { PublicContent } from "@/components/public-content"

export default function Page() {
  return (
    <main className="relative min-h-screen bg-background">
      <Navbar />
      <Hero />
      <PackagesGrid />
      <PublicContent />
    </main>
  )
}
