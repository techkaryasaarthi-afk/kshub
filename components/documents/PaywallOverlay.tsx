'use client'

import Link from 'next/link'
import { Crown, Lock } from 'lucide-react'

interface PaywallOverlayProps {
  documentId: string
}

export function PaywallOverlay({ documentId }: PaywallOverlayProps) {
  return (
    <div className="w-full max-w-[448px] mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 text-center">
      <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Lock className="w-7 h-7 text-amber-600" />
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2">
        Premium Content
      </h3>
      <p className="text-gray-500 text-sm mb-6 leading-relaxed">
        You've reached the free preview limit. Subscribe to Premium for unlimited access to all documents.
      </p>

      <div className="space-y-3">
        <Link
          href="/subscription"
          className="flex items-center justify-center gap-2 w-full py-3 px-6 bg-gradient-to-r from-[#1E7B85] to-[#00616a] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#1E7B85]/30 transition-all"
        >
          <Crown className="w-4 h-4 text-amber-300" />
          Upgrade to Premium — ₹199/mo
        </Link>

        <p className="text-xs text-gray-400">
          Cancel anytime. Secure payment via Razorpay.
        </p>
      </div>
    </div>
  )
}
