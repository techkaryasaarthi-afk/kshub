'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PDFViewer } from '@/components/documents/PDFViewer'
import { Heart, Bookmark, Download, Eye, Crown, MessageSquare, Send } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { createClient } from '@/lib/supabase/client'
import { formatDate, formatViews } from '@/lib/utils'
import toast from 'react-hot-toast'
import type { Document, Comment } from '@/types'
import Link from 'next/link'

export default function DocumentPage() {
  const { id } = useParams<{ id: string }>()
  const { profile, isPremium } = useAuthStore()
  const [document, setDocument] = useState<Document | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [commentText, setCommentText] = useState('')
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)

  useEffect(() => {
    async function fetchDoc() {
      const res = await fetch(`/api/documents/${id}`)
      const { data } = await res.json()
      if (data) {
        setDocument(data)
        setLiked(data.is_liked)
        setBookmarked(data.is_bookmarked)
        setLikeCount(data.likes_count || 0)
      }
      setLoading(false)
    }

    async function fetchComments() {
      const res = await fetch(`/api/comments?document_id=${id}`)
      const { data } = await res.json()
      if (data) setComments(data)
    }

    fetchDoc()
    fetchComments()
  }, [id])

  const toggleLike = async () => {
    if (!profile) return toast.error('Please sign in to like documents')
    const method = liked ? 'DELETE' : 'POST'
    const res = await fetch('/api/likes', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ document_id: id }),
    })
    if (res.ok) {
      setLiked(!liked)
      setLikeCount((c) => c + (liked ? -1 : 1))
    }
  }

  const toggleBookmark = async () => {
    if (!profile) return toast.error('Please sign in to bookmark documents')
    const method = bookmarked ? 'DELETE' : 'POST'
    const res = await fetch('/api/bookmarks', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ document_id: id }),
    })
    if (res.ok) {
      setBookmarked(!bookmarked)
      toast.success(bookmarked ? 'Removed from bookmarks' : 'Bookmarked!')
    }
  }

  const handleDownload = () => {
    if (!isPremium && document?.is_premium) {
      toast.error('Premium subscription required to download')
      return
    }
    window.open(document?.file_url, '_blank')
  }

  const postComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!profile) return toast.error('Please sign in to comment')
    if (!commentText.trim()) return

    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ document_id: id, content: commentText }),
    })
    const { data } = await res.json()
    if (data) {
      setComments([data, ...comments])
      setCommentText('')
      toast.success('Comment posted!')
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="pt-20 min-h-screen bg-[#F9FAFB]">
          <div className="max-w-[1280px] mx-auto px-6 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-pulse">
              <div className="lg:col-span-2 h-96 bg-white rounded-2xl" />
              <div className="space-y-4">
                <div className="h-8 bg-white rounded-xl" />
                <div className="h-4 bg-white rounded-xl w-3/4" />
                <div className="h-20 bg-white rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  if (!document) {
    return (
      <>
        <Navbar />
        <div className="pt-20 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-6xl mb-4">📄</p>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Document not found</h2>
            <Link href="/" className="text-[#1D4ED8] hover:underline">Go home</Link>
          </div>
        </div>
      </>
    )
  }

  const canAccessFull = !document.is_premium || isPremium

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-[#F9FAFB]">
        <div className="max-w-[1280px] mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* PDF Viewer */}
            <div className="lg:col-span-2">
              <PDFViewer
                fileUrl={document.file_url}
                isPremium={document.is_premium}
                userHasPremium={isPremium}
                documentId={document.id}
              />

              {/* Comments */}
              <div className="mt-8 bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-bold text-gray-900 text-lg mb-5 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#1D4ED8]" />
                  Comments ({comments.length})
                </h3>

                {profile ? (
                  <form onSubmit={postComment} className="flex gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-[#1D4ED8] flex items-center justify-center text-white text-sm font-semibold shrink-0">
                      {profile.full_name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Add a comment..."
                        className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/30"
                      />
                      <button
                        type="submit"
                        disabled={!commentText.trim()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-[#1D4ED8] hover:bg-[#1D4ED8]/10 rounded-lg disabled:opacity-30"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                ) : (
                  <p className="text-sm text-gray-500 mb-6">
                    <Link href="/login" className="text-[#1D4ED8] hover:underline">Sign in</Link> to leave a comment.
                  </p>
                )}

                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600 shrink-0">
                        {comment.profiles?.avatar_url ? (
                          <img src={comment.profiles.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
                        ) : (
                          comment.profiles?.full_name?.[0]?.toUpperCase() || 'U'
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-gray-900">
                            {comment.profiles?.full_name || 'Anonymous'}
                          </span>
                          <span className="text-xs text-gray-400">{formatDate(comment.created_at)}</span>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">{comment.content}</p>
                      </div>
                    </div>
                  ))}

                  {comments.length === 0 && (
                    <p className="text-center text-gray-400 text-sm py-6">Be the first to comment!</p>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                {document.is_premium && (
                  <div className="flex items-center gap-1.5 mb-3 px-3 py-1.5 bg-amber-50 rounded-xl w-fit">
                    <Crown className="w-3.5 h-3.5 text-amber-600" />
                    <span className="text-xs font-semibold text-amber-700">Premium Content</span>
                  </div>
                )}

                <h1 className="text-xl font-bold text-gray-900 leading-tight mb-3">
                  {document.title}
                </h1>

                {document.categories && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#1D4ED8]/10 text-[#1D4ED8] rounded-lg text-xs font-medium mb-4">
                    {document.categories.icon} {document.categories.name}
                  </span>
                )}

                {document.profiles && (
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-[#1D4ED8] flex items-center justify-center text-white font-semibold">
                      {document.profiles.full_name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{document.profiles.full_name}</p>
                      <p className="text-xs text-gray-500">Author</p>
                    </div>
                  </div>
                )}

                {document.description && (
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {document.description}
                  </p>
                )}

                <div className="flex gap-3 text-sm text-gray-500 mb-6">
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" /> {formatViews(document.views)} views
                  </span>
                  <span>·</span>
                  <span>{formatDate(document.created_at)}</span>
                </div>

                {/* Action buttons */}
                <div className="space-y-2">
                  <button
                    onClick={toggleLike}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border transition-all text-sm font-medium ${liked
                        ? 'bg-red-50 border-red-200 text-red-600'
                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    <Heart className={`w-4 h-4 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
                    {liked ? 'Liked' : 'Like'} ({likeCount})
                  </button>

                  <button
                    onClick={toggleBookmark}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border transition-all text-sm font-medium ${bookmarked
                        ? 'bg-[#1D4ED8]/10 border-[#1D4ED8]/30 text-[#1D4ED8]'
                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-[#1D4ED8] text-[#1D4ED8]' : ''}`} />
                    {bookmarked ? 'Bookmarked' : 'Bookmark'}
                  </button>

                  <button
                    onClick={handleDownload}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${canAccessFull
                        ? 'bg-[#1D4ED8] text-white hover:bg-[#0F2C59]'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                  >
                    <Download className="w-4 h-4" />
                    {canAccessFull ? 'Download PDF' : '🔒 Premium Only'}
                  </button>
                </div>

                {!canAccessFull && (
                  <Link
                    href="/subscription"
                    className="block mt-3 text-center text-xs text-[#1D4ED8] hover:underline"
                  >
                    Upgrade to Premium →
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
