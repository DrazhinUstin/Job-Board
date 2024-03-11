import Filters from '@/app/components/jobs/filters';
import Order from '@/app/components/jobs/order';
import JobList from '@/app/components/jobs/job-list';
import Pagination from '@/app/components/jobs/pagination';
import { fetchCategories, fetchJobsTotalPages } from '@/app/lib/data';
import type { JobsPageSearchParams } from '@/app/lib/types';
import { auth } from '@/auth';
import { Prisma } from '@prisma/client';
import { User } from 'next-auth';
import { Suspense } from 'react';

interface PageProps {
  searchParams: JobsPageSearchParams;
}

export default async function Page({ searchParams }: PageProps) {
  const { orderBy, page, ...filters } = searchParams;
  const parsedOrderBy = orderBy
    ? (JSON.parse(orderBy) as Prisma.JobOrderByWithRelationInput)
    : undefined;
  const currentPage = Number(page) || 1;
  const currentUser = (await auth())?.user as User;
  const [categories, totalPages] = await Promise.all([
    fetchCategories(),
    fetchJobsTotalPages({ ...filters, userId: currentUser.id }),
  ]);
  return (
    <main>
      <div>
        <Filters categories={categories} />
        <Order />
        <Suspense key={JSON.stringify(searchParams)} fallback={<h2>LOADING...</h2>}>
          <JobList
            filters={{ ...filters, userId: currentUser.id }}
            orderBy={parsedOrderBy}
            currentPage={currentPage}
          />
        </Suspense>
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </main>
  );
}
