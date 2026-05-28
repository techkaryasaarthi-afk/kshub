import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createSubscriptionOrder } from '@/lib/razorpay'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json().catch(() => ({}))
    const plan = body.plan || 'monthly'
    const order = await createSubscriptionOrder(user.id, plan)
    return NextResponse.json({ order })
  } catch (err: any) {
    console.error('Razorpay order error:', err)
    return NextResponse.json({ error: err.message || 'Failed to create order' }, { status: 500 })
  }
}
