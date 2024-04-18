'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import styles from './nav-links.module.scss';

export default function NavLinks({
  items,
  variant = 'base',
}: {
  items: { id: number; href: string; label: string; icon?: React.ReactElement }[];
  variant?: 'base' | 'alternative';
}) {
  const pathname = usePathname();
  return (
    <>
      {items.map(({ id, href, label, icon }) => (
        <Link
          key={id}
          href={href}
          className={clsx(variant === 'base' ? styles.link : styles.link_alt, {
            [styles.active]: href === pathname,
          })}
        >
          {icon}
          {label}
        </Link>
      ))}
    </>
  );
}
