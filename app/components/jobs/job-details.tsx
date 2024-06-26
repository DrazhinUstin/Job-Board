import { auth } from '@/auth';
import { Prisma } from '@prisma/client';
import { Suspense } from 'react';
import CompanyLogo from '../company-logo';
import JobContacts from './job-contacts';
import ApplyJobForm from './apply-job-form';
import DeleteJobForm from './delete-job-form';
import Link from 'next/link';
import { fetchJobById } from '@/app/lib/data';
import { formatCurrency, formatDate } from '@/app/lib/utils';
import {
  FaBriefcase,
  FaLocationDot,
  FaMoneyBillWave,
  FaClock,
  FaStar,
  FaPenToSquare,
  FaEye,
} from 'react-icons/fa6';
import styles from './job-details.module.scss';

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
    <section className='section'>
      <h2 className='section-title'>{title}</h2>
      <div className={styles.container}>
        <div>
          <div className={styles.features}>
            <h3>Overview:</h3>
            <ul>
              <li>
                <span>
                  <FaBriefcase />
                </span>
                <div>
                  <h4>Type:</h4>
                  <p>{type}</p>
                </div>
              </li>
              {location && (
                <li>
                  <span>
                    <FaLocationDot />
                  </span>
                  <div>
                    <h4>Location:</h4>
                    <p>{location}</p>
                  </div>
                </li>
              )}
              <li>
                <span>
                  <FaMoneyBillWave />
                </span>
                <div>
                  <h4>Offered salary:</h4>
                  <p>{formatCurrency(salary)}</p>
                </div>
              </li>
              <li>
                <span>
                  <FaClock />
                </span>
                <div>
                  <h4>Date posted:</h4>
                  <p>{formatDate(createdAt)}</p>
                </div>
              </li>
              <li>
                <span>
                  <FaStar />
                </span>
                <div>
                  <h4>Category:</h4>
                  <p>{categoryName}</p>
                </div>
              </li>
            </ul>
            <JobContacts contactEmail={contactEmail} contactUrl={contactUrl} />
            {user && user.id !== userId && (
              <Suspense
                fallback={
                  <button className='btn w-100' disabled={true}>
                    loading
                  </button>
                }
              >
                <ApplyJobForm jobId={id} />
              </Suspense>
            )}
          </div>
          {company && (
            <div className={styles.company}>
              <h3>Organization:</h3>
              <CompanyLogo src={company.logoUrl} width={100} height={100} />
              <h4>{company.name}</h4>
              <Link href={`/companies/${company.id}`} className='btn-flex btn-alt'>
                <FaEye />
                browse
              </Link>
            </div>
          )}
        </div>
        <div>
          <div>
            <h3 className='mb-2'>Description:</h3>
            {description ? (
              <div className='tiptap-output' dangerouslySetInnerHTML={{ __html: description }} />
            ) : (
              <p>
                <em>Description for this job was not provided</em>
              </p>
            )}
          </div>
          {user && user.id === userId && (
            <div className='flex-between mt-2'>
              <Link href={`/dashboard/jobs/${id}/edit`} className='btn-flex'>
                <FaPenToSquare />
                edit
              </Link>
              <DeleteJobForm id={id} userId={userId} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
