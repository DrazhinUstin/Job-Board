'use client';

import { Category, Job } from '@prisma/client';
import { jobTypes } from '@/app/lib/job-types';
import { useFormState, useFormStatus } from 'react-dom';
import { editJob } from '@/app/lib/actions';

export default function EditJobForm({ job, categories }: { job: Job; categories: Category[] }) {
  const editJobWithId = editJob.bind(null, job.id, job.userId, job.companyLogoUrl);
  const [state, dispatch] = useFormState(editJobWithId, {});
  return (
    <form action={dispatch}>
      <h2>edit a job</h2>
      <div>
        <label htmlFor='categoryName'>category:</label>
        <select name='categoryName' id='categoryName' defaultValue={job.categoryName}>
          <option value='' hidden>
            select a category
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        {state.fieldErrors?.categoryName && (
          <p style={{ color: 'red' }}>{state.fieldErrors.categoryName}</p>
        )}
      </div>
      <div>
        <label htmlFor='title'>title:</label>
        <input type='text' name='title' id='title' defaultValue={job.title} />
        {state.fieldErrors?.title && <p style={{ color: 'red' }}>{state.fieldErrors.title}</p>}
      </div>
      <div>
        <label htmlFor='type'>type:</label>
        <select name='type' id='type' defaultValue={job.type}>
          <option value='' hidden>
            select type
          </option>
          {jobTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {state.fieldErrors?.type && <p style={{ color: 'red' }}>{state.fieldErrors.type}</p>}
      </div>
      <div>
        <label htmlFor='location'>location:</label>
        <input type='text' name='location' id='location' defaultValue={job.location || undefined} />
        {state.fieldErrors?.location && (
          <p style={{ color: 'red' }}>{state.fieldErrors.location}</p>
        )}
      </div>
      <div>
        <label htmlFor='salary'>salary (in $):</label>
        <input
          type='number'
          name='salary'
          id='salary'
          step={0.01}
          defaultValue={job.salary / 100}
        />
        {state.fieldErrors?.salary && <p style={{ color: 'red' }}>{state.fieldErrors.salary}</p>}
      </div>
      <div>
        <label htmlFor='companyName'>company name:</label>
        <input type='text' name='companyName' id='companyName' defaultValue={job.companyName} />
        {state.fieldErrors?.companyName && (
          <p style={{ color: 'red' }}>{state.fieldErrors.companyName}</p>
        )}
      </div>
      <div>
        <label htmlFor='companyLogo'>company logo:</label>
        <input type='file' name='companyLogo' id='companyLogo' accept='image/*' />
        {state.fieldErrors?.companyLogo && (
          <p style={{ color: 'red' }}>{state.fieldErrors.companyLogo}</p>
        )}
      </div>
      <div>
        <label htmlFor='contactEmail'>contact email:</label>
        <input
          type='email'
          name='contactEmail'
          id='contactEmail'
          defaultValue={job.contactEmail || undefined}
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
          defaultValue={job.contactUrl || undefined}
        />
        {state.fieldErrors?.contactUrl && (
          <p style={{ color: 'red' }}>{state.fieldErrors.contactUrl}</p>
        )}
      </div>
      <div>
        <label htmlFor='description'>description:</label>
        <textarea
          name='description'
          id='description'
          cols={30}
          rows={10}
          defaultValue={job.description || undefined}
        ></textarea>
        {state.fieldErrors?.description && (
          <p style={{ color: 'red' }}>{state.fieldErrors.description}</p>
        )}
      </div>
      {state.errorMsg && <p style={{ color: 'red' }}>{state.errorMsg}</p>}
      <SubmitBtn />
    </form>
  );
}

function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <button type='submit' disabled={pending}>
      edit
    </button>
  );
}
