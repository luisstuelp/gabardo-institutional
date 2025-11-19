import { notFound } from 'next/navigation';
import BlogPost from '@/components/custom/BlogPost';
import { fetchPostBySlugServer } from '@/services/posts';
// import { fetchPublishedPostsServer } from '@/services/posts'; // Temporarily unused
import type { BlogPostDetail, BlogContentBlock } from '@/types/blog';
import { parseBlogContent } from '@/utils/blogContent';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  
  try {
    const supabasePost = await fetchPostBySlugServer(resolvedParams.slug);
    
    if (!supabasePost || !supabasePost.published) {
      notFound();
    }

    // Parse content - handles legacy markdown, JSON blocks, and Lexical state
    const rawContentBlocks = parseBlogContent(supabasePost.content);

    const LEGACY_BNDES_REGEX = /<style|class="blog-container"|<!--\s*LEGACY_BNDES_LAYOUT\s*-->/i;
    const looksLikeLegacyHtml = typeof supabasePost.content === 'string' && LEGACY_BNDES_REGEX.test(supabasePost.content);
    const isBndesLegacy = supabasePost.slug === 'bndes-gabardo' && looksLikeLegacyHtml;

    let contentBlocks: BlogContentBlock[] = isBndesLegacy
      ? [
          {
            type: 'html',
            content: supabasePost.content ?? '',
          },
        ]
      : rawContentBlocks;

    contentBlocks = contentBlocks.map((block) => {
      if (
        block.type === 'video' &&
        !block.linkUrl &&
        supabasePost.slug === 'bndes-gabardo'
      ) {
        return {
          ...block,
          linkLabel: 'Certificado de Verificação de Carbono',
          linkUrl: 'https://drive.google.com/file/d/1J4ItTI0_6yYVohR_V8UwPqOcxCw62Ay_/view',
        } satisfies BlogContentBlock;
      }
      return block;
    });

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

// Temporarily disabled to allow build without Supabase keys
// Enable this after configuring environment variables in Vercel
export const dynamic = 'force-dynamic';

// export async function generateStaticParams() {
//   try {
//     const posts = await fetchPublishedPostsServer();
//     return posts.map((post) => ({ slug: post.slug }));
//   } catch (error) {
//     console.error('Error generating static params:', error);
//     return [];
//   }
// }

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