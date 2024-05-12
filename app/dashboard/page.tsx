import { Suspense } from 'react';
import Overview from '../components/dashboard/overview';
import Charts from '../components/dashboard/charts';
import Spinner from '../components/spinner';

export default function Page() {
  return (
    <main>
      <Suspense fallback={<Spinner />}>
        <Overview />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <Charts />
      </Suspense>
    </main>
  );
}
