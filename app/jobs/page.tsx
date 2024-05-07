import { fetchCategories, fetchJobsTotalPages } from '../lib/data';
import Breadcrumbs from '../components/breadcrumbs';
import Filters from '../components/jobs/filters';
import Order from '../components/order';
import JobList from '../components/jobs/job-list';
import Spinner from '../components/spinner';
import { Suspense } from 'react';
import { Prisma } from '@prisma/client';
import Pagination from '../components/pagination';
import { Metadata } from 'next';
import { JobsPageSearchParams } from '../lib/types';
import { orderOptions } from '../lib/job-order-options';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'Jobs',
};

interface PageProps {
  searchParams: JobsPageSearchParams;
}

export default async function Page({ searchParams }: PageProps) {
  const { orderBy, page, ...rest } = searchParams;
  const parsedOrderBy = orderBy
    ? (JSON.parse(orderBy) as Prisma.JobOrderByWithRelationInput)
    : undefined;
  const currentPage = Number(page) || 1;
  const minSalary = rest.minSalary ? Number(rest.minSalary) * 100 : undefined;
  const maxSalary = rest.maxSalary ? Number(rest.maxSalary) * 100 : undefined;
  const filters = { ...rest, minSalary, maxSalary };
  const [categories, totalPages] = await Promise.all([
    fetchCategories(),
    fetchJobsTotalPages(filters),
  ]);
  return (
    <main className='main'>
      <Breadcrumbs items={[{ label: 'jobs' }]} />
      <h2 className='section-title'>Jobs</h2>
      <div className={styles.container}>
        <aside>
          <Filters categories={categories} />
        </aside>
        <div>
          <Order options={orderOptions} />
          <Suspense key={JSON.stringify(searchParams)} fallback={<Spinner />}>
            <JobList filters={filters} orderBy={parsedOrderBy} currentPage={currentPage} />
          </Suspense>
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      </div>
    </main>
  );
}
