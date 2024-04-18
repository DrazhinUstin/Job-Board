import Order from '@/app/components/order';
import JobList from '@/app/components/jobs/job-list';
import Pagination from '@/app/components/pagination';
import { fetchJobsTotalPages } from '@/app/lib/data';
import { orderOptions } from '@/app/lib/job-order-options';
import { JobsPageSearchParams } from '@/app/lib/types';
import { auth } from '@/auth';
import { Suspense } from 'react';

interface Props {
  searchParams: Pick<JobsPageSearchParams, 'orderBy' | 'page'>;
}

export default async function Page({ searchParams }: Props) {
  const { orderBy, page } = searchParams;
  const parsedOrderBy = orderBy && JSON.parse(orderBy);
  const currentPage = Number(page) || 1;
  const currentUser = (await auth())?.user;
  const totalPages = await fetchJobsTotalPages({ applicantUserId: currentUser?.id });
  return (
    <section>
      <Order options={orderOptions} />
      <Suspense key={JSON.stringify(searchParams)} fallback={<h2>LOADING...</h2>}>
        <JobList
          filters={{ applicantUserId: currentUser?.id }}
          orderBy={parsedOrderBy}
          currentPage={currentPage}
        />
      </Suspense>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </section>
  );
}
