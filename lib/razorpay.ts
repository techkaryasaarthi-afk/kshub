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

export async function createSubscriptionOrder(userId: string) {
  const rzp = getRazorpay()
  const order = await rzp.orders.create({
    amount: PREMIUM_PRICE_INR_PAISE,
    currency: 'INR',
    receipt: `sub_${userId}_${Date.now()}`,
    notes: {
      userId,
      plan: 'premium',
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
