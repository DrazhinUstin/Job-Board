import ApplicantDetails from '@/app/components/applicant/details';
import { cachedFetchApplicant } from '@/app/lib/data';
import { auth } from '@/auth';
import Link from 'next/link';

export default async function Page() {
  const user = (await auth())?.user;
  const applicant = await cachedFetchApplicant(user?.id as string);

  if (!applicant) {
    return (
      <main>
        <p>You have no applicant profile yet...</p>
        <Link href='/profile/applicant/edit'>create applicant profile</Link>
      </main>
    );
  }

  return (
    <main>
      <ApplicantDetails {...applicant} />
      <Link href='/profile/applicant/edit'>edit</Link>
    </main>
  );
}
