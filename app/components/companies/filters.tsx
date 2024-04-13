'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export default function Filters() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries()) as Record<string, string>;
    const params = new URLSearchParams(searchParams);
    Object.entries(values).forEach(([key, value]) => {
      if (value.trim()) {
        params.set(key, value.trim());
      } else {
        params.delete(key);
      }
    });
    params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className='form'>
      <div>
        <label htmlFor='query'>search:</label>
        <input
          type='text'
          name='query'
          id='query'
          placeholder='Name, location'
          defaultValue={searchParams.get('query') || undefined}
        />
      </div>
      <button type='submit' className='btn'>
        apply
      </button>
    </form>
  );
}
