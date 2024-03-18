import { prisma } from '@/client';
import { cachedFetchCompanyById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import CompanyDetails from '@/app/components/companies/company-details';

export async function generateStaticParams() {
  const allCompanies = await prisma.company.findMany({ select: { id: true } });
  return allCompanies.map(({ id }) => ({ id }));
}

export default async function Page({ params }: { params: { id: string } }) {
  const data = await cachedFetchCompanyById(params.id);

  if (!data) notFound();

  return (
    <main>
      <CompanyDetails {...data} />
    </main>
  );
}
