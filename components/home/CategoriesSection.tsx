'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
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
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((res) => {
        const fetched: Category[] = res.data || []
        const filtered = fetched.filter((cat) => CORE_SLUGS.includes(cat.slug))
        setCategories(filtered)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  return (
    <section className="relative py-20 px-6 bg-gradient-to-b from-[#fbf8f0] via-[#f7f2e7] to-[#fbf8f0] overflow-hidden" id="categories">
      {/* Decorative ambient blurred blobs */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#168f8a]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-[#d29a27]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#168f8a]/10 border border-[#168f8a]/20 rounded-full text-xs font-bold text-[#137a77] mb-3 uppercase tracking-wider shadow-sm">
            <span className="text-[#d29a27]">✦</span> Curated for curious minds
          </div>
          <h2
            className="text-3xl lg:text-4xl font-extrabold text-[#102f53] mb-3"
            style={{ fontFamily: 'var(--font-epilogue)', letterSpacing: '-0.04em' }}
          >
            12 Knowledge Categories. One Library.
          </h2>
          <p
            className="text-sm text-[#516273] max-w-[620px] mx-auto leading-relaxed font-medium"
            style={{ fontFamily: 'var(--font-manrope)' }}
          >
            MBA reports, dissertation papers, textbooks, and case studies — digitally organised and instantly accessible.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-20 bg-[#eee7d9] rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/search?category=${cat.slug}`}
                className="group flex items-center gap-3 p-4 bg-white/90 backdrop-blur-sm border border-[#102f53]/[0.08] rounded-2xl hover:border-[#d29a27] hover:bg-white hover:shadow-[0_16px_36px_rgba(210,154,39,.14)] hover:-translate-y-1.5 transition-all duration-300 min-w-0"
              >
                <span className="text-2xl shrink-0 group-hover:scale-115 group-hover:rotate-6 transition-transform duration-300">
                  {cat.icon || '📄'}
                </span>
                <div className="min-w-0 flex-1">
                  <span
                    className="block text-xs font-bold text-[#102f53] group-hover:text-[#168f8a] truncate leading-tight mb-0.5 transition-colors"
                    style={{ fontFamily: 'var(--font-manrope)' }}
                  >
                    {cat.name}
                  </span>
                  <span 
                    className="block text-[10px] text-[#87939c] font-medium"
                    style={{ fontFamily: 'var(--font-manrope)' }}
                  >
                    {cat.countText || '0 docs'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
