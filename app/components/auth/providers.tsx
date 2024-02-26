'use client';

import { signInWithProvider } from '@/app/lib/actions';
import { useFormState, useFormStatus } from 'react-dom';

export default function Providers() {
  return (
    <div>
      <h2>Sign in with</h2>
      <ProviderForm providerId='github' />
      <ProviderForm providerId='google' />
    </div>
  );
}

function ProviderForm({ providerId }: { providerId: string }) {
  const signIn = signInWithProvider.bind(null, providerId);
  const [errorMsg, dispatch] = useFormState(signIn, undefined);
  return (
    <form action={dispatch}>
      <SubmitBtn label={providerId} />
      {errorMsg && <p>{errorMsg}</p>}
    </form>
  );
}

function SubmitBtn({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button type='submit' disabled={pending}>
      {label}
    </button>
  );
}
