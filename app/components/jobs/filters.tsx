'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { Category } from '@prisma/client';
import { jobTypes } from '@/app/lib/job-types';

export default function Filters({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries()) as Record<string, string>;
    const params = new URLSearchParams(searchParams);
    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <aside>
      <form onSubmit={handleSubmit} className='form'>
        <div>
          <label htmlFor='query'>search:</label>
          <input
            type='text'
            name='query'
            id='query'
            placeholder='Title, location, company name'
            defaultValue={searchParams.get('query') || undefined}
          />
        </div>
        <div>
          <label htmlFor='category'>category:</label>
          <select
            name='categoryName'
            id='category'
            defaultValue={searchParams.get('categoryName') || ''}
          >
            <option value=''>all</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor='type'>type:</label>
          <select name='type' id='type' defaultValue={searchParams.get('type') || ''}>
            <option value=''>all</option>
            {jobTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <button type='submit' className='btn'>
          apply
        </button>
      </form>
    </aside>
  );
}
