import { fetchApplicantsOnJobs } from '@/app/lib/data';
import { Prisma } from '@prisma/client';
import Link from 'next/link';
import DeleteApplicantForm from './delete-applicant-form';

export default function ApplicantRow({
  applicant: { id: applicantId, fullName },
  job: { id: jobId, title },
  appliedAt,
}: Prisma.PromiseReturnType<typeof fetchApplicantsOnJobs>[0]) {
  return (
    <article style={{ display: 'flex', gap: '0.5rem' }}>
      <div>
        <h4>{fullName}</h4>
      </div>
      <div>
        <h4>{title}</h4>
      </div>
      <div>
        <p>{appliedAt.toDateString()}</p>
      </div>
      <div>
        <p>
          <Link href={`/dashboard/applicants/${applicantId}`} scroll={false}>
            browse
          </Link>
        </p>
      </div>
      <div>
        <DeleteApplicantForm applicantId={applicantId} jobId={jobId} />
      </div>
    </article>
  );
}
