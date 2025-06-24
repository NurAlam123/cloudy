import { cn } from '@/utils';

const Menu = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return <div className={cn('menu', className)}>{children}</div>;
};

export default Menu;
