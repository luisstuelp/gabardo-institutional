const HTML_ESCAPE_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

const INLINE_RULES: Array<{ pattern: RegExp; replacement: string }> = [
  { pattern: /`(.+?)`/g, replacement: '<code>$1</code>' },
  { pattern: /\*\*(.+?)\*\*/g, replacement: '<strong>$1</strong>' },
  { pattern: /__(.+?)__/g, replacement: '<strong>$1</strong>' },
  { pattern: /~~(.+?)~~/g, replacement: '<del>$1</del>' },
  { pattern: /\*(.+?)\*/g, replacement: '<em>$1</em>' },
  { pattern: /_(.+?)_/g, replacement: '<em>$1</em>' },
];

const ALLOWED_TAGS = new Set(['strong', 'em', 'code', 'del', 'br']);
const PLACEHOLDER_PREFIX = '__INLINE_TAG_PLACEHOLDER__';

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => HTML_ESCAPE_MAP[character] ?? character);
}

function decodeHtmlEntities(value: string): string {
  const NAMED_ENTITIES: Record<string, string> = {
    nbsp: ' ',
  };

  return value.replace(/&(#\d+|#x[0-9a-f]+|[a-z]+);/gi, (match, entity) => {
    if (entity.startsWith('#x') || entity.startsWith('#X')) {
      const charCode = Number.parseInt(entity.slice(2), 16);
      if (Number.isFinite(charCode)) {
        return String.fromCharCode(charCode);
      }
      return match;
    }

    if (entity.startsWith('#')) {
      const charCode = Number.parseInt(entity.slice(1), 10);
      if (Number.isFinite(charCode)) {
        return String.fromCharCode(charCode);
      }
      return match;
    }

    const normalized = entity.toLowerCase();
    if (normalized in NAMED_ENTITIES) {
      return NAMED_ENTITIES[normalized];
    }

    return match;
  });
}

function preserveAllowedTags(value: string): { text: string; placeholders: string[] } {
  const placeholders: string[] = [];
  const text = value.replace(/<\/?([a-z]+)[^>]*>/gi, (match, tag) => {
    if (ALLOWED_TAGS.has(tag.toLowerCase())) {
      const token = `${PLACEHOLDER_PREFIX}${placeholders.length}__`;
      placeholders.push(match);
      return token;
    }

    return match;
  });

  return { text, placeholders };
}

function restoreAllowedTags(value: string, placeholders: string[]): string {
  return placeholders.reduce((acc, tag, index) => {
    const token = `${PLACEHOLDER_PREFIX}${index}__`;
    return acc.replace(token, tag);
  }, value);
}

export function convertInlineMarkdownToHtml(value: string | undefined | null): string {
  if (!value) {
    return '';
  }

  let result = decodeHtmlEntities(value);

  INLINE_RULES.forEach(({ pattern, replacement }) => {
    result = result.replace(pattern, replacement);
  });

  const preserved = preserveAllowedTags(result);
  const escaped = escapeHtml(preserved.text);

  return restoreAllowedTags(escaped, preserved.placeholders);
}
