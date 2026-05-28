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

export async function POST(req: NextRequest) {
  const user = await checkAdmin()
  if (!user) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { name, slug, icon } = await req.json()
  if (!name || !slug) {
    return NextResponse.json({ error: 'Name and slug are required' }, { status: 400 })
  }

  const supabase = await createAdminClient()
  const { data, error } = await supabase
    .from('categories')
    .insert({ name, slug, icon: icon || '📄' })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data, success: true })
}

export async function DELETE(req: NextRequest) {
  const user = await checkAdmin()
  if (!user) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id } = await req.json()
  if (!id) return NextResponse.json({ error: 'Category ID is required' }, { status: 400 })

  const supabase = await createAdminClient()
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
