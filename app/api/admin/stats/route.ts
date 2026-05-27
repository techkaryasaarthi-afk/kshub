import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient, createClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const adminClient = await createAdminClient()

  const [
    { count: userCount },
    { count: docCount },
    { count: premiumCount },
  ] = await Promise.all([
    adminClient.from('profiles').select('*', { count: 'exact', head: true }),
    adminClient.from('documents').select('*', { count: 'exact', head: true }),
    adminClient.from('subscriptions').select('*', { count: 'exact', head: true }).eq('plan', 'premium').eq('status', 'active'),
  ])

  return NextResponse.json({
    data: {
      users: userCount || 0,
      documents: docCount || 0,
      premiumSubscribers: premiumCount || 0,
    },
  })
}
