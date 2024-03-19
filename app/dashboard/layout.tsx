import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '../components/breadcrumbs';

export const metadata: Metadata = {
  title: {
    template: '%s | Dashboard',
    default: 'Dashboard',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Breadcrumbs items={[{ label: 'dashboard' }]} />
      <h2>Dashboard</h2>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Link href='/dashboard'>overview</Link>
        <Link href='/dashboard/jobs'>manage jobs</Link>
        <Link href='/dashboard/company'>manage company</Link>
      </div>
      {children}
    </div>
  );
}
