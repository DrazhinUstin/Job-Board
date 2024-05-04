import { fetchCompanyById } from '@/app/lib/data';
import { FaBriefcase, FaLocationDot, FaGlobe, FaClock } from 'react-icons/fa6';
import styles from './company-details.module.scss';

export default function CompanyDetails({
  name,
  location,
  description,
  websiteUrl,
  createdAt,
  jobsCount,
}: Exclude<Awaited<ReturnType<typeof fetchCompanyById>>, null>) {
  return (
    <section>
      <ul className={styles.features}>
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
        {websiteUrl && (
          <li>
            <span>
              <FaGlobe />
            </span>
            <div>
              <h4>Website:</h4>
              <p>
                <a href={websiteUrl} target='_blank' rel='noopener noreferrer'>
                  {name}
                </a>
              </p>
            </div>
          </li>
        )}
        <li>
          <span>
            <FaClock />
          </span>
          <div>
            <h4>Published:</h4>
            <p>{createdAt.toDateString()}</p>
          </div>
        </li>
        <li>
          <span>
            <FaBriefcase />
          </span>
          <div>
            <h4>Open jobs:</h4>
            <p>{jobsCount}</p>
          </div>
        </li>
      </ul>
      <div>
        <h3 className='mb-2'>About Company:</h3>
        {description ? (
          <div className='tiptap-output' dangerouslySetInnerHTML={{ __html: description }} />
        ) : (
          <p>
            <em>No information provided</em>
          </p>
        )}
      </div>
    </section>
  );
}
