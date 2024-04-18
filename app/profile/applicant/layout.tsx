import { auth } from '@/auth';
import { cachedFetchApplicant } from '@/app/lib/data';
import { Metadata } from 'next';
import Avatar from '@/app/components/avatar';
import NavLinks from '@/app/components/nav-links';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import styles from './layout.module.scss';

export const metadata: Metadata = {
  title: {
    template: '%s | Applicant',
    default: 'Applicant',
  },
};

const navLinks = [
  { id: 1, href: '/profile/applicant', label: 'profile details' },
  { id: 2, href: '/profile/applicant/edit', label: 'edit profile' },
  { id: 3, href: '/profile/applicant/jobs', label: 'applied jobs' },
];

export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = (await auth())?.user;
  const applicant = await cachedFetchApplicant(user?.id as string);

  if (!applicant) {
    return <div>{children}</div>;
  }

  const { photoUrl, fullName, linkedinUrl, githubUrl } = applicant;
  return (
    <div>
      <header className={styles.header}>
        <Avatar src={photoUrl} width={80} height={80} />
        <h4>{fullName}</h4>
        <p>
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
      </header>
      <nav className={styles.nav}>
        <NavLinks items={navLinks} variant='alternative' />
      </nav>
      <div>{children}</div>
    </div>
  );
}
