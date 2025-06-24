import { cn } from '@/utils';
import Image from 'next/image';
import { ButtonHTMLAttributes } from 'react';

// Common Button
const Button = ({
  className = '',
  variant = 'filled',
  color = 'primary',
  children,
  ...rest
}: {
  className?: string;
  variant?: 'filled' | 'rounded';
  color?: 'primary' | 'dark';
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={`btn ${variant} ${color} ${className} cursor-pointer`}
      {...rest}
    >
      {children}
      <div className='state-layer'></div>
    </button>
  );
};

// Icon button
const IconButton = ({
  className = '',
  children,
  icon,
  size,
  ...rest
}: {
  className?: string;
  children?: React.ReactNode;
  icon?: string;
  size?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cn(
        'text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant grid place-items-center gap-1 cursor-pointer rounded-full h-10 w-10',
        className,
      )}
      {...rest}
    >
      {icon && (
        <Image
          src={icon}
          alt={icon}
          width={24}
          height={24}
          className={cn('h-6 w-6 aspect-auto', size)}
          draggable='false'
        />
      )}
      {children}
      <span className='sr-only'>{children}</span>
      <div className='bg-light-onSurface dark:bg-dark-onSurface'></div>
    </button>
  );
};

export { Button, IconButton };
