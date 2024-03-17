import { fetchCompanies } from '@/app/lib/data';
import Image from 'next/image';
import Link from 'next/link';

export default function CompanyCard({
  id,
  name,
  logoUrl,
  location,
  jobsCount,
}: Awaited<ReturnType<typeof fetchCompanies>>[0]) {
  return (
    <article>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {logoUrl && <Image src={logoUrl} alt='company logo' width={50} height={50} />}
        <h4>{name}</h4>
      </div>
      <p>{location}</p>
      <p>{jobsCount} open jobs</p>
      <Link href={`/companies/${id}`}>browse company</Link>
    </article>
  );
}
