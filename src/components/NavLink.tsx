'use client';

import Image from 'next/image';
import { IconButton } from './Button';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/utils';
import deleteConversation from '@/lib/deleteConversation';
import { toast } from 'sonner';

const NavLink = ({ href, title }: { href: string; title: string }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const id = pathname.replace('/chat/', '');

  const deleteChat = async () => {
    const res = await deleteConversation(id);

    if (res) toast('Successfully deleted a conversation');
  };

  return (
    <div className='relative group'>
      <Link
        href={href}
        className={cn(
          'flex items-center justify-between gap-3 text-label-large text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant h-9 rounded-full ps-4 pe-10 group',
          isActive &&
            'bg-light-secondaryContainer dark:bg-dark-secondaryContainer text-light-onSecondaryContainer dark:text-dark-onSecondaryContainer',
        )}
      >
        <div className='flex gap-1'>
          <Image
            src='/message-circle.svg'
            alt='Message'
            width={20}
            height={20}
            draggable='false'
            className='block dark:hidden'
          />

          <Image
            src='/message-circle-dark.svg'
            alt='Message'
            width={20}
            height={20}
            draggable='false'
            className='dark:block hidden'
          />

          <p className='truncate max-w-44 text-sm'>{title}</p>
        </div>
      </Link>

      <IconButton
        title='trash'
        icon='/trash.svg'
        size='h-5 w-5'
        className='dark:hidden grid h-5 w-5 invisible group-hover:visible transition-[visibility] duration-100 ease-in-out absolute top-1/2 right-0 -translate-1/2'
        onClick={deleteChat}
      />

      <IconButton
        title='trash'
        icon='/trash-dark.svg'
        size='h-5 w-5'
        className='dark:grid hidden h-5 w-5 invisible group-hover:visible transition-[visibility] duration-100 ease-in-out absolute top-1/2 right-0 -translate-1/2'
        onClick={deleteChat}
      />
    </div>
  );
};

export default NavLink;
