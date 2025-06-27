'use client';

import useAuthStore from '@/store/useAuthStore';
import NextImage from 'next/image';
import { useEffect, useState } from 'react';

const Avatar = () => {
  const [imageSrc, setImageSrc] = useState<string>('/avatar.jpg');
  const avatar = useAuthStore((state) => state.avatar);

  useEffect(() => {
    const imageRes = avatar?.data;

    if (!imageRes) return;

    const blob = new Blob([imageRes], { type: 'mimeType' });
    const url = URL.createObjectURL(blob);
    setImageSrc(url);
  }, [avatar]);

  if (!avatar) return;

  return (
    <figure>
      <NextImage
        draggable='false'
        src={imageSrc}
        alt={avatar?.name}
        width={48}
        height={48}
        className='rounded-full w-7 h-7 aspect-square'
      />
    </figure>
  );
};

export default Avatar;
