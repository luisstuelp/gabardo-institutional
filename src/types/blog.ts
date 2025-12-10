export type BlogContentBlock =
  | { type: 'paragraph'; content: string }
  | { type: 'heading'; content: string; level?: 2 | 3 }
  | { type: 'quote'; content: string; author?: string }
  | { type: 'image'; content: string; alt?: string; widthPercentage?: number; caption?: string }
  | { type: 'list'; content?: string; items?: string[]; ordered?: boolean; start?: number }
  | { type: 'divider'; content?: string }
  | { type: 'highlight'; content: string }
  | { type: 'html'; content: string }
  | {
      type: 'video';
      content: string;
      caption?: string;
      poster?: string;
      autoplay?: boolean;
      loop?: boolean;
      muted?: boolean;
      controls?: boolean;
      linkLabel?: string;
      linkUrl?: string;
    };

export interface BlogPostSummary {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
  featured: boolean;
  tags: string[];
}

export interface BlogPostDetail extends BlogPostSummary {
  content: BlogContentBlock[];
  seo?: {
    description: string;
    keywords: string[];
  };
}
