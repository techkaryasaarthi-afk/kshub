export const dynamic = 'force-dynamic'

/**
 * ==============================================================================
 * KSHub - Home Page (Main Entrypoint)
 * ==============================================================================
 * Architecture:
 * - Server Component rendering the high-conversion, responsive homepage
 * - Fetches published documents from Supabase (views desc, created_at desc)
 * - Passes documents down to TrendingSection and FeaturedSection
 * - Both sections feature automatic fallback to curated SAMPLE_DOCUMENTS
 *   to ensure zero empty/blank skeleton states
 * ==============================================================================
 */

import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/home/HeroSection'
import { MarqueeTicker } from '@/components/home/MarqueeTicker'
import { CategoriesSection } from '@/components/home/CategoriesSection'
import { TrendingSection } from '@/components/home/TrendingSection'
import { FeaturesSection } from '@/components/home/FeaturesSection'
import { UploadCtaBanner } from '@/components/home/UploadCtaBanner'
import { PricingSection } from '@/components/home/PricingSection'
import { FeaturedSection } from '@/components/home/FeaturedSection'
import { FaqSection } from '@/components/home/FaqSection'
import { createClient } from '@/lib/supabase/server'
import type { Document } from '@/types'

export default async function HomePage() {
  const supabase = await createClient()

  // Fetch trending documents sorted by views count
  const { data: trendingDocs } = await supabase
    .from('documents')
    .select(`*, profiles(id, full_name, avatar_url), categories(id, name, slug, icon)`)
    .eq('is_published', true)
    .order('views', { ascending: false })
    .limit(8)

  // Fetch recently added documents sorted by creation date
  const { data: recentDocs } = await supabase
    .from('documents')
    .select(`*, profiles(id, full_name, avatar_url), categories(id, name, slug, icon)`)
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(6)

  return (
    <>
      <Navbar />
      <main>
        {/* Brand light hero with 16:9 widescreen video and watermark concealment */}
        <HeroSection />

        {/* Dynamic marquee ticker showing universities, trust metrics & SSL security */}
        <MarqueeTicker />

        {/* 12 Knowledge Streams grid with instant default categories fallback */}
        <CategoriesSection />

        {/* Trending Now grid with automatic fallback to verified sample projects */}
        <TrendingSection documents={(trendingDocs as Document[]) || []} />

        {/* KsHub advantage & academic excellence feature cards */}
        <FeaturesSection />

        {/* Share & upload call-to-action banner */}
        <UploadCtaBanner />

        {/* Honest, transparent subscription and single-document pricing */}
        <PricingSection />

        {/* Recently added community documents showcase */}
        <FeaturedSection documents={(recentDocs as Document[]) || []} />

        {/* Frequently Asked Questions accordion */}
        <FaqSection />
      </main>
      <Footer />
    </>
  )
}
