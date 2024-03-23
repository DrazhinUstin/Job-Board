import ApplicantDetails from '@/app/components/applicant/details';
import { fetchApplicant } from '@/app/lib/data';
import { auth } from '@/auth';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Applicant',
};

export default async function Page() {
  const user = (await auth())?.user;
  const applicant = await fetchApplicant(user?.id as string);
  return (
    <main>
      <h2>applicant profile</h2>
      {applicant ? (
        <ApplicantDetails {...applicant} />
      ) : (
        <p>You have no applicant profile yet...</p>
      )}
      <Link href='/profile/applicant/edit'>edit</Link>
    </main>
  );
}
