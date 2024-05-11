import { Prisma } from '@prisma/client';
import { auth } from '@/auth';
import Link from 'next/link';
import CompanyLogo from '../company-logo';
import DeleteJobForm from './delete-job-form';
import { fetchJobs } from '@/app/lib/data';
import { formatCurrency } from '@/app/lib/utils';
import { FaBriefcase, FaLocationDot, FaMoneyBillWave, FaPenToSquare, FaEye } from 'react-icons/fa6';
import styles from './job-card.module.scss';

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
    <article className={styles.card}>
      <header>
        {company && <CompanyLogo src={company.logoUrl} width={50} height={50} />}
        <div>
          <h4>{title}</h4>
          {company && <p>{company.name}</p>}
        </div>
      </header>
      <ul className={styles.info}>
        <li>{categoryName}</li>
      </ul>
      <ul className={styles.brief}>
        <li>
          <FaBriefcase />
          {type}
        </li>
        {location && (
          <li>
            <FaLocationDot />
            {location}
          </li>
        )}
        <li>
          <FaMoneyBillWave />
          {formatCurrency(salary)}
        </li>
      </ul>
      <footer>
        {user && user.id === userId && (
          <>
            <Link href={`/dashboard/jobs/${id}/edit`} className='btn-flex'>
              <FaPenToSquare /> edit
            </Link>
            <DeleteJobForm id={id} userId={userId} />
          </>
        )}
        <Link href={`/jobs/${id}`} className='btn-flex btn-alt'>
          <FaEye /> browse
        </Link>
      </footer>
    </article>
  );
}
