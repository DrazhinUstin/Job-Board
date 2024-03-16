import { fetchCompanies } from '@/app/lib/data';
import { CompanyFilters } from '@/app/lib/types';
import { Prisma } from '@prisma/client';
import CompanyCard from './company-card';

export default async function CompanyList({
  filters,
  orderBy,
  page,
}: {
  filters: CompanyFilters;
  orderBy?: Prisma.CompanyOrderByWithRelationInput;
  page?: number;
}) {
  const companies = await fetchCompanies(filters, orderBy, page);
  return (
    <div>
      {companies.map((company) => (
        <CompanyCard key={company.id} {...company} />
      ))}
      {companies.length === 0 && <p>No companies was found</p>}
    </div>
  );
}
