import EditJobForm from '@/app/components/jobs/edit-job-form';
import { fetchJobById, fetchCategories } from '@/app/lib/data';

export default async function Page({ params }: { params: { id: string } }) {
  const [job, categories] = await Promise.all([fetchJobById(params.id), fetchCategories()]);

  if (!job) {
    throw Error(`Job with id: ${params.id} does not exist`);
  }

  return (
    <main>
      <EditJobForm job={job} categories={categories} />
    </main>
  );
}
