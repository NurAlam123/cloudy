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
      <div>
        {/* Top app bar */}
        <TopAppBar />

        {/* Main content */}
        <div>
          <div></div>
        </div>

        {/* Prompt field */}
        <div>
          <p>
            Coludy may display inaccurate info, including about people, so
            double check it&apos;s response
            <a
              href='https://support.google.com/gemini?p=privacy_notice'
              target='_blank'
            >
              Your privacy & Gemini Apps
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
