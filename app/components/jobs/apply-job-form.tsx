import { auth } from '@/auth';
import { prisma } from '@/client';
import { revalidatePath } from 'next/cache';
import FormSubmitBtn from '../form-submit-btn';

export default async function ApplyJobForm({ jobId }: { jobId: string }) {
  const user = (await auth())?.user;
  const applicant = await prisma.applicant.findUnique({
    where: { userId: user?.id },
    select: { jobs: { where: { id: jobId }, select: { id: true } } },
  });
  const isJobAppliedByUser = !!applicant?.jobs[0];

  const toggleConnection = async () => {
    'use server';
    if (!user) {
      throw Error('Not authorized access. Cannot apply for a job');
    }
    if (!applicant) {
      throw Error('No applicant profile. Cannot apply for a job');
    }
    try {
      await prisma.applicant.update({
        where: { userId: user.id },
        data: {
          jobs: isJobAppliedByUser ? { disconnect: { id: jobId } } : { connect: { id: jobId } },
        },
      });
      revalidatePath('/');
    } catch (error) {
      throw Error('Database error: Failed to toggle connection to a job');
    }
  };

  return (
    <form action={toggleConnection}>
      <FormSubmitBtn>{isJobAppliedByUser ? 'applied' : 'apply'}</FormSubmitBtn>
    </form>
  );
}
