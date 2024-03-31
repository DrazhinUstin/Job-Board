import ApplicantDetails from '@/app/components/applicant/details';
import Avatar from '@/app/components/avatar';
import Modal from '@/app/components/modal';
import { fetchApplicantById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

export default async function Page({ params: { id } }: Props) {
  const applicant = await fetchApplicantById(id);

  if (!applicant) {
    notFound();
  }

  const { fullName, linkedinUrl, githubUrl } = applicant;
  return (
    <Modal>
      <main>
        <div>
          <Avatar width={50} height={50} />
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
        </div>
        <ApplicantDetails {...applicant} />
      </main>
    </Modal>
  );
}
