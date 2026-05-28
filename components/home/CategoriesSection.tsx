'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export function CategoriesSection() {
  const [categories, setCategories] = useState<any[]>([])
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

  return (
    <section className="py-12 px-6 bg-white" id="categories">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#1D4ED8]/10 rounded-full text-xs font-semibold text-[#1D4ED8] mb-3 uppercase tracking-wider">
            ✦ Content Library
          </div>
          <h2
            className="text-3xl lg:text-4xl font-extrabold text-[#1A1C1B] mb-3"
            style={{ fontFamily: 'var(--font-epilogue)', letterSpacing: '-0.04em' }}
          >
            12 Categories. One Library.
          </h2>
          <p
            className="text-sm text-[#475569] max-w-[620px] mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-manrope)' }}
          >
            MBA reports, dissertation papers, textbooks, and case studies — digitally organised and instantly accessible.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-16 bg-[#F4F3F1] rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/search?category=${cat.slug}`}
                className="flex items-center gap-3 p-3 bg-[#FAF9F7] border border-gray-200/50 rounded-xl hover:border-[#1D4ED8]/30 hover:bg-[#1D4ED8]/5 hover:shadow-md transition-all min-w-0"
              >
                <span className="text-2xl shrink-0">{cat.icon || '📄'}</span>
                <div className="min-w-0 flex-1">
                  <span
                    className="block text-xs font-bold text-gray-800 truncate leading-tight mb-0.5"
                    style={{ fontFamily: 'var(--font-manrope)' }}
                  >
                    {cat.name}
                  </span>
                  <span 
                    className="block text-[10px] text-gray-400 font-medium"
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
