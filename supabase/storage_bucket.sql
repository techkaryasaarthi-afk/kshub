-- ============================================================
-- SUPABASE STORAGE — documents bucket
-- Run this in Supabase Dashboard → SQL Editor
-- Only needed if tables from migration.sql already exist.
-- ============================================================

-- Create the bucket (public = stable URLs without signing)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'documents',
  'documents',
  true,
  52428800,                    -- 50 MB
  ARRAY['application/pdf']
)
ON CONFLICT (id) DO NOTHING;

-- ── Storage RLS policies ──────────────────────────────────────

-- Anyone can read (download) PDFs from the public bucket
CREATE POLICY "Public read access for documents"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'documents');

-- Only authenticated users can upload their own files
-- File path must start with their user ID: {user_id}/filename.pdf
CREATE POLICY "Authenticated users can upload documents"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'documents'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- Users can delete only their own files
CREATE POLICY "Users can delete own documents"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'documents'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Admins can delete any file
CREATE POLICY "Admins can delete any document"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'documents'
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
