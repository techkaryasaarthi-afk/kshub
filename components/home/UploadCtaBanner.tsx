'use client'

import Link from 'next/link'
import { Upload, ArrowRight } from 'lucide-react'

export function UploadCtaBanner() {
  return (
    <section className="py-12 bg-[#FAF9F7]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#00484E] to-[#00616A] px-10 lg:px-16 py-16 flex flex-col lg:flex-row items-center gap-8">
          {/* Dot pattern */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
          {/* Glow orb */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex-1 text-center lg:text-left">
            <h2
              className="text-3xl lg:text-4xl font-extrabold text-white mb-3 leading-tight"
              style={{ fontFamily: 'var(--font-epilogue)', letterSpacing: '-0.03em' }}
            >
              Share your knowledge
              <br />
              <span className="text-[#A5EEF9]">with the world</span>
            </h2>
            <p
              className="text-[#CBE8EC] text-base max-w-[420px] mx-auto lg:mx-0"
              style={{ fontFamily: 'var(--font-manrope)' }}
            >
              Upload documents, books, or research papers and reach millions of eager readers.
            </p>
          </div>

          <div className="relative flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/upload"
              className="flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-[#00484E] rounded-full text-sm font-bold hover:shadow-[0_8px_32px_rgba(255,255,255,0.2)] transition-all hover:-translate-y-0.5"
              style={{ fontFamily: 'var(--font-manrope)' }}
            >
              <Upload className="w-4 h-4" />
              Upload Now
            </Link>
            <Link
              href="/search"
              className="flex items-center justify-center gap-2 px-7 py-3.5 border border-white/30 text-white rounded-full text-sm font-semibold hover:bg-white/10 transition-all"
              style={{ fontFamily: 'var(--font-manrope)' }}
            >
              Browse Library
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
