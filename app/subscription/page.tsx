'use client'

import { useState } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { useAuthStore } from '@/store/authStore'
import { Crown, Check, Shield, RefreshCcw, Headphones, Zap } from 'lucide-react'
import toast from 'react-hot-toast'
import Link from 'next/link'

declare global {
  interface Window {
    Razorpay: any
  }
}

const freeFeatures = [
  'Browse all documents',
  'Preview first 5 pages',
  'Like & comment',
  'Upload up to 3 documents/month',
  'Community access',
]

const premiumFeatures = [
  'Unlimited full document access',
  'Download PDFs anytime',
  'No paywall restrictions',
  'Unlimited uploads',
  'Priority customer support',
  'Ad-free experience',
  'Early access to new features',
]

export default function SubscriptionPage() {
  const { profile, isPremium } = useAuthStore()
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async () => {
    if (!profile) {
      toast.error('Please sign in first')
      return
    }
    if (isPremium) {
      toast.success("You're already a Premium member!")
      return
    }

    setLoading(true)
    try {
      // Load Razorpay script dynamically
      if (!window.Razorpay) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script')
          script.src = 'https://checkout.razorpay.com/v1/checkout.js'
          script.onload = () => resolve()
          script.onerror = reject
          document.body.appendChild(script)
        })
      }

      // Create order
      const orderRes = await fetch('/api/subscription/create-order', { method: 'POST' })
      const { order, error: orderError } = await orderRes.json()
      if (orderError || !order) throw new Error(orderError || 'Failed to create order')

      // Open Razorpay checkout
      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'KSHub Premium',
        description: '1 Month Premium Subscription',
        order_id: order.id,
        prefill: {
          name: profile.full_name || '',
        },
        theme: { color: '#1E7B85' },
        handler: async (response: any) => {
          // Verify payment
          const verifyRes = await fetch('/api/subscription/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              user_id: profile.id,
            }),
          })

          const { error: verifyError } = await verifyRes.json()
          if (verifyError) throw new Error(verifyError)

          toast.success('🎉 Welcome to Premium! Enjoy unlimited access.')
          window.location.reload()
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
      })

      rzp.open()
    } catch (err: any) {
      toast.error(err.message || 'Payment failed')
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-[#F9FAFB]">
        <div className="max-w-[1024px] mx-auto px-6 py-16">
          {/* Header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 rounded-full text-amber-700 text-sm font-medium mb-4">
              <Crown className="w-4 h-4" /> Premium Membership
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
            <p className="text-gray-500 text-lg max-w-[576px] mx-auto">
              Get unlimited access to millions of documents, books, and research papers.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-[768px] mx-auto mb-14">
            {/* Free */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-1">Free</h2>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-gray-900">₹0</span>
                <span className="text-gray-500 text-sm">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {freeFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                disabled
                className="w-full py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-500 cursor-default"
              >
                {isPremium ? 'Previous Plan' : 'Current Plan'}
              </button>
            </div>

            {/* Premium */}
            <div className="relative bg-gradient-to-b from-[#1E7B85] to-[#00414A] rounded-2xl p-8 text-white overflow-hidden">
              {/* Background glow */}
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-3xl" />

              <div className="flex items-center gap-2 mb-4">
                <Crown className="w-5 h-5 text-amber-300" />
                <span className="text-xs font-semibold text-amber-300 uppercase tracking-wide">Most Popular</span>
              </div>

              <h2 className="text-xl font-bold mb-1">Premium</h2>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold">₹199</span>
                <span className="text-white/60 text-sm">/month</span>
              </div>

              <ul className="space-y-3 mb-8">
                {premiumFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-white/90">
                    <Check className="w-4 h-4 text-amber-300 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              {isPremium ? (
                <div className="w-full py-3 rounded-xl bg-white/20 text-white text-sm font-semibold text-center">
                  ✓ Active Plan
                </div>
              ) : (
                <button
                  onClick={handleSubscribe}
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-white text-[#1E7B85] text-sm font-bold hover:shadow-xl transition-all disabled:opacity-70"
                >
                  {loading ? 'Processing...' : 'Subscribe Now → ₹199/mo'}
                </button>
              )}
            </div>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-6 max-w-[512px] mx-auto text-center">
            {[
              { icon: Shield, label: 'Secure Payment', sub: 'Powered by Razorpay' },
              { icon: RefreshCcw, label: 'Cancel Anytime', sub: 'No questions asked' },
              { icon: Headphones, label: '24/7 Support', sub: 'Premium members only' },
            ].map((b) => (
              <div key={b.label} className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 bg-white rounded-xl border border-gray-100 flex items-center justify-center shadow-sm">
                  <b.icon className="w-5 h-5 text-[#1E7B85]" />
                </div>
                <p className="text-xs font-semibold text-gray-900">{b.label}</p>
                <p className="text-xs text-gray-400">{b.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
