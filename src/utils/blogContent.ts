import { $convertFromMarkdownString, $convertToMarkdownString } from '@lexical/markdown';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListItemNode, ListNode } from '@lexical/list';
import { LinkNode } from '@lexical/link';
import { CodeNode } from '@lexical/code';
import { $createParagraphNode, $getRoot, createEditor } from 'lexical';

import type { BlogContentBlock } from '@/types/blog';
import { ImageNode } from '@/components/admin/editor/nodes/ImageNode';
import { MARKDOWN_TRANSFORMERS } from '@/components/admin/editor/transformers';

function isBlogContentArray(value: unknown): value is BlogContentBlock[] {
  return Array.isArray(value);
}

function normaliseText(value: string | undefined | null): string {
  return (value ?? '').replace(/\s+$/g, '').trim();
}

function looksLikeLexicalContent(value: string): boolean {
  if (!value.startsWith('{') && !value.startsWith('[')) {
    return false;
  }

  try {
    const parsed = JSON.parse(value);
    return parsed != null && typeof parsed === 'object' && 'root' in parsed;
  } catch {
    return false;
  }
}

type LexicalImageJSON = {
  type?: unknown;
  src?: unknown;
  alt?: unknown;
  widthPercentage?: unknown;
  caption?: unknown;
  children?: unknown;
};

const LEGACY_HTML_REGEX = /<(style|div|section|article|main|header|footer|nav)[^>]*>/i;

function normalizeLegacyHtmlBlocks(blocks: BlogContentBlock[]): BlogContentBlock[] {
  if (!Array.isArray(blocks) || blocks.length === 0) {
    return blocks;
  }

  const hasLegacyHtml = blocks.some((block) => {
    if (!('content' in block)) {
      return false;
    }
    const value = (block as { content?: string }).content;
    return typeof value === 'string' && LEGACY_HTML_REGEX.test(value);
  });

  if (!hasLegacyHtml) {
    return blocks;
  }

  const combined = blocks
    .map((block) => ('content' in block && typeof (block as { content?: string }).content === 'string' ? (block as { content?: string }).content : ''))
    .join('\n')
    .trim();

  if (!combined) {
    return blocks;
  }

  return [{ type: 'html', content: combined }];
}

export function extractImagesFromLexicalState(state: string): Array<{
  src: string;
  alt?: string;
  widthPercentage?: number;
  caption?: string;
}> {
  try {
    const parsed = JSON.parse(state);
    if (parsed == null || typeof parsed !== 'object') {
      return [];
    }

    const images: Array<{ src: string; alt?: string; widthPercentage?: number; caption?: string }> = [];

    const traverse = (node: unknown) => {
      if (node == null || typeof node !== 'object') {
        return;
      }

      const imageNode = node as LexicalImageJSON;

      if (imageNode.type === 'image' && typeof imageNode.src === 'string') {
        images.push({
          src: imageNode.src,
          alt: typeof imageNode.alt === 'string' ? imageNode.alt : undefined,
          widthPercentage: typeof imageNode.widthPercentage === 'number' ? imageNode.widthPercentage : undefined,
          caption: typeof imageNode.caption === 'string' ? imageNode.caption : undefined,
        });
      }

      const children: unknown = imageNode.children;
      if (Array.isArray(children)) {
        children.forEach(traverse);
      }
    };

    if (parsed.root) {
      traverse(parsed.root);
    } else {
      traverse(parsed);
    }

    return images;
  } catch {
    return [];
  }
}

function convertMarkdownToBlocks(markdown: string): BlogContentBlock[] {
  const blocks: BlogContentBlock[] = [];
  const normalized = (markdown ?? '').replace(/\r\n/g, '\n');

  const HTML_HEAVY_REGEX = /<(style|div|section|article|main|header|footer|video|iframe|figure|table|tbody|thead|tr|td|th|span|p|ul|ol|li|a|img|br|hr|h[1-6]|meta|link|script)\b/i;
  if (HTML_HEAVY_REGEX.test(normalized)) {
    return [{ type: 'html', content: normalized }];
  }
  const lines = normalized.split('\n');

  let index = 0;

  while (index < lines.length) {
    const rawLine = lines[index];
    const line = rawLine.trim();

    if (!line) {
      index += 1;
      continue;
    }

    // Markdown headings (#, ##, ### ...)
    if (line.startsWith('#')) {
      const levelMatch = line.match(/^#+/);
      const level = levelMatch ? levelMatch[0].length : 2;
      const headingText = line.replace(/^#+\s*/, '').trim();
      const headingLevel = Math.min(Math.max(level, 2), 3) as 2 | 3;

      if (headingText) {
        blocks.push({ type: 'heading', content: headingText, level: headingLevel });
      }

      index += 1;
      continue;
    }

    // All caps headings (legacy)
    if (
      line === line.toUpperCase() &&
      line.length >= 4 &&
      line.length < 100 &&
      /^[A-Z0-9À-Ú\s\-:()]+$/.test(line)
    ) {
      blocks.push({ type: 'heading', content: line, level: 2 });
      index += 1;
      continue;
    }

    // Bullet list detection (-, *, •)
    if (/^[-*•]\s/.test(line)) {
      const items: string[] = [];

      while (index < lines.length) {
        const candidate = lines[index].trim();
        if (!/^[-*•]\s/.test(candidate)) {
          break;
        }

        items.push(candidate.replace(/^[-*•]\s*/, '').trim());
        index += 1;
      }

      if (items.length > 0) {
        blocks.push({ type: 'list', items });
      }

      continue;
    }

    // Ordered list detection (1., 2., ...)
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      let counter = index;
      const startMatch = line.match(/^(\d+)\.\s/);
      const startValue = startMatch ? Number.parseInt(startMatch[1], 10) : 1;

      while (counter < lines.length) {
        const candidate = lines[counter].trim();
        if (!/^\d+\.\s/.test(candidate)) {
          break;
        }

        items.push(candidate.replace(/^\d+\.\s*/, '').trim());
        counter += 1;
      }

      if (items.length > 0) {
        blocks.push({ type: 'list', items, ordered: true, start: startValue });
      }

      index = counter;
      continue;
    }

    // Blockquote detection (> quote)
    if (line.startsWith('>')) {
      const quoteText = line.replace(/^>\s*/, '').trim();
      if (quoteText) {
        blocks.push({ type: 'quote', content: quoteText });
      }

      index += 1;
      continue;
    }

    // Markdown images (![alt](src))
    const imageMatch = line.match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imageMatch) {
      blocks.push({ type: 'image', content: imageMatch[2], alt: imageMatch[1] ?? '', widthPercentage: 100 });
      index += 1;
      continue;
    }

    // Paragraph accumulation
    let paragraph = line;
    index += 1;

    while (index < lines.length) {
      const candidateRaw = lines[index];
      const candidate = candidateRaw.trim();

      if (
        !candidate ||
        candidate.startsWith('#') ||
        /^[-*•]\s/.test(candidate) ||
        /^\d+\.\s/.test(candidate) ||
        candidate.startsWith('>') ||
        /^!\[.*?\]\(.*?\)$/.test(candidate) ||
        (
          candidate === candidate.toUpperCase() &&
          candidate.length >= 4 &&
          candidate.length < 100 &&
          /^[A-Z0-9À-Ú\s\-:()]+$/.test(candidate)
        )
      ) {
        if (!candidate) {
          index += 1;
        }
        break;
      }

      paragraph += ` ${candidate}`;
      index += 1;
    }

    const trimmedParagraph = paragraph.trim();
    if (trimmedParagraph) {
      if (HTML_HEAVY_REGEX.test(trimmedParagraph)) {
        blocks.push({ type: 'html', content: trimmedParagraph });
      } else {
        blocks.push({ type: 'paragraph', content: trimmedParagraph });
      }
    }
  }

  if (blocks.length > 0) {
    return blocks;
  }

  const fallback = normalized.trim();
  if (!fallback) {
    return [];
  }

  return [{ type: 'paragraph', content: fallback }];
}

export function convertLexicalStateToBlocks(state: string): BlogContentBlock[] {
  const markdown = convertLexicalStateToMarkdown(state);
  const blocks = convertMarkdownToBlocks(markdown);

  if (blocks.length === 0) {
    return blocks;
  }

  const imageMetadata = extractImagesFromLexicalState(state);

  if (imageMetadata.length === 0) {
    return normalizeLegacyHtmlBlocks(blocks);
  }

  const remainingImages = [...imageMetadata];

  const enriched = blocks.map((block) => {
    if (block.type !== 'image') {
      return block;
    }

    const matchIndex = remainingImages.findIndex((image) => image.src === block.content);
    const meta = matchIndex >= 0 ? remainingImages.splice(matchIndex, 1)[0] : remainingImages.shift();

    if (!meta) {
      return block;
    }

    const widthPercentage =
      typeof meta.widthPercentage === 'number' ? clampWidth(meta.widthPercentage) : block.widthPercentage ?? 100;

    const caption = meta.caption && meta.caption.trim() ? meta.caption.trim() : block.alt ?? '';

    return {
      ...block,
      alt: meta.alt ?? block.alt ?? '',
      widthPercentage,
      caption: caption || undefined,
    };
  });

  return normalizeLegacyHtmlBlocks(enriched);
}

function clampWidth(value: number): number {
  if (!Number.isFinite(value)) {
    return 100;
  }

  return Math.min(Math.max(Math.round(value), 20), 100);
}

function createConversionEditor() {
  return createEditor({
    namespace: 'GabardoBlogConversion',
    nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, LinkNode, CodeNode, ImageNode],
  });
}

function ensureDocumentHasParagraphNode() {
  const root = $getRoot();
  if (root.getChildrenSize() === 0) {
    root.append($createParagraphNode());
  }
}

export function convertMarkdownToLexicalState(markdown: string): string {
  const editor = createConversionEditor();
  let serialized = '';

  editor.update(() => {
    const root = $getRoot();
    root.clear();
    $convertFromMarkdownString(markdown, MARKDOWN_TRANSFORMERS);
    ensureDocumentHasParagraphNode();
    serialized = JSON.stringify(editor.getEditorState().toJSON());
  });

  return serialized || JSON.stringify(editor.getEditorState().toJSON());
}

export function convertLexicalStateToMarkdown(state: string): string {
  const editor = createConversionEditor();

  try {
    const parsedState = editor.parseEditorState(state);
    editor.setEditorState(parsedState);

    let markdown = '';
    editor.update(() => {
      markdown = $convertToMarkdownString(MARKDOWN_TRANSFORMERS).trim();
      ensureDocumentHasParagraphNode();
    });

    return markdown;
  } catch {
    return state;
  }
}

function convertBlocksToMarkdown(blocks: BlogContentBlock[]): string {
  const chunks: string[] = [];

  blocks.forEach((block) => {
    switch (block.type) {
      case 'paragraph': {
        const paragraph = normaliseText(block.content);
        if (paragraph) {
          chunks.push(paragraph);
        }
        break;
      }
      case 'heading': {
        const level = block.level ?? 2;
        const prefix = level <= 2 ? '##' : '###';
        chunks.push(`${prefix} ${normaliseText(block.content)}`.trim());
        break;
      }
      case 'quote': {
        const quoteLines = normaliseText(block.content)
          .split('\n')
          .map((line) => line.trim())
          .filter(Boolean)
          .map((line) => `> ${line}`);

        if (block.author) {
          quoteLines.push(`> — ${block.author}`);
        }

        if (quoteLines.length > 0) {
          chunks.push(quoteLines.join('\n'));
        }
        break;
      }
      case 'list': {
        const items = (block.items ?? []).map((item) => normaliseText(item)).filter(Boolean);
        if (items.length === 0) {
          break;
        }

        if (block.content) {
          chunks.push(normaliseText(block.content));
        }

        const isOrdered = Boolean(block.ordered);
        const listLines = items.map((item, index) => (isOrdered ? `${index + 1}. ${item}` : `- ${item}`));
        chunks.push(listLines.join('\n'));
        break;
      }
      case 'divider': {
        chunks.push('---');
        break;
      }
      case 'image': {
        const src = normaliseText(block.content);
        const alt = block.alt ? normaliseText(block.alt) : '';
        const caption = block.caption ? normaliseText(block.caption) : '';
        if (src) {
          const imageMarkdown = `![${alt}](${src})`;
          chunks.push(imageMarkdown);
          if (caption) {
            chunks.push(`_${caption}_`);
          }
        }
        break;
      }
      case 'highlight': {
        const content = normaliseText(block.content);
        if (content) {
          chunks.push(`> **Destaque:** ${content}`);
        }
        break;
      }
      case 'video': {
        const lines: string[] = [];
        const label = block.caption ?? 'Conteúdo em vídeo';
        lines.push(`**${label}**`);
        lines.push(`URL: ${block.content}`);
        if (block.linkUrl) {
          lines.push(`Link relacionado: ${block.linkUrl}`);
        }
        chunks.push(lines.join('\n'));
        break;
      }
      default: {
        if ('content' in block && typeof (block as { content?: unknown }).content === 'string') {
          chunks.push(normaliseText((block as { content?: string }).content));
        }
      }
    }
  });

  return chunks.join('\n\n').trim();
}

export function ensureMarkdownContent(content: string | null | undefined): string {
  const trimmed = normaliseText(content);
  if (!trimmed) {
    return '';
  }

  if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
    try {
      const parsed = JSON.parse(trimmed);
      if (isBlogContentArray(parsed)) {
        const markdown = convertBlocksToMarkdown(parsed);
        if (markdown) {
          return markdown;
        }
      }
    } catch {
      // Fallback to raw content when JSON parsing fails
    }
  }

  return trimmed;
}

export function ensureLexicalContent(content: string | null | undefined): string {
  const original = content ?? '';
  const trimmed = original.trim();

  if (!trimmed) {
    return JSON.stringify(createEmptyState());
  }

  if (looksLikeLexicalContent(trimmed)) {
    try {
      const parsed = JSON.parse(trimmed);
      if (parsed == null || typeof parsed !== 'object') {
        return JSON.stringify(createEmptyState());
      }

      const editor = createConversionEditor();
      const nextState = editor.parseEditorState(trimmed);
      editor.setEditorState(nextState);
      editor.update(() => {
        ensureDocumentHasParagraphNode();
      });
      return JSON.stringify(editor.getEditorState().toJSON());
    } catch {
      return JSON.stringify(createEmptyState());
    }
  }

  const editor = createConversionEditor();
  const markdown = ensureMarkdownContent(trimmed);
  const parsedMarkdownState = editor.parseEditorState(JSON.stringify(createEmptyState()));

  editor.setEditorState(parsedMarkdownState);
  editor.update(() => {
    $convertFromMarkdownString(markdown, MARKDOWN_TRANSFORMERS);
    ensureDocumentHasParagraphNode();
  });

  return JSON.stringify(editor.getEditorState().toJSON());
}

function createEmptyState() {
  return {
    root: {
      children: [
        {
          "direction": null,
          "format": 0,
          "indent": 0,
          "type": "paragraph",
          "version": 1
        }
      ],
      "direction": null,
      "format": 0,
      "indent": 0,
      "type": "root",
      version: 1,
    },
  };
}

export function parseBlogContent(content: string | null | undefined): BlogContentBlock[] {
  const value = content ?? '';
  const trimmed = value.trim();

  if (!trimmed) {
    return [];
  }

  if (looksLikeLexicalContent(trimmed)) {
    const lexicalBlocks = normalizeLegacyHtmlBlocks(convertLexicalStateToBlocks(trimmed));
    if (lexicalBlocks.length > 0) {
      return lexicalBlocks;
    }
  }

  try {
    const parsed = JSON.parse(trimmed);
    if (isBlogContentArray(parsed)) {
      return normalizeLegacyHtmlBlocks(parsed);
    }
  } catch {
    // Ignore JSON parse failure and fall back to markdown parsing
  }

  return normalizeLegacyHtmlBlocks(convertMarkdownToBlocks(value));
}
