'use client'

import { Check, Crown, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useAuthStore } from '@/store/authStore'

const PLANS = [
  {
    name: 'Single Document',
    price: '₹99',
    period: 'per document',
    tagline: 'One document, permanent access',
    features: [
      'Download 1 document',
      'Lifetime access',
      'Plagiarism report included',
      '30-day email support',
    ],
    cta: 'Buy Now',
    ctaHref: '/subscription?plan=single',
    highlight: false,
    badge: null,
  },
  {
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
    ctaHref: '/subscription?plan=monthly',
    highlight: true,
    badge: '⭐ MOST POPULAR',
  },
  {
    name: 'Annual Membership',
    price: '₹3,999',
    period: 'per year',
    tagline: 'Best value — 33% savings',
    features: [
      'Everything in Monthly',
      'Premium & exclusive content',
      'VIP support channel',
      'Custom document requests',
      'Access to webinars',
      '40% off custom projects',
    ],
    cta: 'Subscribe Now',
    ctaHref: '/subscription?plan=annual',
    highlight: false,
    badge: '🔥 Best Value',
  },
  {
    name: 'Corporate License',
    price: 'Custom',
    period: 'volume pricing',
    tagline: '5–100 users for teams/institutions',
    features: [
      'Team-wide document access',
      'Dedicated account manager',
      'API + LMS integration',
      'Custom content sourcing',
      'Training & onboarding',
      'Invoice & GST billing',
    ],
    cta: 'Contact Sales',
    ctaHref: 'mailto:operations@karyasaarthi.in?subject=KSHub Corporate License Inquiry',
    highlight: false,
    badge: null,
  },
]

export function PricingSection() {
  const { isPremium } = useAuthStore()

  return (
    <section className="py-20 bg-[#fbf8f0]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="label-lg text-[#168f8a] mb-3">Simple, honest pricing</p>
          <h2
            className="text-4xl lg:text-5xl font-extrabold text-[#102f53] mb-4"
            style={{ fontFamily: 'var(--font-epilogue)', letterSpacing: '-0.04em' }}
          >
            Choose your plan
          </h2>
          <p
            className="text-lg text-[#516273] max-w-[480px] mx-auto"
            style={{ fontFamily: 'var(--font-manrope)' }}
          >
            Honest pricing with no hidden fees. Choose the option that fits your learning needs.
          </p>
        </div>

        {/* Cards — pt-6 gives room for the absolute badge chip */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1240px] mx-auto pt-8">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl p-7 flex flex-col min-w-0 transition-all duration-300 hover:-translate-y-2.5 ${
                plan.highlight
                  ? 'bg-gradient-to-br from-[#071b31] via-[#102f53] to-[#168f8a] text-white shadow-[0_28px_70px_rgba(16,47,83,0.35)] ring-2 ring-[#f5d778] hover:shadow-[0_36px_85px_rgba(210,154,39,0.35)]'
                  : 'bg-white shadow-[0_10px_32px_rgba(16,47,83,0.06)] border border-[#102f53]/[0.09] hover:border-[#d29a27]/60 hover:shadow-[0_20px_45px_rgba(16,47,83,0.14)]'
              }`}
            >
              {/* Badge chip */}
              {plan.badge && (
                <div
                  className={`shine-sweep absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider whitespace-nowrap shadow-xl ${
                    plan.highlight
                      ? 'bg-gradient-to-r from-[#f5d778] via-[#e5b84d] to-[#f0d488] text-[#102f53] ring-2 ring-[#f5d778]/50'
                      : 'bg-[#102f53] text-[#f5d778] border border-[#d29a27]/40'
                  }`}
                  style={{ fontFamily: 'var(--font-manrope)' }}
                >
                  {plan.badge}
                </div>
              )}

              {/* Plan name + price */}
              <div className="mb-6">
                <h3
                  className={`text-xs font-bold mb-3 uppercase tracking-wider ${
                    plan.highlight ? 'text-[#f5d778]' : 'text-[#168f8a]'
                  }`}
                  style={{ fontFamily: 'var(--font-manrope)' }}
                >
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1.5 mb-2">
                  <span
                    className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
                      plan.highlight ? 'text-white' : 'text-[#102f53]'
                    }`}
                    style={{ fontFamily: 'var(--font-epilogue)', letterSpacing: '-0.04em' }}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`text-xs font-medium ${
                      plan.highlight ? 'text-[#c2d1df]' : 'text-[#6F797A]'
                    }`}
                    style={{ fontFamily: 'var(--font-manrope)' }}
                  >
                    {plan.period}
                  </span>
                </div>
                <p
                  className={`text-xs leading-relaxed font-medium ${
                    plan.highlight ? 'text-[#c2d1df]' : 'text-[#6F797A]'
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
                        plan.highlight ? 'bg-[#f5d778]/25 text-[#f5d778]' : 'bg-[#168f8a]/10 text-[#168f8a]'
                      }`}
                    >
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span
                      className={`font-medium ${plan.highlight ? 'text-[#f1f5f9]' : 'text-[#3F484A]'}`}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={isPremium && plan.name !== 'Single Document' && plan.name !== 'Corporate License' ? '/dashboard' : plan.ctaHref}
                className={`shine-sweep flex items-center justify-center gap-2 py-3.5 px-4 rounded-full text-xs font-bold transition-all ${
                  plan.highlight
                    ? 'bg-gradient-to-r from-[#f5d778] via-[#e5b84d] to-[#f0d488] text-[#102f53] hover:shadow-xl hover:shadow-[#d29a27]/30 hover:-translate-y-0.5'
                    : plan.name === 'Single Document'
                    ? 'border-2 border-[#102f53]/15 text-[#102f53] hover:border-[#168f8a] hover:bg-[#168f8a]/5'
                    : 'bg-[#102f53] text-white hover:bg-[#168f8a] shadow-md hover:shadow-lg'
                }`}
                style={{ fontFamily: 'var(--font-manrope)' }}
              >
                {plan.name !== 'Single Document' && plan.name !== 'Corporate License' && <Crown className="w-3.5 h-3.5" />}
                {isPremium && plan.name !== 'Single Document' && plan.name !== 'Corporate License' ? 'Already Premium ✓' : plan.cta}
                {!isPremium && <ArrowRight className="w-3.5 h-3.5" />}
              </Link>
            </div>
          ))}
        </div>

        <p
          className="text-center text-sm text-[#6F797A] mt-10"
          style={{ fontFamily: 'var(--font-manrope)' }}
        >
          Secure payment gateway integrations. Cancel subscriptions anytime.
        </p>
      </div>
    </section>
  )
}
