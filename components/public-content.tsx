'use client'

import { ExperiencesSection } from '@/components/experiences-section'
import { JournalSection } from '@/components/journal-section'
import { AboutSection } from '@/components/about-section'

export function PublicContent() {
  return (
    <>
      {/* 1. Curated Experiences Section — Warm Sandstone / Ivory Editorial Contrast */}
      <ExperiencesSection />

      {/* 2. Journal & Editorial Section with Cartographic Discovery Map */}
      <JournalSection />

      {/* 3. The Sarrin Atelier About Section */}
      <AboutSection />
    </>
  )
}

export default PublicContent
