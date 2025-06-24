import Greetings from '@/components/Greetings';
import Sidebar from '@/components/Sidebar';
import TopAppBar from '@/components/TopAppBar';

export const metadata = {
  title: 'Home',
};

export default function Home() {
  return (
    <div>
      {/* Sidebar */}
      <Sidebar />
      <div className='h-dvh flex flex-col justify-between'>
        {/* Top app bar */}
        <TopAppBar />

        {/* Main content */}
        <div className='px-5 pb-5 flex flex-col overflow-y-auto flex-1'>
          <div className='max-w-[840px] w-full mx-auto grow'>
            <Greetings />
          </div>
        </div>

        {/* Prompt field */}
        <div className='max-w-[870px] px-5 w-full mx-auto py-2'>
          <p className='text-center text-xs animate-fadein'>
            <span className='block'>
              Coludy may display inaccurate info, including about people, so
              double check it&apos;s response
              <a
                href='https://support.google.com/gemini?p=privacy_notice'
                target='_blank'
                className='inline underline ms-1'
              >
                Your privacy & Gemini Apps
              </a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
