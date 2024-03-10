import CreateJobForm from '@/app/components/jobs/create-job-form';
import { fetchCategories } from '@/app/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create a Job',
};

export default async function Page() {
  const categories = await fetchCategories();
  return (
    <main>
      <CreateJobForm categories={categories} />
    </main>
  );
}
