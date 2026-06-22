'use client'
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { StatsBar } from '@/components/StatsBar'
import { AdaSection } from '@/components/AdaSection'
import { ServicesSection } from '@/components/ServicesSection'
import { FounderSection } from '@/components/FounderSection'
import { ContactSection } from '@/components/ContactSection'
import { Footer } from '@/components/Footer'
import { useReveal } from '@/hooks/useReveal'

export default function Home() {
  useReveal()
  return (
    <>
      <Nav />
      <Hero />
      <StatsBar />
      <AdaSection />
      <ServicesSection />
      <FounderSection />
      <ContactSection />
      <Footer />
    </>
  )
}
