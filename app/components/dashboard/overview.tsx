import { auth } from '@/auth';
import Link from 'next/link';
import { fetchUserOverview } from '@/app/lib/data';
import CompanyLogo from '../company-logo';
import { FaBuilding, FaBriefcase, FaUsers } from 'react-icons/fa6';
import styles from './overview.module.scss';

export default async function Overview() {
  const user = (await auth())?.user;
  const { company, totalJobs, totalApplicants } = await fetchUserOverview(user?.id as string);
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {company ? (
          <>
            <CompanyLogo src={company.logoUrl} width={64} height={64} />
            <div>
              <h3>
                <Link href={`/companies/${company.id}`} className='text-link'>
                  {company.name}
                </Link>
              </h3>
              <p>Your company</p>
            </div>
          </>
        ) : (
          <>
            <span>
              <FaBuilding />
            </span>
            <p>No company created</p>
          </>
        )}
      </div>
      <div className={styles.card}>
        <span>
          <FaBriefcase />
        </span>
        <div>
          <h2>{totalJobs}</h2>
          <p>Total jobs</p>
        </div>
      </div>
      <div className={styles.card}>
        <span>
          <FaUsers />
        </span>
        <div>
          <h2>{totalApplicants}</h2>
          <p>Total applicants</p>
        </div>
      </div>
    </div>
  );
}
