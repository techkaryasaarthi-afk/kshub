'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { BookOpen, Eye, EyeOff, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const supabase = createClient()
    const { data: { session }, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      toast.error(error.message)
      setLoading(false)
      return
    }

    // Fetch user profile to check role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session?.user?.id)
      .single()

    toast.success('Welcome back!')
    if (profile?.role === 'admin') {
      router.push('/admin')
    } else {
      router.push('/dashboard')
    }
    router.refresh()
  }

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-[#F9FAFB] flex items-center justify-center px-6">
        <div className="w-full max-w-[448px]">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-4 justify-center">
              <img src="/karyasaarthi.png" alt="Karya Saarthi Logo" className="h-10 w-auto object-contain" />
              <span className="font-display font-800 text-2xl text-[#0F2C59] tracking-tight" style={{ fontFamily: 'var(--font-epilogue)', fontWeight: 800, letterSpacing: '-0.04em' }}>
                KSHub
              </span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
            <p className="text-gray-500 text-sm mt-1">Sign in to your KSHub account</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/30 focus:border-[#1D4ED8] transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/30 focus:border-[#1D4ED8] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#1D4ED8] text-white font-semibold rounded-xl hover:bg-[#0F2C59] transition-all disabled:opacity-60 shadow-lg shadow-[#1D4ED8]/20"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Don't have an account?{' '}
              <Link href="/signup" className="text-[#1D4ED8] font-semibold hover:underline">
                Create one free
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
