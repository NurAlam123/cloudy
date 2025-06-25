'use server';

import { genAI } from '@/lib/googleAi';

const userPromptAction = async (prompt: string) => {
  console.log(prompt);

  getConversationTitle(prompt);

  // current user
  // const user = await account.get();
};

const getConversationTitle = async (prompt: string) => {
  try {
    const result = await genAI.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `Given a user prompt, generate a concise and informative title that accurately describes the conversation. Consider keywords, topics, and the overall intent of the prompt. Response in plain text format, not markdown.

Prompt: ${prompt}`,
    });

    console.log(result.text);
  } catch (err) {
    console.error(err);
  }
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
