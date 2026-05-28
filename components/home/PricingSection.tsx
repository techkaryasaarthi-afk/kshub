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
    <section className="py-20 bg-[#F4F3F1]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="label-lg text-[#1D4ED8] mb-3">Pricing</p>
          <h2
            className="text-4xl lg:text-5xl font-extrabold text-[#1A1C1B] mb-4"
            style={{ fontFamily: 'var(--font-epilogue)', letterSpacing: '-0.04em' }}
          >
            Choose your plan
          </h2>
          <p
            className="text-lg text-[#3F484A] max-w-[480px] mx-auto"
            style={{ fontFamily: 'var(--font-manrope)' }}
          >
            Honest pricing with no hidden fees. Choose the option that fits your learning needs.
          </p>
        </div>

        {/* Cards — pt-6 gives room for the absolute badge chip */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1200px] mx-auto pt-6">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
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
                <h3
                  className={`text-xs font-bold mb-3 uppercase tracking-wider ${
                    plan.highlight ? 'text-[#93C5FD]' : 'text-[#6F797A]'
                  }`}
                  style={{ fontFamily: 'var(--font-manrope)' }}
                >
                  {plan.name}
                </h3>
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

              {/* CTA */}
              <Link
                href={isPremium && plan.name !== 'Single Document' && plan.name !== 'Corporate License' ? '/dashboard' : plan.ctaHref}
                className={`flex items-center justify-center gap-2 py-3 rounded-full text-xs font-bold transition-all ${
                  plan.highlight
                    ? 'bg-white text-[#0F2C59] hover:shadow-[0_8px_24px_rgba(255,255,255,0.2)] hover:-translate-y-0.5'
                    : plan.name === 'Single Document'
                    ? 'border border-[rgba(190,200,202,0.6)] text-[#3F484A] hover:border-[#1D4ED8] hover:text-[#1D4ED8]'
                    : 'bg-[#1D4ED8] text-white hover:bg-[#0F2C59] shadow-[0_4px_16px_rgba(29,78,216,0.2)]'
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
