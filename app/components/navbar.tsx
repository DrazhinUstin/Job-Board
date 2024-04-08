import { auth } from '@/auth';
import Link from 'next/link';
import NavbarLinks from './navbar-links';
import NavbarUser from './navbar-user';
import SignOutForm from './auth/sign-out-form';
import styles from './navbar.module.scss';

export default async function Navbar() {
  const user = (await auth())?.user;
  return (
    <nav className={styles.nav}>
      <div className='section-center'>
        <h2>Job Board</h2>
        <NavbarLinks user={user} />
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
