import { createElement } from 'react';
import { createCommand, DecoratorNode, type LexicalCommand } from 'lexical';
import type { LexicalNode, NodeKey } from 'lexical';
import type { JSX } from 'react';

export type ImagePayload = {
  src: string;
  alt?: string;
  widthPercentage?: number;
  caption?: string;
};

export type SerializedImageNode = {
  type: 'image';
  version: 1;
  src: string;
  alt?: string;
  widthPercentage?: number;
  caption?: string;
};

function normalizeWidth(width?: number): number {
  if (typeof width !== 'number' || Number.isNaN(width)) {
    return 100;
  }

  return Math.min(Math.max(Math.round(width), 20), 100);
}

function ImageComponent({ src, alt, widthPercentage, caption }: { src: string; alt: string; widthPercentage: number; caption: string }): JSX.Element {
  const width = normalizeWidth(widthPercentage);

  return createElement(
    'figure',
    {
      className: 'my-6 mx-auto',
      style: {
        width: `${width}%`,
        maxWidth: '100%',
      },
    },
    createElement('img', {
      src,
      alt,
      className: 'h-auto w-full rounded-2xl border border-white/10 object-cover',
      loading: 'lazy',
    }),
    caption
      ? createElement(
          'figcaption',
          { className: 'mt-3 text-center text-sm text-white/60' },
          caption,
        )
      : null,
  );
}

export class ImageNode extends DecoratorNode<JSX.Element> {
  private __src: string;
  private __alt: string;
  private __widthPercentage: number;
  private __caption: string;

  static getType(): string {
    return 'image';
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(node.__src, node.__alt, node.__widthPercentage, node.__caption, node.__key);
  }

  constructor(src: string, alt = '', widthPercentage = 100, caption = '', key?: NodeKey) {
    super(key);
    this.__src = src;
    this.__alt = alt;
    this.__widthPercentage = normalizeWidth(widthPercentage);
    this.__caption = caption ?? '';
  }

  getSrc(): string {
    return this.__src;
  }

  setSrc(src: string): void {
    const writable = this.getWritable();
    writable.__src = src;
  }

  getAltText(): string {
    return this.__alt;
  }

  setAltText(alt: string): void {
    const writable = this.getWritable();
    writable.__alt = alt;
  }

  getWidthPercentage(): number {
    return this.__widthPercentage;
  }

  setWidthPercentage(width: number): void {
    const writable = this.getWritable();
    writable.__widthPercentage = normalizeWidth(width);
  }

  getCaption(): string {
    return this.__caption;
  }

  setCaption(caption: string): void {
    const writable = this.getWritable();
    writable.__caption = caption ?? '';
  }

  createDOM(): HTMLElement {
    return document.createElement('span');
  }

  updateDOM(): false {
    return false;
  }

  decorate(): JSX.Element {
    return createElement(ImageComponent, {
      src: this.__src,
      alt: this.__alt,
      widthPercentage: this.__widthPercentage,
      caption: this.__caption,
    });
  }

  exportJSON(): SerializedImageNode {
    return {
      type: 'image',
      version: 1,
      src: this.__src,
      alt: this.__alt,
      widthPercentage: this.__widthPercentage,
      caption: this.__caption,
    };
  }

  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    const { src, alt, widthPercentage, caption } = serializedNode;
    return new ImageNode(src, alt, widthPercentage, caption);
  }
}

export const INSERT_IMAGE_COMMAND: LexicalCommand<ImagePayload> = createCommand('INSERT_IMAGE_COMMAND');

export function $createImageNode({ src, alt = '', widthPercentage, caption = '' }: ImagePayload): ImageNode {
  return new ImageNode(src, alt, widthPercentage, caption);
}

export function $isImageNode(node: LexicalNode | null | undefined): node is ImageNode {
  return node instanceof ImageNode;
}
