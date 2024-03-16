import { auth } from '@/auth';
import Link from 'next/link';

export default async function Navbar() {
  const user = (await auth())?.user;
  return (
    <nav style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <h2>Job Board</h2>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Link href='/'>home</Link>
        <Link href='/jobs'>jobs</Link>
        <Link href='/companies'>companies</Link>
        {user && (
          <>
            <Link href='/dashboard'>dashboard</Link>
            <Link href='/profile'>profile</Link>
          </>
        )}
      </div>
    </nav>
  );
}
