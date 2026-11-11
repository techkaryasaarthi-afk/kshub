'use client'

import Link from 'next/link'
import { Eye, Crown, Star } from 'lucide-react'
import { formatViews, formatDate } from '@/lib/utils'
import type { Document } from '@/types'

export function DocumentCard({ document }: { document: Document }) {
  const categoryColors: Record<string, string> = {
    academic: 'bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    professional: 'bg-[#1D4ED8]/10 text-[#0F2C59] dark:bg-blue-950/60 dark:text-blue-200',
    culture: 'bg-purple-50 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
    technology: 'bg-sky-50 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
    science: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    default: 'bg-[#DBEAFE] text-[#0F2C59] dark:bg-[#168f8a]/20 dark:text-[#5ed2c2]',
  }

  const catColor = categoryColors[document.categories?.slug || 'default'] || categoryColors.default

  return (
    <Link
      href={`/documents/${document.id}`}
      className="doc-card group block rounded-3xl overflow-hidden border border-[#102f53]/[0.08] dark:border-white/10 hover:border-[#d29a27]/70 dark:hover:border-[#f5d778] hover:shadow-[0_24px_50px_rgba(16,47,83,0.16)] dark:hover:shadow-[0_24px_50px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-[#0b2542]"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[3/4] bg-gradient-to-br from-[#eee7d9] to-[#dce9e4] dark:from-[#0a1e36] dark:to-[#0f3458] overflow-hidden">
        {document.thumb_url ? (
          <img
            src={document.thumb_url}
            alt={document.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#071b31] via-[#102f53] to-[#168f8a]">
            <div className="text-4xl mb-2 opacity-70 group-hover:scale-110 transition-transform duration-300">📄</div>
            <div className="h-1.5 bg-white/25 rounded w-3/4 mb-1.5" />
            <div className="h-1.5 bg-white/20 rounded w-1/2 mb-1.5" />
            <div className="h-1.5 bg-white/15 rounded w-2/3" />
          </div>
        )}

        {/* Shimmer sweep highlight on hover */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071b31]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="pointer-events-none absolute bottom-3 left-3 right-3 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center py-2 px-3 rounded-xl bg-white/95 text-[#102f53] text-[11px] font-bold shadow-lg backdrop-blur-md">
          View &amp; Download Document →
        </div>

        {/* Premium badge */}
        {document.is_premium && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-amber-400/95 backdrop-blur-sm rounded-full shadow-md">
            <Crown className="w-3 h-3 text-amber-950" />
            <span className="text-[10px] font-extrabold text-amber-950 uppercase tracking-wider" style={{ fontFamily: 'var(--font-manrope)' }}>Premium</span>
          </div>
        )}

        {/* Category badge */}
        {document.categories && (
          <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold shadow-sm backdrop-blur-sm ${catColor}`} style={{ fontFamily: 'var(--font-manrope)' }}>
            {document.categories.name}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3.5 sm:p-5">
        <h3 className="text-xs sm:text-sm font-bold text-[#102f53] dark:text-white line-clamp-2 mb-1 leading-snug group-hover:text-[#168f8a] dark:group-hover:text-[#5ed2c2] transition-colors" style={{ fontFamily: 'var(--font-manrope)' }}>
          {document.title}
        </h3>

        {document.profiles && (
          <p className="text-[11px] sm:text-xs text-[#6F797A] dark:text-[#a0b0bf] mb-2 sm:mb-3 truncate font-medium" style={{ fontFamily: 'var(--font-manrope)' }}>
            By {document.profiles.full_name}
          </p>
        )}

        {/* Rating + Views */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-100 dark:border-white/10">
          <div className="flex items-center gap-0.5 shrink-0">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`w-2.5 sm:w-3 h-2.5 sm:h-3 ${i < 4 ? 'fill-amber-400 text-amber-400' : 'text-[#BEC8CA] dark:text-gray-600'}`} />
            ))}
          </div>
          <span className="flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-[#6F797A] dark:text-[#a0b0bf] font-mono shrink-0">
            <Eye className="w-3 h-3 text-[#168f8a] dark:text-[#5ed2c2]" /> {formatViews(document.views)}
          </span>
        </div>
      </div>
    </Link>
  )
}

export function DocumentCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white dark:bg-[#0b2542] border border-gray-100 dark:border-white/10 animate-pulse">
      <div className="aspect-[3/4] bg-[#EFEEEC] dark:bg-white/5" />
      <div className="p-4 space-y-2.5">
        <div className="h-3.5 bg-[#EFEEEC] dark:bg-white/10 rounded w-full" />
        <div className="h-3.5 bg-[#EFEEEC] dark:bg-white/10 rounded w-4/5" />
        <div className="h-3 bg-[#EFEEEC] dark:bg-white/5 rounded w-1/2" />
        <div className="h-3 bg-[#EFEEEC] dark:bg-white/5 rounded w-1/3" />
      </div>
    </div>
  )
}
