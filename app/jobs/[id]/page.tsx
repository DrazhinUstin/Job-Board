import { fetchJobById } from '@/app/lib/data';
import JobDetails from '@/app/components/jobs/job-details';
import { cache } from 'react';
import { Metadata } from 'next';
import { prisma } from '@/client';
import { notFound } from 'next/navigation';

const cachedFetchJob = cache(fetchJobById);

export async function generateStaticParams() {
  const allJobs = await prisma.job.findMany({ select: { id: true } });
  return allJobs.map(({ id }) => ({ id }));
}

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params: { id } }: Props): Promise<Metadata> {
  const job = await cachedFetchJob(id);

  if (!job) {
    notFound();
  }

  return {
    title: job.title,
  };
}

export default async function Page({ params: { id } }: Props) {
  const job = await cachedFetchJob(id);

  if (!job) {
    notFound();
  }

  return (
    <main>
      <JobDetails job={job} />
    </main>
  );
}
