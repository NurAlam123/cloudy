import PromptField from '@/components/PromptField';
import Sidebar from '@/components/Sidebar';
import TopAppBar from '@/components/TopAppBar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className='px-2 max-w-3xl mx-auto'>
        {/* Sidebar */}
        <Sidebar />
        <div className='h-dvh flex flex-col justify-between'>
          {/* Top app bar */}
          <TopAppBar />

          {/* Main content */}
          <div className='h-full overflow-y-auto py-4'>{children}</div>

          {/* Prompt field */}
          <PromptField />
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
    </>
  );
}
