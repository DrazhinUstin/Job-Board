import CreateJobForm from '@/app/components/jobs/create-job-form';
import { fetchCategories } from '@/app/lib/data';

export default async function Page() {
  const categories = await fetchCategories();
  return (
    <main>
      <CreateJobForm categories={categories} />
    </main>
  );
}
