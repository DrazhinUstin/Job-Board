import { ApplicantsOnJobs } from '@prisma/client';
import FormSubmitBtn from '../form-submit-btn';
import { deleteApplicantOnJob } from '@/app/lib/actions';
import { FaTrashCan } from 'react-icons/fa6';

export default function DeleteApplicantForm({
  applicantId,
  jobId,
}: {
  applicantId: ApplicantsOnJobs['applicantId'];
  jobId: ApplicantsOnJobs['jobId'];
}) {
  const deleteApplicantOnJobWithId = deleteApplicantOnJob.bind(null, applicantId, jobId);
  return (
    <form action={deleteApplicantOnJobWithId} className='grid-center'>
      <FormSubmitBtn className='btn-alert'>
        <FaTrashCan />
      </FormSubmitBtn>
    </form>
  );
}
