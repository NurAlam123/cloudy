'use client';

import { useState } from 'react';
import Avatar from './Avatar';
import { IconButton } from './Button';
import Logo from './Logo';
import Menu from './Menu';
import MenuItem from './MenuItem';
import { cn } from '@/utils';
import { useRouter } from 'next/navigation';
import useSidebarStore from '@/store/useSidebarStore';
import logoutAction from '@/actions/logoutAction';
import { toast } from 'sonner';
import ThemeToggler from './ThemeToggler';

const TopAppBar = () => {
  const router = useRouter();

  const [toggleMenuItem, setToggleMenuItem] = useState(false);

  const { toggleSidebar } = useSidebarStore();

  const logout = async () => {
    const res = await logoutAction();
    if (!res.success) toast(res.message);

    toast(res.message);
    router.push('/login');
  };

  return (
    <header className='relative flex justify-between items-center h-16'>
      <div className='flex items-center gap-1'>
        <IconButton
          title='menu'
          icon='/menu.svg'
          onClick={toggleSidebar}
          className='grid dark:hidden'
        />
        <IconButton
          title='menu'
          icon='/menu-dark.svg'
          onClick={toggleSidebar}
          className='hidden dark:grid'
        />

        <Logo width='w-7 h-7 min-w-7 min-h-7' />
      </div>

      <div className='menu-wrapper flex gap-4'>
        <ThemeToggler />
        <IconButton
          title='menu'
          onClick={() => setToggleMenuItem(!toggleMenuItem)}
        >
          <Avatar />
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
