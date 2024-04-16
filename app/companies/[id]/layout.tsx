import { cachedFetchCompanyById } from '@/app/lib/data';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/app/components/breadcrumbs';
import CompanyLogo from '@/app/components/company-logo';
import NavLinks from '@/app/components/companies/nav-links';
import styles from './layout.module.scss';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const data = await cachedFetchCompanyById(params.id);

  if (!data) notFound();

  return { title: data.name };
}

export default async function Layout({
  children,
  params: { id },
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const data = await cachedFetchCompanyById(id);

  if (!data) notFound();

  return (
    <main className='main'>
      <Breadcrumbs items={[{ label: 'companies', href: '/companies' }, { label: data.name }]} />
      <header className={styles.header}>
        <CompanyLogo src={data.logoUrl} width={100} height={100} />
        <h2>{data.name}</h2>
      </header>
      <nav className={styles.nav}>
        <NavLinks jobsCount={data.jobsCount} />
      </nav>
      {children}
    </main>
  );
}
