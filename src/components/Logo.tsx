import { cn } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';

const Logo = ({
  width,
  height,
  className,
}: Readonly<{
  width?: string;
  height?: string;
  className?: string;
}>) => {
  return (
    <Link
      href='/'
      className={cn('max-w-max mb-auto lg:mx-0', className)}
    >
      <div className='dark:hidden flex items-center gap-1.5'>
        <Image
          draggable={false}
          alt='Cloudy'
          src='/cloudy-light.svg'
          width={64}
          height={64}
          className={cn('aspewct-auto w-16 h-16', width, height)}
        />{' '}
        <span className='text-xl font-bold'>Cloudy</span>
      </div>

      <div className='hidden dark:flex dark:items-center gap-1.5'>
        <Image
          draggable={false}
          className={cn('aspewct-auto w-16 h-16', width, height)}
          alt='Cloudy'
          src='/cloudy-dark.svg'
          width={64}
          height={64}
        />{' '}
        <span className='text-xl font-bold text-shadow-white'>Cloudy</span>
      </div>
    </Link>
  );
};

export default Logo;
