'use client';

import { signInWithProvider } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import FormSubmitBtn from '../form-submit-btn';
import { FaGithub, FaGoogle } from 'react-icons/fa6';

export default function Providers() {
  return (
    <div className='auth-form'>
      <h2 className='form-title'>Sign in with</h2>
      <ProviderForm providerId='github'>
        <FormSubmitBtn className='btn-flex btn-alt'>
          <FaGithub />
          github
        </FormSubmitBtn>
      </ProviderForm>
      <ProviderForm providerId='google'>
        <FormSubmitBtn className='btn-flex'>
          <FaGoogle />
          google
        </FormSubmitBtn>
      </ProviderForm>
    </div>
  );
}

function ProviderForm({
  providerId,
  children,
}: {
  providerId: string;
  children: React.ReactElement;
}) {
  const signIn = signInWithProvider.bind(null, providerId);
  const [errorMsg, dispatch] = useFormState(signIn, undefined);
  return (
    <form action={dispatch}>
      {children}
      {errorMsg && <p className='form-error'>{errorMsg}</p>}
    </form>
  );
}
