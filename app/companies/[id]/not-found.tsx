import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa6';

export default function NotFound() {
  return (
    <main className='main grid-center'>
      <div className='text-center'>
        <h1 className='mb-4'>404 Not Found</h1>
        <p className='mb-4'>Could not find the requested company</p>
        <Link href='/companies' className='btn-flex'>
          <FaArrowLeft />
          Back To Companies
        </Link>
      </div>
    </main>
  );
}
