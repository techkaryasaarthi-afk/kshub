'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { DEFAULT_CATEGORIES } from '@/lib/sample-documents'
import type { Category } from '@/types'

const CORE_SLUGS = [
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

export function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES)

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((res) => {
        const fetched: Category[] = res.data || []
        const filtered = fetched.filter((cat) => CORE_SLUGS.includes(cat.slug))
        if (filtered.length > 0) {
          setCategories(filtered)
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  return (
    <section className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-[#fbf8f0] via-[#f7f2e7] to-[#fbf8f0] dark:from-[#071b31] dark:via-[#09223e] dark:to-[#071b31] overflow-hidden transition-colors duration-300" id="categories">
      {/* Decorative ambient blurred blobs */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#168f8a]/5 dark:bg-[#168f8a]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-[#d29a27]/5 dark:bg-[#d29a27]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 bg-[#168f8a]/10 dark:bg-[#168f8a]/20 border border-[#168f8a]/20 dark:border-[#168f8a]/30 rounded-full text-[11px] sm:text-xs font-bold text-[#137a77] dark:text-[#5ed2c2] mb-3 uppercase tracking-wider shadow-sm">
            <span className="text-[#d29a27] dark:text-[#f5d778]">✦</span> Curated for curious minds
          </div>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#102f53] dark:text-white mb-3"
            style={{ fontFamily: 'var(--font-epilogue)', letterSpacing: '-0.04em' }}
          >
            12 Knowledge Streams. One Library.
          </h2>
          <p
            className="text-xs sm:text-sm text-[#516273] dark:text-[#c2d1df] max-w-[620px] mx-auto leading-relaxed font-medium"
            style={{ fontFamily: 'var(--font-manrope)' }}
          >
            MBA reports, dissertation papers, textbooks, and case studies — digitally organised and instantly accessible.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3.5">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/search?category=${cat.slug}`}
              className="group flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white/90 dark:bg-white/[0.06] backdrop-blur-sm border border-[#102f53]/[0.08] dark:border-white/10 rounded-2xl hover:border-[#d29a27] dark:hover:border-[#f5d778] hover:bg-white dark:hover:bg-white/[0.12] hover:shadow-[0_16px_36px_rgba(210,154,39,.14)] hover:-translate-y-1.5 transition-all duration-300 min-w-0"
            >
              <span className="text-xl sm:text-2xl shrink-0 group-hover:scale-115 group-hover:rotate-6 transition-transform duration-300">
                {cat.icon || '📄'}
              </span>
              <div className="min-w-0 flex-1">
                <span
                  className="block text-[11px] sm:text-xs font-bold text-[#102f53] dark:text-white group-hover:text-[#168f8a] dark:group-hover:text-[#5ed2c2] truncate leading-tight mb-0.5 transition-colors"
                  style={{ fontFamily: 'var(--font-manrope)' }}
                >
                  {cat.name}
                </span>
                <span 
                  className="block text-[9px] sm:text-[10px] text-[#87939c] dark:text-[#a0b0bf] font-medium"
                  style={{ fontFamily: 'var(--font-manrope)' }}
                >
                  {cat.countText || '0 docs'}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
