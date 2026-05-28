'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { useAuthStore } from '@/store/authStore'
import { Crown, Check, Shield, RefreshCcw, Headphones, Zap, ArrowRight, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import Link from 'next/link'

declare global {
  interface Window {
    Razorpay: any
  }
}

const SUBSCRIPTION_PLANS = [
  {
    id: 'single',
    name: 'Single Document',
    price: '₹99',
    period: 'one-time purchase',
    tagline: 'Permanent access to a single document',
    features: [
      'Download 1 document of your choice',
      'Lifetime document access',
      'Plagiarism report included',
      '30-day email support',
    ],
    cta: 'Buy Now',
    highlight: false,
    badge: null,
  },
  {
    id: 'monthly',
    name: 'Monthly Pass',
    price: '₹499',
    period: 'per month',
    tagline: 'Best for active students',
    features: [
      'Unlimited downloads',
      'All 12 content categories',
      'Priority customer support',
      'Ad-free experience',
      'Free monthly updates',
    ],
    cta: 'Subscribe Now',
    highlight: true,
    badge: '⭐ MOST POPULAR',
  },
  {
    id: 'annual',
    name: 'Annual Membership',
    price: '₹3,999',
    period: 'per year',
    tagline: 'Best value — 33% savings',
    features: [
      'Everything in Monthly Pass',
      'Premium & exclusive content',
      'VIP support channel',
      'Custom document requests',
      'Access to webinars',
      '40% off custom projects',
    ],
    cta: 'Subscribe Now',
    highlight: false,
    badge: '🔥 Best Value',
  },
  {
    id: 'corporate',
    name: 'Corporate License',
    price: 'Custom',
    period: 'volume pricing',
    tagline: 'For teams and institutions',
    features: [
      'Team-wide document access',
      'Dedicated account manager',
      'API + LMS integration',
      'Custom content sourcing',
      'Training & onboarding',
      'Invoice & GST billing',
    ],
    cta: 'Contact Sales',
    highlight: false,
    badge: null,
  },
]

export default function SubscriptionPage() {
  const { profile, isPremium } = useAuthStore()
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)

  const handleSubscribe = async (planId: 'single' | 'monthly' | 'annual') => {
    if (!profile) {
      toast.error('Please sign in first')
      return
    }

    setLoadingPlan(planId)
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
      const orderRes = await fetch('/api/subscription/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planId }),
      })
      const { order, error: orderError } = await orderRes.json()
      if (orderError || !order) throw new Error(orderError || 'Failed to create order')

      // Open Razorpay checkout
      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'KSHub Premium',
        description: `${planId.toUpperCase()} Plan Purchase`,
        order_id: order.id,
        prefill: {
          name: profile.full_name || '',
        },
        theme: { color: '#1D4ED8' },
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
              plan: planId,
            }),
          })

          const { error: verifyError } = await verifyRes.json()
          if (verifyError) throw new Error(verifyError)

          toast.success('🎉 Subscription activated successfully!')
          window.location.href = '/dashboard'
        },
        modal: {
          ondismiss: () => setLoadingPlan(null),
        },
      })

      rzp.open()
    } catch (err: any) {
      toast.error(err.message || 'Payment failed')
      setLoadingPlan(null)
    }
  }

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-[#F9FAFB]">
        <div className="max-w-[1280px] mx-auto px-6 py-16">
          {/* Header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 rounded-full text-[#1D4ED8] text-sm font-medium mb-4">
              <Crown className="w-4 h-4" /> Premium Membership
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
            <p className="text-gray-500 text-lg max-w-[576px] mx-auto">
              Get unlimited access to millions of documents, books, and research papers.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1200px] mx-auto mb-14">
            {SUBSCRIPTION_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-6 flex flex-col min-w-0 ${
                  plan.highlight
                    ? 'bg-gradient-to-b from-[#0F2C59] to-[#1D4ED8] text-white shadow-[0_24px_64px_rgba(29,78,216,0.3)]'
                    : 'bg-white shadow-[0_4px_24px_rgba(26,28,27,0.06)] border border-gray-100'
                }`}
              >
                {/* Badge chip */}
                {plan.badge && (
                  <div
                    className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap shadow-md ${
                      plan.highlight
                        ? 'bg-white text-[#0F2C59]'
                        : 'bg-[#1D4ED8] text-white'
                    }`}
                    style={{ fontFamily: 'var(--font-manrope)' }}
                  >
                    {plan.badge}
                  </div>
                )}

                {/* Plan name + price */}
                <div className="mb-6">
                  <h2
                    className={`text-xs font-bold mb-3 uppercase tracking-wider ${
                      plan.highlight ? 'text-[#93C5FD]' : 'text-[#6F797A]'
                    }`}
                    style={{ fontFamily: 'var(--font-manrope)' }}
                  >
                    {plan.name}
                  </h2>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span
                      className={`text-3xl font-extrabold ${
                        plan.highlight ? 'text-white' : 'text-[#1A1C1B]'
                      }`}
                      style={{ fontFamily: 'var(--font-epilogue)', letterSpacing: '-0.04em' }}
                    >
                      {plan.price}
                    </span>
                    <span
                      className={`text-xs font-medium ${
                        plan.highlight ? 'text-[#DBEAFE]' : 'text-[#6F797A]'
                      }`}
                      style={{ fontFamily: 'var(--font-manrope)' }}
                    >
                      {plan.period}
                    </span>
                  </div>
                  <p
                    className={`text-xs leading-relaxed ${
                      plan.highlight ? 'text-[#DBEAFE]/85' : 'text-[#6F797A]'
                    }`}
                    style={{ fontFamily: 'var(--font-manrope)' }}
                  >
                    {plan.tagline}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-xs leading-relaxed"
                      style={{ fontFamily: 'var(--font-manrope)' }}
                    >
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          plan.highlight ? 'bg-white/20' : 'bg-[#1D4ED8]/10'
                        }`}
                      >
                        <Check
                          className={`w-2.5 h-2.5 ${
                            plan.highlight ? 'text-white' : 'text-[#1D4ED8]'
                          }`}
                        />
                      </div>
                      <span
                        className={plan.highlight ? 'text-[#E9E8E6]' : 'text-[#3F484A]'}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Action button */}
                {plan.id === 'corporate' ? (
                  <a
                    href="mailto:operations@karyasaarthi.in?subject=KSHub Corporate License Inquiry"
                    className="w-full py-3 rounded-xl bg-[#1D4ED8] hover:bg-[#0F2C59] text-white text-xs font-bold text-center transition-all shadow-[0_4px_16px_rgba(29,78,216,0.2)]"
                  >
                    Contact Sales
                  </a>
                ) : isPremium && plan.id !== 'single' ? (
                  <div className="w-full py-3 rounded-xl bg-white/20 text-white text-xs font-semibold text-center border border-white/10">
                    ✓ Active Plan
                  </div>
                ) : (
                  <button
                    onClick={() => handleSubscribe(plan.id as any)}
                    disabled={loadingPlan !== null}
                    className={`w-full py-3 rounded-xl text-xs font-bold transition-all ${
                      plan.highlight
                        ? 'bg-white text-[#0F2C59] hover:shadow-xl'
                        : 'border border-[#1D4ED8] text-[#1D4ED8] hover:bg-[#1D4ED8]/5'
                    }`}
                  >
                    {loadingPlan === plan.id ? (
                      <span className="flex items-center justify-center gap-1">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" /> Processing...
                      </span>
                    ) : (
                      `${plan.cta} → ${plan.price}`
                    )}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-6 max-w-[512px] mx-auto text-center">
            {[
              { icon: Shield, label: 'Secure Payment', sub: 'Powered by Razorpay' },
              { icon: RefreshCcw, label: 'Cancel Anytime', sub: 'Sub-second cancellation' },
              { icon: Headphones, label: '24/7 Support', sub: 'VIP premium channels' },
            ].map((b) => (
              <div key={b.label} className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 bg-white rounded-xl border border-gray-100 flex items-center justify-center shadow-sm">
                  <b.icon className="w-5 h-5 text-[#1D4ED8]" />
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
