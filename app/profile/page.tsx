import { auth } from '@/auth';
import { User } from 'next-auth';
import SignOutForm from '../components/auth/sign-out-form';
import Avatar from '../components/avatar';
import { FaEnvelope } from 'react-icons/fa6';
import styles from './page.module.scss';

export default async function Page() {
  const session = await auth();
  const user = session?.user as User;
  return (
    <div className={styles.container}>
      <Avatar src={user.image} width={100} height={100} />
      <h4>{user.name}</h4>
      <p>
        <FaEnvelope /> {user.email}
      </p>
      <SignOutForm />
    </div>
  );
}
