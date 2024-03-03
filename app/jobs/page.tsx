import Link from 'next/link';

export default function Page() {
  return (
    <main>
      <h2>Jobs</h2>
      <p>This is a page where you can view all available jobs</p>
      <Link href='/jobs/create'>create a job</Link>
    </main>
  );
}
