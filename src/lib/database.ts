'use server';

import { Models, Query } from 'node-appwrite';
import { createSessionClient } from './appwrite';
import { notFound } from 'next/navigation';

// Get all the conversation of the user form database
export async function getAllConversation(userID: string) {
  const { database } = await createSessionClient();

  try {
    if (!userID) return;
    const data = await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      'conversation',
      [
        Query.select(['$id', 'title']),
        Query.orderDesc('$createdAt'),
        Query.equal('user_id', userID),
      ],
    );
    return data;
  } catch (err) {
    console.error(err);
    return;
  }
}

// Get the conversation details
export async function getConversation(conversationID: string) {
  const { database } = await createSessionClient();

  try {
    const data = await database.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      'conversation',
      conversationID,
    );
    return data;
  } catch {
    notFound();
  }
}

// Delete a conversation
export async function deleteConversation(conversationID: string) {
  try {
    const { database } = await createSessionClient();
    const data = await database.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      'conversation',
      conversationID,
    );
    return data;
  } catch {
    notFound();
  }
}

// Create conversation
export async function createConversation({
  id,
  data,
  collectionName,
}: {
  id: string;
  collectionName: 'conversation' | 'chats';
  data: Partial<Models.Document>;
}) {
  try {
    const { database } = await createSessionClient();
    return await database.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      collectionName,
      id,
      data,
    );
  } catch (err) {
    console.error(err);
    return;
  }
}
