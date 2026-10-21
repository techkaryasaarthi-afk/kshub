import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { DocumentCard } from '@/components/documents/DocumentCard'
import type { Document } from '@/types'

export function FeaturedSection({ documents }: { documents: Document[] }) {
  if (documents.length === 0) return null

  return (
    <section className="py-20 bg-[#f5f0e5]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="label-lg text-[#168f8a] mb-2">Community</p>
            <h2
              className="text-3xl lg:text-4xl font-bold text-[#102f53]"
              style={{ fontFamily: 'var(--font-epilogue)', letterSpacing: '-0.03em' }}
            >
              Recently Added
            </h2>
          </div>
          <Link
            href="/search?sort=newest"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-[#137a77] hover:gap-2.5 transition-all"
            style={{ fontFamily: 'var(--font-manrope)' }}
          >
            See all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-6">
          {documents.map((doc) => (
            <DocumentCard key={doc.id} document={doc} />
          ))}
        </div>

        {/* Mobile "see all" */}
        <div className="mt-8 flex justify-center sm:hidden">
          <Link
            href="/search?sort=newest"
            className="flex items-center gap-1.5 text-sm font-semibold text-[#137a77]"
            style={{ fontFamily: 'var(--font-manrope)' }}
          >
            See all recent <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
