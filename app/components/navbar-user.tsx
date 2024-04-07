'use client';

import { User } from 'next-auth';
import Link from 'next/link';
import { useState } from 'react';
import Avatar from './avatar';
import { FaUserCircle } from 'react-icons/fa';
import styles from './navbar.module.scss';

export default function NavbarUser({ children, user }: { children: React.ReactNode; user: User }) {
  const [isMenuOpen, setIsMenuOpen] = useState<Boolean>(false);
  return (
    <div className={styles.user}>
      <Avatar src={user.image} width={40} height={40} onClick={() => setIsMenuOpen(!isMenuOpen)} />
      {isMenuOpen && (
        <ul>
          <li onClick={() => setIsMenuOpen(false)}>
            <Link href='/profile'>
              <FaUserCircle />
              profile
            </Link>
          </li>
          <li>{children}</li>
        </ul>
      )}
    </div>
  );
}
