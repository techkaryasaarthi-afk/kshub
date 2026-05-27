import { createClient } from '@supabase/supabase-js'

// Service-role client for server-side storage operations (bypasses RLS)
function getStorageClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

const BUCKET = process.env.SUPABASE_STORAGE_BUCKET || 'documents'

/**
 * Upload a PDF buffer to Supabase Storage.
 * Returns the public URL of the uploaded file.
 */
export async function uploadToSupabaseStorage(
  file: Buffer,
  key: string,
  contentType: string
): Promise<string> {
  const supabase = getStorageClient()

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(key, file, {
      contentType,
      cacheControl: '31536000', // 1 year
      upsert: false,
    })

  if (error) {
    throw new Error(`Supabase Storage upload failed: ${error.message}`)
  }

  return getSupabasePublicUrl(key)
}

/**
 * Delete a file from Supabase Storage by its key.
 */
export async function deleteFromSupabaseStorage(key: string): Promise<void> {
  const supabase = getStorageClient()

  const { error } = await supabase.storage.from(BUCKET).remove([key])

  if (error) {
    throw new Error(`Supabase Storage delete failed: ${error.message}`)
  }
}

/**
 * Get the public URL of a file stored in Supabase Storage.
 * Requires the bucket to be set to public in Supabase dashboard.
 */
export function getSupabasePublicUrl(key: string): string {
  const supabase = getStorageClient()
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(key)
  return data.publicUrl
}

/**
 * Generate a signed (temporary) URL for private-bucket access.
 * expiresIn is in seconds (default 1 hour).
 */
export async function getSupabaseSignedUrl(
  key: string,
  expiresIn = 3600
): Promise<string> {
  const supabase = getStorageClient()

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(key, expiresIn)

  if (error || !data?.signedUrl) {
    throw new Error(`Supabase Storage signed URL failed: ${error?.message}`)
  }

  return data.signedUrl
}
