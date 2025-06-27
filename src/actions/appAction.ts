'use server';

import { getLoggedInUser } from '@/lib/appwrite';
import { createConversation, getConversation } from '@/lib/database';
import { getAiResponse, getConversationTitle } from '@/lib/googleAi';
import { Chat, ChatHistroy, Payload } from '@/lib/types';
import generateID from '@/utils/generateID';

export const setTitle = async (payload: Payload) => {
  // get conversation title
  const conversationTitle = await getConversationTitle(payload.prompt);

  let conversation = null;

  // Store title
  try {
    const user = await getLoggedInUser();
    if (!user || !conversationTitle) return;

    conversation = await createConversation({
      collectionName: 'conversation',
      id: generateID(),
      data: {
        title: conversationTitle,
        user_id: user.$id,
      },
    });
  } catch (err) {
    console.error(err);
  }

  return conversation;
};

export const createResponse = async ({
  payload,
  conversationID,
  id,
}: {
  payload: Payload;
  conversationID: string;
  id: string;
}) => {
  const conversation = await getConversation(conversationID);

  const conversations: ChatHistroy[] = [];

  if (conversation) {
    conversation.chats.map((chat: Chat) => {
      conversations.push({
        role: 'user',
        parts: [{ text: chat.user_prompt }],
      });
      conversations.push({
        role: 'model',
        parts: [{ text: chat.ai_response }],
      });
    });
  }

  // Generate an AI response
  const aiResponse = await getAiResponse(payload.prompt, conversations);

  // Create a new chat document in the 'chats' collection
  await createConversation({
    id,
    collectionName: 'chats',
    data: {
      user_prompt: payload.prompt,
      ai_response: aiResponse,
      conversations: conversationID,
    },
  });

  return aiResponse;
};
