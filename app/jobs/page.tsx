import Link from 'next/link';
import { fetchCategories } from '../lib/data';
import Filters from '../components/jobs/filters';
import Order from '../components/jobs/order';
import JobList from '../components/jobs/job-list';
import { Suspense } from 'react';
import { Prisma } from '@prisma/client';

interface PageProps {
  searchParams: {
    query?: string;
    categoryName?: string;
    type?: string;
    orderBy?: string;
  };
}

export default async function Page({ searchParams }: PageProps) {
  const categories = await fetchCategories();
  const { orderBy, ...filters } = searchParams;
  const parsedOrderBy = orderBy
    ? (JSON.parse(orderBy) as Prisma.JobOrderByWithRelationInput)
    : undefined;
  return (
    <main>
      <h2>Jobs</h2>
      <p>This is a page where you can view all available jobs</p>
      <Link href='/jobs/create'>create a job</Link>
      <div>
        <Filters categories={categories} />
        <Order />
        <Suspense key={JSON.stringify(searchParams)} fallback={<h2>LOADING...</h2>}>
          <JobList filters={filters} orderBy={parsedOrderBy} />
        </Suspense>
      </div>
    </main>
  );
}
