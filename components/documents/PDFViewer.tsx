'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, Lock } from 'lucide-react'
import { FREE_PAGE_LIMIT } from '@/lib/utils'
import { PaywallOverlay } from './PaywallOverlay'

interface PDFViewerProps {
  fileUrl: string
  isPremium: boolean
  userHasPremium: boolean
  documentId: string
}

export function PDFViewer({ fileUrl, isPremium, userHasPremium, documentId }: PDFViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const renderTaskRef = useRef<any>(null)
  const [pdfDoc, setPdfDoc] = useState<any>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [scale, setScale] = useState(1.2)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const isPaywalled = isPremium && !userHasPremium && currentPage > FREE_PAGE_LIMIT

  // Cancel any ongoing rendering task on unmount
  useEffect(() => {
    return () => {
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel()
      }
    }
  }, [])

  // Load PDF.js dynamically
  useEffect(() => {
    async function loadPDF() {
      try {
        setLoading(true)
        const pdfjsLib = await import('pdfjs-dist')
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`

        const pdf = await pdfjsLib.getDocument(fileUrl).promise
        setPdfDoc(pdf)
        setTotalPages(pdf.numPages)
        setLoading(false)
      } catch (err) {
        console.error('Failed to load PDF:', err)
        setError('Failed to load document. Please try again.')
        setLoading(false)
      }
    }
    loadPDF()
  }, [fileUrl])

  const renderPage = useCallback(async (pageNum: number) => {
    if (!pdfDoc || !canvasRef.current) return

    // Cancel the previous rendering task if it exists
    if (renderTaskRef.current) {
      renderTaskRef.current.cancel()
      renderTaskRef.current = null
    }

    try {
      const page = await pdfDoc.getPage(pageNum)
      const viewport = page.getViewport({ scale })
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')!
      canvas.width = viewport.width
      canvas.height = viewport.height

      const renderTask = page.render({ canvasContext: ctx, viewport })
      renderTaskRef.current = renderTask

      await renderTask.promise
      renderTaskRef.current = null
    } catch (err: any) {
      if (err?.name !== 'RenderingCancelledException') {
        console.error('Render error:', err)
      }
    }
  }, [pdfDoc, scale])

  useEffect(() => {
    if (pdfDoc) renderPage(currentPage)
  }, [pdfDoc, currentPage, scale, renderPage])

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-gray-50 rounded-2xl">
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col bg-gray-100 rounded-2xl overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
        <div className="flex items-center gap-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage <= 1}
            className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>

          <span className="text-sm text-gray-600 font-medium">
            {currentPage} / {totalPages || '…'}
          </span>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setScale((s) => Math.max(0.5, s - 0.2))}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ZoomOut className="w-4 h-4 text-gray-600" />
          </button>
          <span className="text-xs text-gray-500 w-12 text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={() => setScale((s) => Math.min(3, s + 0.2))}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ZoomIn className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Canvas area */}
      <div className="relative overflow-auto max-h-[70vh]">
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-[#1D4ED8] border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-gray-500">Loading document…</p>
            </div>
          </div>
        ) : (
          <div className="relative">
            <canvas ref={canvasRef} className="mx-auto my-4 shadow-lg rounded-lg" />

            {/* Paywall overlay */}
            {isPaywalled && (
              <div className="absolute inset-x-0 bottom-0 h-3/4">
                <div className="w-full h-full bg-gradient-to-b from-transparent via-white/80 to-white" />
                <div className="absolute inset-0 flex items-end justify-center pb-8">
                  <PaywallOverlay documentId={documentId} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Page preview hint for free users */}
      {isPremium && !userHasPremium && totalPages > FREE_PAGE_LIMIT && (
        <div className="flex items-center gap-2 px-4 py-2.5 bg-amber-50 border-t border-amber-100">
          <Lock className="w-3.5 h-3.5 text-amber-600" />
          <p className="text-xs text-amber-700">
            Previewing {FREE_PAGE_LIMIT} of {totalPages} pages. Upgrade to read more.
          </p>
        </div>
      )}
    </div>
  )
}
