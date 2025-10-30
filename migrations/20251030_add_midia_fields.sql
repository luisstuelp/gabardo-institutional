-- Migration: Add missing fields to midia table
-- Date: 2025-10-30
-- Description: Add category, read_time fields to midia table

BEGIN;

-- Add category column
ALTER TABLE public.midia 
ADD COLUMN IF NOT EXISTS category text;

-- Add read_time column
ALTER TABLE public.midia 
ADD COLUMN IF NOT EXISTS read_time text;

-- Create index on category for filtering
CREATE INDEX IF NOT EXISTS idx_midia_category 
ON public.midia(category);

COMMIT;
