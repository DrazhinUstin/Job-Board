import { auth } from '@/auth';
import { User } from 'next-auth';
import Image from 'next/image';
import { signOut } from '@/auth';
import { Metadata } from 'next';
import Breadcrumbs from '../components/breadcrumbs';

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
      {user.image && <Image src={user.image} alt='avatar' width={50} height={50} />}
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button type='submit'>sign out</button>
      </form>
    </main>
  );
}
