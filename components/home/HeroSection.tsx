'use client'

import Link from 'next/link'
import { Upload, BookOpen, ArrowRight } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'

export function HeroSection() {
  const { profile } = useAuthStore()

  return (
    <section className="relative bg-[#FAF9F7] pt-16 overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg,transparent,transparent 79px,#1A1C1B 79px,#1A1C1B 80px),repeating-linear-gradient(90deg,transparent,transparent 79px,#1A1C1B 79px,#1A1C1B 80px)',
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12 pt-20 pb-24 flex flex-col lg:flex-row items-center gap-14 lg:gap-20">
        {/* Left — Copy */}
        <div className="flex-1 max-w-[600px] text-center lg:text-left">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#1D4ED8]/10 rounded-full text-sm font-semibold text-[#1D4ED8] mb-8"
            style={{ fontFamily: 'var(--font-manrope)' }}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Millions of documents. Honest pricing.
          </div>

          <h1
            className="text-5xl lg:text-[60px] font-extrabold leading-[1.08] tracking-[-0.04em] text-[#1A1C1B] mb-6"
            style={{ fontFamily: 'var(--font-epilogue)' }}
          >
            The World's Most
            <br />
            <span className="text-[#1D4ED8]">Affordable</span> Digital Library
          </h1>

          <p
            className="text-lg text-[#1A1C1B] font-semibold mb-4 leading-relaxed max-w-[550px] mx-auto lg:mx-0"
            style={{ fontFamily: 'var(--font-manrope)' }}
          >
            Research Papers · SIP Reports · Textbooks · Thesis · Stories · And Everything in Between
          </p>

          <p
            className="text-base text-[#475569] mb-10 leading-relaxed max-w-[500px] mx-auto lg:mx-0"
            style={{ fontFamily: 'var(--font-manrope)' }}
          >
            From ₹99 per document. Instant download. Zero barriers. Knowledge truly without borders.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
            <Link
              href={profile ? '/search' : '/signup'}
              className="btn-primary text-base !px-7 !py-3.5 shadow-[0_8px_32px_rgba(29,78,216,0.25)]"
            >
              Start your free trial
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/upload" className="btn-secondary text-base !px-7 !py-3.5">
              <Upload className="w-4 h-4" />
              Upload a document
            </Link>
          </div>

          <p
            className="mt-4 text-sm text-[#6F797A]"
            style={{ fontFamily: 'var(--font-manrope)' }}
          >
            Cancel anytime. No commitment.
          </p>
        </div>

        {/* Right — Floating document stack */}
        <div className="relative flex-1 flex justify-center items-center min-h-[360px] w-full max-w-[380px] mx-auto shrink-0">
          <div className="relative w-[320px] h-[360px]">
            {/* Card 3 — back */}
            <div className="absolute top-8 right-2 w-[170px] h-[228px] rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(26,28,27,0.12)] rotate-[-4deg] bg-gradient-to-br from-[#93C5FD] to-[#3B82F6]">
              <div className="absolute bottom-4 left-4 right-4">
                <div className="h-2 bg-white/40 rounded mb-1.5 w-3/4" />
                <div className="h-1.5 bg-white/30 rounded w-1/2" />
              </div>
            </div>
            {/* Card 2 — mid */}
            <div className="absolute top-4 left-6 w-[170px] h-[228px] rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(26,28,27,0.15)] rotate-[2deg] bg-gradient-to-br from-[#FFB785] to-[#FFDCC6]">
              <div className="absolute bottom-4 left-4 right-4">
                <div className="h-2 bg-white/50 rounded mb-1.5 w-2/3" />
                <div className="h-1.5 bg-white/35 rounded w-2/5" />
              </div>
            </div>
            {/* Card 1 — front */}
            <div className="absolute top-0 left-10 w-[188px] h-[252px] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(26,28,27,0.2)] bg-gradient-to-br from-[#0F2C59] to-[#1D4ED8]">
              <div className="p-5 h-full flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center mb-4">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <div className="h-2.5 bg-white/40 rounded mb-2 w-4/5" />
                  <div className="h-2 bg-white/25 rounded mb-1 w-3/5" />
                  <div className="h-2 bg-white/25 rounded w-1/2" />
                </div>
                <div>
                  <div className="h-1.5 bg-white/30 rounded w-full mb-1" />
                  <div className="h-1.5 bg-white/30 rounded w-4/5 mb-1" />
                  <div className="h-1.5 bg-white/30 rounded w-3/5" />
                  <div className="mt-4 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-white/30" />
                    <div className="h-1.5 bg-white/30 rounded w-16" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating stat badges */}
            <div className="absolute -right-4 top-10 bg-white rounded-xl px-3 py-2 shadow-[0_4px_20px_rgba(26,28,27,0.1)] flex items-center gap-2">
              <span className="text-lg">📄</span>
              <div>
                <p className="text-xs font-bold text-[#1A1C1B]" style={{ fontFamily: 'var(--font-manrope)' }}>
                  50M+
                </p>
                <p className="text-[10px] text-[#6F797A]">Documents</p>
              </div>
            </div>
            <div className="absolute -left-6 bottom-14 bg-white rounded-xl px-3 py-2 shadow-[0_4px_20px_rgba(26,28,27,0.1)] flex items-center gap-2">
              <span className="text-lg">⭐</span>
              <div>
                <p className="text-xs font-bold text-[#1A1C1B]" style={{ fontFamily: 'var(--font-manrope)' }}>
                  4.8/5
                </p>
                <p className="text-[10px] text-[#6F797A]">User rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
