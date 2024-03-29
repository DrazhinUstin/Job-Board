import { auth } from '@/auth';
import { Prisma } from '@prisma/client';
import Image from 'next/image';
import ApplyJobForm from './apply-job-form';
import DeleteJobForm from './delete-job-form';
import Link from 'next/link';
import { fetchJobById } from '@/app/lib/data';

export default async function JobDetails({
  id,
  userId,
  categoryName,
  title,
  type,
  location,
  description,
  salary,
  contactEmail,
  contactUrl,
  createdAt,
  company,
}: Exclude<Prisma.PromiseReturnType<typeof fetchJobById>, null>) {
  const user = (await auth())?.user;
  return (
    <section>
      <h2>{title}</h2>
      {user && user?.id !== userId && <ApplyJobForm jobId={id} />}
      <div>
        <h3>organization:</h3>
        <div>
          <Image src={company?.logoUrl || ''} alt='company logo' width={50} height={50} />
          <p>{company?.name || 'N/A'}</p>
          {company && <Link href={`/companies/${company.id}`}>browse</Link>}
        </div>
      </div>
      <div>
        <h3>job overview:</h3>
        <p>
          category: <span>{categoryName}</span>
        </p>
        <p>
          type: <span>{type}</span>
        </p>
        {location && (
          <p>
            location: <span>{location}</span>
          </p>
        )}
        <p>
          salary: <span>{salary / 100}$</span>
        </p>
        <p>
          date posted: <span>{createdAt.toDateString()}</span>
        </p>
      </div>
      {description && (
        <div>
          <h3>job description:</h3>
          <p>{description}</p>
        </div>
      )}
      <div>
        <h3>contacts:</h3>
        {contactEmail && (
          <p>
            email: <span>{contactEmail}</span>
          </p>
        )}
        {contactUrl && (
          <p>
            website: <span>{contactUrl}</span>
          </p>
        )}
      </div>
      {user && user.id === userId && (
        <div>
          <Link href={`/dashboard/jobs/${id}/edit`}>edit</Link>
          <DeleteJobForm id={id} userId={userId} />
        </div>
      )}
    </section>
  );
}
