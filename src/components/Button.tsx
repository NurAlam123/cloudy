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
      className={`btn ${variant} ${color} ${className}`}
      {...rest}
    >
      {children}
      <div className='state-layer'></div>
    </button>
  );
};

export default Button;
