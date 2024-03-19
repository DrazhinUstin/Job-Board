import CompanyForm from '@/app/components/company/form';
import { fetchUserCompany } from '@/app/lib/data';
import { auth } from '@/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Company',
};

export default async function Page() {
  const user = (await auth())?.user;
  const company = await fetchUserCompany(user?.id as string);
  return (
    <main>
      <CompanyForm company={company} />
    </main>
  );
}
