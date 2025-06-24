// import { avatars } from '@/lib/appwrite';
import Image from 'next/image';

const Avatar = ({ name }: Readonly<{ name: string }>) => {
  return (
    <figure>
      <Image
        // src={avatars.getInitials(name, 48, 48)}
        src='/avatar.jpg'
        alt={name}
        width={48}
        height={48}
        className='rounded-full w-10 h-10'
      />
    </figure>
  );
};

export default Avatar;
