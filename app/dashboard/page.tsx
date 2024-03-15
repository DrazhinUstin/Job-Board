import { Suspense } from 'react';
import Overview from '../components/dashboard/overview';

export default function Page() {
  return (
    <main>
      <h2>Dashboard overview page</h2>
      <Suspense fallback={<h2>LOADING OVERVIEW...</h2>}>
        <Overview />
      </Suspense>
    </main>
  );
}
