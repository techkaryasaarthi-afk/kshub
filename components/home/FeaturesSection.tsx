'use client'

import { 
  FileCheck2, 
  Search, 
  FolderLock, 
  Share2, 
  Sparkles, 
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Award
} from 'lucide-react'
import Link from 'next/link'

const FEATURES = [
  {
    icon: FileCheck2,
    badge: 'Originality First',
    title: '100% Plagiarism & Turnitin Verified',
    desc: 'Every MBA SIP report, research thesis, and case study uploaded is strictly vetted for academic integrity, originality, and actionable citations.',
    stat: '0% Plagiarism Risk',
    glowColor: 'hover:border-[#5ed2c2]/50 hover:shadow-[#168f8a]/15',
    iconBg: 'bg-[#168f8a]/15 text-[#5ed2c2] border-[#168f8a]/30',
  },
  {
    icon: Search,
    badge: 'Smart Discovery',
    title: 'Smart Categorized Search Engine',
    desc: 'Filter directly by University, Course (MBA, B.Tech, PhD), Industry (FinTech, FMCG, Healthcare), or Document Type to find what you need in seconds.',
    stat: '12+ Knowledge Streams',
    glowColor: 'hover:border-[#f5d778]/50 hover:shadow-[#d29a27]/15',
    iconBg: 'bg-[#d29a27]/15 text-[#f5d778] border-[#d29a27]/30',
  },
  {
    icon: FolderLock,
    badge: 'Permanent Library',
    title: 'Lifetime Digital Vault Access',
    desc: 'Never lose your purchased materials. All reports and downloaded documents remain permanently saved in your personal dashboard library.',
    stat: 'Unlimited Re-downloads',
    glowColor: 'hover:border-cyan-400/50 hover:shadow-cyan-500/15',
    iconBg: 'bg-cyan-500/15 text-cyan-300 border-cyan-400/30',
  },
  {
    icon: Award,
    badge: 'Author Recognition',
    title: 'Share & Build Your Academic Profile',
    desc: 'Publish your research, master’s thesis, or field study. Gain national citations, verified author badges, and reach thousands of peer researchers.',
    stat: 'Verified Author Badges',
    glowColor: 'hover:border-amber-400/50 hover:shadow-amber-500/15',
    iconBg: 'bg-amber-400/15 text-amber-300 border-amber-400/30',
  },
]

export function FeaturesSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#fbf8f0] via-[#f3ede0] to-[#fbf8f0] py-24 px-6 sm:px-8 lg:px-12">
      {/* Background glowing ambient elements */}
      <div className="pointer-events-none absolute left-1/4 top-10 h-72 w-72 rounded-full bg-[#168f8a]/10 blur-[100px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-10 h-72 w-72 rounded-full bg-[#d29a27]/10 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-[1280px]">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d29a27]/30 bg-[#d29a27]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#9d7115] shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-[#d29a27]" />
            <span>The KsHub Advantage</span>
          </div>

          <h2
            className="mt-4 text-3xl font-extrabold text-[#102f53] sm:text-4xl lg:text-5xl tracking-tight"
            style={{ fontFamily: 'var(--font-epilogue)', letterSpacing: '-0.04em' }}
          >
            Built for Academic Excellence &amp; Speed
          </h2>

          <p
            className="mx-auto mt-4 max-w-[640px] text-base text-[#516273] font-medium leading-relaxed sm:text-lg"
            style={{ fontFamily: 'var(--font-manrope)' }}
          >
            Everything you need to supercharge your thesis, research papers, and university assignments with vetted, high-scoring references.
          </p>
        </div>

        {/* 4-Card Interactive Animated Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={index}
                className={`group relative flex flex-col justify-between rounded-3xl border border-[#102f53]/[0.08] bg-white/80 p-7 backdrop-blur-md shadow-[0_12px_32px_rgba(16,47,83,0.05)] transition-all duration-300 hover:-translate-y-2.5 hover:bg-white hover:shadow-2xl ${item.glowColor}`}
              >
                <div>
                  {/* Top Bar: Icon + Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${item.iconBg} shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="rounded-full bg-[#fbf8f0] px-3 py-1 text-[11px] font-bold text-[#102f53] border border-[#102f53]/10">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <h3
                    className="text-lg font-bold text-[#102f53] mb-3 group-hover:text-[#168f8a] transition-colors leading-snug"
                    style={{ fontFamily: 'var(--font-epilogue)' }}
                  >
                    {item.title}
                  </h3>

                  <p
                    className="text-xs sm:text-sm text-[#516273] leading-relaxed font-normal"
                    style={{ fontFamily: 'var(--font-manrope)' }}
                  >
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Highlight Stat */}
                <div className="mt-6 pt-4 border-t border-[#102f53]/[0.06] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#102f53] flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-[#168f8a]" />
                    {item.stat}
                  </span>
                  <div className="h-7 w-7 rounded-full bg-[#fbf8f0] group-hover:bg-[#168f8a] group-hover:text-white flex items-center justify-center text-[#102f53] transition-colors">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Quick CTA strip */}
        <div className="mt-12 text-center">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 rounded-full border border-[#168f8a]/30 bg-white/90 px-6 py-3 text-xs sm:text-sm font-bold text-[#102f53] shadow-md backdrop-blur hover:bg-[#168f8a] hover:text-white transition-all hover:shadow-lg"
          >
            <Zap className="h-4 w-4 text-[#d29a27]" /> Explore all 10,000+ available reports and documents
          </Link>
        </div>
      </div>
    </section>
  )
}
