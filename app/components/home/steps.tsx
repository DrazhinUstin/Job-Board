'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './steps.module.scss';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export default function Steps({
  data,
  images,
}: {
  data: { title: string; description: string }[];
  images: StaticImport[];
}) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {data.map(({ title, description }, index) => (
          <li
            key={index}
            className={index === currentIndex ? styles.active : undefined}
            onClick={() => setCurrentIndex(index)}
          >
            <span>{index + 1}</span>
            <div>
              <h4>{title}</h4>
              <p>{description}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.slides}>
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt='slide'
            className={index === currentIndex ? styles.active : undefined}
          />
        ))}
      </div>
    </div>
  );
}
