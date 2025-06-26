import MainContent from '@/components/MainContent';
import PromptField from '@/components/PromptField';
import Sidebar from '@/components/Sidebar';
import TopAppBar from '@/components/TopAppBar';
import { getLoggedInUser } from '@/lib/appwrite';
import { redirect } from 'next/navigation';

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getLoggedInUser();
  if (!user) return redirect('/login');

  return (
    <>
      <div className='px-2 max-w-3xl mx-auto'>
        {/* Sidebar */}
        <Sidebar user={user} />
        <div className='h-dvh flex flex-col justify-between'>
          {/* Top app bar */}
          <TopAppBar user={user} />

          {/* Main content */}
          <MainContent
            className='h-full overflow-y-auto py-4'
            user={user}
          >
            {children}
          </MainContent>

          {/* Prompt field */}
          <PromptField />
          <div className='max-w-[870px] px-5 w-full mx-auto py-2'>
            <p className='text-center text-xs animate-fadein'>
              <span className='block'>
                Cloudy may display inaccurate info, including about people, so
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
