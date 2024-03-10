'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main>
      <h2>{error.message || 'An unexpected error occurred!'}</h2>
      <button onClick={reset}>Try to recover</button>
    </main>
  );
}
