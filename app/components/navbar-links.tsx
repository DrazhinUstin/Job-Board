'use client';

import { User } from 'next-auth';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { pageLinks } from '@/app/lib/page-links';
import styles from './navbar.module.scss';

export default function NavbarLinks({ user }: { user: User | undefined }) {
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const links = linksRef.current;
    if (!links) return;
    if (isOpen) {
      const delay = parseFloat(getComputedStyle(document.body).getPropertyValue('--delay')) || 0.25;
      links
        .querySelectorAll('a')
        .forEach(
          (link, index, arr) =>
            (link.style.animation = `appearance 0.25s ease-in-out ${
              delay + index / arr.length
            }s forwards`)
        );
    } else {
      links.querySelectorAll('a').forEach((link) => (link.style.animation = ''));
    }
  }, [isOpen]);

  return (
    <>
      <div className={clsx(styles.links, { [styles.open]: isOpen })} ref={linksRef}>
        {pageLinks.map(
          ({ id, href, label, isProtected }) =>
            ((isProtected && user) || !isProtected) && (
              <Link key={id} href={href} onClick={() => setIsOpen(false)}>
                {label}
              </Link>
            )
        )}
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(styles.button, { [styles.active]: isOpen })}
      >
        <span></span>
      </button>
    </>
  );
}
