import { auth } from '@/auth';
import { User } from 'next-auth';
import { Metadata } from 'next';
import Breadcrumbs from '../components/breadcrumbs';
import SignOutForm from '../components/auth/sign-out-form';
import Avatar from '../components/avatar';

export const metadata: Metadata = {
  title: 'Profile',
};

export default async function Page() {
  const session = await auth();
  const user = session?.user as User;
  return (
    <main>
      <Breadcrumbs items={[{ label: 'profile' }]} />
      <h2>Your profile:</h2>
      <p>id: {user.id}</p>
      <p>email: {user.email}</p>
      <p>name: {user.name}</p>
      <Avatar src={user.image} width={100} height={100} />
      <SignOutForm />
    </main>
  );
}
