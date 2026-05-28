'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const CATEGORY_SUBITEMS: Record<string, string[]> = {
  'research-papers': ['Engineering', 'Medical', 'Social Sciences', 'Business', 'Artificial Intelligence'],
  'sip-reports': ['Finance Projects', 'Marketing Projects', 'HR Reports', 'Operations'],
  'textbooks': ['Mathematics', 'Physics', 'Chemistry', 'Computer Science'],
  'thesis-dissertations': ['Doctoral Research', 'Master\'s Thesis', 'Preprints'],
  'case-studies': ['Business Strategy', 'Marketing Cases', 'Tech Cases', 'Finance Cases'],
  'stories-fiction': ['Novels', 'Short Stories', 'Poetry', 'Drama'],
  'business-plans': ['Startups', 'Expansion Plans', 'Feasibility Studies', 'Pitch Decks'],
  'technical-docs': ['APIs', 'System Architecture', 'Specs', 'Whitepapers'],
  'international-resources': ['Global Journals', 'Translations', 'Foreign Policy'],
  'exam-prep': ['Competitive Exams', 'Board Exams', 'Aptitude Tests'],
  'professional-guides': ['Career Growth', 'Skill Building', 'Interview Prep'],
  'creative-works': ['Design Portfolios', 'Art Projects', 'Creative Writing']
}

export function CategoryNav() {
  const [categories, setCategories] = useState<any[]>([])
  const [active, setActive] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((res) => {
        setCategories(res.data || [])
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="bg-[#FAF9F7] border-b border-[rgba(190,200,202,0.2)] py-4 animate-pulse">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 flex gap-4 overflow-x-auto scrollbar-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-10 w-28 bg-[#EFEEEC] rounded-full shrink-0" />
          ))}
        </div>
      </div>
    )
  }

  if (categories.length === 0) return null

  const activeCategory = categories[active]
  const subItems = activeCategory ? (CATEGORY_SUBITEMS[activeCategory.slug] || []) : []

  return (
    <div className="bg-[#FAF9F7] border-b border-[rgba(190,200,202,0.2)] sticky top-14 z-40 shadow-sm backdrop-blur-md bg-opacity-95">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        {/* Tab pills */}
        <div className="flex gap-1 overflow-x-auto scrollbar-none border-b border-gray-100 py-1">
          {categories.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold whitespace-nowrap transition-all border-b-2 ${
                active === i
                  ? 'border-[#1D4ED8] text-[#0F2C59]'
                  : 'border-transparent text-[#3F484A] hover:text-[#1A1C1B]'
              }`}
              style={{ fontFamily: 'var(--font-manrope)' }}
            >
              <span>{cat.icon || '📄'}</span>
              {cat.name}
            </button>
          ))}
          <Link
            href="/search"
            className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#3F484A] hover:text-[#1D4ED8] whitespace-nowrap transition-all border-b-2 border-transparent ml-auto"
            style={{ fontFamily: 'var(--font-manrope)' }}
          >
            All Documents →
          </Link>
        </div>

        {/* Subcategories Scroll */}
        {subItems.length > 0 && (
          <div className="flex items-center gap-6 py-2.5 overflow-x-auto scrollbar-none">
            {subItems.map((sub) => (
              <Link
                key={sub}
                href={`/search?q=${encodeURIComponent(sub)}`}
                className="text-xs text-[#6F797A] hover:text-[#1D4ED8] font-semibold whitespace-nowrap transition-colors"
                style={{ fontFamily: 'var(--font-manrope)' }}
              >
                {sub} ›
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
