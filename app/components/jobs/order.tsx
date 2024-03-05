'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { orderOptions } from '@/app/lib/job-order-options';

export default function Order() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams);
    params.set('orderBy', value);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <label htmlFor='orderBy'>order by:</label>
      <select
        name='orderBy'
        id='orderBy'
        onChange={handleChange}
        defaultValue={searchParams.get('orderBy') || undefined}
      >
        {orderOptions.map((option) => (
          <option key={option.id} value={JSON.stringify(option.value)}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
