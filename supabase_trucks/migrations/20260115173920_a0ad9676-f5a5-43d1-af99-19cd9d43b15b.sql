-- Fix the overly permissive leads INSERT policy
-- Drop the current policy and create a more specific one
DROP POLICY IF EXISTS "Anyone can create leads" ON public.leads;

-- Create a more specific policy for leads insertion
-- This still allows unauthenticated users to create leads but requires valid data
CREATE POLICY "Allow lead creation with required fields" ON public.leads 
  FOR INSERT 
  WITH CHECK (
    name IS NOT NULL AND 
    name != '' AND 
    phone IS NOT NULL AND 
    phone != ''
  );