'use client';

import { Category, Job } from '@prisma/client';
import { jobTypes } from '@/app/lib/job-types';
import { useFormState } from 'react-dom';
import { editJob } from '@/app/lib/actions';
import WysiwygFormField from '@/app/components/wysiwyg-form-field';
import FormSubmitBtn from '@/app/components/form-submit-btn';

export default function EditJobForm({ job, categories }: { job: Job; categories: Category[] }) {
  const editJobWithId = editJob.bind(null, job.id, job.userId);
  const [state, dispatch] = useFormState(editJobWithId, {});
  return (
    <form action={dispatch} className='form'>
      <h2 className='form-title'>Edit a Job</h2>
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
          <p className='form-error'>{state.fieldErrors.categoryName}</p>
        )}
      </div>
      <div>
        <label htmlFor='title'>title:</label>
        <input type='text' name='title' id='title' defaultValue={job.title} />
        {state.fieldErrors?.title && <p className='form-error'>{state.fieldErrors.title}</p>}
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
        {state.fieldErrors?.type && <p className='form-error'>{state.fieldErrors.type}</p>}
      </div>
      <div>
        <label htmlFor='location'>location:</label>
        <input type='text' name='location' id='location' defaultValue={job.location || undefined} />
        {state.fieldErrors?.location && <p className='form-error'>{state.fieldErrors.location}</p>}
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
        {state.fieldErrors?.salary && <p className='form-error'>{state.fieldErrors.salary}</p>}
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
          <p className='form-error'>{state.fieldErrors.contactEmail}</p>
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
          <p className='form-error'>{state.fieldErrors.contactUrl}</p>
        )}
      </div>
      <div>
        <WysiwygFormField
          name='description'
          label='Description:'
          initialValue={job.description || undefined}
        />
        {state.fieldErrors?.description && (
          <p className='form-error'>{state.fieldErrors.description}</p>
        )}
      </div>
      {state.errorMsg && <p className='form-error'>{state.errorMsg}</p>}
      <FormSubmitBtn className='btn'>edit</FormSubmitBtn>
    </form>
  );
}
