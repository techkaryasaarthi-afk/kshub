import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { verifyRazorpaySignature } from '@/lib/razorpay'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, user_id } = body

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

  // Calculate end date (30 days from now)
  const endDate = new Date()
  endDate.setDate(endDate.getDate() + 30)

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
      end_date: endDate.toISOString(),
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data, message: 'Subscription activated successfully' })
}
