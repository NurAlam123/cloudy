'use server';

import { cookies } from 'next/headers';
import { createSessionClient } from './appwrite';

const deleteConversation = async (conversationID: string) => {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  if (!session) return;

  try {
    const { database } = await createSessionClient(session.value);

    const data = await database.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      'conversation',
      conversationID,
    );
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export default deleteConversation;
