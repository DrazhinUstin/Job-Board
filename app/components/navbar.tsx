import { auth } from '@/auth';
import Link from 'next/link';
import NavbarUser from './navbar-user';
import SignOutForm from './auth/sign-out-form';

const navLinks = [
  { id: 1, label: 'home', href: '/' },
  { id: 2, label: 'jobs', href: '/jobs' },
  { id: 3, label: 'companies', href: '/companies' },
];

export default async function Navbar() {
  const user = (await auth())?.user;
  return (
    <nav style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <h2>Job Board</h2>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {navLinks.map(({ id, href, label }) => (
          <Link key={id} href={href}>
            {label}
          </Link>
        ))}
        {user && <Link href='/dashboard'>dashboard</Link>}
      </div>
      <div>
        {user ? (
          <NavbarUser user={user}>
            <SignOutForm />
          </NavbarUser>
        ) : (
          <Link href='/auth/signin'>sign in</Link>
        )}
      </div>
    </nav>
  );
}
