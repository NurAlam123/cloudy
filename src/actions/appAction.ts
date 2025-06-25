'use server';

import { createMainClient } from '@/lib/appwrite';
import getUser from '@/lib/getUser';
import { getAiResponse, getConversationTitle } from '@/lib/googleAi';
import generateID from '@/utils/generateID';

const userPromptAction = async (prompt: string) => {
  // Get current user
  const { database } = await createMainClient();
  const user = await getUser();

  // get conversation title
  const conversationTitle = await getConversationTitle(prompt);
  let conversation = null;

  try {
    conversation = await database.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      'conversation',
      generateID(),
      {
        title: conversationTitle,
        user_id: user?.$id,
      },
    );
  } catch (err) {
    console.error(err);
  }

  // Generate an AI response
  const aiResponse = await getAiResponse(prompt);

  // Create a new chat document in the 'chats' collection

  await database.createDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
    'chats',
    generateID(),
    {
      user_prompt: prompt,
      ai_response: aiResponse,
      conversations: conversation?.$id,
    },
  );
};

const appAction = async ({
  prompt,
  requestType,
}: {
  prompt: string;
  requestType: 'user_prompt';
}) => {
  if (requestType === 'user_prompt') {
    await userPromptAction(prompt);
  }
};

export default appAction;
