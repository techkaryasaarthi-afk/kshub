'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, BookOpen, Search, ShieldCheck, Sparkles, Upload, Star, CheckCircle2, Zap, Users, GraduationCap } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'

export function HeroSection() {
  const { profile } = useAuthStore()

  return (
    <section className="relative isolate overflow-hidden bg-[#071b31] pt-24 text-white">
      {/* 1. Animated Ambient Atmospheric Orbs & Floating Particles */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="pulse-glow absolute -left-28 top-10 h-[30rem] w-[30rem] rounded-full bg-[#168f8a]/20 blur-[130px]" />
        <div className="pulse-glow absolute -right-20 top-4 h-[36rem] w-[36rem] rounded-full bg-[#d29a27]/20 blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[40rem] w-[40rem] rounded-full bg-[#0b2542]/60 blur-[160px]" />

        {/* Ambient Floating Particle Sparkles */}
        <div className="animate-particle-1 absolute top-[20%] left-[15%] h-3 w-3 rounded-full bg-[#f5d778] shadow-[0_0_12px_#f5d778]" />
        <div className="animate-particle-2 absolute top-[35%] right-[22%] h-2.5 w-2.5 rounded-full bg-[#5ed2c2] shadow-[0_0_10px_#5ed2c2]" />
        <div className="animate-particle-3 absolute bottom-[25%] left-[30%] h-2 w-2 rounded-full bg-[#d29a27] shadow-[0_0_8px_#d29a27]" />
        <div className="animate-particle-1 absolute top-[70%] right-[10%] h-3.5 w-3.5 rounded-full bg-[#5ed2c2]/70 blur-[1px]" />
        
        {/* Subtle Square Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.065] [mask-image:radial-gradient(ellipse_85%_75%_at_50%_40%,#000_60%,transparent_100%)]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.25) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.25) 1px,transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-6 pb-20 pt-14 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-8 lg:px-12 lg:pb-28 lg:pt-20">
        
        {/* Left Column: Hero Text & Search */}
        <div className="relative z-10 max-w-[650px] text-center lg:text-left">
          
          {/* Animated Badge */}
          <div className="reveal-up mb-7 inline-flex items-center gap-2.5 rounded-full border border-[#f5d778]/40 bg-white/[0.08] px-4 py-2 text-xs font-semibold tracking-wide text-[#f5d778] backdrop-blur-md shadow-lg shadow-[#d29a27]/15">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f5d778] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d29a27]" />
            </span>
            <span>Knowledge grows when it is shared • <strong>Karya Saarthi Hub</strong></span>
          </div>

          {/* Heading */}
          <h1 className="reveal-up text-[clamp(2.7rem,5.5vw,4.8rem)] font-extrabold leading-[1.05] tracking-[-0.05em] text-white">
            A world of
            <br />
            knowledge,
            <br />
            <span className="text-gradient-gold">
              within reach.
            </span>
          </h1>

          <p className="reveal-up-delay mx-auto mt-6 max-w-[540px] text-base leading-relaxed text-[#c2d1df] sm:text-lg lg:mx-0">
            Discover research, MBA reports, dissertation papers, textbooks, and verified academic projects in one thoughtfully curated digital library.
          </p>

          {/* Search Bar with Micro-interactions */}
          <form
            action="/search"
            method="get"
            className="reveal-up-delay mx-auto mt-8 flex max-w-[560px] items-center gap-3 rounded-2xl border border-white/20 bg-white/95 p-2 shadow-[0_20px_60px_rgba(0,0,0,.35)] backdrop-blur-md transition-all focus-within:border-[#f5d778] focus-within:ring-4 focus-within:ring-[#f5d778]/25 hover:border-white/40 lg:mx-0"
          >
            <Search className="ml-3 h-5 w-5 shrink-0 text-[#168f8a]" />
            <input
              type="search"
              name="q"
              placeholder="Search research papers, notes, textbooks, reports..."
              aria-label="Search the library"
              className="min-w-0 flex-1 border-0 bg-transparent px-2 py-3 text-sm text-[#102f53] font-medium outline-none placeholder:text-[#64748b] focus:border-0 focus:ring-0"
            />
            <button
              type="submit"
              className="shine-sweep inline-flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-[#102f53] to-[#168f8a] px-5 py-3 text-sm font-bold text-white shadow-md transition-all hover:opacity-95 hover:shadow-lg sm:px-6 cursor-pointer"
            >
              Search <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Quick Trending Searches */}
          <div className="reveal-up-delay mt-3 flex flex-wrap items-center justify-center gap-2 text-[11px] font-medium text-[#9cb1c5] lg:justify-start">
            <span className="text-[#f5d778] font-semibold">Trending:</span>
            <Link href="/search?q=SIP+Report" className="rounded-full bg-white/5 px-2.5 py-0.5 border border-white/10 hover:border-[#f5d778]/40 hover:text-[#f5d778] transition-colors">
              #SIP Reports
            </Link>
            <Link href="/search?q=Marketing" className="rounded-full bg-white/5 px-2.5 py-0.5 border border-white/10 hover:border-[#f5d778]/40 hover:text-[#f5d778] transition-colors">
              #Marketing Case Studies
            </Link>
            <Link href="/search?q=Finance" className="rounded-full bg-white/5 px-2.5 py-0.5 border border-white/10 hover:border-[#f5d778]/40 hover:text-[#f5d778] transition-colors">
              #Finance Thesis
            </Link>
            <Link href="/search?q=AI" className="rounded-full bg-white/5 px-2.5 py-0.5 border border-white/10 hover:border-[#f5d778]/40 hover:text-[#f5d778] transition-colors">
              #AI Research
            </Link>
          </div>

          {/* Action CTAs */}
          <div className="mt-7 flex flex-col items-center justify-center gap-3.5 sm:flex-row lg:justify-start">
            <Link
              href={profile ? '/search' : '/signup'}
              className="shine-sweep inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-[#102f53] bg-gradient-to-r from-[#f5d778] via-[#e5b84d] to-[#f0d488] hover:shadow-xl hover:shadow-[#d29a27]/30 transition-all hover:-translate-y-0.5"
            >
              Explore the library <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/upload"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white/90 bg-white/5 border border-white/15 backdrop-blur hover:bg-white/15 hover:text-white transition-all hover:-translate-y-0.5"
            >
              <Upload className="h-4 w-4 text-[#5ed2c2]" /> Share your work
            </Link>
          </div>

          {/* Student Community Proof Avatar Stack */}
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
            <div className="flex -space-x-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-[#168f8a] to-[#5ed2c2] text-xs font-bold text-white ring-2 ring-[#071b31]">
                DU
              </span>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-[#d29a27] to-[#f5d778] text-xs font-bold text-[#102f53] ring-2 ring-[#071b31]">
                AK
              </span>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-[#0b2542] to-[#168f8a] text-xs font-bold text-white ring-2 ring-[#071b31]">
                IP
              </span>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-xs font-bold text-[#102f53] ring-2 ring-[#071b31]">
                BH
              </span>
            </div>
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs font-bold text-white ml-1">4.9 / 5</span>
              </div>
              <p className="text-[11px] text-[#9cb1c5]">
                Trusted by <strong>25,000+</strong> students &amp; researchers across India
              </p>
            </div>
          </div>

          {/* Trust Highlights */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-xs font-semibold text-[#b8c7d6] lg:justify-start border-t border-white/10 pt-5">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#5ed2c2]" /> 100% Plagiarism Checked
            </span>
            <span className="inline-flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-[#f5d778]" /> 12+ Knowledge Categories
            </span>
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> MCA Registered
            </span>
          </div>
        </div>

        {/* Right Column: Interactive 3D Emblem Showcase with Floating Badges */}
        <div className="relative mx-auto flex min-h-[420px] w-full max-w-[530px] items-center justify-center lg:min-h-[540px]">
          {/* Dual Orbiting Rings */}
          <div className="brand-orbit absolute h-[360px] w-[360px] rounded-full border border-dashed border-[#f5d778]/35 sm:h-[460px] sm:w-[460px]" />
          <div className="brand-orbit-reverse absolute h-[320px] w-[320px] rounded-full border border-dashed border-[#168f8a]/35 sm:h-[420px] sm:w-[420px]" />
          <div className="absolute h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(210,154,39,.24),rgba(11,37,66,0)_70%)] sm:h-[400px] sm:w-[400px]" />

          {/* Central Logo Showcase Card */}
          <div className="float-slow glow-aura-gold relative z-10 w-[270px] overflow-hidden rounded-[34px] border-2 border-[#f5d778]/70 bg-gradient-to-b from-white via-white to-amber-50/95 p-4 shadow-[0_32px_90px_rgba(0,0,0,.6)] sm:w-[340px] group transition-transform duration-500 hover:scale-105">
            <div className="relative aspect-square w-full rounded-[26px] overflow-hidden bg-white p-2">
              <Image
                src="/karya-saarthi-logo.jpg"
                alt="Karya Saarthi — Your Trusted Work Companion"
                width={1024}
                height={1024}
                className="h-full w-full object-contain"
                priority
              />
            </div>
            
            <div className="mt-3 rounded-2xl border border-[#d29a27]/30 bg-[#071b31]/95 px-4 py-3 text-center backdrop-blur-md shadow-lg">
              <p className="text-[10px] font-bold uppercase tracking-[.24em] text-[#f5d778] font-mono">
                Karya Saarthi Hub
              </p>
              <p className="mt-1 text-xs font-semibold text-white">
                Your Trusted Work Companion
              </p>
            </div>
          </div>

          {/* Floating Badge 1: Top-Left */}
          <div className="float-delay absolute -left-4 top-[10%] z-20 flex items-center gap-3 rounded-2xl border border-white/20 bg-[#0b2542]/90 px-4 py-3 shadow-[0_20px_45px_rgba(0,0,0,.35)] backdrop-blur-md hover:scale-105 transition-transform">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#168f8a]/25 text-[#5ed2c2]">
              <BookOpen className="h-5 w-5" />
            </span>
            <span>
              <strong className="block text-sm text-white font-bold">10,000+ Verified Reports</strong>
              <small className="text-[11px] text-[#b8c7d6]">Read · Download · Learn</small>
            </span>
          </div>

          {/* Floating Badge 2: Bottom-Right */}
          <div className="float-reverse absolute -right-2 bottom-[10%] z-20 flex items-center gap-3 rounded-2xl border border-[#f5d778]/30 bg-[#0b2542]/95 px-4 py-3 shadow-[0_20px_45px_rgba(0,0,0,.35)] backdrop-blur-md hover:scale-105 transition-transform">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d29a27]/20 text-[#f5d778]">
              <Zap className="h-5 w-5" />
            </span>
            <span>
              <strong className="block text-sm text-white font-bold">Instant Downloads</strong>
              <small className="text-[11px] text-[#b8c7d6]">Lifetime Digital Access</small>
            </span>
          </div>

          {/* Floating Badge 3: Top-Right */}
          <div className="float-slow absolute -right-4 top-[8%] z-20 hidden sm:flex items-center gap-2 rounded-2xl border border-amber-400/30 bg-[#071b31]/90 px-3.5 py-2 shadow-lg backdrop-blur-md">
            <GraduationCap className="h-4 w-4 text-amber-400" />
            <span className="text-[11px] font-bold text-white">50+ Universities</span>
          </div>
        </div>

      </div>

      {/* Bottom Gradient Accent Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#f5d778]/50 to-transparent" />
    </section>
  )
}
