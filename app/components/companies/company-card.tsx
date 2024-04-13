import { fetchCompanies } from '@/app/lib/data';
import Link from 'next/link';
import CompanyLogo from '../company-logo';
import { FaLocationDot, FaEye } from 'react-icons/fa6';
import styles from './company-card.module.scss';

export default function CompanyCard({
  id,
  name,
  logoUrl,
  location,
  jobsCount,
}: Awaited<ReturnType<typeof fetchCompanies>>[0]) {
  return (
    <article className={styles.card}>
      <CompanyLogo src={logoUrl} width={80} height={80} />
      <div>
        <h4>{name}</h4>
        <p>
          <FaLocationDot />
          {location || 'N/A'}
        </p>
      </div>
      <div>
        <Link href={`/companies/${id}/jobs`} className='btn'>
          {jobsCount} open jobs
        </Link>
      </div>
      <div>
        <Link href={`/companies/${id}`} className='btn-flex btn-alt'>
          <FaEye />
          browse
        </Link>
      </div>
    </article>
  );
}
