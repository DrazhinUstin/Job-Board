import { Job } from '@prisma/client';
import Image from 'next/image';
import { auth } from '@/auth';
import Link from 'next/link';
import DeleteJobForm from './delete-job-form';

export default async function JobCard({
  id,
  userId,
  title,
  categoryName,
  type,
  location,
  salary,
  companyName,
  companyLogoUrl,
}: Job) {
  const user = (await auth())?.user;
  return (
    <article style={{ width: '400px', border: '1px solid gray' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {companyLogoUrl && <Image src={companyLogoUrl} alt='company logo' width={50} height={50} />}
        <p>{companyName}</p>
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
          <DeleteJobForm id={id} userId={userId} companyLogoUrl={companyLogoUrl} />
        </div>
      )}
    </article>
  );
}
