import { CircularProgress } from '@/components/ProgressBar';

export default function Loading() {
  return (
    <div className='h-full flex justify-center items-center'>
      <CircularProgress size='h-16 w-16' />
    </div>
  );
}
