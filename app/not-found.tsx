import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa6';

export default function NotFound() {
  return (
    <main className='main grid-center'>
      <div className='text-center'>
        <h1 className='mb-4'>404 Not Found</h1>
        <p className='mb-4'>Could not find requested resource</p>
        <Link href='/' className='btn-flex'>
          <FaArrowLeft />
          Back to start page
        </Link>
      </div>
    </main>
  );
}
