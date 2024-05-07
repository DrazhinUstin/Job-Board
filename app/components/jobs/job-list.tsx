import { fetchJobs } from '@/app/lib/data';
import type { JobFilters } from '@/app/lib/types';
import JobCard from './job-card';
import { Prisma } from '@prisma/client';
import styles from './job-list.module.scss';

export default async function JobList({
  filters,
  orderBy,
  currentPage,
}: {
  filters: JobFilters;
  orderBy?: Prisma.JobOrderByWithRelationInput;
  currentPage: number;
}) {
  const jobs = await fetchJobs(filters, orderBy, currentPage);
  return (
    <div>
      <div className={styles.container}>
        {jobs.map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
      </div>
      {jobs.length === 0 && <p className='text-center'>No jobs were found</p>}
    </div>
  );
}
