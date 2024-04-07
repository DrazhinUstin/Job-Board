import Link from 'next/link';
import Image from 'next/image';
import styles from './hero.module.scss';
import hero_image from '@/public/hero.svg';

export default function Hero() {
  return (
    <section className={styles.container}>
      <div className='section-center'>
        <article className={styles.intro}>
          <h1>Welcome to the Job Board</h1>
          <p>
            Find Jobs, Employment & Career Opportunities. We have helped some companies recruit
            excellent applicants over the years.
          </p>
          <Link href='/jobs' className='btn'>
            start now
          </Link>
        </article>
        <Image src={hero_image} alt='hero' className={styles.image} />
      </div>
    </section>
  );
}
