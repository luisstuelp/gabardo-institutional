'use client';

import { Component, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ChangeEvent, ErrorInfo, JSX, MutableRefObject } from 'react';
import clsx from 'clsx';
import {
  LexicalComposer,
  type InitialConfigType,
} from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import {
  HeadingNode,
  QuoteNode,
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
  $isQuoteNode,
} from '@lexical/rich-text';
import { CodeNode } from '@lexical/code';
import {
  ListItemNode,
  ListNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  $isListNode,
} from '@lexical/list';
import { $isLinkNode, LinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import {
  $createParagraphNode,
  $getNodeByKey,
  $getRoot,
  $getSelection,
  $isRangeSelection,
  $isNodeSelection,
  COMMAND_PRIORITY_LOW,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  type EditorState,
  type NodeKey,
  UNDO_COMMAND,
} from 'lexical';
import { $setBlocksType } from '@lexical/selection';
import { mergeRegister } from '@lexical/utils';
import {
  Bold,
  Edit3,
  Italic,
  Type,
  Link as LinkIcon,
  List as ListIcon,
  ListOrdered,
  Quote,
  Redo2,
  Image as ImageIcon,
  Loader2,
  Strikethrough,
  RefreshCcw,
  Trash2,
  Underline,
  Undo2,
} from 'lucide-react';
import { ensureLexicalContent } from '@/utils/blogContent';
import { supabase } from '@/integrations/supabase/client';
import ImagePlugin from './editor/plugins/ImagePlugin';
import { INSERT_IMAGE_COMMAND, ImageNode, type ImagePayload, $isImageNode } from './editor/nodes/ImageNode';
import { MARKDOWN_TRANSFORMERS } from './editor/transformers';

type BlockType = 'paragraph' | 'h2' | 'h3' | 'quote' | 'bullet' | 'number';

interface MarkdownLexicalEditorProps {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
}

interface MarkdownInitializerPluginProps {
  lexicalState: string;
  readOnly?: boolean;
  externalValueRef: MutableRefObject<string>;
}

interface MarkdownChangePluginProps {
  readOnly?: boolean;
  onChange?: (value: string) => void;
  externalValueRef: MutableRefObject<string>;
}

interface ToolbarButtonProps {
  icon: typeof Bold;
  label: string;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
}

const lexicalTheme = {
  paragraph: 'text-base md:text-lg leading-relaxed text-white/90',
  quote:
    'text-base md:text-lg leading-relaxed text-white/80 border-l-2 border-gabardo-light-blue/60 pl-4 italic',
  heading: {
    h1: 'text-3xl md:text-4xl font-semibold text-white',
    h2: 'text-2xl md:text-3xl font-semibold text-white mt-6 mb-3',
    h3: 'text-xl md:text-2xl font-semibold text-white mt-5 mb-2',
  },
  list: {
    ul: 'list-disc list-inside space-y-2 text-white/85',
    ol: 'list-decimal list-inside space-y-2 text-white/85',
    listitem: 'text-base md:text-lg leading-relaxed text-white/85',
  },
  link: 'text-gabardo-light-blue underline decoration-gabardo-light-blue/60 underline-offset-2',
  text: {
    bold: 'font-semibold',
    italic: 'italic',
    underline: 'underline',
    strikethrough: 'line-through',
  },
};

const STORAGE_BUCKET = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET ?? 'content-images';

const BASE_CONFIG: InitialConfigType = {
  namespace: 'GabardoBlogMarkdownEditor',
  theme: lexicalTheme,
  nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, LinkNode, CodeNode, ImageNode],
  onError(error) {
    console.error('[Lexical] Editor exception', error);
    throw error;
  },
};

function ensureDocumentHasParagraph() {
  const root = $getRoot();
  if (root.getChildrenSize() === 0) {
    const paragraph = $createParagraphNode();
    root.append(paragraph);
    paragraph.select();
  }
}

function MarkdownInitializerPlugin({ lexicalState, readOnly, externalValueRef }: MarkdownInitializerPluginProps) {
  const [editor] = useLexicalComposerContext();
  const hasInitializedRef = useRef(false);

  useEffect(() => {
    editor.setEditable(!readOnly);
  }, [editor, readOnly]);

  useEffect(() => {
    const nextValue = lexicalState ?? '';
    const alreadyApplied = hasInitializedRef.current && externalValueRef.current === nextValue;
    if (alreadyApplied) {
      return;
    }

    externalValueRef.current = nextValue;

    editor.update(() => {
      try {
        const parsedState = editor.parseEditorState(nextValue);
        editor.setEditorState(parsedState);
        ensureDocumentHasParagraph();
      } catch (error) {
        console.error('[Lexical] Failed to parse editor state', error);
      }
    });
    hasInitializedRef.current = true;
  }, [editor, externalValueRef, lexicalState]);

  return null;
}

function MarkdownChangePlugin({ readOnly, onChange, externalValueRef }: MarkdownChangePluginProps) {
  const handleChange = useCallback(
    (editorState: EditorState) => {
      if (readOnly || !onChange) {
        return;
      }

      editorState.read(() => {
        const serialized = JSON.stringify(editorState.toJSON());
        if (externalValueRef.current !== serialized) {
          externalValueRef.current = serialized;
          onChange(serialized);
        }
      });
    },
    [externalValueRef, onChange, readOnly],
  );

  return <OnChangePlugin onChange={handleChange} />;
}

function ToolbarButton({ icon: Icon, label, onClick, active, disabled }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={clsx(
        'flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-colors hover:border-white/30 hover:bg-white/10',
        active ? 'text-gabardo-light-blue' : 'text-white/70',
        disabled && 'cursor-not-allowed opacity-60',
      )}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

function createDefaultFormatState() {
  return {
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    isLink: false,
  };
}

function BlockTypeDropdown({ blockType, disabled, onChange }: { blockType: BlockType; disabled?: boolean; onChange: (nextType: BlockType) => void }) {
  return (
    <select
      value={blockType}
      disabled={disabled}
      onChange={(event) => onChange(event.target.value as BlockType)}
      className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white hover:border-white/30 focus:border-gabardo-light-blue focus:outline-none"
    >
      <option value="paragraph" className="bg-slate-900 text-white">
        Parágrafo
      </option>
      <option value="h2" className="bg-slate-900 text-white">
        Título H2
      </option>
      <option value="h3" className="bg-slate-900 text-white">
        Título H3
      </option>
      <option value="quote" className="bg-slate-900 text-white">
        Citação
      </option>
      <option value="bullet" className="bg-slate-900 text-white">
        Lista
      </option>
      <option value="number" className="bg-slate-900 text-white">
        Lista numerada
      </option>
    </select>
  );
}

const clampImageWidth = (value: number): number => {
  if (!Number.isFinite(value)) {
    return 100;
  }

  return Math.min(Math.max(Math.round(value), 20), 100);
};

function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [blockType, setBlockType] = useState<BlockType>('paragraph');
  const [isEditable, setIsEditable] = useState(true);
  const [formatState, setFormatState] = useState(createDefaultFormatState);
  const [selectedImage, setSelectedImage] = useState<
    { key: NodeKey; src: string; alt: string; widthPercentage: number; caption: string }
  | null>(
    null,
  );

  const updateToolbar = useCallback(() => {
    editor.getEditorState().read(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        setSelectedImage(null);

        const anchorNode = selection.anchor.getNode();
        const topLevelElement = anchorNode.getTopLevelElementOrThrow();
        const parent = anchorNode.getParent();
        const grandparent = parent?.getParent();

        if ($isHeadingNode(topLevelElement)) {
          const tag = topLevelElement.getTag();
          setBlockType(tag === 'h3' ? 'h3' : 'h2');
        } else if ($isQuoteNode(topLevelElement)) {
          setBlockType('quote');
        } else if ($isListNode(topLevelElement)) {
          setBlockType(topLevelElement.getListType() === 'number' ? 'number' : 'bullet');
        } else if ($isListNode(parent)) {
          setBlockType(parent.getListType() === 'number' ? 'number' : 'bullet');
        } else if ($isListNode(grandparent)) {
          const listType = grandparent.getListType();
          setBlockType(listType === 'number' ? 'number' : 'bullet');
        } else {
          setBlockType('paragraph');
        }

        setFormatState({
          bold: selection.hasFormat('bold'),
          italic: selection.hasFormat('italic'),
          underline: selection.hasFormat('underline'),
          strikethrough: selection.hasFormat('strikethrough'),
          isLink: selection.getNodes().some((node) => $isLinkNode(node) || $isLinkNode(node.getParent())),
        });

        return;
      }

      if ($isNodeSelection(selection)) {
        const nodes = selection.getNodes();
        const imageNode = nodes.find((node) => $isImageNode(node));

        if (imageNode && $isImageNode(imageNode)) {
          setSelectedImage({
            key: imageNode.getKey(),
            src: imageNode.getSrc(),
            alt: imageNode.getAltText(),
            widthPercentage: imageNode.getWidthPercentage(),
            caption: imageNode.getCaption(),
          });
        } else {
          setSelectedImage(null);
        }

        setFormatState(createDefaultFormatState());
        return;
      }

      setSelectedImage(null);
      setFormatState(createDefaultFormatState());
    });
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerEditableListener((editable: boolean) => {
        setIsEditable(editable);
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateToolbar();
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerUpdateListener(() => {
        updateToolbar();
      }),
    );
  }, [editor, updateToolbar]);

  const applyBlockType = useCallback(
    (type: BlockType) => {
      if (type === 'bullet') {
        editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
        return;
      }

      if (type === 'number') {
        editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
        return;
      }

      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);

      editor.update(() => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) {
          return;
        }

        if (type === 'paragraph') {
          $setBlocksType(selection, () => $createParagraphNode());
          return;
        }

        if (type === 'quote') {
          $setBlocksType(selection, () => $createQuoteNode());
          return;
        }

        if (type === 'h2' || type === 'h3') {
          $setBlocksType(selection, () => $createHeadingNode(type));
          return;
        }

        $setBlocksType(selection, () => $createParagraphNode());
      });
    },
    [editor],
  );

  const toggleInlineFormat = useCallback(
    (format: 'bold' | 'italic' | 'underline' | 'strikethrough') => {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
    },
    [editor],
  );

  const toggleLink = useCallback(() => {
    if (!isEditable) {
      return;
    }

    if (formatState.isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
      return;
    }

    const url = typeof window !== 'undefined' ? window.prompt('URL do link', 'https://') : null;
    if (url) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
    }
  }, [editor, formatState.isLink, isEditable]);

  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const promptImageAlt = useCallback((defaultAlt = '') => {
    return (typeof window !== 'undefined' ? window.prompt('Texto alternativo da imagem (opcional)', defaultAlt) : defaultAlt) ?? '';
  }, []);

  const promptImageCaption = useCallback((defaultCaption = '') => {
    return (
      typeof window !== 'undefined'
        ? window.prompt('Legenda exibida abaixo da imagem (opcional)', defaultCaption)
        : defaultCaption
    ) ?? '';
  }, []);

  const uploadImageFile = useCallback<(
    options?: { defaultAlt?: string; defaultWidth?: number; defaultCaption?: string }
  ) => Promise<ImagePayload | null>>((options) => {
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = async (event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (!file) {
          resolve(null);
          return;
        }

        setIsUploadingImage(true);

        try {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
          const filePath = `${STORAGE_BUCKET}/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from(STORAGE_BUCKET)
            .upload(filePath, file);

          if (uploadError) {
            throw uploadError;
          }

          const { data: urlData } = supabase.storage
            .from(STORAGE_BUCKET)
            .getPublicUrl(filePath);

          const alt = promptImageAlt(options?.defaultAlt ?? '');
          const defaultWidth = clampImageWidth(options?.defaultWidth ?? 100);
          const caption = promptImageCaption(options?.defaultCaption ?? alt);
          resolve({ src: urlData.publicUrl, alt, widthPercentage: defaultWidth, caption });
        } catch (error) {
          console.error('Erro ao fazer upload da imagem:', error);
          if (typeof window !== 'undefined') {
            window.alert('Erro ao fazer upload da imagem. Tente novamente.');
          }
          resolve(null);
        } finally {
          setIsUploadingImage(false);
        }
      };

      input.click();
    });
  }, [promptImageAlt]);

  const promptImageUrl = useCallback<(
    options?: { defaultAlt?: string; defaultWidth?: number; defaultCaption?: string }
  ) => ImagePayload | null>((options) => {
    const url = typeof window !== 'undefined' ? window.prompt('URL da imagem', 'https://') : null;
    if (!url) {
      return null;
    }

    const alt = promptImageAlt(options?.defaultAlt ?? '');
    const defaultWidth = clampImageWidth(options?.defaultWidth ?? 100);
    const caption = options?.defaultCaption ?? alt;
    return { src: url, alt, widthPercentage: defaultWidth, caption };
  }, [promptImageAlt]);

  const insertOrReplaceImage = useCallback(
    async (options: { replaceKey?: NodeKey; defaultAlt?: string; defaultWidth?: number; defaultCaption?: string } = {}) => {
      if (!isEditable || isUploadingImage) {
        return;
      }

      const wantsUpload = typeof window !== 'undefined' ? window.confirm('Deseja fazer upload de uma imagem? (OK = Upload, Cancelar = URL externa)') : false;

      const payload = wantsUpload
        ? await uploadImageFile({
            defaultAlt: options.defaultAlt,
            defaultWidth: options.defaultWidth,
            defaultCaption: options.defaultCaption,
          })
        : promptImageUrl({
            defaultAlt: options.defaultAlt,
            defaultWidth: options.defaultWidth,
            defaultCaption: options.defaultCaption,
          });

      if (!payload) {
        return;
      }

      if (options.replaceKey) {
        const replaceKey = options.replaceKey;
        if (!replaceKey) {
          return;
        }
        editor.update(() => {
          const existingNode = $getNodeByKey(replaceKey);
          if ($isImageNode(existingNode)) {
            existingNode.setSrc(payload.src);
            existingNode.setAltText(payload.alt ?? '');
            existingNode.setWidthPercentage(
              payload.widthPercentage ?? existingNode.getWidthPercentage() ?? clampImageWidth(options?.defaultWidth ?? 100),
            );
            existingNode.setCaption(payload.caption ?? existingNode.getCaption());
          }
        });
        return;
      }

      editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
        ...payload,
        alt: payload.alt ?? '',
        widthPercentage: payload.widthPercentage ?? 100,
        caption: payload.caption ?? payload.alt ?? '',
      });
    },
    [editor, isEditable, isUploadingImage, promptImageUrl, uploadImageFile],
  );

  const replaceSelectedImage = useCallback(() => {
    if (!selectedImage) {
      return;
    }

    void insertOrReplaceImage({
      replaceKey: selectedImage.key,
      defaultAlt: selectedImage.alt,
      defaultWidth: selectedImage.widthPercentage,
      defaultCaption: selectedImage.caption,
    });
  }, [insertOrReplaceImage, selectedImage]);

  const updateSelectedImageWidth = useCallback(
    (nextWidth: number) => {
      const normalized = clampImageWidth(nextWidth);
      setSelectedImage((current) => {
        if (!current) {
          return current;
        }

        editor.update(() => {
          const node = $getNodeByKey(current.key);
          if ($isImageNode(node)) {
            node.setWidthPercentage(normalized);
          }
        });

        return { ...current, widthPercentage: normalized };
      });
    },
    [editor],
  );

  const handleWidthInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      if (Number.isNaN(value)) {
        return;
      }
      updateSelectedImageWidth(value);
    },
    [updateSelectedImageWidth],
  );

  const handleWidthPresetClick = useCallback(
    (value: number) => {
      updateSelectedImageWidth(value);
    },
    [updateSelectedImageWidth],
  );

  const editSelectedImageAlt = useCallback(() => {
    if (!selectedImage) {
      return;
    }

    const nextAlt = promptImageAlt(selectedImage.alt);

    editor.update(() => {
      const node = $getNodeByKey(selectedImage.key);
      if ($isImageNode(node)) {
        node.setAltText(nextAlt);
        const width = node.getWidthPercentage();
        const caption = node.getCaption();
        setSelectedImage({ ...selectedImage, alt: nextAlt, widthPercentage: width, caption });
      }
    });
  }, [editor, promptImageAlt, selectedImage]);

  const editSelectedImageCaption = useCallback(() => {
    if (!selectedImage) {
      return;
    }

    const nextCaption = promptImageCaption(selectedImage.caption);

    editor.update(() => {
      const node = $getNodeByKey(selectedImage.key);
      if ($isImageNode(node)) {
        node.setCaption(nextCaption);
        const width = node.getWidthPercentage();
        const altText = node.getAltText();
        setSelectedImage({ ...selectedImage, caption: nextCaption, widthPercentage: width, alt: altText });
      }
    });
  }, [editor, promptImageCaption, selectedImage]);

  const removeSelectedImage = useCallback(() => {
    if (!selectedImage) {
      return;
    }

    const shouldRemove = typeof window !== 'undefined' ? window.confirm('Remover esta imagem?') : true;
    if (!shouldRemove) {
      return;
    }

    editor.update(() => {
      const node = $getNodeByKey(selectedImage.key);
      if ($isImageNode(node)) {
        node.remove();
        setSelectedImage(null);
      }
    });
  }, [editor, selectedImage]);

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-black/40 p-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap items-center gap-3">
        <BlockTypeDropdown blockType={blockType} disabled={!isEditable} onChange={applyBlockType} />
        <ToolbarButton icon={Bold} label="Negrito" onClick={() => toggleInlineFormat('bold')} active={formatState.bold} disabled={!isEditable} />
        <ToolbarButton icon={Italic} label="Itálico" onClick={() => toggleInlineFormat('italic')} active={formatState.italic} disabled={!isEditable} />
        <ToolbarButton icon={Underline} label="Sublinhar" onClick={() => toggleInlineFormat('underline')} active={formatState.underline} disabled={!isEditable} />
        <ToolbarButton icon={Strikethrough} label="Tachado" onClick={() => toggleInlineFormat('strikethrough')} active={formatState.strikethrough} disabled={!isEditable} />
        <ToolbarButton icon={Quote} label="Citação" onClick={() => applyBlockType('quote')} active={blockType === 'quote'} disabled={!isEditable} />
        <ToolbarButton icon={ListIcon} label="Lista" onClick={() => applyBlockType('bullet')} active={blockType === 'bullet'} disabled={!isEditable} />
        <ToolbarButton icon={ListOrdered} label="Lista numerada" onClick={() => applyBlockType('number')} active={blockType === 'number'} disabled={!isEditable} />
        <ToolbarButton icon={LinkIcon} label="Link" onClick={toggleLink} active={formatState.isLink} disabled={!isEditable || Boolean(selectedImage)} />
        <ToolbarButton icon={isUploadingImage ? Loader2 : ImageIcon} label="Inserir imagem" onClick={() => void insertOrReplaceImage()} disabled={!isEditable || isUploadingImage} />
      </div>
      <div className="flex items-center gap-2">
        <ToolbarButton icon={Undo2} label="Desfazer" onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)} disabled={!isEditable} />
        <ToolbarButton icon={Redo2} label="Refazer" onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)} disabled={!isEditable} />
      </div>
      {selectedImage && (
        <div className="flex flex-wrap items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-3 text-xs text-white/70">
          <span className="mr-2 text-white/80">Imagem selecionada</span>
          <ToolbarButton icon={RefreshCcw} label="Trocar imagem" onClick={replaceSelectedImage} disabled={!isEditable || isUploadingImage} />
          <ToolbarButton icon={Edit3} label="Editar texto alternativo" onClick={editSelectedImageAlt} disabled={!isEditable} />
          <ToolbarButton icon={Type} label="Editar legenda" onClick={editSelectedImageCaption} disabled={!isEditable} />
          <ToolbarButton icon={Trash2} label="Remover imagem" onClick={removeSelectedImage} disabled={!isEditable} />

          <div className="mt-2 flex w-full flex-wrap items-center gap-2 text-white/60">
            <label className="text-xs uppercase tracking-widest text-white/50" htmlFor="image-width-input">
              Largura
            </label>
            <input
              id="image-width-input"
              type="range"
              min={20}
              max={100}
              step={5}
              value={selectedImage.widthPercentage}
              onChange={handleWidthInputChange}
              className="h-1.5 w-32 cursor-pointer accent-gabardo-light-blue"
              disabled={!isEditable}
            />
            <input
              type="number"
              min={20}
              max={100}
              value={selectedImage.widthPercentage}
              onChange={handleWidthInputChange}
              className="w-16 rounded border border-white/10 bg-black/40 px-2 py-1 text-center text-white/80 focus:border-gabardo-light-blue focus:outline-none"
              disabled={!isEditable}
            />
            <span className="text-white/50">%</span>
            <div className="flex gap-1">
              {[100, 75, 50].map((preset) => (
                <button
                  key={`width-preset-${preset}`}
                  type="button"
                  onClick={() => handleWidthPresetClick(preset)}
                  className="rounded border border-white/15 px-2 py-1 text-[0.7rem] font-medium uppercase tracking-wider text-white/70 transition-colors hover:border-gabardo-light-blue/60 hover:text-white"
                  disabled={!isEditable}
                >
                  {preset}%
                </button>
              ))}
            </div>
          </div>
          {selectedImage.caption && (
            <div className="w-full text-white/50">
              Legenda atual: <span className="text-white/70">{selectedImage.caption}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Placeholder({ placeholder }: { placeholder: string }) {
  return (
    <div className="pointer-events-none absolute top-4 left-4 right-4 text-base text-white/40">
      {placeholder}
    </div>
  );
}

type PluginErrorBoundaryProps = {
  children: JSX.Element;
  onError: (error: Error) => void;
};

class EditorErrorBoundary extends Component<PluginErrorBoundaryProps, { hasError: boolean }> {
  constructor(props: PluginErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Lexical editor crashed', error, errorInfo);
    }
    this.props.onError(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-xl border border-red-500/40 bg-red-900/20 p-4 text-sm text-red-200">
          Ocorreu um erro ao renderizar o editor de texto. Recarregue a página para tentar novamente.
        </div>
      );
    }

    return this.props.children;
  }
}

const ErrorBoundary = ({ children, onError }: PluginErrorBoundaryProps): JSX.Element => (
  <EditorErrorBoundary onError={onError}>{children}</EditorErrorBoundary>
);

export default function MarkdownLexicalEditor({
  value,
  onChange,
  placeholder = 'Escreva o conteúdo do post aqui...',
  readOnly,
  className,
}: MarkdownLexicalEditorProps) {
  const normalizedValue = useMemo(() => ensureLexicalContent(value ?? ''), [value]);
  const externalValueRef = useRef(normalizedValue);

  useEffect(() => {
    const nextValue = ensureLexicalContent(value ?? '');
    if (externalValueRef.current !== nextValue) {
      externalValueRef.current = nextValue;
    }
  }, [value]);

  const initialConfig = useMemo<InitialConfigType>(
    () => ({
      ...BASE_CONFIG,
      editable: !readOnly,
    }),
    [readOnly],
  );

  return (
    <div className={clsx('space-y-4', className)}>
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin />
        <div className="relative rounded-2xl border border-white/10 bg-white/5">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="min-h-[320px] w-full rounded-2xl px-4 py-4 text-base text-white focus:outline-none"
              />
            }
            placeholder={<Placeholder placeholder={placeholder} />}
            ErrorBoundary={ErrorBoundary}
          />
          <HistoryPlugin />
          <ListPlugin />
          <LinkPlugin />
          <ImagePlugin />
          <MarkdownShortcutPlugin transformers={MARKDOWN_TRANSFORMERS} />
          {!readOnly && <AutoFocusPlugin />}
          <MarkdownInitializerPlugin lexicalState={normalizedValue} readOnly={readOnly} externalValueRef={externalValueRef} />
          <MarkdownChangePlugin readOnly={readOnly} onChange={onChange} externalValueRef={externalValueRef} />
        </div>
      </LexicalComposer>
    </div>
  );
}
