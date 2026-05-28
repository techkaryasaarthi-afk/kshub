-- ============================================================
-- KSHUB SAAS PLATFORM — SUPABASE SQL MIGRATION (IDEMPOTENT)
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── PROFILES (extends auth.users) ───────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name   TEXT,
  avatar_url  TEXT,
  role        TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ─── CATEGORIES ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.categories (
  id    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name  TEXT NOT NULL UNIQUE,
  slug  TEXT NOT NULL UNIQUE,
  icon  TEXT DEFAULT '📄'
);

-- ─── DOCUMENTS ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.documents (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title        TEXT NOT NULL,
  description  TEXT,
  file_url     TEXT NOT NULL,
  thumb_url    TEXT,
  user_id      UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  category_id  UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  is_premium   BOOLEAN DEFAULT false,
  views        INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_documents_user_id ON public.documents(user_id);
CREATE INDEX IF NOT EXISTS idx_documents_category_id ON public.documents(category_id);
CREATE INDEX IF NOT EXISTS idx_documents_created_at ON public.documents(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_documents_views ON public.documents(views DESC);

-- ─── LIKES ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.likes (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id      UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  document_id  UUID NOT NULL REFERENCES public.documents(id) ON DELETE CASCADE,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, document_id)
);

-- ─── COMMENTS ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.comments (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id      UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  document_id  UUID NOT NULL REFERENCES public.documents(id) ON DELETE CASCADE,
  content      TEXT NOT NULL CHECK (char_length(content) BETWEEN 1 AND 2000),
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_comments_document_id ON public.comments(document_id);

-- ─── BOOKMARKS ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.bookmarks (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id      UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  document_id  UUID NOT NULL REFERENCES public.documents(id) ON DELETE CASCADE,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, document_id)
);

-- ─── SUBSCRIPTIONS ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id                   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id              UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  plan                 TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'premium')),
  status               TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled')),
  razorpay_order_id    TEXT,
  razorpay_payment_id  TEXT,
  start_date           TIMESTAMPTZ DEFAULT NOW(),
  end_date             TIMESTAMPTZ,
  created_at           TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions(user_id);

-- View count increment function
CREATE OR REPLACE FUNCTION public.increment_views(doc_id UUID)
RETURNS VOID AS $$
  UPDATE public.documents SET views = views + 1 WHERE id = doc_id;
$$ LANGUAGE sql SECURITY DEFINER;

-- ============================================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================================

ALTER TABLE public.profiles    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- PROFILES
DROP POLICY IF EXISTS "Profiles are publicly viewable" ON public.profiles;
CREATE POLICY "Profiles are publicly viewable" ON public.profiles
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- DOCUMENTS
DROP POLICY IF EXISTS "Published documents are publicly viewable" ON public.documents;
CREATE POLICY "Published documents are publicly viewable" ON public.documents
  FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Users can insert own documents" ON public.documents;
CREATE POLICY "Users can insert own documents" ON public.documents
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own documents" ON public.documents;
CREATE POLICY "Users can update own documents" ON public.documents
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own documents" ON public.documents;
CREATE POLICY "Users can delete own documents" ON public.documents
  FOR DELETE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can manage all documents" ON public.documents;
CREATE POLICY "Admins can manage all documents" ON public.documents
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- CATEGORIES (public read, admin write)
DROP POLICY IF EXISTS "Categories are publicly viewable" ON public.categories;
CREATE POLICY "Categories are publicly viewable" ON public.categories
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage categories" ON public.categories;
CREATE POLICY "Admins can manage categories" ON public.categories
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- LIKES
DROP POLICY IF EXISTS "Likes are publicly viewable" ON public.likes;
CREATE POLICY "Likes are publicly viewable" ON public.likes
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can like" ON public.likes;
CREATE POLICY "Authenticated users can like" ON public.likes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can remove own likes" ON public.likes;
CREATE POLICY "Users can remove own likes" ON public.likes
  FOR DELETE USING (auth.uid() = user_id);

-- COMMENTS
DROP POLICY IF EXISTS "Comments are publicly viewable" ON public.comments;
CREATE POLICY "Comments are publicly viewable" ON public.comments
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can comment" ON public.comments;
CREATE POLICY "Authenticated users can comment" ON public.comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own comments" ON public.comments;
CREATE POLICY "Users can delete own comments" ON public.comments
  FOR DELETE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can delete any comment" ON public.comments;
CREATE POLICY "Admins can delete any comment" ON public.comments
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- BOOKMARKS
DROP POLICY IF EXISTS "Users can view own bookmarks" ON public.bookmarks;
CREATE POLICY "Users can view own bookmarks" ON public.bookmarks
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can add bookmarks" ON public.bookmarks;
CREATE POLICY "Users can add bookmarks" ON public.bookmarks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can remove own bookmarks" ON public.bookmarks;
CREATE POLICY "Users can remove own bookmarks" ON public.bookmarks
  FOR DELETE USING (auth.uid() = user_id);

-- SUBSCRIPTIONS
DROP POLICY IF EXISTS "Users can view own subscription" ON public.subscriptions;
CREATE POLICY "Users can view own subscription" ON public.subscriptions
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Service role can manage subscriptions" ON public.subscriptions;
CREATE POLICY "Service role can manage subscriptions" ON public.subscriptions
  FOR ALL USING (true);

-- ============================================================
-- SEED DATA
-- ============================================================

INSERT INTO public.categories (name, slug, icon) VALUES
  ('Research Papers', 'research-papers', '📄'),
  ('SIP Reports', 'sip-reports', '📊'),
  ('Textbooks', 'textbooks', '📚'),
  ('Thesis & Dissertations', 'thesis-dissertations', '🎓'),
  ('Case Studies', 'case-studies', '📖'),
  ('Stories & Fiction', 'stories-fiction', '✍️'),
  ('Business Plans', 'business-plans', '📈'),
  ('Technical Docs', 'technical-docs', '🔬'),
  ('International Resources', 'international-resources', '🌍'),
  ('Exam Prep', 'exam-prep', '🎯'),
  ('Professional Guides', 'professional-guides', '💼'),
  ('Creative Works', 'creative-works', '🎨')
ON CONFLICT (slug) DO NOTHING;
