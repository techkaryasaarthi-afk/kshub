export const dynamic = 'force-dynamic'

import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/home/HeroSection'
import { CategoriesSection } from '@/components/home/CategoriesSection'
import { TrendingSection } from '@/components/home/TrendingSection'
import { UploadCtaBanner } from '@/components/home/UploadCtaBanner'
import { PricingSection } from '@/components/home/PricingSection'
import { FeaturedSection } from '@/components/home/FeaturedSection'
import { FaqSection } from '@/components/home/FaqSection'
import { createClient } from '@/lib/supabase/server'
import type { Document } from '@/types'

export default async function HomePage() {
  const supabase = await createClient()

  const { data: trendingDocs } = await supabase
    .from('documents')
    .select(`*, profiles(id, full_name, avatar_url), categories(id, name, slug, icon)`)
    .eq('is_published', true)
    .order('views', { ascending: false })
    .limit(8)

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
        <HeroSection />
        <CategoriesSection />
        <TrendingSection documents={(trendingDocs as Document[]) || []} />
        <UploadCtaBanner />
        <PricingSection />
        <FeaturedSection documents={(recentDocs as Document[]) || []} />
        <FaqSection />
      </main>
      <Footer />
    </>
  )
}
