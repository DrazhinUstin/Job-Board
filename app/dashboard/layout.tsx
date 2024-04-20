import { Metadata } from 'next';
import Breadcrumbs from '../components/breadcrumbs';
import NavLinks from '../components/nav-links';
import { FaHouse, FaBriefcase, FaIdCard, FaBuilding } from 'react-icons/fa6';
import styles from './layout.module.scss';

export const metadata: Metadata = {
  title: {
    template: '%s | Dashboard',
    default: 'Dashboard',
  },
};

const navLinks = [
  {
    id: 1,
    href: '/dashboard',
    label: 'overview',
    icon: <FaHouse />,
  },
  {
    id: 2,
    href: '/dashboard/jobs',
    label: 'manage jobs',
    icon: <FaBriefcase />,
  },
  {
    id: 3,
    href: '/dashboard/applicants',
    label: 'manage applicants',
    icon: <FaIdCard />,
  },
  {
    id: 4,
    href: '/dashboard/company',
    label: 'manage company',
    icon: <FaBuilding />,
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className='main'>
      <Breadcrumbs items={[{ label: 'dashboard' }]} />
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
