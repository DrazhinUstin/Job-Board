'use client';

import { generatePagination } from '@/app/lib/utils';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import styles from './pagination.module.scss';

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pages = generatePagination(currentPage, totalPages);

  const createPageURL = (page: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    return `${pathname}?${params.toString()}`;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={styles.container}>
      <PageArrow
        direction='left'
        disabled={currentPage <= 1}
        href={createPageURL(currentPage - 1)}
      />
      {pages.map((page, index) => (
        <PageNumber
          key={index}
          number={page}
          href={createPageURL(page)}
          isActive={page === currentPage}
        />
      ))}
      <PageArrow
        direction='right'
        disabled={currentPage >= totalPages}
        href={createPageURL(currentPage + 1)}
      />
    </div>
  );
}

function PageNumber({
  number,
  href,
  isActive,
}: {
  number: ReturnType<typeof generatePagination>[0];
  href: string;
  isActive: boolean;
}) {
  return (
    <>{isActive || number === '...' ? <span>{number}</span> : <Link href={href}>{number}</Link>}</>
  );
}

function PageArrow({
  direction,
  disabled,
  href,
}: {
  direction: 'left' | 'right';
  disabled: boolean;
  href: string;
}) {
  const icon = direction === 'left' ? '<' : '>';
  return <>{disabled ? <span>{icon}</span> : <Link href={href}>{icon}</Link>}</>;
}
