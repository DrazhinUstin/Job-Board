import { auth } from '@/auth';
import { cachedFetchApplicant } from '@/app/lib/data';
import Link from 'next/link';
import { Metadata } from 'next';
import Avatar from '@/app/components/avatar';

export const metadata: Metadata = {
  title: {
    template: '%s | Applicant',
    default: 'Applicant',
  },
};

export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = (await auth())?.user;
  const applicant = await cachedFetchApplicant(user?.id as string);

  if (!applicant) {
    return <div>{children}</div>;
  }

  const { photoUrl, fullName, linkedinUrl, githubUrl } = applicant;
  return (
    <div>
      <div>
        <Avatar src={photoUrl} width={50} height={50} />
        <h4>{fullName}</h4>
        <p>
          {linkedinUrl && (
            <a href={linkedinUrl} target='_blank' rel='noopener noreferrer'>
              linkedin
            </a>
          )}
          {githubUrl && (
            <a href={githubUrl} target='_blank' rel='noopener noreferrer'>
              github
            </a>
          )}
        </p>
        <Link href='/profile/applicant/edit'>edit</Link>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Link href='/profile/applicant'>overview</Link>
        <Link href='/profile/applicant/jobs'>applied jobs</Link>
      </div>
      <div>{children}</div>
    </div>
  );
}
