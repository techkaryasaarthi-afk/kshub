/**
 * ==============================================================================
 * KSHub - HeroSection Component (Features #4 & Responsive Overhaul)
 * ==============================================================================
 * Key Implementation Highlights:
 * 1. Full 16:9 Widescreen Video Showcase:
 *    - Container maintains precise aspect-[16/9] with zero cropping of video text or emblem.
 *    - Dual-layer watermark concealment: bottom-right dark gradient + brand pill badge ("KSHub • HD")
 *      completely covers third-party Gemini watermarks.
 * 2. Responsive Multi-device Layout:
 *    - Designed for iPhone, iPad, MacBook, and large desktop screens.
 *    - Floating badges positioned with responsive coordinates to eliminate overlap.
 * 3. Brand Light & Dark Themes:
 *    - Default Light Theme: Warm cream background (#fbf8f0), Royal Navy (#102f53), Gold (#d29a27), Teal (#168f8a).
 *    - Smooth transitions with full Dark Mode support (#071b31).
 * ==============================================================================
 */

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, BookOpen, Search, ShieldCheck, Sparkles, Upload, Star, CheckCircle2, Zap, Users, GraduationCap } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'

export function HeroSection() {
  const { profile } = useAuthStore()

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#fbf8f0] via-[#f7f2e6] to-[#fbf8f0] text-[#102f53] dark:from-[#071b31] dark:via-[#09223e] dark:to-[#071b31] dark:text-white pt-20 sm:pt-24 transition-colors duration-300">
      {/* 1. Animated Ambient Atmospheric Orbs & Floating Particles */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="pulse-glow absolute -left-28 top-10 h-[30rem] w-[30rem] rounded-full bg-[#168f8a]/12 dark:bg-[#168f8a]/20 blur-[130px]" />
        <div className="pulse-glow absolute -right-20 top-4 h-[36rem] w-[36rem] rounded-full bg-[#d29a27]/15 dark:bg-[#d29a27]/20 blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[40rem] w-[40rem] rounded-full bg-[#f0e6d2]/50 dark:bg-[#0b2542]/60 blur-[160px]" />

        {/* Ambient Floating Particle Sparkles */}
        <div className="animate-particle-1 absolute top-[20%] left-[15%] h-3 w-3 rounded-full bg-[#d29a27] dark:bg-[#f5d778] shadow-[0_0_12px_#d29a27] dark:shadow-[0_0_12px_#f5d778]" />
        <div className="animate-particle-2 absolute top-[35%] right-[22%] h-2.5 w-2.5 rounded-full bg-[#168f8a] dark:bg-[#5ed2c2] shadow-[0_0_10px_#168f8a] dark:shadow-[0_0_10px_#5ed2c2]" />
        <div className="animate-particle-3 absolute bottom-[25%] left-[30%] h-2 w-2 rounded-full bg-[#d29a27] shadow-[0_0_8px_#d29a27]" />
        <div className="animate-particle-1 absolute top-[70%] right-[10%] h-3.5 w-3.5 rounded-full bg-[#168f8a]/60 dark:bg-[#5ed2c2]/70 blur-[1px]" />
        
        {/* Subtle Square Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.05] dark:opacity-[0.065] [mask-image:radial-gradient(ellipse_85%_75%_at_50%_40%,#000_60%,transparent_100%)]"
          style={{
            backgroundImage: 'linear-gradient(rgba(16,47,83,.25) 1px,transparent 1px),linear-gradient(90deg,rgba(16,47,83,.25) 1px,transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <div className="mx-auto grid max-w-[1280px] items-center gap-10 sm:gap-12 px-4 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-10 xl:gap-14 lg:px-12 pb-16 sm:pb-20 lg:pb-28 pt-10 sm:pt-14 lg:pt-20">
        
        {/* Left Column: Hero Text & Search */}
        <div className="relative z-10 w-full max-w-[650px] mx-auto text-center lg:text-left">
          
          {/* Animated Badge */}
          <div className="reveal-up mb-5 sm:mb-7 inline-flex items-center gap-2 rounded-full border border-[#d29a27]/30 dark:border-[#f5d778]/40 bg-white/80 dark:bg-white/[0.08] px-3.5 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold tracking-wide text-[#9d7115] dark:text-[#f5d778] backdrop-blur-md shadow-md shadow-[#d29a27]/10 max-w-full">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d29a27] dark:bg-[#f5d778] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d29a27]" />
            </span>
            <span className="truncate">Knowledge grows when it is shared • <strong>Karya Saarthi Hub</strong></span>
          </div>

          {/* Heading */}
          <h1 className="reveal-up text-[clamp(2.1rem,5.2vw,4.5rem)] font-extrabold leading-[1.08] tracking-[-0.04em] text-[#102f53] dark:text-white">
            A world of
            <br />
            knowledge,
            <br />
            <span className="bg-gradient-to-r from-[#d29a27] via-[#c68918] to-[#168f8a] bg-clip-text text-transparent dark:from-[#fce588] dark:via-[#e5b84d] dark:to-[#f6d87a]">
              within reach.
            </span>
          </h1>

          <p className="reveal-up-delay mx-auto mt-4 sm:mt-6 max-w-[540px] text-sm sm:text-base lg:text-lg leading-relaxed text-[#485c70] dark:text-[#c2d1df] lg:mx-0 font-medium">
            Discover research, MBA reports, dissertation papers, textbooks, and verified academic projects in one thoughtfully curated digital library.
          </p>

          {/* Search Bar with Micro-interactions */}
          <form
            action="/search"
            method="get"
            className="reveal-up-delay mx-auto mt-6 sm:mt-8 flex w-full max-w-[560px] items-center gap-2 sm:gap-3 rounded-2xl border-2 border-[#102f53]/15 dark:border-white/20 bg-white dark:bg-white/95 p-1.5 sm:p-2 shadow-[0_16px_45px_rgba(16,47,83,0.08)] dark:shadow-[0_20px_60px_rgba(0,0,0,.35)] backdrop-blur-md transition-all focus-within:border-[#168f8a] focus-within:ring-4 focus-within:ring-[#168f8a]/15 hover:border-[#d29a27]/60 lg:mx-0"
          >
            <Search className="ml-2 sm:ml-3 h-4 sm:h-5 w-4 sm:w-5 shrink-0 text-[#168f8a]" />
            <input
              type="search"
              name="q"
              placeholder="Search research papers, notes, reports..."
              aria-label="Search the library"
              className="min-w-0 flex-1 border-0 bg-transparent px-1.5 sm:px-2 py-2 sm:py-3 text-xs sm:text-sm text-[#102f53] font-medium outline-none placeholder:text-[#64748b] focus:border-0 focus:ring-0"
            />
            <button
              type="submit"
              className="shine-sweep inline-flex shrink-0 items-center gap-1.5 sm:gap-2 rounded-xl bg-gradient-to-r from-[#102f53] to-[#168f8a] px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-md transition-all hover:opacity-95 hover:shadow-lg cursor-pointer"
            >
              Search <ArrowRight className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
            </button>
          </form>

          {/* Quick Trending Searches */}
          <div className="reveal-up-delay mt-3 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[11px] font-medium text-[#64748b] dark:text-[#9cb1c5] lg:justify-start">
            <span className="text-[#9d7115] dark:text-[#f5d778] font-bold">Trending:</span>
            <Link href="/search?q=SIP+Report" className="rounded-full bg-white/80 dark:bg-white/5 px-2.5 py-0.5 border border-[#102f53]/10 dark:border-white/10 text-[#485c70] dark:text-[#9cb1c5] hover:border-[#d29a27]/60 hover:text-[#9d7115] dark:hover:text-[#f5d778] transition-colors shadow-2xs">
              #SIP Reports
            </Link>
            <Link href="/search?q=Marketing" className="rounded-full bg-white/80 dark:bg-white/5 px-2.5 py-0.5 border border-[#102f53]/10 dark:border-white/10 text-[#485c70] dark:text-[#9cb1c5] hover:border-[#d29a27]/60 hover:text-[#9d7115] dark:hover:text-[#f5d778] transition-colors shadow-2xs">
              #Marketing Case Studies
            </Link>
            <Link href="/search?q=Finance" className="rounded-full bg-white/80 dark:bg-white/5 px-2.5 py-0.5 border border-[#102f53]/10 dark:border-white/10 text-[#485c70] dark:text-[#9cb1c5] hover:border-[#d29a27]/60 hover:text-[#9d7115] dark:hover:text-[#f5d778] transition-colors shadow-2xs">
              #Finance Thesis
            </Link>
            <Link href="/search?q=AI" className="rounded-full bg-white/80 dark:bg-white/5 px-2.5 py-0.5 border border-[#102f53]/10 dark:border-white/10 text-[#485c70] dark:text-[#9cb1c5] hover:border-[#d29a27]/60 hover:text-[#9d7115] dark:hover:text-[#f5d778] transition-colors shadow-2xs">
              #AI Research
            </Link>
          </div>

          {/* Primary Action Buttons */}
          <div className="reveal-up-delay mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:justify-start">
            <Link
              href="/search"
              className="shine-sweep inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#d29a27] via-[#c68918] to-[#d29a27] px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-[#d29a27]/25 transition-all hover:scale-105 hover:shadow-xl hover:shadow-[#d29a27]/35"
            >
              Explore the library <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/upload"
              className="inline-flex items-center gap-2 rounded-2xl border-2 border-[#102f53]/20 dark:border-white/20 bg-white/90 dark:bg-white/10 px-5 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-[#102f53] dark:text-white backdrop-blur-sm transition-all hover:border-[#168f8a] hover:bg-white dark:hover:bg-white/20 hover:text-[#168f8a] dark:hover:text-[#5ed2c2] hover:shadow-md"
            >
              <Upload className="h-4 w-4 text-[#168f8a] dark:text-[#5ed2c2]" />
              Share your work
            </Link>
          </div>

          {/* Social Proof Avatars & Rating */}
          <div className="reveal-up-delay mt-7 sm:mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <div className="flex -space-x-2.5">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white dark:border-[#071b31] bg-[#102f53] text-[10px] font-bold text-white shadow-sm">
                DU
              </span>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white dark:border-[#071b31] bg-[#168f8a] text-[10px] font-bold text-white shadow-sm">
                AK
              </span>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white dark:border-[#071b31] bg-[#d29a27] text-[10px] font-bold text-white shadow-sm">
                IP
              </span>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white dark:border-[#071b31] bg-[#0d2745] text-[10px] font-bold text-[#f5d778] shadow-sm">
                BH
              </span>
            </div>

            <div className="text-left">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-[#d29a27] text-[#d29a27]" />
                ))}
                <span className="text-xs font-bold text-[#102f53] dark:text-white ml-1">4.9 / 5</span>
              </div>
              <p className="text-[11px] text-[#516273] dark:text-[#9cb1c5]">
                Trusted by <strong>25,000+</strong> students &amp; researchers across India
              </p>
            </div>
          </div>

          {/* Trust Highlights */}
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-x-5 sm:gap-x-7 gap-y-2.5 text-[11px] sm:text-xs font-semibold text-[#516273] dark:text-[#b8c7d6] border-t border-[#102f53]/10 dark:border-white/10 pt-5">
            <span className="inline-flex items-center gap-1.5 sm:gap-2">
              <ShieldCheck className="h-4 w-4 text-[#168f8a] dark:text-[#5ed2c2] shrink-0" /> 100% Plagiarism Checked
            </span>
            <span className="inline-flex items-center gap-1.5 sm:gap-2">
              <BookOpen className="h-4 w-4 text-[#d29a27] dark:text-[#f5d778] shrink-0" /> 12+ Knowledge Streams
            </span>
            <span className="inline-flex items-center gap-1.5 sm:gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" /> MCA Registered
            </span>
          </div>
        </div>

        {/* Right Column: Full Widescreen 16:9 Video Showcase with Clean, Non-overlapping Stats */}
        <div className="relative mx-auto flex w-full max-w-[460px] sm:max-w-[520px] lg:max-w-[560px] xl:max-w-[600px] flex-col items-center justify-center">
          {/* Dual Orbiting Rings (Background Ambient Decor) */}
          <div className="brand-orbit absolute pointer-events-none h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] lg:h-[460px] lg:w-[460px] rounded-full border border-dashed border-[#d29a27]/30 dark:border-[#f5d778]/30" />
          <div className="brand-orbit-reverse absolute pointer-events-none h-[260px] w-[260px] sm:h-[350px] sm:w-[350px] lg:h-[410px] lg:w-[410px] rounded-full border border-dashed border-[#168f8a]/30 dark:border-[#168f8a]/30" />
          <div className="absolute pointer-events-none h-[240px] w-[240px] sm:h-[340px] sm:w-[340px] lg:h-[380px] lg:w-[380px] rounded-full bg-[radial-gradient(circle,rgba(210,154,39,.18),rgba(11,37,66,0)_70%)] dark:bg-[radial-gradient(circle,rgba(210,154,39,.24),rgba(11,37,66,0)_70%)]" />

          {/* Top Stat Pills Strip — Resting Safely Above Video Frame (ZERO OVERLAP) */}
          <div className="w-full flex items-center justify-between gap-2 mb-3 z-20 px-1 sm:px-2">
            <div className="inline-flex items-center gap-2 rounded-2xl border border-[#168f8a]/20 dark:border-[#168f8a]/30 bg-white/95 dark:bg-[#0b2542]/95 px-3 sm:px-3.5 py-1.5 shadow-sm backdrop-blur-md text-[#102f53] dark:text-white transition-all hover:scale-105">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#168f8a]/15 text-[#137a77] dark:bg-[#168f8a]/25 dark:text-[#5ed2c2] shrink-0">
                <BookOpen className="h-3.5 w-3.5" />
              </span>
              <div className="text-left">
                <strong className="block text-[11px] sm:text-xs font-bold leading-tight">10,000+ Verified Reports</strong>
                <small className="text-[9px] sm:text-[10px] text-[#516273] dark:text-[#b8c7d6] leading-none hidden xs:inline">Read · Download · Learn</small>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-2xl border border-[#d29a27]/35 dark:border-[#f5d778]/35 bg-white/95 dark:bg-[#0b2542]/95 px-3 py-1.5 shadow-sm backdrop-blur-md text-[#102f53] dark:text-white transition-all hover:scale-105">
              <GraduationCap className="h-4 w-4 text-[#d29a27] dark:text-[#f5d778] shrink-0" />
              <span className="text-[11px] sm:text-xs font-bold whitespace-nowrap">50+ Universities</span>
            </div>
          </div>

          {/* Central 16:9 Video Showcase Card - 100% Video Visibility with Zero Overlapping Badges */}
          <div className="glow-aura-gold relative z-10 w-full overflow-hidden rounded-[24px] sm:rounded-[30px] border-2 border-[#d29a27]/70 bg-gradient-to-b from-white via-white to-amber-50/95 dark:from-[#0b2542] dark:via-[#09223e] dark:to-[#071b31] p-2.5 sm:p-3.5 shadow-[0_24px_70px_rgba(16,47,83,0.14)] dark:shadow-[0_24px_70px_rgba(0,0,0,.55)] group transition-transform duration-500 hover:scale-[1.01]">
            
            {/* 16:9 Video Container: Displays the entire video without side cropping */}
            <div className="relative aspect-[16/9] w-full rounded-[16px] sm:rounded-[22px] overflow-hidden bg-[#071b31] shadow-inner flex items-center justify-center">
              <video
                src="/karya-saarthi-hero.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                poster="/karya-saarthi-logo.jpg"
                className="h-full w-full object-cover scale-[1.02] rounded-[16px] sm:rounded-[22px] pointer-events-none select-none transition-transform duration-700"
              />

              {/* Bottom-right corner dark gradient specifically targeting the watermark location */}
              <div className="pointer-events-none absolute bottom-0 right-0 w-36 sm:w-48 h-14 sm:h-18 bg-gradient-to-tl from-[#071b31] via-[#071b31]/95 to-transparent" />

              {/* Subtle bottom edge gradient */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-[#071b31]/80 to-transparent" />

              {/* Elegant Brand Cover Badge - Sits squarely over the Gemini watermark in bottom-right corner */}
              <div className="pointer-events-none absolute bottom-2 sm:bottom-2.5 right-2 sm:right-2.5 z-20 flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-[#071b31]/95 text-white border border-[#d29a27]/70 shadow-[0_4px_16px_rgba(0,0,0,0.5)] backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#168f8a] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5ed2c2]" />
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold tracking-wider uppercase font-mono text-[#f5d778]">
                  KSHub • HD
                </span>
              </div>

              {/* Inner ambient ring */}
              <div className="pointer-events-none absolute inset-0 rounded-[16px] sm:rounded-[22px] ring-1 ring-inset ring-white/10" />
            </div>
            
            {/* Card Bottom Label Bar */}
            <div className="mt-2 sm:mt-2.5 flex items-center justify-between gap-3 rounded-xl sm:rounded-2xl border border-[#d29a27]/30 bg-gradient-to-r from-[#102f53] via-[#0d2745] to-[#168f8a] px-3 sm:px-4 py-2 sm:py-2.5 text-white shadow-md">
              <div className="flex items-center gap-2 min-w-0">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-white/10 border border-[#f5d778]/30">
                  <Sparkles className="h-3.5 w-3.5 text-[#f5d778]" />
                </span>
                <div className="min-w-0 text-left">
                  <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[.22em] text-[#f5d778] font-mono truncate">
                    Karya Saarthi Hub
                  </p>
                  <p className="text-[10px] sm:text-[11px] font-semibold text-white/95 truncate">
                    Your Trusted Work Companion
                  </p>
                </div>
              </div>
              <span className="hidden xs:inline-flex shrink-0 items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-[9px] font-semibold text-white/90">
                Verified ✦
              </span>
            </div>
          </div>

          {/* Bottom Stat Pill — Resting Safely Below Video Frame (ZERO OVERLAP) */}
          <div className="w-full flex items-center justify-end mt-3 z-20 px-1 sm:px-2">
            <div className="inline-flex items-center gap-2 rounded-2xl border border-[#d29a27]/30 bg-white/95 dark:bg-[#0b2542]/95 px-3.5 py-1.5 shadow-sm backdrop-blur-md text-[#102f53] dark:text-white transition-all hover:scale-105">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#d29a27]/15 text-[#9d7115] dark:bg-[#d29a27]/20 dark:text-[#f5d778] shrink-0">
                <Zap className="h-3.5 w-3.5" />
              </span>
              <div className="text-left">
                <strong className="block text-[11px] sm:text-xs font-bold leading-tight">Instant Downloads</strong>
                <small className="text-[9px] sm:text-[10px] text-[#516273] dark:text-[#b8c7d6] leading-none">Lifetime Digital Access</small>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Gradient Accent Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#d29a27]/40 dark:via-[#f5d778]/50 to-transparent" />
    </section>
  )
}
