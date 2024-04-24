import Order from '@/app/components/order';
import ApplicantTable from '@/app/components/applicants/applicant-table';
import Spinner from '@/app/components/spinner';
import Pagination from '@/app/components/pagination';
import { orderOptions } from '@/app/lib/applicants-on-jobs-order-options';
import { fetchApplicantsOnJobsTotalPages } from '@/app/lib/data';
import { ApplicantsOnJobsPageSearchParams } from '@/app/lib/types';
import { auth } from '@/auth';
import { Suspense } from 'react';

interface Props {
  searchParams: ApplicantsOnJobsPageSearchParams;
}

export default async function Page({ searchParams }: Props) {
  const { orderBy, page } = searchParams;
  const parsedOrderBy = orderBy ? JSON.parse(orderBy) : orderBy;
  const currentPage = Number(page) || 1;
  const user = (await auth())?.user;
  const userId = user?.id as string;
  const totalPages = await fetchApplicantsOnJobsTotalPages({ userId });
  return (
    <main>
      <h2 className='text-center mb-4'>Applicants List</h2>
      <Order options={orderOptions} />
      <Suspense key={JSON.stringify(searchParams)} fallback={<Spinner />}>
        <ApplicantTable filters={{ userId }} orderBy={parsedOrderBy} page={currentPage} />
      </Suspense>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </main>
  );
}
