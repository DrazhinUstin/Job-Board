import Hero from '@/app/components/home/hero';
import Categories from '@/app/components/home/categories';
import Steps from '@/app/components/home/steps';
import { Suspense } from 'react';
import { applicantSteps, applicantStepsImages } from '@/app/lib/steps';

export default function Page() {
  return (
    <>
      <Hero />
      <Suspense fallback={<h2>LOADING...</h2>}>
        <Categories />
      </Suspense>
      <section className='section section-center'>
        <h2 className='section-title'>Steps To Apply For a Job</h2>
        <Steps data={applicantSteps} images={applicantStepsImages} />
      </section>
    </>
  );
}
