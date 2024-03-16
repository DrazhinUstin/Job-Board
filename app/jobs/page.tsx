import { fetchCategories, fetchJobsTotalPages } from '../lib/data';
import Filters from '../components/jobs/filters';
import Order from '../components/order';
import JobList from '../components/jobs/job-list';
import { Suspense } from 'react';
import { Prisma } from '@prisma/client';
import Pagination from '../components/pagination';
import { Metadata } from 'next';
import { JobsPageSearchParams } from '../lib/types';
import { orderOptions } from '../lib/job-order-options';

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
  const [categories, totalPages] = await Promise.all([
    fetchCategories(),
    fetchJobsTotalPages(filters),
  ]);
  return (
    <main>
      <h2>Jobs</h2>
      <p>This is a page where you can view all available jobs</p>
      <div>
        <Filters categories={categories} />
        <Order options={orderOptions} />
        <Suspense key={JSON.stringify(searchParams)} fallback={<h2>LOADING...</h2>}>
          <JobList filters={filters} orderBy={parsedOrderBy} currentPage={currentPage} />
        </Suspense>
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </main>
  );
}
