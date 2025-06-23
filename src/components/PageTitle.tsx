import Head from 'next/head';

const PageTitle = ({ title }: Readonly<{ title: string }>) => {
  return (
    <Head>
      <title>{title} | Cloudy</title>
    </Head>
  );
};

export default PageTitle;
