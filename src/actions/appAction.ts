'use server';

import { getLoggedInUser } from '@/lib/appwrite';
import { createConversation, getConversation } from '@/lib/database';
import { getAiResponse, getConversationTitle } from '@/lib/googleAi';
import { Payload } from '@/lib/types';
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

export const createResponse = async (
  payload: Payload,
  conversationID: string,
) => {
  // const conversation = await getConversation(conversationID);

  // let conversations = [];
  // if (conversation) conversations = conversation.chats;

  // Generate an AI response
  const aiResponse = await getAiResponse(payload.prompt, []);

  // Create a new chat document in the 'chats' collection
  await createConversation({
    id: generateID(),
    collectionName: 'chats',
    data: {
      user_prompt: payload.prompt,
      ai_response: aiResponse,
      conversations: conversationID,
    },
  });

  return aiResponse;
};
