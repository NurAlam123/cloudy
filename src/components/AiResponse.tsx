import Image from 'next/image';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const AiResponse = ({
  text,
  children,
}: {
  text: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className='grid grid-cols-1 items-center gap-1 py-2 md:grid-cols-[max-content,minmax(0,1fr),max-content] md:gap-2'>
      <figure>
        <Image
          src='/cloudy-light.svg'
          alt='Cloudy'
          width={48}
          height={48}
          className='h-9 w-9 aspect-auto block dark:hidden'
        />
        <Image
          src='/cloudy-dark.svg'
          alt='Cloudy'
          width={48}
          height={48}
          className='h-9 w-9 aspect-auto hidden dark:block'
        />
      </figure>

      {children}

      <div className='markdown-content'>
        <Markdown remarkPlugins={[remarkGfm]}>{text}</Markdown>
      </div>
    </div>
  );
};

export default AiResponse;
