'use client';

import { useEditor, EditorContent, Content } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CharacterCount from '@tiptap/extension-character-count';
import Menubar from './tiptap-menubar';
import EditorCharacterCount from './tiptap-character-count';

export default function Tiptap({
  label,
  content,
  onChange,
  characterLimit = 1000,
}: {
  label?: string;
  content?: Content;
  onChange: (value: string) => void;
  characterLimit?: number;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
        bulletList: {
          HTMLAttributes: {
            class: 'bullet-list',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'ordered-list',
          },
        },
        blockquote: false,
        code: false,
        codeBlock: false,
        horizontalRule: false,
      }),
      CharacterCount.configure({
        limit: characterLimit,
      }),
    ],
    onUpdate({ editor }) {
      const output = editor.getHTML();
      onChange(output);
    },
    content,
  });

  if (!editor) {
    return null;
  }

  return (
    <div>
      {label && (
        <p className='mb' onClick={() => editor.commands.focus()}>
          {label}
        </p>
      )}
      <Menubar editor={editor} />
      <EditorContent editor={editor} />
      <EditorCharacterCount editor={editor} characterLimit={characterLimit} />
    </div>
  );
}
