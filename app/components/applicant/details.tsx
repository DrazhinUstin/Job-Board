import { Applicant } from '@prisma/client';
import { FaLocationDot, FaEnvelope, FaGlobe } from 'react-icons/fa6';
import styles from './details.module.scss';

export default function ApplicantDetails({ location, contactEmail, contactUrl, bio }: Applicant) {
  return (
    <section className={styles.container}>
      <div>
        <h3>Contact Info:</h3>
        <ul className={styles.contacts}>
          {contactEmail && (
            <li>
              <span>
                <FaEnvelope />
              </span>
              <div>
                <h4>Email:</h4>
                <p>{contactEmail}</p>
              </div>
            </li>
          )}
          {contactUrl && (
            <li>
              <span>
                <FaGlobe />
              </span>
              <div>
                <h4>Website linked:</h4>
                <p>
                  <a
                    href={contactUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-link'
                  >
                    {contactUrl}
                  </a>
                </p>
              </div>
            </li>
          )}
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
        </ul>
      </div>
      <div>
        <h3>About me:</h3>
        <p>{bio}</p>
      </div>
    </section>
  );
}
