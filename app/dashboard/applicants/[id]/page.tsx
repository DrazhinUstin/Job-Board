import ContactLink from '@/app/components/applicant/contact-link';
import ApplicantDetails from '@/app/components/applicant/details';
import Avatar from '@/app/components/avatar';
import { cachedFetchApplicantById } from '@/app/lib/data';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

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
        <ContactLink {...applicant} />
      </div>
      <ApplicantDetails {...applicant} />
    </main>
  );
}
