'use client';

import { useState } from 'react';
import Avatar from './Avatar';
import { IconButton } from './Button';
import Logo from './Logo';
import Menu from './Menu';
import MenuItem from './MenuItem';
import { cn } from '@/utils';
import { account } from '@/lib/appwrite';
import { useRouter } from 'next/navigation';
import useSidebarStore from '@/store/useSidebarStore';

const TopAppBar = () => {
  const router = useRouter();

  const [toggleMenuItem, setToggleMenuItem] = useState(false);

  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);

  const logout = async () => {
    try {
      await account.deleteSession('current');
    } catch (err) {
      console.error(err);
    } finally {
      router.push('/login');
    }
  };

  return (
    <header className='relative flex justify-between items-center h-16 px-4'>
      <div className='flex items-center gap-1'>
        <IconButton
          icon='/menu.svg'
          onClick={toggleSidebar}
          className='grid dark:hidden'
        />
        <IconButton
          icon='/menu-dark.svg'
          onClick={toggleSidebar}
          className='hidden dark:grid'
        />

        <Logo width='w-7 h-7 min-w-7 min-h-7' />
      </div>

      <div className='menu-wrapper'>
        <IconButton onClick={() => setToggleMenuItem(!toggleMenuItem)}>
          <Avatar name='Nur Alam' />
        </IconButton>

        <Menu className={cn(toggleMenuItem && 'active')}>
          <MenuItem
            labelText='Logout'
            onClick={logout}
          />
        </Menu>
      </div>
    </header>
  );
};

export default TopAppBar;
