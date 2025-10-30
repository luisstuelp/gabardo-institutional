import { notFound } from 'next/navigation';
import BlogPost from '@/components/custom/BlogPost';
import { fetchPostBySlugServer } from '@/services/posts';
// import { fetchPublishedPostsServer } from '@/services/posts'; // Temporarily unused
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

  // Parse plain text into structured content blocks
  const blocks: BlogContentBlock[] = [];
  const lines = content.split('\n').map(l => l.trim()).filter(l => l);
  
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    
    // Detect markdown headings (##, ###, etc.)
    if (line.startsWith('#')) {
      const level = line.match(/^#+/)?.[0].length || 2;
      const heading = line.replace(/^#+\s*/, '').trim();
      blocks.push({
        type: 'heading',
        content: heading,
        level: Math.min(level, 3) as 2 | 3,
      });
      i++;
      continue;
    }
    
    // Detect all-caps headings (minimum 4 chars, max 100 chars)
    if (line === line.toUpperCase() && 
        line.length >= 4 && 
        line.length < 100 && 
        /^[A-Z0-9À-Ú\s\-:()]+$/.test(line)) {
      blocks.push({
        type: 'heading',
        content: line,
        level: 2,
      });
      i++;
      continue;
    }
    
    // Detect bullet lists (lines starting with -, *, •)
    if (line.match(/^[-*•]\s/)) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].match(/^[-*•]\s/)) {
        listItems.push(lines[i].replace(/^[-*•]\s*/, '').trim());
        i++;
      }
      blocks.push({
        type: 'list',
        items: listItems,
      });
      continue;
    }
    
    // Detect numbered lists (lines starting with 1., 2., etc.)
    if (line.match(/^\d+\.\s/)) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].match(/^\d+\.\s/)) {
        listItems.push(lines[i].replace(/^\d+\.\s*/, '').trim());
        i++;
      }
      blocks.push({
        type: 'list',
        items: listItems,
        ordered: true,
      });
      continue;
    }
    
    // Detect blockquotes (lines starting with >)
    if (line.startsWith('>')) {
      blocks.push({
        type: 'quote',
        content: line.replace(/^>\s*/, '').trim(),
      });
      i++;
      continue;
    }
    
    // Regular paragraph - accumulate multiple lines until empty line or special marker
    let paragraph = line;
    i++;
    
    // Keep adding lines that are not special markers and not empty
    while (i < lines.length && 
           !lines[i].startsWith('#') && 
           !lines[i].match(/^[-*•]\s/) &&
           !lines[i].match(/^\d+\.\s/) &&
           !lines[i].startsWith('>') &&
           !(lines[i] === lines[i].toUpperCase() && 
             lines[i].length >= 4 && 
             lines[i].length < 100 &&
             /^[A-Z0-9À-Ú\s\-:()]+$/.test(lines[i]))) {
      paragraph += ' ' + lines[i];
      i++;
    }
    
    if (paragraph.trim()) {
      blocks.push({
        type: 'paragraph',
        content: paragraph.trim(),
      });
    }
  }

  return blocks.length > 0 ? blocks : [{ type: 'paragraph', content: content }];
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