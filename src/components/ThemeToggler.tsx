'use client';

import { cn } from '@/utils';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const ThemeToggler = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className='flex gap-2 items-center z-10'>
      <div className='flex items-center relative text-stone-500 dark:text-white'>
        <Image
          draggable={false}
          alt='Sun'
          src='/sun.svg'
          width={24}
          height={24}
          className={cn(
            'will-change-auto transition-all duration-100 ease-in-out cursor-pointer w-6 h-6',
            theme === 'light' && 'opacity-0 scale-0',
          )}
          onClick={() => setTheme('light')}
        />
        <Image
          draggable={false}
          alt='Moon'
          src='/moon.svg'
          width={24}
          height={24}
          className={cn(
            'will-change-auto transition-all duration-100 ease-in-out absolute cursor-pointer aspect-auto w-6 h-6',
            theme === 'dark' && 'opacity-0 scale-0',
          )}
          onClick={() => {
            setTheme('dark');
          }}
        />
      </div>
    </div>
  );
};

export default ThemeToggler;
