'use client'

import { useState } from 'react'
import Link from 'next/link'

const CATEGORIES = [
  {
    name: 'Academic',
    icon: '📚',
    slug: 'academic',
    sub: ['Foreign Language', 'Science & Math', 'Study Aids', 'Teaching'],
  },
  {
    name: 'Professional',
    icon: '💼',
    slug: 'professional',
    sub: ['Business', 'Leadership', 'Technology', 'Career'],
  },
  {
    name: 'Culture',
    icon: '🎭',
    slug: 'culture',
    sub: ['Arts', 'History', 'Religion', 'Society'],
  },
  {
    name: 'Hobbies & Crafts',
    icon: '🎨',
    slug: 'hobbies',
    sub: ['DIY', 'Cooking', 'Games', 'Sports'],
  },
  {
    name: 'Personal Growth',
    icon: '🌱',
    slug: 'personal-growth',
    sub: ['Self Help', 'Health', 'Finance', 'Mindfulness'],
  },
]

export function CategoryNav() {
  const [active, setActive] = useState(0)

  return (
    <div className="bg-[#F4F3F1] border-b border-[rgba(190,200,202,0.2)]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        {/* Tab pills */}
        <div className="flex gap-1 overflow-x-auto scrollbar-none">
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat.slug}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold whitespace-nowrap transition-all border-b-2 ${
                active === i
                  ? 'border-[#00616A] text-[#00484E]'
                  : 'border-transparent text-[#3F484A] hover:text-[#1A1C1B]'
              }`}
              style={{ fontFamily: 'var(--font-manrope)' }}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
          <Link
            href="/search"
            className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#3F484A] hover:text-[#1A1C1B] whitespace-nowrap transition-all border-b-2 border-transparent ml-auto"
            style={{ fontFamily: 'var(--font-manrope)' }}
          >
            All Documents →
          </Link>
        </div>

        {/* Sub-categories */}
        <div className="flex items-center gap-6 py-2.5 overflow-x-auto scrollbar-none">
          {CATEGORIES[active].sub.map((sub) => (
            <Link
              key={sub}
              href={`/search?q=${encodeURIComponent(sub)}`}
              className="text-sm text-[#6F797A] hover:text-[#00616A] font-medium whitespace-nowrap transition-colors"
              style={{ fontFamily: 'var(--font-manrope)' }}
            >
              {sub}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
