import ApplicantForm from '@/app/components/applicant/form';
import { fetchApplicant } from '@/app/lib/data';
import { auth } from '@/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit',
};

export default async function Page() {
  const user = (await auth())?.user;
  const applicant = await fetchApplicant(user?.id as string);
  return (
    <main>
      <ApplicantForm applicant={applicant} />
    </main>
  );
}
