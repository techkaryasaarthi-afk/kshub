'use client'

import { 
  GraduationCap, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Star, 
  CheckCircle2, 
  Building2, 
  Lock, 
  Flame 
} from 'lucide-react'

const TICKER_ITEMS = [
  {
    icon: Flame,
    color: 'text-amber-400',
    bg: 'bg-amber-400/10 border-amber-400/30',
    title: '10,000+ Verified Academic Projects',
    subtitle: 'SIP & Dissertations',
  },
  {
    icon: GraduationCap,
    color: 'text-[#5ed2c2]',
    bg: 'bg-[#168f8a]/15 border-[#168f8a]/35',
    title: '50+ Top Indian Universities',
    subtitle: 'DU • AKTU • IPU • BHU • IIM',
  },
  {
    icon: Star,
    color: 'text-[#f5d778]',
    bg: 'bg-[#d29a27]/15 border-[#d29a27]/35',
    title: '4.9/5 Rating (25,000+ Students)',
    subtitle: 'Trusted Nationwide',
  },
  {
    icon: ShieldCheck,
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10 border-emerald-400/30',
    title: '100% Plagiarism & Turnitin Verified',
    subtitle: 'Authentic Research',
  },
  {
    icon: Zap,
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10 border-cyan-400/30',
    title: 'Instant 1-Click PDF Download',
    subtitle: 'Lifetime Library Access',
  },
  {
    icon: Building2,
    color: 'text-[#f5d778]',
    bg: 'bg-[#d29a27]/15 border-[#d29a27]/35',
    title: 'Ministry of Corporate Affairs (MCA)',
    subtitle: 'Registered & GST Compliant',
  },
  {
    icon: Lock,
    color: 'text-[#5ed2c2]',
    bg: 'bg-[#168f8a]/15 border-[#168f8a]/35',
    title: '256-Bit SSL Encrypted Checkout',
    subtitle: 'Razorpay UPI & Cards',
  },
  {
    icon: Sparkles,
    color: 'text-amber-300',
    bg: 'bg-amber-300/10 border-amber-300/30',
    title: 'Daily Fresh Academic Uploads',
    subtitle: 'Updated Curated Library',
  },
]

export function MarqueeTicker() {
  return (
    <div className="relative isolate overflow-hidden border-y border-[#d29a27]/25 bg-gradient-to-r from-[#071b31] via-[#0b2542] to-[#071b31] py-4 text-white shadow-inner">
      {/* Subtle edge blur masks for continuous flow */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-r from-[#071b31] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-l from-[#071b31] to-transparent" />

      {/* Infinite Scrolling Track */}
      <div className="animate-marquee items-center gap-4 py-1">
        {/* First set */}
        {TICKER_ITEMS.map((item, idx) => {
          const IconComponent = item.icon
          return (
            <div
              key={`ticker-1-${idx}`}
              className="inline-flex shrink-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 backdrop-blur-md transition-all duration-300 hover:border-[#f5d778]/60 hover:bg-white/[0.09] hover:shadow-lg hover:shadow-[#d29a27]/15 group cursor-default"
            >
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl border ${item.bg} group-hover:scale-110 transition-transform`}>
                <IconComponent className={`h-4 w-4 ${item.color}`} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-white group-hover:text-[#f5d778] transition-colors leading-tight">
                  {item.title}
                </span>
                <span className="text-[10px] font-medium text-[#9cb1c5] tracking-wide">
                  {item.subtitle}
                </span>
              </div>
            </div>
          )
        })}

        {/* Duplicate set for seamless continuous marquee loop */}
        {TICKER_ITEMS.map((item, idx) => {
          const IconComponent = item.icon
          return (
            <div
              key={`ticker-2-${idx}`}
              className="inline-flex shrink-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 backdrop-blur-md transition-all duration-300 hover:border-[#f5d778]/60 hover:bg-white/[0.09] hover:shadow-lg hover:shadow-[#d29a27]/15 group cursor-default"
            >
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl border ${item.bg} group-hover:scale-110 transition-transform`}>
                <IconComponent className={`h-4 w-4 ${item.color}`} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-white group-hover:text-[#f5d778] transition-colors leading-tight">
                  {item.title}
                </span>
                <span className="text-[10px] font-medium text-[#9cb1c5] tracking-wide">
                  {item.subtitle}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
