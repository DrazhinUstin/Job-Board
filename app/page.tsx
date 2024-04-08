import Hero from '@/app/components/home/hero';
import Categories from '@/app/components/home/categories';
import { Suspense } from 'react';

export default function Page() {
  return (
    <>
      <Hero />
      <Suspense fallback={<h2>LOADING...</h2>}>
        <Categories />
      </Suspense>
    </>
  );
}
