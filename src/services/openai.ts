import { OpenAI } from 'openai';
import type { ChatMessage } from '../types/ChatMessage.js';
import { PUBLIC_OPENAI_API_KEY } from '$env/static/public';

const openAi = new OpenAI({
  apiKey: PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const OpenAiClient = {
  async sendMessage(messages: ChatMessage[]): Promise<string> {
    try {
      const response = await openAi.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages,
      });

      return response.choices[0].message.content ?? '';
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      throw error;
    }
  },
};
