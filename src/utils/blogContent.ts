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

export function convertMarkdownToBlocks(markdown: string): BlogContentBlock[] {
  const blocks: BlogContentBlock[] = [];
  const normalized = (markdown ?? '').replace(/\r\n/g, '\n');
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

      while (counter < lines.length) {
        const candidate = lines[counter].trim();
        if (!/^\d+\.\s/.test(candidate)) {
          break;
        }

        items.push(candidate.replace(/^\d+\.\s*/, '').trim());
        counter += 1;
      }

      if (items.length > 0) {
        blocks.push({ type: 'list', items, ordered: true });
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
      blocks.push({ type: 'image', content: imageMatch[2], alt: imageMatch[1] ?? '' });
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

    if (paragraph.trim()) {
      blocks.push({ type: 'paragraph', content: paragraph.trim() });
    }
  }

  if (blocks.length > 0) {
    return blocks;
  }

  const fallback = normalized.trim();
  return fallback ? [{ type: 'paragraph', content: fallback }] : [];
}

export function convertLexicalStateToBlocks(state: string): BlogContentBlock[] {
  const markdown = convertLexicalStateToMarkdown(state);

  if (!markdown || looksLikeLexicalContent(markdown)) {
    return [];
  }

  return convertMarkdownToBlocks(markdown);
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
        if (src) {
          chunks.push(`![${alt}](${src})`);
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
    const editor = createConversionEditor();
    let serialized = '';
    editor.update(() => {
      ensureDocumentHasParagraphNode();
      serialized = JSON.stringify(editor.getEditorState().toJSON());
    });
    return serialized;
  }

  if (looksLikeLexicalContent(trimmed)) {
    return trimmed;
  }

  const markdown = ensureMarkdownContent(original);
  return convertMarkdownToLexicalState(markdown);
}

export function parseBlogContent(content: string | null | undefined): BlogContentBlock[] {
  const value = content ?? '';
  const trimmed = value.trim();

  if (!trimmed) {
    return [];
  }

  if (looksLikeLexicalContent(trimmed)) {
    const lexicalBlocks = convertLexicalStateToBlocks(trimmed);
    if (lexicalBlocks.length > 0) {
      return lexicalBlocks;
    }
  }

  try {
    const parsed = JSON.parse(trimmed);
    if (isBlogContentArray(parsed)) {
      return parsed;
    }
  } catch {
    // Ignore JSON parse failure and fall back to markdown parsing
  }

  return convertMarkdownToBlocks(value);
}
