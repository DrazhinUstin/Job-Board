import { signOut } from '@/auth';
import FormSubmitBtn from '@/app/components/form-submit-btn';

export default function SignOutForm() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <FormSubmitBtn>sign out</FormSubmitBtn>
    </form>
  );
}
