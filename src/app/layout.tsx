import type { Metadata } from 'next';
import './globals.css';
import { montserrat } from '@/fonts';

export const metadata: Metadata = {
  title: 'Cloudy',
  description: 'Experience smart and creative conversation with Cloudy.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${montserrat.variable} antialiased`}>{children}</body>
    </html>
  );
}
