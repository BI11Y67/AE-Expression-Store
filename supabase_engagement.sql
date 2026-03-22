-- Likes and views per expression (optional — site falls back to browser storage if tables are missing)
-- Run in Supabase SQL Editor after comments migration.

CREATE TABLE IF NOT EXISTS expression_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  expression_id TEXT NOT NULL,
  visitor_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (expression_id, visitor_id)
);

CREATE INDEX IF NOT EXISTS idx_expression_likes_expr ON expression_likes (expression_id);

CREATE TABLE IF NOT EXISTS expression_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  expression_id TEXT NOT NULL,
  visitor_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (expression_id, visitor_id)
);

CREATE INDEX IF NOT EXISTS idx_expression_views_expr ON expression_views (expression_id);

ALTER TABLE expression_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE expression_views ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "expression_likes_select" ON expression_likes;
DROP POLICY IF EXISTS "expression_likes_insert" ON expression_likes;
DROP POLICY IF EXISTS "expression_likes_delete" ON expression_likes;
DROP POLICY IF EXISTS "expression_views_select" ON expression_views;
DROP POLICY IF EXISTS "expression_views_insert" ON expression_views;

CREATE POLICY "expression_likes_select" ON expression_likes FOR SELECT TO anon USING (true);
CREATE POLICY "expression_likes_insert" ON expression_likes FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "expression_likes_delete" ON expression_likes FOR DELETE TO anon USING (true);

CREATE POLICY "expression_views_select" ON expression_views FOR SELECT TO anon USING (true);
CREATE POLICY "expression_views_insert" ON expression_views FOR INSERT TO anon WITH CHECK (true);
