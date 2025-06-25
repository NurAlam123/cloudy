'use server';

import { cookies } from 'next/headers';
import { createSessionClient } from './appwrite';

const getUser = async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  if (!session) return;

  try {
    const { account } = await createSessionClient(session.value);
    const user = await account.get();
    return user;
  } catch (err) {
    console.error(err);
  }
};

export default getUser;
