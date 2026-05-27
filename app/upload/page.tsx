'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { useDropzone } from 'react-dropzone'
import { Upload, X, FileText, Loader2, CloudUpload, Lock, ShieldCheck } from 'lucide-react'
import toast from 'react-hot-toast'
import { CATEGORIES, validatePdfFile } from '@/lib/utils'

export default function UploadPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [form, setForm] = useState({
    title: '',
    description: '',
    category_id: '',
    is_premium: false,
  })

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const f = acceptedFiles[0]
    if (!f) return
    const error = validatePdfFile(f)
    if (error) {
      toast.error(error)
      return
    }
    setFile(f)
    if (!form.title) {
      setForm((prev) => ({
        ...prev,
        title: f.name.replace('.pdf', '').replace(/-/g, ' ').replace(/_/g, ' '),
      }))
    }
  }, [form.title])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return toast.error('Please select a PDF file')
    if (!form.title.trim()) return toast.error('Title is required')

    setUploading(true)
    try {
      // Step 1: Upload to R2
      const formData = new FormData()
      formData.append('file', file)

      setUploadProgress(30)
      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!uploadRes.ok) {
        const { error } = await uploadRes.json()
        throw new Error(error || 'Upload failed')
      }

      const { url } = await uploadRes.json()
      setUploadProgress(70)

      // Step 2: Save to Supabase
      const docRes = await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          file_url: url,
          category_id: form.category_id || null,
          is_premium: form.is_premium,
        }),
      })

      if (!docRes.ok) {
        const { error } = await docRes.json()
        throw new Error(error || 'Failed to save document')
      }

      const { data } = await docRes.json()
      setUploadProgress(100)
      toast.success('Document uploaded successfully!')
      router.push(`/documents/${data.id}`)
    } catch (err: any) {
      toast.error(err.message || 'Upload failed')
    } finally {
      setUploading(false)
      setUploadProgress(0)
    }
  }

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-[#F9FAFB]">
        <div className="max-w-[672px] mx-auto px-6 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Document</h1>
            <p className="text-gray-500 mb-6">Share your knowledge with the community</p>
            
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 text-sm text-blue-900">
              <h3 className="font-semibold text-blue-950 mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4" /> Optimization Guidelines
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-blue-800/80">
                <li><strong>Title:</strong> Use clear, descriptive titles to help users find your document (e.g., "Intro to Quantum Mechanics 2024").</li>
                <li><strong>Category:</strong> Accurate categorization significantly improves discoverability.</li>
                <li><strong>Description:</strong> A robust, keyword-rich description acts as SEO metadata, helping your upload rank higher in search results.</li>
              </ul>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Dropzone */}
            {!file ? (
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
                  isDragActive
                    ? 'border-[#1E7B85] bg-[#1E7B85]/5'
                    : 'border-gray-200 bg-white hover:border-[#1E7B85]/50 hover:bg-[#1E7B85]/2'
                }`}
              >
                <input {...getInputProps()} />
                <div className="w-16 h-16 bg-[#1E7B85]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CloudUpload className="w-8 h-8 text-[#1E7B85]" />
                </div>
                <p className="text-lg font-semibold text-gray-700 mb-1">
                  {isDragActive ? 'Drop your PDF here' : 'Drag & drop your PDF here'}
                </p>
                <p className="text-sm text-gray-400 mb-4">or</p>
                <button
                  type="button"
                  className="px-6 py-2.5 bg-[#1E7B85] text-white font-medium rounded-xl hover:bg-[#00616a] transition-colors text-sm"
                >
                  Browse Files
                </button>
                <p className="mt-4 text-xs text-gray-400">PDF only · Max 50MB</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6 text-red-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{file.name}</p>
                  <p className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  {uploading && (
                    <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#1E7B85] rounded-full transition-all duration-500"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  )}
                </div>
                {!uploading && (
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                )}
              </div>
            )}

            {/* Form fields */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="Enter document title"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E7B85]/30 focus:border-[#1E7B85] transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="What is this document about?"
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E7B85]/30 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select
                  value={form.category_id}
                  onChange={(e) => setForm((f) => ({ ...f, category_id: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E7B85]/30 bg-white"
                >
                  <option value="">Select a category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Premium toggle */}
              <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-amber-100 rounded-xl flex items-center justify-center">
                    <Lock className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-amber-900">Mark as Premium</p>
                    <p className="text-xs text-amber-600">Only premium subscribers can read beyond page 5</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, is_premium: !f.is_premium }))}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    form.is_premium ? 'bg-amber-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                      form.is_premium ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="submit"
                disabled={uploading || !file}
                className="w-full flex items-center justify-center gap-3 py-3.5 bg-[#1E7B85] text-white font-semibold rounded-xl hover:bg-[#00616a] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#1E7B85]/20"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Uploading... {uploadProgress}%
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Submit for Approval
                  </>
                )}
              </button>
              <p className="text-center text-xs text-gray-400">
                <ShieldCheck className="w-3.5 h-3.5 inline-block mr-1 -mt-0.5" />
                Your document will be reviewed by an admin before being published publicly.
              </p>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}
