import Image from 'next/image';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeBlock from './CodeBlock';

const AiResponse = ({
  text,
  loading = false,
}: {
  text: string;
  children?: React.ReactNode;
  loading?: boolean;
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
          draggable='false'
        />
        <Image
          src='/cloudy-dark.svg'
          alt='Cloudy'
          width={48}
          height={48}
          className='h-9 w-9 aspect-auto hidden dark:block'
          draggable='false'
        />
      </figure>

      {!loading ? (
        <div className='markdown-content'>
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
              code(props) {
                const { children, className } = props;
                const match = /language-(\w+)/.exec(className || '');
                return match ? (
                  <CodeBlock match={match}>{children}</CodeBlock>
                ) : (
                  <code className={className}>{children}</code>
                );
              },
            }}
          >
            {text}
          </Markdown>
        </div>
      ) : (
        <div className='space-y-3'>
          <div className='h-4 w-full shimmer rounded'></div>
          <div className='h-4 w-full shimmer rounded'></div>
          <div className='h-4 w-3/4 shimmer rounded'></div>
        </div>
      )}
    </div>
  );
};

export default AiResponse;
