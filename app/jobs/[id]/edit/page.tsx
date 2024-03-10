import EditJobForm from '@/app/components/jobs/edit-job-form';
import { fetchJobById, fetchCategories } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit a Job',
};

export default async function Page({ params }: { params: { id: string } }) {
  const [job, categories] = await Promise.all([fetchJobById(params.id), fetchCategories()]);

  if (!job) {
    notFound();
  }

  return (
    <main>
      <EditJobForm job={job} categories={categories} />
    </main>
  );
}
