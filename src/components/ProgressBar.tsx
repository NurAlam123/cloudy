import { cn } from '@/utils';

const CircularProgress = ({
  className,
  size,
}: {
  className?: string;
  size?: string;
}) => {
  return (
    <div
      role='progressbar'
      className={cn(
        'border-4 rounded-full border-current border-r-transparent h-12 w-12 animate-spin',
        className,
        size,
      )}
    ></div>
  );
};

export { CircularProgress };
