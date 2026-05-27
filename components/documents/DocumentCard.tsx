'use client'

import Link from 'next/link'
import { Eye, Crown, Star } from 'lucide-react'
import { formatViews, formatDate } from '@/lib/utils'
import type { Document } from '@/types'

export function DocumentCard({ document }: { document: Document }) {
  const categoryColors: Record<string, string> = {
    academic: 'bg-blue-50 text-blue-700',
    professional: 'bg-[#00616A]/10 text-[#00484E]',
    culture: 'bg-purple-50 text-purple-700',
    technology: 'bg-sky-50 text-sky-700',
    science: 'bg-emerald-50 text-emerald-700',
    default: 'bg-[#CBE8EC] text-[#3F484A]',
  }

  const catColor = categoryColors[document.categories?.slug || 'default'] || categoryColors.default

  return (
    <Link href={`/documents/${document.id}`} className="doc-card group block">
      {/* Thumbnail */}
      <div className="relative aspect-[3/4] bg-gradient-to-br from-[#EFEEEC] to-[#E3E2E0] overflow-hidden">
        {document.thumb_url ? (
          <img
            src={document.thumb_url}
            alt={document.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#00484E] to-[#00616A]">
            <div className="text-4xl mb-2 opacity-50">📄</div>
            <div className="h-1.5 bg-white/20 rounded w-3/4 mb-1.5" />
            <div className="h-1.5 bg-white/15 rounded w-1/2 mb-1.5" />
            <div className="h-1.5 bg-white/10 rounded w-2/3" />
          </div>
        )}

        {/* Premium badge */}
        {document.is_premium && (
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 bg-amber-400 rounded-full">
            <Crown className="w-2.5 h-2.5 text-amber-900" />
            <span className="text-[10px] font-bold text-amber-900" style={{ fontFamily: 'var(--font-manrope)' }}>Premium</span>
          </div>
        )}

        {/* Category badge */}
        {document.categories && (
          <div className={`absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-semibold ${catColor}`} style={{ fontFamily: 'var(--font-manrope)' }}>
            {document.categories.name}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-[#1A1C1B] line-clamp-2 mb-2 leading-snug group-hover:text-[#00616A] transition-colors" style={{ fontFamily: 'var(--font-manrope)' }}>
          {document.title}
        </h3>

        {document.profiles && (
          <p className="text-xs text-[#6F797A] mb-3 truncate" style={{ fontFamily: 'var(--font-manrope)' }}>
            {document.profiles.full_name}
          </p>
        )}

        {/* Rating + Views */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`w-3 h-3 ${i < 4 ? 'fill-amber-400 text-amber-400' : 'text-[#BEC8CA]'}`} />
            ))}
          </div>
          <span className="flex items-center gap-1 text-[11px] text-[#6F797A] ml-auto" style={{ fontFamily: 'var(--font-manrope)' }}>
            <Eye className="w-3 h-3" /> {formatViews(document.views)}
          </span>
        </div>
      </div>
    </Link>
  )
}

export function DocumentCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white animate-pulse">
      <div className="aspect-[3/4] bg-[#EFEEEC]" />
      <div className="p-4 space-y-2.5">
        <div className="h-3.5 bg-[#EFEEEC] rounded w-full" />
        <div className="h-3.5 bg-[#EFEEEC] rounded w-4/5" />
        <div className="h-3 bg-[#EFEEEC] rounded w-1/2" />
        <div className="h-3 bg-[#EFEEEC] rounded w-1/3" />
      </div>
    </div>
  )
}
