import { supabase } from '@/integrations/supabase/client';
import { createServerSupabaseClient } from '@/integrations/supabase/server';
import { MidiaFormData } from '@/schemas/midia';

export async function fetchMidia() {
  const { data, error } = await supabase
    .from('midia')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

// Server-side function for public pages
export async function fetchMidiaServer() {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('midia')
    .select('*')
    .order('published_date', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function createMidia(midia: MidiaFormData) {
  const { data: { user } } = await supabase.auth.getUser();
  
  const { data, error } = await supabase
    .from('midia')
    .insert([{
      title: midia.title,
      source: midia.source,
      url: midia.url,
      description: midia.description || null,
      thumbnail: midia.thumbnail || null,
      published_date: midia.published_date?.toISOString().split('T')[0] || null,
      author_id: user?.id,
    }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateMidia(id: string, midia: MidiaFormData) {
  const { data, error } = await supabase
    .from('midia')
    .update({
      ...midia,
      published_date: midia.published_date?.toISOString().split('T')[0],
    })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function deleteMidia(id: string) {
  const { error } = await supabase
    .from('midia')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}