import Link from 'next/link';

export default function NotFound() {
  return (
    <main>
      <h2>404 Not Found</h2>
      <p>Could not find the requested company</p>
      <Link href='/companies'>Back To Companies</Link>
    </main>
  );
}
