import { fetchPublishedPostsServer } from '@/services/posts';
import BlogIndex from '@/components/custom/BlogIndex';

// Revalidate this page every 60 seconds (ISR - Incremental Static Regeneration)
export const revalidate = 60;

type SupabasePost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  category: string | null;
  read_time: string | null;
  author: string | null;
  cover_image: string | null;
  tags: string[] | null;
  published: boolean | null;
  created_at: string | null;
  updated_at: string | null;
  author_id: string | null;
};

export default async function BlogPage() {
  const supabasePosts = await fetchPublishedPostsServer() as SupabasePost[];
  
  // Transform Supabase data to match BlogIndex expected format
  const transformedPosts = supabasePosts.map((post) => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt || '',
    content: [], // Content not needed for listing page, only for individual post
    category: post.category || 'Sem categoria',
    date: new Date(post.created_at || '').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
    readTime: post.read_time || '5 min',
    author: post.author || 'Equipe Gabardo',
    image: post.cover_image || '/images/default-blog.jpg',
    featured: false, // Can add logic later
    tags: post.tags || [],
    seo: {
      description: post.excerpt || '',
      keywords: post.tags || []
    }
  }));

  return <BlogIndex posts={transformedPosts} />;
}
