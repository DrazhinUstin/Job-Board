import { fetchCategoriesWithJobsCount } from '@/app/lib/data';
import Link from 'next/link';
import styles from './categories.module.scss';
import CategoryCard from './category-card';

export default async function Categories() {
  const categories = await fetchCategoriesWithJobsCount();
  return (
    <section className='section'>
      <h2 className='section-title'>Browse Jobs By Categories</h2>
      <div className={styles.container}>
        {categories.map((category) => {
          return (
            <Link key={category.id} href={`/jobs?categoryName=${category.name}`}>
              <CategoryCard {...category} />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
