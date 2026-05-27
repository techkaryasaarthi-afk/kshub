import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = new URL(req.url)
  const document_id = searchParams.get('document_id')

  if (!document_id) return NextResponse.json({ error: 'document_id required' }, { status: 400 })

  const { data, error } = await supabase
    .from('comments')
    .select('*, profiles(id, full_name, avatar_url)')
    .eq('document_id', document_id)
    .order('created_at', { ascending: false })
    .limit(50)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { document_id, content } = await req.json()
  if (!document_id || !content?.trim()) {
    return NextResponse.json({ error: 'document_id and content required' }, { status: 400 })
  }
  if (content.length > 2000) {
    return NextResponse.json({ error: 'Comment too long (max 2000 chars)' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('comments')
    .insert({ user_id: user.id, document_id, content: content.trim() })
    .select('*, profiles(id, full_name, avatar_url)')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data }, { status: 201 })
}

export async function DELETE(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { comment_id } = await req.json()
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', comment_id)
    .eq('user_id', user.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
