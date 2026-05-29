import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient, createClient } from '@/lib/supabase/server'

async function checkAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') return null
  return user
}

export async function GET(req: NextRequest) {
  const user = await checkAdmin()
  if (!user) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const supabase = await createAdminClient()
  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get('page') || '1')
  const pageSize = 20
  const from = (page - 1) * pageSize

  const { data, count, error } = await supabase
    .from('profiles')
    .select('*, subscriptions(plan, status)', { count: 'exact' })
    .range(from, from + pageSize - 1)
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data, count })
}

export async function DELETE(req: NextRequest) {
  const user = await checkAdmin()
  if (!user) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { user_id } = await req.json()
  const supabase = await createAdminClient()

  const { error } = await supabase.auth.admin.deleteUser(user_id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}

export async function PATCH(req: NextRequest) {
  const user = await checkAdmin()
  if (!user) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { user_id, role, premium_action } = await req.json()
  const supabase = await createAdminClient()

  if (premium_action) {
    if (premium_action === 'grant') {
      const { data: existingSub } = await supabase
        .from('subscriptions')
        .select('id')
        .eq('user_id', user_id)
        .maybeSingle()

      if (existingSub) {
        const { error } = await supabase
          .from('subscriptions')
          .update({
            plan: 'premium',
            status: 'active',
            end_date: null
          })
          .eq('id', existingSub.id)
        if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      } else {
        const { error } = await supabase
          .from('subscriptions')
          .insert({
            user_id,
            plan: 'premium',
            status: 'active',
            end_date: null
          })
        if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      }
      return NextResponse.json({ success: true })
    } else if (premium_action === 'revoke') {
      const { error } = await supabase
        .from('subscriptions')
        .update({
          plan: 'free',
          status: 'expired',
          end_date: new Date().toISOString()
        })
        .eq('user_id', user_id)

      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      return NextResponse.json({ success: true })
    }
  }

  if (role) {
    const { error } = await supabase
      .from('profiles')
      .update({ role })
      .eq('id', user_id)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ error: 'Invalid parameters provided' }, { status: 400 })
}
