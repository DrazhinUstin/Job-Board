import { Job } from '@prisma/client';
import { deleteJob } from '@/app/lib/actions';
import FormSubmitBtn from '../form-submit-btn';

export default function DeleteJobForm({ id, userId }: Pick<Job, 'id' | 'userId'>) {
  const deleteJobWithId = deleteJob.bind(null, id, userId);
  return (
    <form action={deleteJobWithId}>
      <FormSubmitBtn>delete</FormSubmitBtn>
    </form>
  );
}
