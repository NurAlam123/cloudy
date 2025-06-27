import { GoogleGenAI } from '@google/genai';
import { ChatHistroy } from './types';

const GEMINI_MODEL = 'gemini-2.0-flash';

export const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const getConversationTitle = async (prompt: string) => {
  try {
    const result = await genAI.models.generateContent({
      model: GEMINI_MODEL,
      contents: `Given a user prompt, generate a concise and informative title that accurately describes the conversation. Consider keywords, topics, and the overall intent of the prompt. Response in plain text format, not markdown.

Prompt: ${prompt}`,
    });

    return result.text;
  } catch (err) {
    console.error(err);
    return 'New Conversation';
  }
};

export const getAiResponse = async (
  prompt: string,
  history: ChatHistroy[] = [],
) => {
  try {
    const chats = genAI.chats.create({
      model: GEMINI_MODEL,
      config: { temperature: 1.5 },
      history,
    });

    const response = await chats.sendMessage({
      message: prompt,
    });

    return response.text;
  } catch (err) {
    console.error(err);
    return '';
  }
};
