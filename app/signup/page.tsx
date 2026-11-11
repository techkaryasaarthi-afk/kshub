'use client'

/**
 * ==============================================================================
 * KSHub - Signup Page Component
 * ==============================================================================
 * Features:
 * - Brand Light Theme (#fbf8f0) and Dark Theme (#071b31) support
 * - Interactive Cursor Click & Focus Color Changing System:
 *   - Inputs change border, background tint, and glow color upon click/focus
 *   - Submit button transitions colors on hover and active click
 *   - Password toggle and navigation links with active click feedback
 * - Karya Saarthi official branding and typography
 * ==============================================================================
 */

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { User, Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState<'name' | 'email' | 'password' | null>(null)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
      },
    })

    if (error) {
      toast.error(error.message)
      setLoading(false)
      return
    }

    toast.success('Account created! Please check your email to confirm.')
    router.push('/login')
  }

  return (
    <>
      <Navbar />
      <main className="relative isolate pt-24 sm:pt-28 min-h-screen bg-gradient-to-b from-[#fbf8f0] via-[#f7f2e6] to-[#fbf8f0] dark:from-[#071b31] dark:via-[#09223e] dark:to-[#071b31] flex items-center justify-center px-4 sm:px-6 py-12 transition-colors duration-300">
        
        {/* Ambient Glow Orbs */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="pulse-glow absolute -left-20 top-20 h-80 w-80 rounded-full bg-[#168f8a]/10 dark:bg-[#168f8a]/15 blur-3xl" />
          <div className="pulse-glow absolute -right-20 bottom-20 h-80 w-80 rounded-full bg-[#d29a27]/12 dark:bg-[#d29a27]/15 blur-3xl" />
        </div>

        <div className="w-full max-w-[460px] relative z-10">
          
          {/* Logo & Welcome Header */}
          <div className="text-center mb-7 sm:mb-8">
            <Link href="/" className="inline-flex items-center gap-3 mb-4 group justify-center">
              <span className="relative h-12 w-12 rounded-2xl overflow-hidden border-2 border-[#d29a27] bg-white p-0.5 shadow-md shadow-[#d29a27]/20 group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/karya-saarthi-logo.jpg"
                  alt="Karya Saarthi Logo"
                  width={96}
                  height={96}
                  className="h-full w-full object-contain"
                  priority
                />
              </span>
              <div className="text-left">
                <span className="font-extrabold text-2xl text-[#102f53] dark:text-white tracking-tight block leading-tight" style={{ fontFamily: 'var(--font-epilogue)' }}>
                  KSHub
                </span>
                <span className="text-[9px] uppercase tracking-wider font-bold text-[#d29a27] dark:text-[#f5d778] font-mono block">
                  By Karya Saarthi
                </span>
              </div>
            </Link>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102f53] dark:text-white tracking-tight" style={{ fontFamily: 'var(--font-epilogue)' }}>
              Create your account
            </h1>
            <p className="text-xs sm:text-sm text-[#516273] dark:text-[#c2d1df] mt-1.5 font-medium" style={{ fontFamily: 'var(--font-manrope)' }}>
              Join 25,000+ researchers and students across India
            </p>
          </div>

          {/* Interactive Signup Card */}
          <div className="rounded-3xl border border-[#102f53]/10 dark:border-white/15 bg-white/95 dark:bg-[#0b2542]/95 backdrop-blur-xl shadow-[0_20px_55px_rgba(16,47,83,0.10)] dark:shadow-[0_25px_65px_rgba(0,0,0,0.5)] p-6 sm:p-8 transition-all duration-300">
            <form onSubmit={handleSignup} className="space-y-4 sm:space-y-5">
              
              {/* Full Name Input Field with Click / Focus Color Change */}
              <div>
                <label className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#102f53] dark:text-white mb-2" style={{ fontFamily: 'var(--font-manrope)' }}>
                  <span>Full Name</span>
                  {focusedField === 'name' && (
                    <span className="text-[10px] font-bold text-[#168f8a] dark:text-[#5ed2c2] animate-fade-in">
                      ● Active
                    </span>
                  )}
                </label>

                <div className="relative">
                  <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 pointer-events-none ${
                    focusedField === 'name' ? 'text-[#168f8a] dark:text-[#5ed2c2]' : 'text-[#87939c] dark:text-[#64748b]'
                  }`}>
                    <User className="w-4 h-4" />
                  </div>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter your full name"
                    required
                    className={`w-full pl-10 pr-4 py-3 sm:py-3.5 rounded-2xl border-2 text-xs sm:text-sm font-medium transition-all duration-200 outline-none ${
                      focusedField === 'name'
                        ? 'border-[#168f8a] bg-[#168f8a]/[0.03] dark:bg-[#168f8a]/10 ring-4 ring-[#168f8a]/20 dark:ring-[#5ed2c2]/20 text-[#102f53] dark:text-white shadow-sm'
                        : 'border-[#102f53]/12 dark:border-white/15 bg-white dark:bg-[#071b31]/60 text-[#102f53] dark:text-white hover:border-[#d29a27]/60'
                    }`}
                    style={{ fontFamily: 'var(--font-manrope)' }}
                  />
                </div>
              </div>

              {/* Email Input Field with Click / Focus Color Change */}
              <div>
                <label className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#102f53] dark:text-white mb-2" style={{ fontFamily: 'var(--font-manrope)' }}>
                  <span>Email Address</span>
                  {focusedField === 'email' && (
                    <span className="text-[10px] font-bold text-[#168f8a] dark:text-[#5ed2c2] animate-fade-in">
                      ● Active
                    </span>
                  )}
                </label>

                <div className="relative">
                  <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 pointer-events-none ${
                    focusedField === 'email' ? 'text-[#168f8a] dark:text-[#5ed2c2]' : 'text-[#87939c] dark:text-[#64748b]'
                  }`}>
                    <Mail className="w-4 h-4" />
                  </div>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="you@example.com"
                    required
                    className={`w-full pl-10 pr-4 py-3 sm:py-3.5 rounded-2xl border-2 text-xs sm:text-sm font-medium transition-all duration-200 outline-none ${
                      focusedField === 'email'
                        ? 'border-[#168f8a] bg-[#168f8a]/[0.03] dark:bg-[#168f8a]/10 ring-4 ring-[#168f8a]/20 dark:ring-[#5ed2c2]/20 text-[#102f53] dark:text-white shadow-sm'
                        : 'border-[#102f53]/12 dark:border-white/15 bg-white dark:bg-[#071b31]/60 text-[#102f53] dark:text-white hover:border-[#d29a27]/60'
                    }`}
                    style={{ fontFamily: 'var(--font-manrope)' }}
                  />
                </div>
              </div>

              {/* Password Input Field with Click / Focus Color Change */}
              <div>
                <label className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#102f53] dark:text-white mb-2" style={{ fontFamily: 'var(--font-manrope)' }}>
                  <span>Password</span>
                  {focusedField === 'password' && (
                    <span className="text-[10px] font-bold text-[#d29a27] dark:text-[#f5d778] animate-fade-in">
                      ● Active
                    </span>
                  )}
                </label>

                <div className="relative">
                  <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 pointer-events-none ${
                    focusedField === 'password' ? 'text-[#d29a27] dark:text-[#f5d778]' : 'text-[#87939c] dark:text-[#64748b]'
                  }`}>
                    <Lock className="w-4 h-4" />
                  </div>

                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Min. 6 characters"
                    required
                    className={`w-full pl-10 pr-12 py-3 sm:py-3.5 rounded-2xl border-2 text-xs sm:text-sm font-medium transition-all duration-200 outline-none ${
                      focusedField === 'password'
                        ? 'border-[#d29a27] bg-[#d29a27]/[0.03] dark:bg-[#d29a27]/10 ring-4 ring-[#d29a27]/20 dark:ring-[#f5d778]/20 text-[#102f53] dark:text-white shadow-sm'
                        : 'border-[#102f53]/12 dark:border-white/15 bg-white dark:bg-[#071b31]/60 text-[#102f53] dark:text-white hover:border-[#d29a27]/60'
                    }`}
                    style={{ fontFamily: 'var(--font-manrope)' }}
                  />

                  {/* Password Visibility Toggle Button */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-[#87939c] hover:text-[#168f8a] dark:hover:text-[#5ed2c2] active:scale-90 active:text-[#d29a27] transition-all cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button with Interactive Click & Hover Color Changes */}
              <button
                type="submit"
                disabled={loading}
                className="shine-sweep w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#102f53] via-[#0d2745] to-[#168f8a] hover:from-[#168f8a] hover:via-[#137a77] hover:to-[#102f53] active:from-[#081a2e] active:to-[#093c3a] active:scale-[0.98] active:ring-4 active:ring-[#d29a27]/30 text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#102f53]/20 hover:shadow-xl hover:shadow-[#168f8a]/30 transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                style={{ fontFamily: 'var(--font-manrope)' }}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Create Free Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Footer Navigation */}
            <div className="mt-6 pt-5 border-t border-[#102f53]/10 dark:border-white/10 text-center">
              <p className="text-xs sm:text-sm text-[#516273] dark:text-[#c2d1df] font-medium" style={{ fontFamily: 'var(--font-manrope)' }}>
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="font-bold text-[#d29a27] dark:text-[#f5d778] hover:text-[#168f8a] dark:hover:text-[#5ed2c2] active:underline transition-colors ml-1"
                >
                  Sign in here →
                </Link>
              </p>
            </div>

            {/* Security Badge */}
            <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-[#87939c] dark:text-[#9cb1c5]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#168f8a] dark:text-[#5ed2c2]" />
              <span>100% Free · Cancel anytime · Privacy Protected</span>
            </div>
          </div>

        </div>
      </main>
    </>
  )
}
