'use client'

import { Suspense } from 'react'
import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { DocumentCard, DocumentCardSkeleton } from '@/components/documents/DocumentCard'
import { Grid, List, SlidersHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Document } from '@/types'

function SearchContent() {
  const searchParams = useSearchParams()
  const q = searchParams.get('q') || ''
  const categoryParam = searchParams.get('category') || ''
  const sortParam = searchParams.get('sort') || 'newest'

  const [documents, setDocuments] = useState<Document[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState(categoryParam)
  const [premiumFilter, setPremiumFilter] = useState<'all' | 'free' | 'premium'>('all')
  const [sort, setSort] = useState(sortParam)
  const [page] = useState(1)

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((res) => setCategories(res.data || []))
      .catch((err) => console.error(err))
  }, [])

  const fetchDocuments = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        q,
        sort,
        page: String(page),
        ...(selectedCategory && { category: selectedCategory }),
        ...(premiumFilter !== 'all' && { premium: premiumFilter === 'premium' ? 'true' : 'false' }),
      })
      const res = await fetch(`/api/documents?${params}`)
      const data = await res.json()
      setDocuments(data.data || [])
      setTotal(data.count || 0)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [q, sort, page, selectedCategory, premiumFilter])

  useEffect(() => { fetchDocuments() }, [fetchDocuments])

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-[#F9FAFB]">
        <div className="max-w-[1280px] mx-auto px-6 py-8">
          {q && (
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Results for <span className="text-[#1D4ED8]">"{q}"</span>
              <span className="text-base font-normal text-gray-500 ml-2">({total} documents)</span>
            </h1>
          )}

          <div className="flex gap-8">
            {/* Sidebar Filters */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
                <div className="flex items-center gap-2 mb-5">
                  <SlidersHorizontal className="w-4 h-4 text-gray-500" />
                  <h3 className="font-semibold text-gray-900 text-sm">Filters</h3>
                </div>

                {/* Category */}
                <div className="mb-6">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Category</h4>
                  <div className="space-y-1">
                    <button
                      onClick={() => setSelectedCategory('')}
                      className={cn(
                        'w-full text-left px-3 py-2 rounded-xl text-sm transition-colors',
                        !selectedCategory ? 'bg-[#1D4ED8]/10 text-[#1D4ED8] font-medium' : 'text-gray-600 hover:bg-gray-50'
                      )}
                    >
                      All Categories
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.slug)}
                        className={cn(
                          'w-full text-left px-3 py-2 rounded-xl text-sm transition-colors flex items-center gap-2',
                          selectedCategory === cat.slug
                            ? 'bg-[#1D4ED8]/10 text-[#1D4ED8] font-medium'
                            : 'text-gray-600 hover:bg-gray-50'
                        )}
                      >
                        <span>{cat.icon || '📄'}</span> {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Access type */}
                <div className="mb-6">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Access</h4>
                  <div className="space-y-1">
                    {(['all', 'free', 'premium'] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setPremiumFilter(type)}
                        className={cn(
                          'w-full text-left px-3 py-2 rounded-xl text-sm transition-colors capitalize',
                          premiumFilter === type
                            ? 'bg-[#1D4ED8]/10 text-[#1D4ED8] font-medium'
                            : 'text-gray-600 hover:bg-gray-50'
                        )}
                      >
                        {type === 'all' ? 'All' : type === 'free' ? '🆓 Free' : '👑 Premium'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 min-w-0">
              {/* Sort + View toggle */}
              <div className="flex items-center justify-between mb-6">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="text-sm border border-gray-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/30"
                >
                  <option value="newest">Newest first</option>
                  <option value="views">Most viewed</option>
                  <option value="likes">Most liked</option>
                </select>

                <div className="flex items-center gap-1 bg-white rounded-xl border border-gray-200 p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={cn('p-2 rounded-lg transition-colors', viewMode === 'grid' ? 'bg-[#1D4ED8] text-white' : 'text-gray-400 hover:text-gray-600')}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={cn('p-2 rounded-lg transition-colors', viewMode === 'list' ? 'bg-[#1D4ED8] text-white' : 'text-gray-400 hover:text-gray-600')}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                  {Array.from({ length: 6 }).map((_, i) => <DocumentCardSkeleton key={i} />)}
                </div>
              ) : documents.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-5xl mb-4">🔍</p>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No documents found</h3>
                  <p className="text-gray-500 text-sm">Try different keywords or remove filters</p>
                </div>
              ) : (
                <div className={cn(
                  viewMode === 'grid'
                    ? 'grid grid-cols-2 sm:grid-cols-3 gap-5'
                    : 'flex flex-col gap-4'
                )}>
                  {documents.map((doc) => (
                    <DocumentCard key={doc.id} document={doc} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="pt-20 min-h-screen bg-[#F9FAFB]">
        <div className="max-w-[1280px] mx-auto px-6 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => <DocumentCardSkeleton key={i} />)}
          </div>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
}
