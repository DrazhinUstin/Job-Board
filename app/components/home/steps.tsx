'use client';

import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import styles from './steps.module.scss';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export default function Steps({
  data,
  images,
  slidesFirst,
}: {
  data: { title: string; description: string }[];
  images: StaticImport[];
  slidesFirst?: boolean;
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
      <div className={clsx(styles.slides, slidesFirst && styles.slides_first)}>
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
