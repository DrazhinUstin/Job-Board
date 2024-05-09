import { Suspense } from 'react';
import Overview from '../components/dashboard/overview';
import TopJobsChart from '../components/dashboard/top-jobs-chart';
import Spinner from '../components/spinner';

export default function Page() {
  return (
    <main>
      <Suspense fallback={<Spinner />}>
        <Overview />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <TopJobsChart />
      </Suspense>
    </main>
  );
}
