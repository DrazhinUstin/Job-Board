import { auth } from '@/auth';
import Link from 'next/link';
import { pageLinks } from '@/app/lib/page-links';
import { FaGithub } from 'react-icons/fa6';
import Logo from './logo';
import styles from './footer.module.scss';

export default async function Footer() {
  const user = (await auth())?.user;
  return (
    <footer className={styles.container}>
      <div className='section-center'>
        <Logo />
        <nav className={styles.links}>
          {pageLinks.map(
            ({ id, label, href, isProtected }) =>
              ((isProtected && user) || !isProtected) && (
                <Link key={id} href={href}>
                  {label}
                </Link>
              )
          )}
        </nav>
      </div>
      <div>
        <div className='section-center'>
          <p className='flex-center'>
            © {new Date().getFullYear()} Job Board
            <a
              href='https://github.com/DrazhinUstin/Job-Board'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaGithub />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
