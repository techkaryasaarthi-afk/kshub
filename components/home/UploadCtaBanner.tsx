'use client'

import Link from 'next/link'
import { Upload, ArrowRight } from 'lucide-react'

export function UploadCtaBanner() {
  return (
    <section className="py-16 bg-[#f5f0e5]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#071b31] via-[#102f53] to-[#168f8a] px-8 lg:px-16 py-14 lg:py-16 flex flex-col lg:flex-row items-center gap-8 shadow-[0_28px_80px_rgba(16,47,83,.28)] border border-[#f5d778]/30">
          {/* Dot pattern */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: 'radial-gradient(circle, #f5d778 1.5px, transparent 1.5px)',
              backgroundSize: '32px 32px',
            }}
          />
          {/* Glow orbs */}
          <div className="pulse-glow absolute -top-24 -right-24 w-80 h-80 bg-[#f5d778]/25 rounded-full blur-3xl pointer-events-none" />
          <div className="pulse-glow absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-[#168f8a]/25 blur-3xl pointer-events-none" />

          <div className="relative flex-1 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-[#f5d778]/30 text-[#f5d778] text-xs font-semibold mb-3">
              ✦ Share &amp; Earn Recognition
            </div>
            <h2
              className="text-3xl lg:text-4xl font-extrabold text-white mb-3 leading-tight"
              style={{ fontFamily: 'var(--font-epilogue)', letterSpacing: '-0.03em' }}
            >
              Share your knowledge
              <br />
              <span className="text-gradient-gold">with millions across India</span>
            </h2>
            <p
              className="text-[#d1e2e9] text-sm sm:text-base max-w-[460px] mx-auto lg:mx-0 font-medium leading-relaxed"
              style={{ fontFamily: 'var(--font-manrope)' }}
            >
              Upload documents, study notes, project reports, or research papers and reach an eager student and professional community.
            </p>
          </div>

          <div className="relative flex flex-col sm:flex-row gap-3 shrink-0 z-10">
            <Link
              href="/upload"
              className="shine-sweep flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#f5d778] via-[#e5b84d] to-[#f0d488] text-[#102f53] rounded-full text-sm font-bold hover:shadow-[0_12px_36px_rgba(240,204,103,0.35)] transition-all hover:-translate-y-0.5"
              style={{ fontFamily: 'var(--font-manrope)' }}
            >
              <Upload className="w-4 h-4" />
              Upload Now
            </Link>
            <Link
              href="/search"
              className="flex items-center justify-center gap-2 px-7 py-4 border border-white/30 text-white rounded-full text-sm font-semibold hover:bg-white/15 backdrop-blur transition-all hover:-translate-y-0.5"
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
