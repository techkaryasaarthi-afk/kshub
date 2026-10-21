'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BookOpen } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'

export function Footer() {
  const { profile } = useAuthStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isLoggedIn = mounted ? !!profile : false
  const isAdmin = mounted ? profile?.role === 'admin' : false

  const accountLinks = [
    { label: 'Sign Up', href: '/signup' },
    { label: 'Log In', href: '/login' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Upload', href: '/upload' },
    { label: 'Subscription', href: '/subscription' },
  ].filter((link) => {
    if (isLoggedIn) {
      return link.label !== 'Sign Up' && link.label !== 'Log In'
    }
    return true
  }).map((link) => {
    if (link.label === 'Dashboard' && isAdmin) {
      return { label: 'Admin Panel', href: '/admin' }
    }
    return link
  })

  const footerLinks = {
    Company: [
      { label: 'About', href: '/about' },
      { label: 'Press', href: '/press' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
    ],
    Discover: [
      { label: 'Academic', href: '/search?category=academic' },
      { label: 'Professional', href: '/search?category=professional' },
      { label: 'Culture', href: '/search?category=culture' },
      { label: 'Personal Growth', href: '/search?category=personal-growth' },
    ],
    Account: accountLinks,
    Support: [
      { label: 'Help Center', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
    ],
  }

  return (
    <footer className="relative bg-[#071b31] text-white overflow-hidden border-t border-[#d29a27]/30">
      {/* Ambient background glow & grid shimmer */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#d29a27]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#168f8a]/10 rounded-full blur-[140px] pointer-events-none" />
      
      {/* Top golden shimmer accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#f5d778] to-transparent opacity-80" />

      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3.5 group">
              <span className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-2xl overflow-hidden border-2 border-[#d29a27] bg-white p-0.5 shadow-xl shadow-[#d29a27]/25 glow-aura-gold group-hover:scale-105 group-hover:border-[#f5d778] transition-all duration-300 shrink-0">
                <Image
                  src="/karya-saarthi-logo.jpg"
                  alt="Karya Saarthi — Your Trusted Work Companion"
                  width={256}
                  height={256}
                  className="h-full w-full object-contain"
                  priority
                />
              </span>
              <div>
                <span className="font-extrabold text-2xl text-white tracking-tight block group-hover:text-[#f0d488] transition-colors" style={{ fontFamily: 'var(--font-epilogue)', letterSpacing: '-0.04em' }}>
                  KSHub
                </span>
                <span className="text-[10px] uppercase font-bold text-[#f0d488] tracking-widest block font-mono">
                  By Karya Saarthi
                </span>
              </div>
            </Link>

            <p className="text-xs text-[#b8c7d6] leading-relaxed" style={{ fontFamily: 'var(--font-manrope)' }}>
              KSHub is India&apos;s digital knowledge repository &amp; project solutions library. Part of the <strong>Karya Saarthi</strong> network (Karyanex Private Limited).
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-[#d29a27]/40 text-[#f0d488] text-[11px] font-semibold hover:border-[#f5d778] hover:bg-white/10 transition-colors">
                ✨ Your Trusted Work Companion
              </span>
            </div>

            {/* Social Icons */}
            <div className="flex gap-2 flex-wrap pt-2">
              {[
                {
                  name: 'X',
                  url: 'https://x.com/karyasaarthi',
                  hoverBg: 'hover:bg-zinc-800',
                  icon: (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  )
                },
                {
                  name: 'LinkedIn',
                  url: 'https://www.linkedin.com/in/karya-saarthi🤝-693a01369',
                  hoverBg: 'hover:bg-[#0077B5]',
                  icon: (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  )
                },
                {
                  name: 'Instagram',
                  url: 'https://www.instagram.com/karyasaarthi/',
                  hoverBg: 'hover:bg-[#E4405F]',
                  icon: (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                    </svg>
                  )
                },
                {
                  name: 'YouTube',
                  url: 'https://www.youtube.com/@KaryaSaarthi',
                  hoverBg: 'hover:bg-[#FF0000]',
                  icon: (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  )
                },
                {
                  name: 'Facebook',
                  url: 'https://www.facebook.com/profile.php?id=61576877739779',
                  hoverBg: 'hover:bg-[#1877F2]',
                  icon: (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3v3h-3v6.95c4.85-.46 8-4.49 8-9.95z"/>
                    </svg>
                  )
                },
                {
                  name: 'Telegram',
                  url: 'https://t.me/karyasaarthi',
                  hoverBg: 'hover:bg-[#229ED9]',
                  icon: (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.89 1.2-5.33 3.53-.5.35-.96.52-1.37.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.46-.42-1.4-.88.03-.24.37-.49 1.02-.75 3.99-1.74 6.66-2.88 7.99-3.43 3.8-1.57 4.59-1.85 5.1-1.86.11 0 .37.03.54.17.14.12.18.28.2.44-.01.07 0 .15-.02.22z"/>
                    </svg>
                  )
                }
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-[#BEC8CA] ${s.hoverBg} hover:text-white transition-all duration-300 hover:scale-110 shadow-sm`}
                  title={s.name}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([col, links]) => (
            <div key={col}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#f0d488] mb-4" style={{ fontFamily: 'var(--font-manrope)' }}>
                {col}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#b8c7d6] hover:text-[#f0d488] transition-colors"
                      style={{ fontFamily: 'var(--font-manrope)' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-10 mt-10 text-xs text-[#6F797A] space-y-8">
          {/* Legal and Company Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 leading-relaxed" style={{ fontFamily: 'var(--font-manrope)' }}>
            <div className="space-y-2">
              <h5 className="font-semibold text-[#BEC8CA] uppercase tracking-wider text-[10px]">Corporate Information</h5>
              <p>
                <strong>Registered Company:</strong> Karyanex Private Limited<br />
                <strong>Trade Name:</strong> Karya Saarthi<br />
                <strong>Main Website:</strong> <a href="https://karyasaarthi.com" target="_blank" rel="noopener noreferrer" className="text-[#f0d488] hover:underline">karyasaarthi.com</a>
              </p>
            </div>
            
            <div className="space-y-2">
              <h5 className="font-semibold text-[#BEC8CA] uppercase tracking-wider text-[10px]">Registration & Compliance</h5>
              <p>
                <strong>CIN:</strong> U85500BR2026PTC085054<br />
                <strong>GSTIN:</strong> 10AAMCK8870B1ZN
              </p>
              <div className="flex gap-2 mt-2">
                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-[9px] font-semibold tracking-wider uppercase">MCA Registered</span>
                <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded text-[9px] font-semibold tracking-wider uppercase">GST Compliant</span>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="font-semibold text-[#BEC8CA] uppercase tracking-wider text-[10px]">Legal Disclaimer</h5>
              <p>
                Karya Saarthi is the trade name operated by Karyanex Private Limited, a company incorporated under the Companies Act, 2013. All transactions, contracts, and legal obligations are governed under the name Karyanex Private Limited. KSHub is a proud part of the Karya Saarthi network.
              </p>
            </div>
          </div>

          {/* Copyright & Links */}
          <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#3F484A]" style={{ fontFamily: 'var(--font-manrope)' }}>
              © 2026 Karyanex Private Limited. All rights reserved. KSHub is a part of Karya Saarthi.
            </p>
            <div className="flex items-center gap-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((label) => (
                <a key={label} href="#" className="text-xs text-[#3F484A] hover:text-white transition-colors" style={{ fontFamily: 'var(--font-manrope)' }}>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
