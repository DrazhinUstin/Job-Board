import { auth } from '@/auth';
import { prisma } from '@/client';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import FormSubmitBtn from '../form-submit-btn';

export default async function ApplyJobForm({ jobId }: { jobId: string }) {
  const user = (await auth())?.user;
  const applicant = await prisma.applicant.findUnique({
    where: { userId: user?.id },
    select: { id: true, jobs: { where: { jobId } } },
  });
  const isJobAppliedByUser = !!applicant?.jobs[0];

  const toggleJobApplication = async () => {
    'use server';
    if (!user) {
      throw Error('Not authorized access. Cannot apply for a job');
    }
    if (!applicant) {
      redirect('/profile/applicant/edit');
    }
    try {
      await prisma.applicant.update({
        where: { userId: user.id },
        data: {
          jobs: isJobAppliedByUser
            ? {
                delete: {
                  applicantId_jobId: { applicantId: applicant?.id, jobId },
                },
              }
            : {
                create: {
                  job: {
                    connect: { id: jobId },
                  },
                },
              },
        },
      });
      revalidatePath('/');
    } catch (error) {
      throw Error('Database error: Failed to toggle job application');
    }
  };

  return (
    <form action={toggleJobApplication}>
      <FormSubmitBtn className={`${isJobAppliedByUser ? 'btn-alert' : 'btn'} w-100`}>
        {isJobAppliedByUser ? 'applied' : 'apply'}
      </FormSubmitBtn>
    </form>
  );
}
