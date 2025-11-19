import type { TextMatchTransformer } from '@lexical/markdown';
import { $createImageNode, ImageNode } from '../nodes/ImageNode';

const IMAGE_TEXT_REGEX = /!\[(.*?)\]\(([^)]+)\)/;

export const IMAGE_MARKDOWN_TRANSFORMER: TextMatchTransformer = {
  dependencies: [ImageNode],
  export: (node) => {
    if (!(node instanceof ImageNode)) {
      return null;
    }
    const src = node.getSrc();
    const alt = node.getAltText();
    return `![${alt}](${src})`;
  },
  importRegExp: IMAGE_TEXT_REGEX,
  regExp: /!\[(.*?)\]\(([^)]+)\)$/, // typing shortcut
  replace: (textNode, match) => {
    const alt = match[1] ?? '';
    const src = match[2];

    if (!src) {
      return;
    }

    const imageNode = $createImageNode({ src, alt });
    textNode.replace(imageNode);
  },
  trigger: ')',
  type: 'text-match',
};
