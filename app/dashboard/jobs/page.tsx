import Filters from '@/app/components/jobs/filters';
import Order from '@/app/components/order';
import JobList from '@/app/components/jobs/job-list';
import Pagination from '@/app/components/pagination';
import { fetchCategories, fetchJobsTotalPages } from '@/app/lib/data';
import type { JobsPageSearchParams } from '@/app/lib/types';
import { orderOptions } from '@/app/lib/job-order-options';
import { auth } from '@/auth';
import { Prisma } from '@prisma/client';
import { User } from 'next-auth';
import { Suspense } from 'react';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa6';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jobs',
};

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
      <div className='mb-4'>
        <Link href='/dashboard/jobs/create' className='btn-flex'>
          <FaPlus />
          create a job
        </Link>
      </div>
      <div>
        <div className='mb-4'>
          <Filters categories={categories} />
        </div>
        <Order options={orderOptions} />
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
