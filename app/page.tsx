import Hero from '@/app/components/home/hero';
import Categories from '@/app/components/home/categories';
import Steps from '@/app/components/home/steps';
import { Suspense } from 'react';
import {
  applicantSteps,
  applicantStepsImages,
  employerSteps,
  employerStepsImages,
} from '@/app/lib/steps';

export default function Page() {
  return (
    <>
      <Hero />
      <main className='main'>
        <Suspense fallback={<h2>LOADING...</h2>}>
          <Categories />
        </Suspense>
        <section className='section'>
          <h2 className='section-title'>Steps To Apply For a Job</h2>
          <Steps data={applicantSteps} images={applicantStepsImages} />
        </section>
        <section className='section'>
          <h2 className='section-title'>Steps To post a Job</h2>
          <Steps data={employerSteps} images={employerStepsImages} />
        </section>
      </main>
    </>
  );
}
