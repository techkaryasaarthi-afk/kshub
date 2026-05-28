'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { DocumentCard } from '@/components/documents/DocumentCard'
import { useAuthStore } from '@/store/authStore'
import { createClient } from '@/lib/supabase/client'
import { FileText, Eye, Heart, Bookmark, Crown, BarChart3, Upload, LayoutDashboard, User } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { cn, formatViews } from '@/lib/utils'
import type { Document } from '@/types'

type TabType = 'documents' | 'bookmarks' | 'liked'

export default function DashboardPage() {
  const { profile, isPremium, subscription } = useAuthStore()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabType>('documents')
  const [documents, setDocuments] = useState<Document[]>([])
  const [bookmarks, setBookmarks] = useState<Document[]>([])
  const [liked, setLiked] = useState<Document[]>([])
  const [stats, setStats] = useState({ docs: 0, views: 0, likes: 0, bookmarks: 0 })
  const [loading, setLoading] = useState(true)

  // Redirect admin users to the admin page
  useEffect(() => {
    if (profile && profile.role === 'admin') {
      router.push('/admin')
    }
  }, [profile, router])

  useEffect(() => {
    if (!profile) return
    if (profile.role === 'admin') return // don't fetch if redirecting

    const supabase = createClient()

    async function fetchData() {
      setLoading(true)

      const [docsRes, bookmarksRes, likedRes] = await Promise.all([
        supabase
          .from('documents')
          .select('*, profiles(id, full_name, avatar_url), categories(id, name, slug, icon)')
          .eq('user_id', profile!.id)
          .order('created_at', { ascending: false }),
        supabase
          .from('bookmarks')
          .select('*, documents(*, profiles(id, full_name, avatar_url), categories(id, name, slug, icon))')
          .eq('user_id', profile!.id),
        supabase
          .from('likes')
          .select('*, documents(*, profiles(id, full_name, avatar_url), categories(id, name, slug, icon))')
          .eq('user_id', profile!.id),
      ])

      const docs = (docsRes.data as Document[]) || []
      const bms = bookmarksRes.data?.map((b: any) => b.documents).filter(Boolean) || []
      const likedDocs = likedRes.data?.map((l: any) => l.documents).filter(Boolean) || []

      setDocuments(docs)
      setBookmarks(bms)
      setLiked(likedDocs)
      setStats({
        docs: docs.length,
        views: docs.reduce((acc, d) => acc + (d.views || 0), 0),
        likes: likedDocs.length,
        bookmarks: bms.length,
      })
      setLoading(false)
    }

    fetchData()
  }, [profile])

  const statsCards = [
    { icon: FileText, label: 'My Documents', value: stats.docs, color: 'text-[#1D4ED8]', bg: 'bg-[#1D4ED8]/10' },
    { icon: Eye, label: 'Total Views', value: formatViews(stats.views), color: 'text-blue-600', bg: 'bg-blue-50' },
    { icon: Heart, label: 'Liked', value: stats.likes, color: 'text-red-500', bg: 'bg-red-50' },
    { icon: Bookmark, label: 'Bookmarks', value: stats.bookmarks, color: 'text-amber-600', bg: 'bg-amber-50' },
  ]

  const tabs: { id: TabType; label: string; count: number }[] = [
    { id: 'documents', label: 'My Documents', count: documents.length },
    { id: 'bookmarks', label: 'Bookmarks', count: bookmarks.length },
    { id: 'liked', label: 'Liked', count: liked.length },
  ]

  const currentDocs = activeTab === 'documents' ? documents : activeTab === 'bookmarks' ? bookmarks : liked

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-[#F9FAFB]">
        <div className="max-w-[1280px] mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
                {/* User */}
                <div className="text-center mb-6 pb-6 border-b border-gray-100">
                  <div className="w-16 h-16 rounded-2xl bg-[#1D4ED8] flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
                    {profile?.full_name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <p className="font-bold text-gray-900">{profile?.full_name || 'User'}</p>
                  {isPremium && (
                    <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 bg-amber-50 rounded-full text-xs text-amber-700 font-medium">
                      <Crown className="w-3 h-3" /> Premium
                    </span>
                  )}
                </div>

                <nav className="space-y-1">
                  {[
                    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
                    { icon: Upload, label: 'Upload', href: '/upload' },
                    { icon: User, label: 'Profile', href: '/dashboard/profile' },
                    { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    >
                      <item.icon className="w-4 h-4" /> {item.label}
                    </Link>
                  ))}
                </nav>

                {!isPremium && (
                  <Link
                    href="/subscription"
                    className="mt-6 flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all"
                  >
                    <Crown className="w-4 h-4" /> Upgrade to Premium
                  </Link>
                )}
              </div>
            </aside>

            {/* Main content */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome back, {profile?.full_name?.split(' ')[0] || 'User'}!</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {statsCards.map((stat) => (
                  <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-4">
                    <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Tabs */}
              <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                      activeTab === tab.id
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    )}
                  >
                    {tab.label}
                    <span className="ml-1.5 text-xs text-gray-400">({tab.count})</span>
                  </button>
                ))}
              </div>

              {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl h-64 animate-pulse" />
                  ))}
                </div>
              ) : currentDocs.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                  <p className="text-4xl mb-3">📂</p>
                  <p className="font-semibold text-gray-900">No {activeTab} yet</p>
                  {activeTab === 'documents' && (
                    <Link href="/upload" className="mt-3 inline-block text-sm text-[#1D4ED8] hover:underline">
                      Upload your first document →
                    </Link>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                  {currentDocs.map((doc) => (
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
