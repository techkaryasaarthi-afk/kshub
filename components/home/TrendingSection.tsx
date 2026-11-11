import Link from 'next/link'
import { ArrowRight, Flame } from 'lucide-react'
import { DocumentCard } from '@/components/documents/DocumentCard'
import { SAMPLE_DOCUMENTS } from '@/lib/sample-documents'
import type { Document } from '@/types'

export function TrendingSection({ documents }: { documents?: Document[] }) {
  const displayDocs = (documents && documents.length > 0) ? documents : SAMPLE_DOCUMENTS

  return (
    <section className="py-14 sm:py-20 bg-white dark:bg-[#071b31] transition-colors duration-300">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section header */}
        <div className="flex items-end justify-between mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#168f8a]/10 dark:bg-[#168f8a]/20 text-[#137a77] dark:text-[#5ed2c2] text-xs font-bold mb-2">
              <Flame className="w-3.5 h-3.5 text-[#d29a27]" />
              <span>Discover</span>
            </div>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#102f53] dark:text-white"
              style={{ fontFamily: 'var(--font-epilogue)', letterSpacing: '-0.03em' }}
            >
              Trending Now
            </h2>
          </div>
          <Link
            href="/search?sort=views"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-[#137a77] dark:text-[#5ed2c2] hover:gap-2.5 transition-all"
            style={{ fontFamily: 'var(--font-manrope)' }}
          >
            See all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid of Documents */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {displayDocs.slice(0, 8).map((doc) => (
            <DocumentCard key={doc.id} document={doc} />
          ))}
        </div>

        {/* Mobile "see all" */}
        <div className="mt-8 flex justify-center sm:hidden">
          <Link
            href="/search?sort=views"
            className="flex items-center gap-1.5 text-sm font-semibold text-[#137a77] dark:text-[#5ed2c2]"
            style={{ fontFamily: 'var(--font-manrope)' }}
          >
            See all trending <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
