import { createElement } from 'react';
import { createCommand, DecoratorNode, type LexicalCommand } from 'lexical';
import type { LexicalNode, NodeKey } from 'lexical';
import type { JSX } from 'react';

export type ImagePayload = {
  src: string;
  alt?: string;
};

export type SerializedImageNode = {
  type: 'image';
  version: 1;
  src: string;
  alt?: string;
};

function ImageComponent({ src, alt }: { src: string; alt: string }): JSX.Element {
  return createElement(
    'figure',
    { className: 'my-6' },
    createElement('img', {
      src,
      alt,
      className: 'h-auto w-full rounded-2xl border border-white/10 object-cover',
      loading: 'lazy',
    }),
    alt
      ? createElement(
          'figcaption',
          { className: 'mt-3 text-center text-sm text-white/60' },
          alt,
        )
      : null,
  );
}

export class ImageNode extends DecoratorNode<JSX.Element> {
  private __src: string;
  private __alt: string;

  static getType(): string {
    return 'image';
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(node.__src, node.__alt, node.__key);
  }

  constructor(src: string, alt = '', key?: NodeKey) {
    super(key);
    this.__src = src;
    this.__alt = alt;
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
    });
  }

  exportJSON(): SerializedImageNode {
    return {
      type: 'image',
      version: 1,
      src: this.__src,
      alt: this.__alt,
    };
  }

  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    const { src, alt } = serializedNode;
    return new ImageNode(src, alt);
  }
}

export const INSERT_IMAGE_COMMAND: LexicalCommand<ImagePayload> = createCommand('INSERT_IMAGE_COMMAND');

export function $createImageNode({ src, alt = '' }: ImagePayload): ImageNode {
  return new ImageNode(src, alt);
}

export function $isImageNode(node: LexicalNode | null | undefined): node is ImageNode {
  return node instanceof ImageNode;
}
