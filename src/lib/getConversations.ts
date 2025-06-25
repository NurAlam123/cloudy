'use server';

import { cookies } from 'next/headers';
import { createSessionClient } from './appwrite';
import { Query } from 'node-appwrite';
import getUser from './getUser';

const getConversations = async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  if (!session) return;

  try {
    const { database } = await createSessionClient(session.value);
    const user = await getUser();
    if (!user) return;

    const data = await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      'conversation',
      [
        Query.select(['$id', 'title']),
        Query.orderDesc('$createdAt'),
        Query.equal('user_id', user.$id),
      ],
    );
    return data;
  } catch (err) {
    console.error(err);
  }
};

export default getConversations;
