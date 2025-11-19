import { TRANSFORMERS } from '@lexical/markdown';

import { IMAGE_MARKDOWN_TRANSFORMER } from './imageMarkdownTransformer';

export const MARKDOWN_TRANSFORMERS = [...TRANSFORMERS, IMAGE_MARKDOWN_TRANSFORMER];
