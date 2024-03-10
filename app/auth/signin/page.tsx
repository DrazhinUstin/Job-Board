import Providers from '@/app/components/auth/providers';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In',
};

export default function Page() {
  return (
    <main>
      <Providers />
    </main>
  );
}
