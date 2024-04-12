import { Prisma } from '@prisma/client';
import Image from 'next/image';
import { auth } from '@/auth';
import Link from 'next/link';
import DeleteJobForm from './delete-job-form';
import { fetchJobs } from '@/app/lib/data';
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
        {company && <Image src={company.logoUrl || ''} alt='company logo' width={50} height={50} />}
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
          <FaMoneyBillWave />${salary / 100}
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
