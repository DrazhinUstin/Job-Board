import { Metadata } from 'next';
import Breadcrumbs from '../components/breadcrumbs';
import NavLinks from '../components/nav-links';
import { FaCircleUser, FaBriefcase } from 'react-icons/fa6';
import styles from './layout.module.scss';

export const metadata: Metadata = {
  title: {
    template: '%s | Profile',
    default: 'Profile',
  },
};

const navLinks = [
  { id: 1, href: '/profile', label: 'account', icon: <FaCircleUser /> },
  {
    id: 2,
    href: '/profile/applicant',
    label: 'applicant profile',
    icon: <FaBriefcase />,
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className='main'>
      <Breadcrumbs items={[{ label: 'profile' }]} />
      <div className={styles.container}>
        <aside>
          <nav className={styles.sidenav}>
            <NavLinks items={navLinks} />
          </nav>
        </aside>
        {children}
      </div>
    </main>
  );
}
