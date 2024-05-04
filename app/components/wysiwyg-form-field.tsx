'use client';

import { useState } from 'react';
import Tiptap from '@/app/components/tiptap';

export default function WysiwygFormField({
  name,
  label,
  initialValue = '',
}: {
  name: string;
  label?: string;
  initialValue?: string;
}) {
  const [value, setValue] = useState<string>(initialValue);

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tiptap label={label || name} content={initialValue} onChange={handleChange} />
      <textarea name={name} value={value} readOnly hidden></textarea>
    </div>
  );
}
