import { Suspense } from 'react';
import Overview from '../components/dashboard/overview';
import Spinner from '../components/spinner';

export default function Page() {
  return (
    <main>
      <Suspense fallback={<Spinner />}>
        <Overview />
      </Suspense>
    </main>
  );
}
