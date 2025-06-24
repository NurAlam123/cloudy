import { cn } from '@/utils';

const CircularProgress = ({ className }: { className: string }) => {
  return (
    <div
      role='progressbar'
      className={cn(
        'border-4 rounded-full border-current border-r-transparent h-12 w-12 animate-spin',
        className,
      )}
    ></div>
  );
};

export { CircularProgress };
