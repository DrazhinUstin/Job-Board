import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';
import styles from './breadcrumbs.module.scss';

export default function Breadcrumbs({
  items,
}: {
  items: [...{ label: string; href: string }[], { label: string; href?: undefined }];
}) {
  return (
    <nav>
      <ul className={styles.container}>
        {[{ label: 'home', href: '/' }, ...items].map(({ label, href }, index, arr) => (
          <li key={index} aria-current={!href}>
            {href ? (
              <Link href={href} className='text-link'>
                {label}
              </Link>
            ) : (
              <>{label}</>
            )}
            {index < arr.length - 1 && (
              <span>
                <FaChevronRight />
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
