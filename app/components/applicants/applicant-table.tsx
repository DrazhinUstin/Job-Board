import { fetchApplicantsOnJobs } from '@/app/lib/data';
import { ApplicantsOnJobsFilters } from '@/app/lib/types';
import { Prisma } from '@prisma/client';
import ApplicantRow from './applicant-row';

export default async function ApplicantTable({
  filters,
  orderBy,
  page,
}: {
  filters: ApplicantsOnJobsFilters;
  orderBy?: Prisma.ApplicantsOnJobsOrderByWithRelationInput;
  page?: number;
}) {
  const applicantsOnJobs = await fetchApplicantsOnJobs(filters, orderBy, page);
  return (
    <div>
      {applicantsOnJobs.map((applicantOnJob) => (
        <ApplicantRow
          key={applicantOnJob.applicant.id + applicantOnJob.job.id}
          {...applicantOnJob}
        />
      ))}
      {applicantsOnJobs.length === 0 && <p>No applicants were found</p>}
    </div>
  );
}