'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import styles from '@/app/companies/[id]/layout.module.scss';

export default function NavLinks({ jobsCount }: { jobsCount: number }) {
  const { id: companyId } = useParams();
  const pathname = usePathname();
  const links = [
    { id: 1, href: `/companies/${companyId}`, label: 'overview' },
    { id: 2, href: `/companies/${companyId}/jobs`, label: `active jobs (${jobsCount})` },
  ];
  return (
    <>
      {links.map(({ id, href, label }) => (
        <Link key={id} href={href} className={href === pathname ? styles.active : undefined}>
          {label}
        </Link>
      ))}
    </>
  );
}
