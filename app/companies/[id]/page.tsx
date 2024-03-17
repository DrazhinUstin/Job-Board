import CompanyDetails from '@/app/components/companies/company-details';
import Order from '@/app/components/order';
import JobList from '@/app/components/jobs/job-list';
import Pagination from '@/app/components/pagination';
import { fetchCompanyById, jobsPerPage } from '@/app/lib/data';
import { orderOptions } from '@/app/lib/job-order-options';
import { notFound } from 'next/navigation';
import { cache, Suspense } from 'react';
import { Metadata } from 'next';

const cashedFetchCompany = cache(fetchCompanyById);

interface Props {
  params: { id: string };
  searchParams: { orderBy?: string; page?: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await cashedFetchCompany(params.id);

  if (!data) notFound();

  return { title: data.name };
}

export default async function Page({ params, searchParams }: Props) {
  const data = await cashedFetchCompany(params.id);

  if (!data) notFound();

  const { jobsCount, ...company } = data;
  const totalPages = Math.ceil(jobsCount / jobsPerPage);
  const { orderBy, page } = searchParams;
  const parsedOrderBy = orderBy && JSON.parse(orderBy);
  const currentPage = Number(page) || 1;
  return (
    <main>
      <CompanyDetails {...company} />
      <h3>Company Jobs</h3>
      <Order options={orderOptions} />
      <Suspense key={JSON.stringify(searchParams)} fallback={<h2>LOADING...</h2>}>
        <JobList
          filters={{ userId: company.userId }}
          orderBy={parsedOrderBy}
          currentPage={currentPage}
        />
      </Suspense>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </main>
  );
}
