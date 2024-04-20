import ContactLink from '@/app/components/applicant/contact-link';
import ApplicantDetails from '@/app/components/applicant/details';
import Avatar from '@/app/components/avatar';
import { cachedFetchApplicantById } from '@/app/lib/data';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import styles from './page.module.scss';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params: { id } }: Props): Promise<Metadata> {
  const applicant = await cachedFetchApplicantById(id);

  if (!applicant) {
    notFound();
  }

  return {
    title: applicant.fullName,
  };
}

export default async function Page({ params: { id } }: Props) {
  const applicant = await cachedFetchApplicantById(id);

  if (!applicant) {
    notFound();
  }

  const { photoUrl, fullName, linkedinUrl, githubUrl } = applicant;
  return (
    <main>
      <header className={styles.header}>
        <Avatar src={photoUrl} width={80} height={80} />
        <h4>{fullName}</h4>
        <p className={styles.links}>
          {linkedinUrl && (
            <a href={linkedinUrl} target='_blank' rel='noopener noreferrer'>
              <FaLinkedin />
            </a>
          )}
          {githubUrl && (
            <a href={githubUrl} target='_blank' rel='noopener noreferrer' className={styles.github}>
              <FaGithub />
            </a>
          )}
        </p>
        <ContactLink {...applicant} />
      </header>
      <ApplicantDetails {...applicant} />
    </main>
  );
}
