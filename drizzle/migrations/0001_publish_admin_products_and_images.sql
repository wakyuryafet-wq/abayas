ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS slug TEXT,
  ADD COLUMN IF NOT EXISTS sizes TEXT[] NOT NULL DEFAULT ARRAY['One size']::TEXT[],
  ADD COLUMN IF NOT EXISTS colours TEXT[] NOT NULL DEFAULT ARRAY['Default']::TEXT[],
  ADD COLUMN IF NOT EXISTS is_published BOOLEAN NOT NULL DEFAULT TRUE;

CREATE UNIQUE INDEX IF NOT EXISTS products_slug_unique
  ON public.products (slug)
  WHERE slug IS NOT NULL;

GRANT SELECT ON public.products TO anon;
CREATE POLICY "Public can view published products"
  ON public.products FOR SELECT TO anon
  USING (is_published = TRUE);

CREATE POLICY "Public can view product images"
  ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'product-images');

CREATE POLICY "Admin staff upload product images"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'product-images' AND public.has_admin_access(auth.uid()));

CREATE POLICY "Admin staff update product images"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'product-images' AND public.has_admin_access(auth.uid()))
  WITH CHECK (bucket_id = 'product-images' AND public.has_admin_access(auth.uid()));

CREATE POLICY "Admin staff delete product images"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'product-images' AND public.has_admin_access(auth.uid()));