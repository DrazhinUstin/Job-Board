'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className='main grid-center'>
      <div className='text-center'>
        <h2 className='mb-4'>{error.message || 'An unexpected error occurred!'}</h2>
        <button className='btn' onClick={reset}>
          Try to recover
        </button>
      </div>
    </main>
  );
}
