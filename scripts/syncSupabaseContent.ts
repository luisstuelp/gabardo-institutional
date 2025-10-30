import { config } from 'dotenv';
import { resolve } from 'path';

// Load .env.local explicitly
config({ path: resolve(__dirname, '../.env.local') });

import { createClient } from '@supabase/supabase-js';

import { blogPosts } from '@/data/blogData';
import { mediaArticles } from '@/data/mediaArticles';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable.');
}

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable.');
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

async function seedPosts() {
  console.log('Sincronizando posts do blog...');

  for (const post of blogPosts) {
    const { error } = await supabase
      .from('posts')
      .upsert(
        {
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          content: JSON.stringify(post.content),
          category: post.category,
          read_time: post.readTime,
          author: post.author,
          cover_image: post.image,
          tags: post.tags,
          published: true,
          created_at: new Date(post.date).toISOString(),
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'slug' },
      );

    if (error) {
      throw new Error(`Erro ao sincronizar post "${post.title}": ${error.message}`);
    }
  }

  console.log('Posts sincronizados com sucesso.');
}

async function seedMidia() {
  console.log('Sincronizando artigos de mídia...');

  for (const article of mediaArticles) {
    const { error } = await supabase
      .from('midia')
      .upsert(
        {
          title: article.title,
          description: article.excerpt,
          category: article.category,
          read_time: article.readTime,
          url: article.url,
          thumbnail: article.image,
          source: article.author ?? article.category,
          published_date: new Date(article.date).toISOString(),
          created_at: new Date(article.date).toISOString(),
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'url' },
      );

    if (error) {
      throw new Error(`Erro ao sincronizar artigo "${article.title}": ${error.message}`);
    }
  }

  console.log('Artigos de mídia sincronizados com sucesso.');
}

async function main() {
  await seedPosts();
  await seedMidia();

  console.log('Sincronização concluída.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
