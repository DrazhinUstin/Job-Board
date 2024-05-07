'use client';

import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { FaArrowUp } from 'react-icons/fa6';
import styles from './scroll-up-btn.module.scss';

export default function ScrollUpBtn() {
  const [isBtnVisible, setIsBtnVisible] = useState<boolean>(false);

  useEffect(() => {
    function handleScroll(e: Event) {
      if (window.scrollY > document.documentElement.clientHeight) {
        setIsBtnVisible(true);
      } else {
        setIsBtnVisible(false);
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      className={clsx(styles.button, isBtnVisible && styles.show_button)}
      onClick={() => window.scrollTo(0, 0)}
    >
      <FaArrowUp />
    </button>
  );
}
