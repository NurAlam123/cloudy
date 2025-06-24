import { cn } from '@/utils';
import { ButtonHTMLAttributes } from 'react';

const MenuItem = ({
  className,
  labelText,
  ...rest
}: {
  className?: string;
  labelText: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cn(
        'text-light-onSurface dark:text-dark-onSurface text-label-large h-12 w-full flex items-center px-3 rounded-md cursor-pointer',
        className,
      )}
      {...rest}
    >
      <span>{labelText}</span>
      <div className='bg-light-onSurface dark:bg-dark-onSurface'></div>
    </button>
  );
};

export default MenuItem;
