-- Migration: Add missing fields to posts table
-- Date: 2025-10-30
-- Description: Add featured, category, tags, author, read_time, seo_description, seo_keywords

BEGIN;

-- Add featured column (boolean for highlighting posts)
ALTER TABLE public.posts 
ADD COLUMN IF NOT EXISTS featured boolean DEFAULT false;

-- Add category column
ALTER TABLE public.posts 
ADD COLUMN IF NOT EXISTS category text;

-- Add tags column (array of text)
ALTER TABLE public.posts 
ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}';

-- Add author column
ALTER TABLE public.posts 
ADD COLUMN IF NOT EXISTS author text;

-- Add read_time column
ALTER TABLE public.posts 
ADD COLUMN IF NOT EXISTS read_time text;

-- Add SEO description
ALTER TABLE public.posts 
ADD COLUMN IF NOT EXISTS seo_description text;

-- Add SEO keywords (array of text)
ALTER TABLE public.posts 
ADD COLUMN IF NOT EXISTS seo_keywords text[] DEFAULT '{}';

-- Create index on featured posts for faster queries
CREATE INDEX IF NOT EXISTS idx_posts_featured 
ON public.posts(featured) WHERE featured = true;

-- Create index on category for filtering
CREATE INDEX IF NOT EXISTS idx_posts_category 
ON public.posts(category);

-- Create index on tags for searching
CREATE INDEX IF NOT EXISTS idx_posts_tags 
ON public.posts USING GIN(tags);

COMMIT;
