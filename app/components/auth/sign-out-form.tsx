import { signOut } from '@/auth';
import FormSubmitBtn from '@/app/components/form-submit-btn';
import { FaUserSlash } from 'react-icons/fa6';

export default function SignOutForm() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <FormSubmitBtn className='btn-flex btn-alert'>
        <FaUserSlash />
        sign out
      </FormSubmitBtn>
    </form>
  );
}
