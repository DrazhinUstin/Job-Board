import { Prisma } from '@prisma/client';
import { CompaniesPageSearchParams } from '../lib/types';
import Filters from '../components/companies/filters';
import Order from '../components/order';
import CompanyList from '../components/companies/company-list';
import { Suspense } from 'react';
import { orderOptions } from '../lib/company-order-options';
import { fetchCompaniesTotalPages } from '../lib/data';
import Pagination from '../components/pagination';

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
    <main>
      <h2>All Companies</h2>
      <Filters />
      <Order options={orderOptions} />
      <Suspense key={JSON.stringify(searchParams)} fallback={<h2>LOADING...</h2>}>
        <CompanyList filters={filters} orderBy={parsedOrderBy} page={currentPage} />
      </Suspense>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </main>
  );
}
