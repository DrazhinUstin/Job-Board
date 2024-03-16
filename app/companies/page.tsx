import { Prisma } from '@prisma/client';
import { CompaniesPageSearchParams } from '../lib/types';
import Filters from '../components/companies/filters';
import CompanyList from '../components/companies/company-list';
import { Suspense } from 'react';

interface Props {
  searchParams: CompaniesPageSearchParams;
}

export default function Page({ searchParams }: Props) {
  const { orderBy, page, ...filters } = searchParams;
  const parsedOrderBy = orderBy
    ? (JSON.parse(orderBy) as Prisma.CompanyOrderByWithRelationInput)
    : undefined;
  const currentPage = Number(searchParams.page) || 1;
  return (
    <main>
      <h2>All Companies</h2>
      <Filters />
      <Suspense key={JSON.stringify(searchParams)} fallback={<h2>LOADING...</h2>}>
        <CompanyList filters={filters} orderBy={parsedOrderBy} page={currentPage} />
      </Suspense>
    </main>
  );
}
