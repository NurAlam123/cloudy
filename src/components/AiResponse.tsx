import Image from 'next/image';

import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import CodeBlock from './CodeBlock';
import { Suspense, useEffect, useRef } from 'react';
import Skeleton from './Skeleton';

import 'katex/dist/katex.min.css';

const AiResponse = ({
  text,
  loading = false,
  id,
  lastID,
}: {
  text: string;
  children?: React.ReactNode;
  loading?: boolean;
  id: string;
  lastID: string;
}) => {
  const responseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!responseRef.current) return;
    if (id !== lastID) return;

    responseRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  }, [id, lastID, text, loading]);

  return (
    <div
      ref={responseRef}
      className='grid grid-cols-1 items-center gap-1 py-2 md:grid-cols-[max-content,minmax(0,1fr),max-content] md:gap-2'
    >
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

      {id !== lastID || !loading ? (
        <div className='markdown-content'>
          <Suspense fallback={<Skeleton />}>
            <Markdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
              components={{
                code: (props) => {
                  const { children, className } = props;
                  const match = /language-(\w+)/.exec(className || '');
                  return match ? (
                    <CodeBlock match={match}>{children}</CodeBlock>
                  ) : (
                    <code className={className}>{children}</code>
                  );
                },

                table: ({ children, ...props }) => (
                  <div className='table-wrapper'>
                    <table {...props}>{children}</table>
                  </div>
                ),
                thead: ({ children, ...props }) => (
                  <thead {...props}>{children}</thead>
                ),
                tbody: ({ children, ...props }) => (
                  <tbody {...props}>{children}</tbody>
                ),
                tr: ({ children, ...props }) => <tr {...props}>{children}</tr>,
                th: ({ children, ...props }) => <th {...props}>{children}</th>,
                td: ({ children, ...props }) => <td {...props}>{children}</td>,
              }}
            >
              {text}
            </Markdown>
          </Suspense>
        </div>
      ) : (
        <>{loading && <Skeleton />}</>
      )}
    </div>
  );
};

export default AiResponse;
