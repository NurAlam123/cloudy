import type { Metadata } from 'next';
import './globals.css';
import { montserrat } from '@/fonts';
import ThemeProvider from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: {
    default: 'Cloudy',
    template: '%s | Cloudy',
  },
  description: 'Experience smart and creative conversation with Cloudy.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
    >
      <body
        className={`${montserrat.variable} antialiased bg-light-background dark:bg-dark-background`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
