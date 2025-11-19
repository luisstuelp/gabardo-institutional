import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $insertNodes, COMMAND_PRIORITY_EDITOR, $setSelection, $createNodeSelection } from 'lexical';
import { useEffect } from 'react';
import { $createImageNode, INSERT_IMAGE_COMMAND, type ImagePayload } from '../nodes/ImageNode';

export default function ImagePlugin(): null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      INSERT_IMAGE_COMMAND,
      (payload: ImagePayload) => {
        const imageNode = $createImageNode({
          src: payload.src,
          alt: payload.alt ?? '',
          widthPercentage: payload.widthPercentage ?? 100,
          caption: payload.caption ?? '',
        });
        $insertNodes([imageNode]);

        const nodeSelection = $createNodeSelection();
        nodeSelection.add(imageNode.getKey());
        $setSelection(nodeSelection);
        return true;
      },
      COMMAND_PRIORITY_EDITOR,
    );
  }, [editor]);

  return null;
}
