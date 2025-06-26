'use client';

import { getUserAvatarInitials } from '@/lib/appwrite';
import useAuthStore from '@/store/useAuthStore';
import { Models } from 'node-appwrite';
import { useEffect } from 'react';

const MainContent = ({
  className,
  user,
  children,
}: Readonly<{
  className?: string;
  user: Models.User<Models.Preferences>;
  children: React.ReactNode;
}>) => {
  const setUser = useAuthStore((state) => state.setUser);
  const setAvatar = useAuthStore((state) => state.setAvatar);
  const authUser = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!authUser) {
      setUser(user);

      getUserAvatarInitials({
        name: user?.name,
        width: 48,
        height: 48,
      }).then((avatar) => {
        setAvatar({ name: user?.name || 'User', data: avatar });
      });
    }
  }, [setUser, user, authUser, setAvatar]);

  return <main className={className}>{children}</main>;
};

export default MainContent;
