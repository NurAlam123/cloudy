'use client';

import { CopyButton } from './Button';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({
  match,
  children,
}: {
  match: string[];
  children: React.ReactNode;
}) => {
  return (
    <>
      <div className='code-block overflow-y-hidden'>
        <div className='p-4 pb-0 capitalize'>{match[1]}</div>

        <SyntaxHighlighter
          PreTag='div'
          language={match[1]}
          style={coldarkDark}
          customStyle={{
            marginBlock: '0',
            padding: '2px',
          }}
          codeTagProps={{
            style: {
              padding: '14px',
              fontWeight: '600',
              fontSize: '16px',
            },
          }}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      </div>

      <div className='bg-dark-surfaceContainer rounded-t-sm rounded-b-md flex justify-between items-center h-11 text-body-medium px-4'>
        <p>Use code with caution</p>
        <div className='flex h-full justify-center items-center'>
          <CopyButton text={String(children).replace(/\n$/, '')} />
        </div>
      </div>
    </>
  );
};

export default CodeBlock;
