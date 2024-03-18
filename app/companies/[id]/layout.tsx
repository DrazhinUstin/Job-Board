import { cachedFetchCompanyById } from '@/app/lib/data';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

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
    <div>
      <header style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Image src={data.logoUrl || ''} alt='company logo' width={50} height={50} />
        <h4>{data.name}</h4>
      </header>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link href={`/companies/${id}`}>about company</Link>
        <Link href={`/companies/${id}/jobs`}>active jobs</Link>
      </div>
      {children}
    </div>
  );
}
