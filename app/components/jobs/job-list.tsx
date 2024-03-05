import { fetchJobs } from '@/app/lib/data';
import type { JobFilters } from '@/app/lib/types';
import JobCard from './job-card';
import { Prisma } from '@prisma/client';

export default async function JobList({
  filters,
  orderBy,
}: {
  filters: JobFilters;
  orderBy?: Prisma.JobOrderByWithRelationInput;
}) {
  const jobs = await fetchJobs(filters, orderBy);
  return (
    <div>
      {jobs.map((job) => (
        <JobCard key={job.id} {...job} />
      ))}
    </div>
  );
}
