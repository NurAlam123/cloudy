import Greetings from '@/components/Greetings';

export const metadata = {
  title: 'Home',
};

export default function Home() {
  return (
    <>
      {/* Main content */}
      <div className='px-5 pb-5 flex flex-col h-full overflow-y-auto flex-1'>
        <div className='max-w-[840px] h-full w-full mx-auto grow'>
          <Greetings />
        </div>
      </div>
    </>
  );
}
