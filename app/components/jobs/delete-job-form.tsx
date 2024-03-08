import { Job } from '@prisma/client';
import { deleteJob } from '@/app/lib/actions';
import FormSubmitBtn from '../form-submit-btn';

export default function DeleteJobForm({
  id,
  userId,
  companyLogoUrl,
}: Pick<Job, 'id' | 'userId' | 'companyLogoUrl'>) {
  const deleteJobWithId = deleteJob.bind(null, id, userId, companyLogoUrl);
  return (
    <form action={deleteJobWithId}>
      <FormSubmitBtn>delete</FormSubmitBtn>
    </form>
  );
}
