import Link from 'next/link';

export default function NotFound() {
  return (
    <main>
      <h2>404 Not Found</h2>
      <p>Could not find the requested job</p>
      <Link href='/jobs'>Back To Jobs</Link>
    </main>
  );
}
