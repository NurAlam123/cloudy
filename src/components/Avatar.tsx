'use client';

import getAvatar from '@/lib/getAvatar';
import getUser from '@/lib/getUser';
import NextImage from 'next/image';
import { useEffect, useState } from 'react';

const Avatar = () => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [name, setName] = useState<string>('User');

  useEffect(() => {
    getUser().then((res) => res && setName(res.name));

    getAvatar(name, 48, 48).then((res) => {
      const blob = new Blob([res], { type: 'mimeType' });
      const url = URL.createObjectURL(blob);

      setImageSrc(url);
    });
  }, [name]);

  return (
    <figure>
      <NextImage
        src={imageSrc ? imageSrc : '/avatar.jpg'}
        alt={name}
        width={48}
        height={48}
        className='rounded-full w-7 h-7 aspect-square'
      />
    </figure>
  );
};

export default Avatar;
