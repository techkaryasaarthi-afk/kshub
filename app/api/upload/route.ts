import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
// Storage provider: swap the import below to switch between Supabase Storage and Cloudflare R2
// import { uploadToR2 as uploadFile } from '@/lib/r2'
import { uploadToSupabaseStorage as uploadFile } from '@/lib/supabase-storage'
import { generateFileKey } from '@/lib/utils'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate
    if (file.type !== 'application/pdf' || !file.name.toLowerCase().endsWith('.pdf')) {
      return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 })
    }
    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size must be less than 50MB' }, { status: 400 })
    }

    const fileKey = generateFileKey(user.id, file.name)
    const buffer = Buffer.from(await file.arrayBuffer())

    const publicUrl = await uploadFile(buffer, fileKey, 'application/pdf')

    return NextResponse.json({
      url: publicUrl,
      key: fileKey,
      name: file.name,
      size: file.size,
    })
  } catch (err: any) {
    console.error('Upload error:', err)
    return NextResponse.json(
      { error: err.message || 'Upload failed' },
      { status: 500 }
    )
  }
}
