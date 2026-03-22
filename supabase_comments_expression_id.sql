-- AE Expression Store: add per-expression comment threads (nullable = site-wide)
-- Run in Supabase Dashboard → SQL Editor. Adjust RLS to match your security model.

ALTER TABLE comments ADD COLUMN IF NOT EXISTS expression_id text;
CREATE INDEX IF NOT EXISTS comments_expression_id_idx ON comments (expression_id);

-- Example policies (replace if you already use different names)
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow anon read comments" ON comments;
DROP POLICY IF EXISTS "Allow anon insert comments" ON comments;

CREATE POLICY "Allow anon read comments"
  ON comments FOR SELECT TO anon USING (true);

CREATE POLICY "Allow anon insert comments"
  ON comments FOR INSERT TO anon WITH CHECK (true);
