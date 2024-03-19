import Link from 'next/link';

export default function Breadcrumbs({
  items,
}: {
  items: [...{ label: string; href: string }[], { label: string; href?: undefined }];
}) {
  return (
    <nav>
      <ul style={{ display: 'flex', gap: '0.5rem', listStyleType: 'none' }}>
        {[{ label: 'home', href: '/' }, ...items].map(({ label, href }, index, arr) => (
          <li key={index} aria-current={!href} style={{ display: 'flex', gap: '0.25rem' }}>
            {href ? <Link href={href}>{label}</Link> : <>{label}</>}
            {index < arr.length - 1 && <span>&#x2B9E;</span>}
          </li>
        ))}
      </ul>
    </nav>
  );
}
