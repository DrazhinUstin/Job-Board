import Link from 'next/link';
import { Metadata } from 'next';
import Breadcrumbs from '../components/breadcrumbs';

export const metadata: Metadata = {
  title: {
    template: '%s | Profile',
    default: 'Profile',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Breadcrumbs items={[{ label: 'profile' }]} />
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Link href='/profile'>account</Link>
        <Link href='/profile/applicant'>applicant profile</Link>
      </div>
      {children}
    </div>
  );
}
