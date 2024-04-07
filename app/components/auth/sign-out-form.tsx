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
      <FormSubmitBtn className='btn-alert'>sign out</FormSubmitBtn>
    </form>
  );
}
