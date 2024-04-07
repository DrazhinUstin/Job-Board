import { auth } from '@/auth';
import Link from 'next/link';
import NavbarUser from './navbar-user';
import SignOutForm from './auth/sign-out-form';
import styles from './navbar.module.scss';

const navLinks = [
  { id: 1, label: 'home', href: '/' },
  { id: 2, label: 'jobs', href: '/jobs' },
  { id: 3, label: 'companies', href: '/companies' },
];

export default async function Navbar() {
  const user = (await auth())?.user;
  return (
    <nav className={styles.nav}>
      <div className='section-center'>
        <h2>Job Board</h2>
        <div className={styles.links}>
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
            <Link className='btn-alt' href='/auth/signin'>
              sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
