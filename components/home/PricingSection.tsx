'use client'

import { Check, Crown, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useAuthStore } from '@/store/authStore'

const PLANS = [
  {
    name: 'Free',
    price: '₹0',
    period: 'forever',
    tagline: 'Get started with the basics',
    features: [
      'Browse all documents',
      'Preview first 5 pages',
      'Like & comment on docs',
      'Upload up to 3 docs/month',
      'Community access',
    ],
    cta: 'Get Started',
    ctaHref: '/signup',
    highlight: false,
    badge: null,
  },
  {
    name: 'Monthly',
    price: '₹199',
    period: '/30 days',
    tagline: 'Full access, cancel anytime',
    features: [
      'Unlimited document access',
      'Download any PDF',
      'No paywall restrictions',
      'Unlimited uploads',
      'Ad-free experience',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    ctaHref: '/subscription',
    highlight: true,
    badge: '⭐ Most Popular',
  },
  {
    name: 'Annual',
    price: '₹1,499',
    period: '/year',
    tagline: 'Best value — save 37%',
    features: [
      'Everything in Monthly',
      'Save ₹889 vs monthly',
      'Early access to new features',
      'Dedicated account manager',
      'Team sharing (up to 3 users)',
      'Analytics dashboard',
    ],
    cta: 'Get Annual Plan',
    ctaHref: '/subscription',
    highlight: false,
    badge: '🔥 Best Value',
  },
]

export function PricingSection() {
  const { isPremium } = useAuthStore()

  return (
    <section className="py-20 bg-[#F4F3F1]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="label-lg text-[#00616A] mb-3">Pricing</p>
          <h2
            className="text-4xl lg:text-5xl font-extrabold text-[#1A1C1B] mb-4"
            style={{ fontFamily: 'var(--font-epilogue)', letterSpacing: '-0.04em' }}
          >
            Choose your plan
          </h2>
          <p
            className="text-lg text-[#3F484A] max-w-[420px] mx-auto"
            style={{ fontFamily: 'var(--font-manrope)' }}
          >
            Start free, upgrade when you're ready. No credit card required.
          </p>
        </div>

        {/* Cards — pt-6 gives room for the absolute badge chip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[960px] mx-auto pt-6">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 flex flex-col min-w-0 ${
                plan.highlight
                  ? 'bg-gradient-to-b from-[#00484E] to-[#00616A] text-white shadow-[0_24px_64px_rgba(0,97,106,0.3)]'
                  : 'bg-white shadow-[0_4px_24px_rgba(26,28,27,0.06)]'
              }`}
            >
              {/* Badge chip */}
              {plan.badge && (
                <div
                  className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap shadow-md ${
                    plan.highlight
                      ? 'bg-white text-[#00484E]'
                      : 'bg-[#00616A] text-white'
                  }`}
                  style={{ fontFamily: 'var(--font-manrope)' }}
                >
                  {plan.badge}
                </div>
              )}

              {/* Plan name + price */}
              <div className="mb-6">
                <h3
                  className={`text-sm font-bold mb-3 uppercase tracking-wide ${
                    plan.highlight ? 'text-[#A5EEF9]' : 'text-[#6F797A]'
                  }`}
                  style={{ fontFamily: 'var(--font-manrope)' }}
                >
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span
                    className={`text-4xl font-extrabold ${
                      plan.highlight ? 'text-white' : 'text-[#1A1C1B]'
                    }`}
                    style={{ fontFamily: 'var(--font-epilogue)', letterSpacing: '-0.04em' }}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      plan.highlight ? 'text-[#89D2DC]' : 'text-[#6F797A]'
                    }`}
                    style={{ fontFamily: 'var(--font-manrope)' }}
                  >
                    {plan.period}
                  </span>
                </div>
                <p
                  className={`text-sm ${
                    plan.highlight ? 'text-[#CBE8EC]' : 'text-[#6F797A]'
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
                    className="flex items-start gap-2.5 text-sm"
                    style={{ fontFamily: 'var(--font-manrope)' }}
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-px ${
                        plan.highlight ? 'bg-white/20' : 'bg-[#00616A]/10'
                      }`}
                    >
                      <Check
                        className={`w-3 h-3 ${
                          plan.highlight ? 'text-white' : 'text-[#00616A]'
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

              {/* CTA */}
              <Link
                href={isPremium && plan.name !== 'Free' ? '/dashboard' : plan.ctaHref}
                className={`flex items-center justify-center gap-2 py-3 rounded-full text-sm font-bold transition-all ${
                  plan.highlight
                    ? 'bg-white text-[#00484E] hover:shadow-[0_8px_24px_rgba(255,255,255,0.2)] hover:-translate-y-0.5'
                    : plan.name === 'Free'
                    ? 'border border-[rgba(190,200,202,0.6)] text-[#3F484A] hover:border-[#00616A] hover:text-[#00616A]'
                    : 'bg-[#00616A] text-white hover:bg-[#00484E] shadow-[0_4px_16px_rgba(0,97,106,0.2)]'
                }`}
                style={{ fontFamily: 'var(--font-manrope)' }}
              >
                {plan.name !== 'Free' && <Crown className="w-3.5 h-3.5" />}
                {isPremium && plan.name !== 'Free' ? 'Already Premium ✓' : plan.cta}
                {!isPremium && <ArrowRight className="w-3.5 h-3.5" />}
              </Link>
            </div>
          ))}
        </div>

        <p
          className="text-center text-sm text-[#6F797A] mt-10"
          style={{ fontFamily: 'var(--font-manrope)' }}
        >
          All plans include a 7-day free trial. Cancel anytime. Secure payment via Razorpay.
        </p>
      </div>
    </section>
  )
}
