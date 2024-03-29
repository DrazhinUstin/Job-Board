import { ApplicantsOnJobs } from '@prisma/client';
import FormSubmitBtn from '../form-submit-btn';
import { deleteApplicantOnJob } from '@/app/lib/actions';

export default function DeleteApplicantForm({
  applicantId,
  jobId,
}: {
  applicantId: ApplicantsOnJobs['applicantId'];
  jobId: ApplicantsOnJobs['jobId'];
}) {
  const deleteApplicantOnJobWithId = deleteApplicantOnJob.bind(null, applicantId, jobId);
  return (
    <form action={deleteApplicantOnJobWithId}>
      <FormSubmitBtn>reject</FormSubmitBtn>
    </form>
  );
}
