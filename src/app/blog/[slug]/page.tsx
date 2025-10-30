import { notFound } from 'next/navigation';
import BlogPost from '@/components/custom/BlogPost';
import { fetchPostBySlugServer, fetchPublishedPostsServer } from '@/services/posts';
import type { BlogPostDetail, BlogContentBlock } from '@/types/blog';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Helper function to convert plain text to content blocks
function parseContent(content: string): BlogContentBlock[] {
  // Try to parse as JSON first
  if (content.trim().startsWith('[') || content.trim().startsWith('{')) {
    try {
      return JSON.parse(content);
    } catch {
      // If JSON parse fails, fall through to text parsing
    }
  }

  // Parse plain text into content blocks
  const blocks: BlogContentBlock[] = [];
  const paragraphs = content.split('\n\n').filter(p => p.trim());

  for (const para of paragraphs) {
    const trimmed = para.trim();
    
    // Check if it's a heading (all caps or starts with ##)
    if (trimmed === trimmed.toUpperCase() && trimmed.length < 100 && trimmed.length > 3) {
      blocks.push({
        type: 'heading',
        content: trimmed,
        level: 2,
      });
    }
    // Check if it starts with markdown heading
    else if (trimmed.startsWith('##')) {
      blocks.push({
        type: 'heading',
        content: trimmed.replace(/^#+\s*/, ''),
        level: 2,
      });
    }
    // Regular paragraph
    else {
      blocks.push({
        type: 'paragraph',
        content: trimmed,
      });
    }
  }

  return blocks;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  
  try {
    const supabasePost = await fetchPostBySlugServer(resolvedParams.slug);
    
    if (!supabasePost || !supabasePost.published) {
      notFound();
    }

    // Parse content - handles both JSON and plain text
    const contentBlocks = parseContent(supabasePost.content);

    // Transform Supabase data to BlogPostDetail
    const post: BlogPostDetail = {
      id: supabasePost.id,
      slug: supabasePost.slug,
      title: supabasePost.title,
      excerpt: supabasePost.excerpt || '',
      content: contentBlocks,
      category: supabasePost.category || 'Sem categoria',
      date: new Date(supabasePost.created_at || '').toLocaleDateString('pt-BR', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
      }),
      readTime: supabasePost.read_time || '5 min',
      author: supabasePost.author || 'Equipe Gabardo',
      image: supabasePost.cover_image || '/images/default-blog.jpg',
      featured: supabasePost.featured || false,
      tags: supabasePost.tags || [],
    };

    return <BlogPost post={post} />;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    notFound();
  }
}

export async function generateStaticParams() {
  try {
    const posts = await fetchPublishedPostsServer();
    return posts.map((post) => ({ slug: post.slug }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  
  try {
    const post = await fetchPostBySlugServer(resolvedParams.slug);
    
    if (!post) {
      return {
        title: 'Post não encontrado - Gabardo Transportes',
      };
    }

    return {
      title: `${post.title} - Gabardo Transportes Blog`,
      description: post.excerpt || post.seo_description || '',
      keywords: post.seo_keywords || post.tags || [],
      openGraph: {
        title: post.title,
        description: post.excerpt || post.seo_description || '',
        images: post.cover_image ? [post.cover_image] : [],
      },
    };
  } catch {
    return {
      title: 'Post não encontrado - Gabardo Transportes',
    };
  }
}