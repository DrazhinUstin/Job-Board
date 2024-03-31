'use client';

import { useRouter } from 'next/navigation';

const styles: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  padding: '1rem',
  display: 'grid',
  placeItems: 'center',
};

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <div style={styles}>
      <div>
        <button onClick={() => router.back()}>close</button>
        {children}
      </div>
    </div>
  );
}
