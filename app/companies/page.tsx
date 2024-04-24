import { Prisma } from '@prisma/client';
import { CompaniesPageSearchParams } from '../lib/types';
import Breadcrumbs from '../components/breadcrumbs';
import Filters from '../components/companies/filters';
import Order from '../components/order';
import CompanyList from '../components/companies/company-list';
import Spinner from '../components/spinner';
import { Suspense } from 'react';
import { orderOptions } from '../lib/company-order-options';
import { fetchCompaniesTotalPages } from '../lib/data';
import Pagination from '../components/pagination';
import styles from './page.module.scss';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Companies',
};

interface Props {
  searchParams: CompaniesPageSearchParams;
}

export default async function Page({ searchParams }: Props) {
  const { orderBy, page, ...filters } = searchParams;
  const parsedOrderBy = orderBy
    ? (JSON.parse(orderBy) as Prisma.CompanyOrderByWithRelationInput)
    : undefined;
  const currentPage = Number(searchParams.page) || 1;
  const totalPages = await fetchCompaniesTotalPages(filters);
  return (
    <main className='main'>
      <Breadcrumbs items={[{ label: 'companies' }]} />
      <h2 className='section-title'>All Companies</h2>
      <div className={styles.container}>
        <Filters />
        <div>
          <Order options={orderOptions} />
          <Suspense key={JSON.stringify(searchParams)} fallback={<Spinner />}>
            <CompanyList filters={filters} orderBy={parsedOrderBy} page={currentPage} />
          </Suspense>
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      </div>
    </main>
  );
}
