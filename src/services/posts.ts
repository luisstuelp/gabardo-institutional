import { supabase } from '@/integrations/supabase/client';
import { createServerSupabaseClient } from '@/integrations/supabase/server';
import { PostFormData } from '@/schemas/post';

export async function fetchPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function fetchPublishedPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

// Server-side function for public pages
export async function fetchPublishedPostsServer() {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function fetchPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) throw error;
  return data;
}

export async function fetchPostBySlugServer(slug: string) {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return data;
}

export async function createPost(post: PostFormData) {
  const { data: { user } } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from('posts')
    .insert([{
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt || null,
      cover_image: post.cover_image || null,
      published: post.published,
      author_id: user?.id,
    }])
    .select()
    .single();

  if (error) throw error;

  // Revalidate blog pages after creation
  if (post.published) {
    try {
      await fetch('/api/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: '/blog' }),
      });
    } catch (revalidateError) {
      console.warn('Failed to revalidate blog page:', revalidateError);
    }
  }

  return data;
}

export async function updatePost(id: string, post: PostFormData) {
  const { data, error } = await supabase
    .from('posts')
    .update(post)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  // Revalidate blog pages after update
  if (post.published) {
    try {
      await fetch('/api/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: '/blog' }),
      });
    } catch (revalidateError) {
      console.warn('Failed to revalidate blog page:', revalidateError);
    }
  }

  return data;
}

export async function deletePost(id: string) {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);

  if (error) throw error;

  // Revalidate blog pages after deletion
  try {
    await fetch('/api/revalidate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: '/blog' }),
    });
  } catch (revalidateError) {
    console.warn('Failed to revalidate blog page:', revalidateError);
    // Don't throw - deletion was successful even if revalidation failed
  }
}