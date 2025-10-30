import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://onklrkzaxfckgvdslrcd.supabase.co';
const SUPABASE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ua2xya3pheGZja2d2ZHNscmNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3NTIzODMsImV4cCI6MjA3NzMyODM4M30.9pFeoWgXAn3_3ESN0SELlRjVDTcnmtELbX1eoCda1DU';

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    persistSession: true,
    autoRefreshToken: true,
  },
});
