import { fetchCompanies } from '@/app/lib/data';
import { CompanyFilters } from '@/app/lib/types';
import { Prisma } from '@prisma/client';
import CompanyCard from './company-card';
import styles from './company-list.module.scss';

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
      <div className={styles.container}>
        {companies.map((company) => (
          <CompanyCard key={company.id} {...company} />
        ))}
      </div>
      {companies.length === 0 && <p className='text-center'>No companies were found</p>}
    </div>
  );
}
