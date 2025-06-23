import localFont from 'next/font/local';

export const montserrat = localFont({
  src: [
    {
      path: './Montserrat/Montserrat-VariableFont_wght.ttf',
      style: 'normal',
    },
    {
      path: './Montserrat/Montserrat-Italic-VariableFont_wght.ttf',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-montserrat',
});
