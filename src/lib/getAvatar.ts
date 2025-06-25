'use server';
import { createMainClient } from './appwrite';

const getAvatar = async (name: string, width: number, height: number) => {
  const { avatars } = await createMainClient();

  const initials = await avatars.getInitials(name, width, height);

  return initials;
};

export default getAvatar;
