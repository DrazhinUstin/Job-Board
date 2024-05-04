import { Editor } from '@tiptap/react';

export default function CharacterCount({
  editor,
  characterLimit,
}: {
  editor: Editor;
  characterLimit: number;
}) {
  const characterCount = editor.storage.characterCount.characters();
  const wordCount = editor.storage.characterCount.words();
  const isLimitExceeded = characterCount === characterLimit;
  return (
    <p className='tiptap-character-count'>
      <span className={isLimitExceeded ? 'limit' : undefined}>
        {characterCount} / {characterLimit}
      </span>{' '}
      characters, <span className={isLimitExceeded ? 'limit' : undefined}>{wordCount}</span> words
    </p>
  );
}
