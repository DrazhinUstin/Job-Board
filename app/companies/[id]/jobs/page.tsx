import Order from '@/app/components/order';
import JobList from '@/app/components/jobs/job-list';
import Spinner from '@/app/components/spinner';
import Pagination from '@/app/components/pagination';
import { cachedFetchCompanyById, jobsPerPage } from '@/app/lib/data';
import { orderOptions } from '@/app/lib/job-order-options';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { JobsPageSearchParams } from '@/app/lib/types';

interface Props {
  params: { id: string };
  searchParams: Pick<JobsPageSearchParams, 'orderBy' | 'page'>;
}

export default async function Page({ params, searchParams }: Props) {
  const companyId = params.id;
  const data = await cachedFetchCompanyById(companyId);

  if (!data) notFound();

  const { orderBy, page } = searchParams;
  const parsedOrderBy = orderBy && JSON.parse(orderBy);
  const currentPage = Number(page) || 1;
  const totalPages = Math.ceil(data.jobsCount / jobsPerPage);
  return (
    <section>
      <Order options={orderOptions} />
      <Suspense key={JSON.stringify(searchParams)} fallback={<Spinner />}>
        <JobList filters={{ companyId }} orderBy={parsedOrderBy} currentPage={currentPage} />
      </Suspense>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </section>
  );
}
