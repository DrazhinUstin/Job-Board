'use client';

import { User } from 'next-auth';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import styles from './navbar.module.scss';

const navLinks = [
  { id: 1, label: 'home', href: '/' },
  { id: 2, label: 'jobs', href: '/jobs' },
  { id: 3, label: 'companies', href: '/companies' },
];

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
        {navLinks.map(({ id, href, label }) => (
          <Link key={id} href={href} onClick={() => setIsOpen(false)}>
            {label}
          </Link>
        ))}
        {user && (
          <Link href='/dashboard' onClick={() => setIsOpen(false)}>
            dashboard
          </Link>
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
