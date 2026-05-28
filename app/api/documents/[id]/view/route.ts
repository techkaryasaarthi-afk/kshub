import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // 1. Fetch document metadata
  const { data: document, error } = await supabase
    .from('documents')
    .select('file_url, is_premium')
    .eq('id', id)
    .single()

  if (error || !document) {
    return NextResponse.json({ error: 'Document not found' }, { status: 404 })
  }

  // 2. Enforce Access Control (OWASP Broken Access Control prevention)
  if (document.is_premium) {
    if (!user) {
      return NextResponse.json({ error: 'Authentication required to access premium content' }, { status: 401 })
    }

    // Check if user has premium subscription
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('status')
      .eq('user_id', user.id)
      .eq('plan', 'premium')
      .eq('status', 'active')
      .maybeSingle()

    if (!subscription) {
      return NextResponse.json({ error: 'Premium subscription required' }, { status: 403 })
    }
  }

  // 3. Fetch from storage on server and stream to client
  try {
    const fileResponse = await fetch(document.file_url)
    if (!fileResponse.ok) {
      throw new Error('Storage file fetch failed')
    }

    const arrayBuffer = await fileResponse.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Return the file content with secure, non-sniffable headers
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline',
        'Cache-Control': 'no-store, max-age=0', // Prevent caching sensitive premium document content
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch (err) {
    console.error('Error streaming document:', err)
    return NextResponse.json({ error: 'Failed to retrieve document binary data' }, { status: 500 })
  }
}
