import ThemeToggler from '@/components/ThemeToggler';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className='absolute right-3 top-3 z-10 p-2 bg-light-background dark:bg-dark-background rounded-full'>
        <ThemeToggler />
      </div>
      <div>{children}</div>
    </>
  );
}
