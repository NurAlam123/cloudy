'use server';

import { cookies } from 'next/headers';
import { createSessionClient } from './appwrite';

const getConversation = async (conversationID: string) => {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  if (!session) return;

  try {
    const { database } = await createSessionClient(session.value);

    const data = await database.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      'conversation',
      conversationID,
    );
    return data;
  } catch (err) {
    console.error(err);
  }
};

export default getConversation;
