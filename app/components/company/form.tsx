'use client';

import { Company } from '@prisma/client';
import FormSubmitBtn from '@/app/components/form-submit-btn';
import { useFormState } from 'react-dom';
import { upsertCompany } from '@/app/lib/actions';

export default function CompanyForm({ company }: { company: Company | null }) {
  const upsertCompanyWithLogoUrl = upsertCompany.bind(null, company?.logoUrl || null);
  const [state, dispatch] = useFormState(upsertCompanyWithLogoUrl, {});
  return (
    <form action={dispatch} className='form'>
      <h2 className='form-title'>Update Company</h2>
      <div>
        <label htmlFor='name'>name:</label>
        <input type='text' name='name' id='name' defaultValue={company?.name} />
        {state.fieldErrors?.name && <p className='form-error'>{state.fieldErrors.name}</p>}
      </div>
      <div>
        <label htmlFor='logo'>logo:</label>
        <input type='file' name='logo' id='logo' accept='image/*' />
        {state.fieldErrors?.logo && <p className='form-error'>{state.fieldErrors.logo}</p>}
      </div>
      <div>
        <label htmlFor='location'>location:</label>
        <input
          type='text'
          name='location'
          id='location'
          defaultValue={company?.location || undefined}
        />
        {state.fieldErrors?.location && <p className='form-error'>{state.fieldErrors.location}</p>}
      </div>
      <div>
        <label htmlFor='websiteUrl'>website url:</label>
        <input
          type='url'
          name='websiteUrl'
          id='websiteUrl'
          defaultValue={company?.websiteUrl || undefined}
        />
        {state.fieldErrors?.websiteUrl && (
          <p className='form-error'>{state.fieldErrors.websiteUrl}</p>
        )}
      </div>
      <div>
        <label htmlFor='description'>description:</label>
        <textarea
          name='description'
          id='description'
          cols={30}
          rows={10}
          defaultValue={company?.description || undefined}
        ></textarea>
        {state.fieldErrors?.description && (
          <p className='form-error'>{state.fieldErrors.description}</p>
        )}
      </div>
      {state.errorMsg && <p className='form-error'>{state.errorMsg}</p>}
      <FormSubmitBtn className='btn'>update</FormSubmitBtn>
    </form>
  );
}
