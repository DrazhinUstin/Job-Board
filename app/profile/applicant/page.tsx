import ApplicantDetails from '@/app/components/applicant/details';
import { cachedFetchApplicant } from '@/app/lib/data';
import { auth } from '@/auth';
import Link from 'next/link';

export default async function Page() {
  const user = (await auth())?.user;
  const applicant = await cachedFetchApplicant(user?.id as string);

  if (!applicant) {
    return (
      <div className='text-center'>
        <p className='mb-4'>You have no applicant profile yet...</p>
        <Link href='/profile/applicant/edit' className='btn'>
          create applicant profile
        </Link>
      </div>
    );
  }

  return <ApplicantDetails {...applicant} />;
}
