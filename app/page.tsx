import Link from 'next/link';

export default function Page() {
  return (
    <main>
      <h2>Welcome to the Job Board</h2>
      <p>Search for a job or add job to the board as an employer</p>
      <Link href='/jobs'>start</Link>
    </main>
  );
}
