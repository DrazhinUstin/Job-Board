import { fetchApplicantsOnJobs } from '@/app/lib/data';
import { Prisma } from '@prisma/client';
import Link from 'next/link';
import DeleteApplicantForm from './delete-applicant-form';
import Avatar from '../avatar';

export default function ApplicantRow({
  applicant: { id: applicantId, fullName, photoUrl },
  job: { id: jobId, title },
  appliedAt,
}: Prisma.PromiseReturnType<typeof fetchApplicantsOnJobs>[0]) {
  return (
    <article style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Avatar src={photoUrl} width={40} height={40} />
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
