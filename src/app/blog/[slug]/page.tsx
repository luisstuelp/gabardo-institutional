import { notFound } from 'next/navigation';
import BlogPost from '@/components/custom/BlogPost';
import { fetchPostBySlugServer } from '@/services/posts';
// import { fetchPublishedPostsServer } from '@/services/posts'; // Temporarily unused
import type { BlogPostDetail, BlogContentBlock } from '@/types/blog';
import { parseBlogContent } from '@/utils/blogContent';

const BNDES_CANONICAL_BLOCKS: BlogContentBlock[] = [
  {
    type: 'paragraph',
    content:
      '2024 exigiu resiliência máxima da Gabardo. Após as enchentes de maio, reorganizamos operações, cuidamos das pessoas e mantivemos clientes informados enquanto buscávamos formas de acelerar a retomada com responsabilidade.',
  },
  {
    type: 'video',
    content: '/images/WhatsApp Video 2025-11-18 at 10.37.18 (1).mp4',
    caption: 'Vídeo institucional sobre a parceria BNDES Gabardo',
    autoplay: true,
    loop: true,
    muted: true,
    controls: true,
    linkLabel: 'Certificado de Verificação de Carbono',
    linkUrl: 'https://drive.google.com/file/d/1J4ItTI0_6yYVohR_V8UwPqOcxCw62Ay_/view',
  },
  {
    type: 'heading',
    content: 'BNDES como catalisador da retomada',
    level: 2,
  },
  {
    type: 'paragraph',
    content:
      'A parceria com o BNDES foi decisiva para garantir liquidez e planejar investimentos de longo prazo. As linhas de crédito habilitaram modernização de frota, reforço da infraestrutura logística e aceleração de programas de sustentabilidade.',
  },
  {
    type: 'list',
    content: 'Investimentos prioritários viabilizados pelo BNDES:',
    items: [
      'Reforço dos centros logísticos estratégicos no Sul e Sudeste',
      'Renovação de frota com foco em padrões Euro 6 e eficiência energética',
      'Ampliação de tecnologias embarcadas para monitoramento em tempo real',
      'Expansão de painéis fotovoltaicos nas unidades operacionais',
    ],
  },
  {
    type: 'heading',
    content: 'Operar com responsabilidade é inegociável',
    level: 2,
  },
  {
    type: 'paragraph',
    content:
      'Seguimos transportando com segurança e responsabilidade ambiental. Como a primeira transportadora do mundo certificada como Carbono Negativo, consolidamos medições alinhadas ao GHG Protocol, ampliamos o uso de energia fotovoltaica e fortalecemos o programa Carbono Negativo Gabardo para compensação de emissões residuais.',
  },
  {
    type: 'quote',
    content:
      'A crise testou nossa estrutura, mas reforçou a convicção de que inovação, gestão de risco e sustentabilidade caminham juntas na Gabardo.',
    author: 'Diretoria Gabardo',
  },
  {
    type: 'heading',
    content: 'Próximos passos para 2026',
    level: 2,
  },
  {
    type: 'list',
    content: 'Focos estratégicos definidos após a parceria:',
    items: [
      'Dobrar a capacidade de armazenagem integrada com monitoramento inteligente',
      'Expandir a cobertura da malha sustentável no Nordeste',
      'Intensificar treinamentos de segurança viária e ESG para toda a equipe',
      'Compartilhar indicadores de carbono com clientes em tempo real',
    ],
  },
  {
    type: 'highlight',
    content:
      'Com apoio do BNDES, transformamos um período adverso em plataforma de crescimento sustentável, reforçando nosso compromisso de transportar com coragem, inovação e respeito ao meio ambiente.',
  },
];

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

    if (supabasePost.slug === 'bndes-gabardo') {
      const looksLikeLexicalJson = (value: string): boolean => {
        const normalized = value.trim();
        return normalized.startsWith('{"root"') || normalized.startsWith('{ "root"');
      };

      contentBlocks = contentBlocks.filter((block) => {
        if (block.type !== 'paragraph') {
          return true;
        }
        return !looksLikeLexicalJson(block.content);
      });

      const hasVideo = contentBlocks.some((block) => block.type === 'video');

      if (!hasVideo) {
        const videoBlock: BlogContentBlock = {
          type: 'video',
          content: '/images/WhatsApp Video 2025-11-18 at 10.37.18 (1).mp4',
          caption: 'Vídeo institucional sobre a parceria BNDES Gabardo',
          autoplay: true,
          loop: true,
          muted: true,
          controls: true,
          linkLabel: 'Certificado de Verificação de Carbono',
          linkUrl: 'https://drive.google.com/file/d/1J4ItTI0_6yYVohR_V8UwPqOcxCw62Ay_/view',
        } satisfies BlogContentBlock;

        const firstHeadingIndex = contentBlocks.findIndex((block) => block.type === 'heading');
        if (firstHeadingIndex > 0) {
          contentBlocks = [
            ...contentBlocks.slice(0, firstHeadingIndex),
            videoBlock,
            ...contentBlocks.slice(firstHeadingIndex),
          ];
        } else {
          contentBlocks = [videoBlock, ...contentBlocks];
        }
      }

      const hasHeading = contentBlocks.some((block) => block.type === 'heading');
      const hasHighlight = contentBlocks.some((block) => block.type === 'highlight');
      const looksCorrupted = contentBlocks.length === 0 || !hasHeading || !hasVideo;

      if (looksCorrupted) {
        contentBlocks = BNDES_CANONICAL_BLOCKS;
      } else if (!hasHighlight) {
        contentBlocks = [...contentBlocks, BNDES_CANONICAL_BLOCKS[BNDES_CANONICAL_BLOCKS.length - 1]];
      }
    }

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