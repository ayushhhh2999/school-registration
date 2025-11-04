-- Create schools table
CREATE TABLE public.schools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  contact text NOT NULL,
  email_id text NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read schools (public directory)
CREATE POLICY "Anyone can view schools"
ON public.schools
FOR SELECT
TO public
USING (true);

-- Allow anyone to insert schools (public registration)
CREATE POLICY "Anyone can register schools"
ON public.schools
FOR INSERT
TO public
WITH CHECK (true);

-- Create storage bucket for school images
INSERT INTO storage.buckets (id, name, public)
VALUES ('school-images', 'school-images', true);

-- Allow public to read school images
CREATE POLICY "Public can view school images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'school-images');

-- Allow public to upload school images
CREATE POLICY "Public can upload school images"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'school-images');