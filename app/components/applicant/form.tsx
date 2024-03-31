'use client';

import { Applicant } from '@prisma/client';
import FormSubmitBtn from '../form-submit-btn';
import { useFormState } from 'react-dom';
import { upsertApplicant } from '@/app/lib/actions';

export default function ApplicantForm({ applicant }: { applicant: Applicant | null }) {
  const upsertApplicantWithPhotoUrl = upsertApplicant.bind(null, applicant?.photoUrl || null);
  const [state, dispatch] = useFormState(upsertApplicantWithPhotoUrl, {});
  return (
    <form action={dispatch}>
      <div>
        <label htmlFor='fullName'>full name:</label>
        <input type='text' name='fullName' id='fullName' defaultValue={applicant?.fullName} />
        {state.fieldErrors?.fullName && (
          <p style={{ color: 'red' }}>{state.fieldErrors.fullName}</p>
        )}
      </div>
      <div>
        <label htmlFor='photo'>photo:</label>
        <input type='file' name='photo' id='photo' accept='image/*' />
        {state.fieldErrors?.photo && <p style={{ color: 'red' }}>{state.fieldErrors.photo}</p>}
      </div>
      <div>
        <label htmlFor='location'>location:</label>
        <input type='text' name='location' id='location' defaultValue={applicant?.location || ''} />
        {state.fieldErrors?.location && (
          <p style={{ color: 'red' }}>{state.fieldErrors.location}</p>
        )}
      </div>
      <div>
        <label htmlFor='contactEmail'>contact email:</label>
        <input
          type='email'
          name='contactEmail'
          id='contactEmail'
          defaultValue={applicant?.contactEmail || ''}
        />
        {state.fieldErrors?.contactEmail && (
          <p style={{ color: 'red' }}>{state.fieldErrors.contactEmail}</p>
        )}
      </div>
      <div>
        <label htmlFor='contactUrl'>contact url:</label>
        <input
          type='url'
          name='contactUrl'
          id='contactUrl'
          defaultValue={applicant?.contactUrl || ''}
        />
        {state.fieldErrors?.contactUrl && (
          <p style={{ color: 'red' }}>{state.fieldErrors.contactUrl}</p>
        )}
      </div>
      <div>
        <label htmlFor='githubUrl'>github url:</label>
        <input
          type='url'
          name='githubUrl'
          id='githubUrl'
          defaultValue={applicant?.githubUrl || ''}
        />
        {state.fieldErrors?.githubUrl && (
          <p style={{ color: 'red' }}>{state.fieldErrors.githubUrl}</p>
        )}
      </div>
      <div>
        <label htmlFor='linkedinUrl'>linkedin url:</label>
        <input
          type='url'
          name='linkedinUrl'
          id='linkedinUrl'
          defaultValue={applicant?.linkedinUrl || ''}
        />
        {state.fieldErrors?.linkedinUrl && (
          <p style={{ color: 'red' }}>{state.fieldErrors.linkedinUrl}</p>
        )}
      </div>
      <div>
        <label htmlFor='bio'>Your biography:</label>
        <textarea
          name='bio'
          id='bio'
          cols={30}
          rows={10}
          defaultValue={applicant?.bio || ''}
        ></textarea>
        {state.fieldErrors?.bio && <p style={{ color: 'red' }}>{state.fieldErrors.bio}</p>}
      </div>
      {state.errorMsg && <p style={{ color: 'red' }}>{state.errorMsg}</p>}
      <FormSubmitBtn>update</FormSubmitBtn>
    </form>
  );
}
