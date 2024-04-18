import ApplicantForm from '@/app/components/applicant/form';
import { cachedFetchApplicant } from '@/app/lib/data';
import { auth } from '@/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit',
};

export default async function Page() {
  const user = (await auth())?.user;
  const applicant = await cachedFetchApplicant(user?.id as string);
  return <ApplicantForm applicant={applicant} />;
}
