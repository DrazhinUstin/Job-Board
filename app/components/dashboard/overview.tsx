import { auth } from '@/auth';
import { fetchUserOverview } from '@/app/lib/data';
import Image from 'next/image';

export default async function Overview() {
  const user = (await auth())?.user;
  const { company, totalJobs, totalApplicants } = await fetchUserOverview(user?.id as string);
  return (
    <div>
      <div>
        <h3>Your company:</h3>
        {company ? (
          <div>
            <p>
              <Image width={50} height={50} src={company.logoUrl || ''} alt='logo' />
              {company.name}
            </p>
          </div>
        ) : (
          <p>No company created</p>
        )}
      </div>
      <div>
        <h3>Total created jobs:</h3>
        <p>{totalJobs}</p>
      </div>
      <div>
        <h3>Total applicants:</h3>
        <p>{totalApplicants}</p>
      </div>
    </div>
  );
}
