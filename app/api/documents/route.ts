import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { CATEGORIES } from '@/lib/utils'

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = new URL(req.url)

  const q = searchParams.get('q') || ''
  const category = searchParams.get('category') || ''
  const premium = searchParams.get('premium')
  const sort = searchParams.get('sort') || 'newest'
  const page = parseInt(searchParams.get('page') || '1')
  const pageSize = parseInt(searchParams.get('pageSize') || '12')
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  let query = supabase
    .from('documents')
    .select(`
      *,
      profiles(id, full_name, avatar_url),
      categories(id, name, slug, icon)
    `, { count: 'exact' })
    .eq('is_published', true)
    .range(from, to)

  if (q) {
    query = query.or(`title.ilike.%${q}%,description.ilike.%${q}%`)
  }

  if (category) {
    // Join by category slug
    const { data: cat } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', category)
      .single()
    if (cat) query = query.eq('category_id', cat.id)
  }

  if (premium === 'true') query = query.eq('is_premium', true)
  if (premium === 'false') query = query.eq('is_premium', false)

  if (sort === 'views') query = query.order('views', { ascending: false })
  else if (sort === 'likes') query = query.order('created_at', { ascending: false }) // approximation
  else query = query.order('created_at', { ascending: false })

  const { data, count, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({
    data,
    count,
    page,
    pageSize,
    totalPages: Math.ceil((count || 0) / pageSize),
  })
}

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  const isAdmin = profile?.role === 'admin'

  const body = await req.json()
  const { title, description, file_url, thumb_url, category_id, is_premium } = body

  if (!title || !file_url) {
    return NextResponse.json({ error: 'Title and file_url are required' }, { status: 400 })
  }

  let realCategoryId = null
  if (category_id) {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(category_id)
    if (isUuid) {
      realCategoryId = category_id
    } else {
      const staticCat = CATEGORIES.find(c => c.id === category_id)
      if (staticCat) {
        const { data: dbCat } = await supabase
          .from('categories')
          .select('id')
          .eq('slug', staticCat.slug)
          .single()
        if (dbCat) {
          realCategoryId = dbCat.id
        }
      }
    }
  }

  const { data, error } = await supabase
    .from('documents')
    .insert({
      title,
      description,
      file_url,
      thumb_url,
      user_id: user.id,
      category_id: realCategoryId,
      is_premium: is_premium || false,
      is_published: isAdmin,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data }, { status: 201 })
}
