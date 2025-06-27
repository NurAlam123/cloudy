'use client';

import Avatar from './Avatar';

const UserPrompt = ({ text }: { text: string }) => {
  return (
    <div className='grid grid-cols-1 items-center gap-1 py-2 md:grid-cols-[max-content,minmax(0,1fr),max-content] md:gap-2'>
      <Avatar />

      <p className='text-body-large pt-1 whitespace-pre-wrap'>{text}</p>
    </div>
  );
};

export default UserPrompt;
