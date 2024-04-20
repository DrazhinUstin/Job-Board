import { fetchApplicantsOnJobs } from '@/app/lib/data';
import { Prisma } from '@prisma/client';
import Link from 'next/link';
import DeleteApplicantForm from './delete-applicant-form';
import Avatar from '../avatar';
import { FaEye } from 'react-icons/fa6';
import styles from './applicant-table.module.scss';

export default function ApplicantRow({
  applicant: { id: applicantId, fullName, photoUrl },
  job: { id: jobId, title },
  appliedAt,
}: Prisma.PromiseReturnType<typeof fetchApplicantsOnJobs>[0]) {
  return (
    <article className={styles.row}>
      <div>
        <Avatar src={photoUrl} width={32} height={32} />
        <p>{fullName}</p>
      </div>
      <div>
        <Link href={`/jobs/${jobId}`} className='text-link'>
          <p>{title}</p>
        </Link>
      </div>
      <div>
        <p>{appliedAt.toDateString()}</p>
      </div>
      <div className='grid-center'>
        <Link href={`/dashboard/applicants/${applicantId}`} scroll={false} className='btn'>
          <FaEye />
        </Link>
      </div>
      <div>
        <DeleteApplicantForm applicantId={applicantId} jobId={jobId} />
      </div>
    </article>
  );
}
