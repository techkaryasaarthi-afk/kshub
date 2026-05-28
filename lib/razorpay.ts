import Razorpay from 'razorpay'
import crypto from 'crypto'

export const PREMIUM_PRICE_INR_PAISE = 19900 // ₹199 in paise

// Lazy factory — only instantiated at request time, not module load time
function getRazorpay() {
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  })
}

export async function createSubscriptionOrder(userId: string, plan: string) {
  const rzp = getRazorpay()
  let amount = 49900 // Default: monthly pass
  if (plan === 'single') amount = 9900
  else if (plan === 'annual') amount = 399900

  const order = await rzp.orders.create({
    amount,
    currency: 'INR',
    receipt: `sub_${userId}_${Date.now()}`,
    notes: {
      userId,
      plan,
    },
  })
  return order
}

export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  const body = `${orderId}|${paymentId}`
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
    .update(body)
    .digest('hex')
  return expectedSignature === signature
}
