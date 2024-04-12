'use client';

import { Prisma } from '@prisma/client';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import styles from './order.module.scss';

interface Props {
  options: {
    id: number;
    label: string;
    value:
      | Prisma.JobOrderByWithRelationInput
      | Prisma.CompanyOrderByWithRelationInput
      | Prisma.ApplicantsOnJobsOrderByWithRelationInput;
  }[];
}

export default function Order({ options }: Props) {
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
    <div className={styles.container}>
      <label htmlFor='orderBy'>order by:</label>
      <select
        name='orderBy'
        id='orderBy'
        onChange={handleChange}
        defaultValue={searchParams.get('orderBy') || undefined}
      >
        {options.map((option) => (
          <option key={option.id} value={JSON.stringify(option.value)}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
