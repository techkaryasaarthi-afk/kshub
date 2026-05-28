import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { verifyRazorpaySignature } from '@/lib/razorpay'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, user_id, plan } = body

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !user_id) {
    return NextResponse.json({ error: 'Missing payment verification fields' }, { status: 400 })
  }

  // Verify signature
  const isValid = verifyRazorpaySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature)
  if (!isValid) {
    return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 })
  }

  const supabase = await createAdminClient()

  // Deactivate old subscription
  await supabase
    .from('subscriptions')
    .update({ status: 'expired' })
    .eq('user_id', user_id)
    .eq('status', 'active')

  // Calculate end date based on plan
  let endDate = null
  if (plan === 'annual') {
    const d = new Date()
    d.setDate(d.getDate() + 365)
    endDate = d.toISOString()
  } else if (plan === 'single') {
    const d = new Date()
    d.setFullYear(d.getFullYear() + 99) // 99 years for lifetime access
    endDate = d.toISOString()
  } else {
    // Default to monthly (30 days)
    const d = new Date()
    d.setDate(d.getDate() + 30)
    endDate = d.toISOString()
  }

  // Create new premium subscription
  const { data, error } = await supabase
    .from('subscriptions')
    .insert({
      user_id,
      plan: 'premium',
      status: 'active',
      razorpay_order_id,
      razorpay_payment_id,
      start_date: new Date().toISOString(),
      end_date: endDate,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data, message: 'Subscription activated successfully' })
}
