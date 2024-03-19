'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Category } from '@prisma/client';
import { jobTypes } from '@/app/lib/job-types';
import { createJob } from '@/app/lib/actions';

export default function CreateJobForm({ categories }: { categories: Category[] }) {
  const [state, dispatch] = useFormState(createJob, {});
  return (
    <form action={dispatch}>
      <h2>create a job</h2>
      <div>
        <label htmlFor='category'>category:</label>
        <select name='categoryName' id='category'>
          <option value='' hidden>
            select a category
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        {state?.fieldErrors?.categoryName && (
          <p style={{ color: 'red' }}>{state.fieldErrors.categoryName}</p>
        )}
      </div>
      <div>
        <label htmlFor='title'>title:</label>
        <input type='text' name='title' id='title' />
        {state?.fieldErrors?.title && <p style={{ color: 'red' }}>{state.fieldErrors.title}</p>}
      </div>
      <div>
        <label htmlFor='type'>type:</label>
        <select name='type' id='type'>
          <option value='' hidden>
            select type
          </option>
          {jobTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {state?.fieldErrors?.type && <p style={{ color: 'red' }}>{state.fieldErrors.type}</p>}
      </div>
      <div>
        <label htmlFor='location'>location:</label>
        <input type='text' name='location' id='location' />
        {state?.fieldErrors?.location && (
          <p style={{ color: 'red' }}>{state.fieldErrors.location}</p>
        )}
      </div>
      <div>
        <label htmlFor='salary'>salary (in $):</label>
        <input type='number' name='salary' id='salary' step={0.01} />
        {state?.fieldErrors?.salary && <p style={{ color: 'red' }}>{state.fieldErrors.salary}</p>}
      </div>
      <div>
        <label htmlFor='contactEmail'>contact email:</label>
        <input type='email' name='contactEmail' id='contactEmail' />
        {state?.fieldErrors?.contactEmail && (
          <p style={{ color: 'red' }}>{state.fieldErrors.contactEmail}</p>
        )}
      </div>
      <div>
        <label htmlFor='contactUrl'>contact url:</label>
        <input type='url' name='contactUrl' id='contactUrl' />
        {state?.fieldErrors?.contactUrl && (
          <p style={{ color: 'red' }}>{state.fieldErrors.contactUrl}</p>
        )}
      </div>
      <div>
        <label htmlFor='description'>description:</label>
        <textarea name='description' id='description' cols={30} rows={10}></textarea>
        {state?.fieldErrors?.description && (
          <p style={{ color: 'red' }}>{state.fieldErrors.description}</p>
        )}
      </div>
      {state?.errorMsg && <p style={{ color: 'red' }}>{state.errorMsg}</p>}
      <SubmitBtn />
    </form>
  );
}

function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <button type='submit' disabled={pending}>
      create
    </button>
  );
}
