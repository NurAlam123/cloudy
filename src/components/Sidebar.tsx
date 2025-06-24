'use client';

import Image from 'next/image';
import Logo from './Logo';
import NavLink from './NavLink';
import useSidebarStore from '@/store/useSidebarStore';
import { cn } from '@/utils';
import { IconButton } from './Button';

const Sidebar = () => {
  const openSidebar = useSidebarStore((state) => state.openSidebar);
  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);

  return (
    <div className={cn('sidebar hidden h-full', openSidebar && 'block')}>
      <div className='flex flex-col justify-between gap-4 h-full p-3'>
        <div className='flex justify-between items-center'>
          <Logo
            width='w-8'
            height='h-8'
          />
          <IconButton
            icon='/x.svg'
            onClick={toggleSidebar}
          />
        </div>
        <button className='flex items-center bg-light-primaryContainer text-light-onPrimaryContainer dark:bg-dark-primaryContainer dark:text-dark-onPrimaryContainer rounded-lg gap-2 text-label-large max-w-max h-[56px] ps-3 pe-4 shadow-elevation1 transition-shadow duration-150 ease-standard hover:shadow-elevation2 focus:shadow-elevation1 cursor-pointer disabled:bg-light-onSurface/[0.12] disabled:dark:bg-dark-onSurface/[0.12] disabled:text-light-onSurface/[0.38] disabled:dark:text-dark-onSurface/[0.38] disabled:shadow-none disabled:pointer-events-none'>
          <Image
            src='/plus.svg'
            alt='Plus'
            width={20}
            height={20}
            draggable={false}
          />
          <p>New Chat</p>
        </button>
        <div>
          <p className='text-title-small h-9 grid items-center px-4'>
            Recent Chats
          </p>
        </div>

        <div className='flex-1 h-full -me-2 pe-1 overflow-y-auto pb-3'>
          <nav className='space-y-1.5'>
            <NavLink
              href='/'
              title='New Conversations'
            />
          </nav>
        </div>
        <p>&copy; 2025 Nur Alam</p>
      </div>
    </div>
  );
};

export default Sidebar;
