'use client';

import { useRouter } from 'next/navigation';
import { FaXmark } from 'react-icons/fa6';
import styles from './modal.module.scss';

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <div className={styles.wrapper}>
      <div className={styles.window}>
        <button onClick={() => router.back()} className='btn-alert'>
          <FaXmark />
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
}
