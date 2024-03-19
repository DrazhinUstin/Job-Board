import { Prisma } from '@prisma/client';
import Image from 'next/image';
import { auth } from '@/auth';
import Link from 'next/link';
import DeleteJobForm from './delete-job-form';
import { fetchJobs } from '@/app/lib/data';

export default async function JobCard({
  id,
  userId,
  title,
  categoryName,
  type,
  location,
  salary,
  company,
}: Prisma.PromiseReturnType<typeof fetchJobs>[0]) {
  const user = (await auth())?.user;
  return (
    <article style={{ width: '400px', border: '1px solid gray' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Image src={company?.logoUrl || ''} alt='company logo' width={50} height={50} />
        <p>{company?.name || 'N/A'}</p>
      </div>
      <h4>{title}</h4>
      <p style={{ color: 'green' }}>{categoryName}</p>
      <p style={{ color: 'orange' }}>{type}</p>
      <p style={{ color: 'royalblue' }}>{location}</p>
      <p>{salary / 100}$</p>
      <Link href={`/jobs/${id}`}>browse job</Link>
      {user && user.id === userId && (
        <div>
          <Link href={`/dashboard/jobs/${id}/edit`}>edit</Link>
          <DeleteJobForm id={id} userId={userId} />
        </div>
      )}
    </article>
  );
}
