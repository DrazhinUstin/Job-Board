'use client';

import { signInWithProvider } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';
import { useFormState } from 'react-dom';
import FormSubmitBtn from '../form-submit-btn';
import { FaGithub, FaGoogle } from 'react-icons/fa6';

export default function Providers() {
  const searchParams = useSearchParams();
  const urlError = searchParams.get('error');
  return (
    <div className='form-card'>
      <h2 className='form-title'>Sign in with</h2>
      <ProviderForm providerId='github'>
        <FormSubmitBtn className='btn-flex btn-alt w-100'>
          <FaGithub />
          github
        </FormSubmitBtn>
      </ProviderForm>
      <ProviderForm providerId='google'>
        <FormSubmitBtn className='btn-flex w-100'>
          <FaGoogle />
          google
        </FormSubmitBtn>
      </ProviderForm>
      <p className='form-error text-center'>
        {urlError === 'OAuthAccountNotLinked'
          ? 'Email address is already associated with a different account'
          : urlError}
      </p>
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
