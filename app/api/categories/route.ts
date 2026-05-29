import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  
  // Fetch categories from the database
  const { data: categories, error } = await supabase
    .from('categories')
    .select('*')

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Define custom sort order
  const customOrder = [
    'research-papers',
    'sip-reports',
    'textbooks',
    'thesis-dissertations',
    'case-studies',
    'stories-fiction',
    'business-plans',
    'technical-docs',
    'international-resources',
    'exam-prep',
    'professional-guides',
    'creative-works'
  ]

  // Sort categories: customOrder first, then any other dynamic categories at the end
  const sortedCategories = [...categories].sort((a, b) => {
    const aIndex = customOrder.indexOf(a.slug)
    const bIndex = customOrder.indexOf(b.slug)
    
    if (aIndex !== -1 && bIndex !== -1) {
      return aIndex - bIndex
    }
    if (aIndex !== -1) return -1
    if (bIndex !== -1) return 1
    
    return a.name.localeCompare(b.name)
  })

  // Fetch count of documents per category from database
  const { data: docCounts } = await supabase
    .from('documents')
    .select('category_id')

  const counts: Record<string, number> = {}
  docCounts?.forEach((d) => {
    if (d.category_id) {
      counts[d.category_id] = (counts[d.category_id] || 0) + 1
    }
  })

  // Seed baseline numbers matching the user requirements
  const baseCounts: Record<string, string> = {
    'research-papers': '12,000+',
    'sip-reports': '8,500+',
    'textbooks': '5,000+',
    'thesis-dissertations': '6,200+',
    'case-studies': '3,800+',
    'stories-fiction': '2,100+',
    'business-plans': '1,900+',
    'technical-docs': '4,400+',
    'international-resources': '3,000+',
    'exam-prep': '2,600+',
    'professional-guides': '1,800+',
    'creative-works': '1,200+'
  }

  const result = sortedCategories.map((cat) => {
    const actualCount = counts[cat.id] || 0
    const seedStr = baseCounts[cat.slug]
    let countStr = `${actualCount} docs`
    
    if (seedStr && actualCount === 0) {
      countStr = seedStr
    } else if (seedStr) {
      const seedNum = parseInt(seedStr.replace(/,/g, '').replace('+', ''))
      countStr = `${(seedNum + actualCount).toLocaleString()}+ docs`
    }
    
    return {
      ...cat,
      countText: countStr
    }
  })

  return NextResponse.json({ data: result }, {
    headers: {
      'Cache-Control': 'no-store, max-age=0, must-revalidate',
    }
  })
}
