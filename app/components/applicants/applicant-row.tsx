import { fetchApplicantsOnJobs } from '@/app/lib/data';
import { Prisma } from '@prisma/client';
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
        <p>contact</p>
      </div>
      <div>
        <DeleteApplicantForm applicantId={applicantId} jobId={jobId} />
      </div>
    </article>
  );
}
