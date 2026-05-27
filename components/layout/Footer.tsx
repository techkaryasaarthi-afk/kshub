import Link from 'next/link'
import { BookOpen } from 'lucide-react'

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
  Account: [
    { label: 'Sign Up', href: '/signup' },
    { label: 'Log In', href: '/login' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Upload', href: '/upload' },
    { label: 'Subscription', href: '/subscription' },
  ],
  Support: [
    { label: 'Help Center', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-[#1A1C1B] text-white">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <img src="/karyasaarthi.png" alt="Karya Saarthi Logo" className="h-8 w-auto object-contain" />
              <span className="font-extrabold text-xl text-white" style={{ fontFamily: 'var(--font-epilogue)', letterSpacing: '-0.04em' }}>KSHub</span>
            </Link>
            <p className="text-sm text-[#6F797A] leading-relaxed mb-6" style={{ fontFamily: 'var(--font-manrope)' }}>
              KSHub (a part of Karya Saarthi) is the world's largest digital library. Discover and share millions of documents.
            </p>
            <div className="flex gap-3">
              {['𝕏', 'in', 'f', 'yt'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-sm font-bold text-[#BEC8CA] hover:bg-[#00616A] hover:text-white transition-all"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([col, links]) => (
            <div key={col}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#3F484A] mb-4" style={{ fontFamily: 'var(--font-manrope)' }}>
                {col}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#6F797A] hover:text-white transition-colors"
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
                <strong>Main Website:</strong> <a href="https://karyasaarthi.com" target="_blank" rel="noopener noreferrer" className="text-[#00616A] hover:underline">karyasaarthi.com</a>
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
