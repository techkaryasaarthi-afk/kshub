'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { useAuthStore } from '@/store/authStore'
import { Users, FileText, Crown, Trash2, Eye, EyeOff, ShieldCheck, AlertTriangle, Layers } from 'lucide-react'
import { formatViews, formatDate } from '@/lib/utils'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const { profile } = useAuthStore()
  const router = useRouter()
  const [users, setUsers] = useState<any[]>([])
  const [documents, setDocuments] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [stats, setStats] = useState({ users: 0, documents: 0, premium: 0 })
  const [activeTab, setActiveTab] = useState<'users' | 'documents' | 'categories'>('users')
  const [loading, setLoading] = useState(true)

  // Add Category form state
  const [newCatName, setNewCatName] = useState('')
  const [newCatSlug, setNewCatSlug] = useState('')
  const [newCatIcon, setNewCatIcon] = useState('📄')

  useEffect(() => {
    if (profile && profile.role !== 'admin') {
      router.push('/')
    }
  }, [profile, router])

  useEffect(() => {
    if (profile?.role !== 'admin') return

    async function fetchData() {
      const [usersRes, docsRes, catsRes] = await Promise.all([
        fetch('/api/admin/users').then((r) => r.json()),
        fetch('/api/admin/documents').then((r) => r.json()),
        fetch('/api/categories').then((r) => r.json()),
      ])
      setUsers(usersRes.data || [])
      setDocuments(docsRes.data || [])
      setCategories(catsRes.data || [])
      const premiumCount = (usersRes.data || []).filter(
        (u: any) => u.subscriptions?.[0]?.plan === 'premium' && u.subscriptions?.[0]?.status === 'active'
      ).length
      setStats({
        users: usersRes.count || 0,
        documents: docsRes.count || 0,
        premium: premiumCount,
      })
      setLoading(false)
    }

    fetchData()
  }, [profile])

  const deleteUser = async (userId: string) => {
    if (!confirm('Delete this user permanently?')) return
    const res = await fetch('/api/admin/users', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId }),
    })
    if (res.ok) {
      setUsers((u) => u.filter((x) => x.id !== userId))
      toast.success('User deleted')
    } else {
      toast.error('Failed to delete user')
    }
  }

  const toggleDocPublish = async (docId: string, currentState: boolean) => {
    const res = await fetch('/api/admin/documents', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ document_id: docId, is_published: !currentState }),
    })
    if (res.ok) {
      setDocuments((docs) => docs.map((d) => d.id === docId ? { ...d, is_published: !currentState } : d))
      toast.success(!currentState ? 'Document published' : 'Document unpublished')
    }
  }

  const deleteDocument = async (docId: string) => {
    if (!confirm('Delete this document permanently?')) return
    const res = await fetch('/api/admin/documents', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ document_id: docId }),
    })
    if (res.ok) {
      setDocuments((d) => d.filter((x) => x.id !== docId))
      toast.success('Document deleted')
    }
  }

  const addCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCatName.trim() || !newCatSlug.trim()) {
      toast.error('Name and Slug are required')
      return
    }

    const res = await fetch('/api/admin/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newCatName, slug: newCatSlug, icon: newCatIcon }),
    })
    
    if (res.ok) {
      const { data } = await res.json()
      setCategories((cats) => [...cats, { ...data, countText: '0 docs' }])
      setNewCatName('')
      setNewCatSlug('')
      setNewCatIcon('📄')
      toast.success('Category created successfully!')
    } else {
      const { error } = await res.json()
      toast.error(error || 'Failed to create category')
    }
  }

  const deleteCategory = async (id: string) => {
    if (!confirm('Delete this category? Associated documents will be uncategorized.')) return
    
    const res = await fetch('/api/admin/categories', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    
    if (res.ok) {
      setCategories((cats) => cats.filter((c) => c.id !== id))
      toast.success('Category deleted')
    } else {
      toast.error('Failed to delete category')
    }
  }

  if (!profile || profile.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-gray-900">Access Denied</h2>
          <Link href="/" className="text-[#1D4ED8] text-sm hover:underline mt-2 block">Go home</Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-[#F9FAFB]">
        <div className="max-w-[1280px] mx-auto px-6 py-8">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1D4ED8] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
                <p className="text-sm text-gray-500">Manage users, documents, and platform settings</p>
              </div>
            </div>
            <Link
              href="/upload"
              className="flex items-center gap-2 px-4 py-2 bg-[#1D4ED8] text-white text-sm font-medium rounded-xl hover:bg-[#0F2C59] transition-colors shadow-sm"
            >
              <FileText className="w-4 h-4" />
              Upload Document
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-5 mb-8">
            {[
              { icon: Users, label: 'Total Users', value: stats.users, color: 'text-blue-600', bg: 'bg-blue-50' },
              { icon: FileText, label: 'Total Documents', value: stats.documents, color: 'text-[#1D4ED8]', bg: 'bg-[#1D4ED8]/10' },
              { icon: Crown, label: 'Premium Users', value: stats.premium, color: 'text-amber-600', bg: 'bg-amber-50' },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center mb-3`}>
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <p className="text-3xl font-bold text-gray-900">{s.value}</p>
                <p className="text-sm text-gray-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit mb-6">
            {([
              { id: 'users', label: 'Users', icon: Users },
              { id: 'documents', label: 'Documents', icon: FileText },
              { id: 'categories', label: 'Categories', icon: Layers },
            ] as const).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
              <div className="w-6 h-6 border-2 border-[#1D4ED8] border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : activeTab === 'users' ? (
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">User</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Role</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Plan</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Joined</th>
                    <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#1D4ED8] flex items-center justify-center text-white text-xs font-bold">
                            {user.full_name?.[0]?.toUpperCase() || 'U'}
                          </div>
                          <span className="font-medium text-gray-900">{user.full_name || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${
                          user.role === 'admin' ? 'bg-[#1D4ED8]/10 text-[#1D4ED8]' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        {user.subscriptions?.[0]?.plan === 'premium' ? (
                          <span className="flex items-center gap-1 text-amber-600 text-xs font-medium">
                            <Crown className="w-3 h-3" /> Premium
                          </span>
                        ) : (
                          <span className="text-gray-400 text-xs">Free</span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-gray-500 text-xs">{formatDate(user.created_at)}</td>
                      <td className="px-5 py-3.5 text-right">
                        {user.id !== profile.id && (
                          <button
                            onClick={() => deleteUser(user.id)}
                            className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : activeTab === 'documents' ? (
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Document</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Author</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Views</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                    <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {documents.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3.5">
                        <div>
                          <p className="font-medium text-gray-900 line-clamp-1">{doc.title}</p>
                          {doc.is_premium && (
                            <span className="text-xs text-amber-600 flex items-center gap-0.5 mt-0.5">
                              <Crown className="w-3 h-3" /> Premium
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-gray-600 text-xs">{doc.profiles?.full_name || 'N/A'}</td>
                      <td className="px-5 py-3.5 text-gray-600 text-xs">{formatViews(doc.views)}</td>
                      <td className="px-5 py-3.5">
                        <span className={`px-2 py-0.5 text-xs rounded-md font-medium ${
                          doc.is_published ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                        }`}>
                          {doc.is_published ? 'Approved & Live' : 'Pending Approval'}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center gap-1 justify-end">
                          <button
                            onClick={() => toggleDocPublish(doc.id, doc.is_published)}
                            className="p-1.5 text-gray-400 hover:text-[#1D4ED8] hover:bg-[#1D4ED8]/10 rounded-lg transition-colors"
                          >
                            {doc.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => deleteDocument(doc.id)}
                            className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Category list */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Category</th>
                      <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Slug</th>
                      <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Documents</th>
                      <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {categories.map((cat) => (
                      <tr key={cat.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{cat.icon || '📄'}</span>
                            <span className="font-semibold text-gray-900">{cat.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-gray-500 text-xs font-mono">{cat.slug}</td>
                        <td className="px-5 py-3.5 text-gray-500 text-xs">{cat.countText || '0 docs'}</td>
                        <td className="px-5 py-3.5 text-right">
                          <button
                            onClick={() => deleteCategory(cat.id)}
                            className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Add category form */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 h-fit shadow-sm">
                <h3 className="font-bold text-gray-900 text-lg mb-4">Add Category</h3>
                <form onSubmit={addCategory} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Category Name</label>
                    <input
                      type="text"
                      required
                      value={newCatName}
                      onChange={(e) => {
                        setNewCatName(e.target.value)
                        setNewCatSlug(e.target.value.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, ''))
                      }}
                      placeholder="e.g. Case Studies"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/30 focus:border-[#1D4ED8] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Slug</label>
                    <input
                      type="text"
                      required
                      value={newCatSlug}
                      onChange={(e) => setNewCatSlug(e.target.value)}
                      placeholder="e.g. case-studies"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/30 focus:border-[#1D4ED8] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Icon (Emoji)</label>
                    <input
                      type="text"
                      required
                      value={newCatIcon}
                      onChange={(e) => setNewCatIcon(e.target.value)}
                      placeholder="e.g. 📄"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/30 focus:border-[#1D4ED8] transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#1D4ED8] hover:bg-[#0F2C59] text-white font-semibold rounded-xl transition-colors text-sm shadow-md"
                  >
                    Add Category
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
