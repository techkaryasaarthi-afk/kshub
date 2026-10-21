import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { DocumentCard, DocumentCardSkeleton } from '@/components/documents/DocumentCard'
import type { Document } from '@/types'

export function TrendingSection({ documents }: { documents: Document[] }) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p
              className="label-lg text-[#168f8a] mb-2"
            >
              Discover
            </p>
            <h2
              className="text-3xl lg:text-4xl font-bold text-[#102f53]"
              style={{ fontFamily: 'var(--font-epilogue)', letterSpacing: '-0.03em' }}
            >
              Trending Now
            </h2>
          </div>
          <Link
            href="/search?sort=views"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-[#137a77] hover:gap-2.5 transition-all"
            style={{ fontFamily: 'var(--font-manrope)' }}
          >
            See all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        {documents.length === 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <DocumentCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {documents.map((doc) => (
              <DocumentCard key={doc.id} document={doc} />
            ))}
          </div>
        )}

        {/* Mobile "see all" */}
        <div className="mt-8 flex justify-center sm:hidden">
          <Link
            href="/search?sort=views"
            className="flex items-center gap-1.5 text-sm font-semibold text-[#137a77]"
            style={{ fontFamily: 'var(--font-manrope)' }}
          >
            See all trending <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
