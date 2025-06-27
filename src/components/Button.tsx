'use client';

import { cn } from '@/utils';
import { MotionProps } from 'motion/react';
import Image from 'next/image';
import { ButtonHTMLAttributes, useCallback } from 'react';

import { motion } from 'motion/react';
import { toast } from 'sonner';

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
  title,
  ...rest
}: {
  className?: string;
  children?: React.ReactNode;
  icon?: string;
  size?: string;
  title: string;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  MotionProps) => {
  return (
    <motion.button
      className={cn(
        'text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant grid place-items-center gap-1 cursor-pointer rounded-full h-7 w-7 aspect-square',
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
      <span className='sr-only'>{title}</span>
      <div className='bg-light-onSurface dark:bg-dark-onSurface'></div>
    </motion.button>
  );
};

const CopyButton = ({
  text,
  className,
  ...rest
}: {
  text: string;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) => {
  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast('Copied to clipboard');
    } catch (err) {
      console.error(err);
    }
  }, [text]);

  return (
    <button
      className={cn('cursor-pointer', className)}
      onClick={copy}
      {...rest}
    >
      <Image
        src='/copy.svg'
        alt='copy'
        width={24}
        height={25}
        className='w-fit h-fit border'
      />
    </button>
  );
};

export { Button, IconButton, CopyButton };
