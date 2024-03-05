import { Job } from '@prisma/client';
import Image from 'next/image';

export default function JobCard({
  title,
  categoryName,
  type,
  location,
  salary,
  companyName,
  companyLogoUrl,
}: Job) {
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
    </article>
  );
}
