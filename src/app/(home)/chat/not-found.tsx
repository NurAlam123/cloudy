import { Button } from '@/components/Button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='h-full w-full flex items-center justify-center flex-col gap-4'>
      <p className='text-display-medium font-semibold'>404</p>

      <p className='text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant'>
        Not Found
      </p>
      <Link href='/'>
        <Button className='font-semibold'>Create a new chat</Button>
      </Link>
    </div>
  );
}
