import { auth } from '@/auth';
import { Job } from '@prisma/client';
import Image from 'next/image';
import DeleteJobForm from './delete-job-form';
import Link from 'next/link';

export default async function JobDetails({
  job: {
    id,
    userId,
    categoryName,
    title,
    type,
    location,
    description,
    salary,
    companyName,
    companyLogoUrl,
    contactEmail,
    contactUrl,
    createdAt,
  },
}: {
  job: Job;
}) {
  const user = (await auth())?.user;
  return (
    <section>
      <h2>{title}</h2>
      <div>
        <h3>organization:</h3>
        {companyLogoUrl && <Image src={companyLogoUrl} alt='company logo' width={50} height={50} />}
        {companyName}
      </div>
      <div>
        <h3>job overview:</h3>
        <p>
          category: <span>{categoryName}</span>
        </p>
        <p>
          type: <span>{type}</span>
        </p>
        {location && <p>location: {location}</p>}
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
        {contactEmail && <p>email: {contactEmail}</p>}
        {contactUrl && <p>website: {contactUrl}</p>}
      </div>
      {user && user.id === userId && (
        <div>
          <Link href={`/jobs/${id}/edit`}>edit</Link>
          <DeleteJobForm id={id} userId={userId} companyLogoUrl={companyLogoUrl} />
        </div>
      )}
    </section>
  );
}
