'use client';

import { User } from 'next-auth';
import Link from 'next/link';
import { useState } from 'react';
import Avatar from './avatar';

export default function NavbarUser({ children, user }: { children: React.ReactNode; user: User }) {
  const [isMenuOpen, setIsMenuOpen] = useState<Boolean>(false);
  return (
    <div style={{ position: 'relative' }}>
      <Avatar src={user.image} width={40} height={40} onClick={() => setIsMenuOpen(!isMenuOpen)} />
      {isMenuOpen && (
        <ul style={{ position: 'absolute', top: '100%', right: 0 }}>
          <li onClick={() => setIsMenuOpen(false)}>
            <Link href='/profile'>profile</Link>
          </li>
          <li>{children}</li>
        </ul>
      )}
    </div>
  );
}
