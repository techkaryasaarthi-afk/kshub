import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('documents')
    .select(`
      *,
      profiles(id, full_name, avatar_url),
      categories(id, name, slug, icon),
      likes(count),
      comments(count)
    `)
    .eq('id', id)
    .eq('is_published', true)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: 'Document not found' }, { status: 404 })
  }

  // Increment view count (fire and forget)
  supabase.rpc('increment_views', { doc_id: id }).then(() => {})

  // Check if current user has liked/bookmarked
  let is_liked = false
  let is_bookmarked = false

  if (user) {
    const [{ data: likeData }, { data: bookmarkData }] = await Promise.all([
      supabase.from('likes').select('id').eq('user_id', user.id).eq('document_id', id).single(),
      supabase.from('bookmarks').select('id').eq('user_id', user.id).eq('document_id', id).single(),
    ])
    is_liked = !!likeData
    is_bookmarked = !!bookmarkData
  }

  return NextResponse.json({
    data: {
      ...data,
      likes_count: (data.likes as any)?.[0]?.count ?? 0,
      comments_count: (data.comments as any)?.[0]?.count ?? 0,
      is_liked,
      is_bookmarked,
    },
  })
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { error } = await supabase
    .from('documents')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id) // RLS enforces this, but explicit is safer

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
