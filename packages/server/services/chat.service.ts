import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { conversationRepository } from '../repositories/conversation.repositories';
import template from '../prompts/chatbot.txt';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
type ChatResponse = {
   message: string;
   id: string;
};

const parkInfo = fs.readFileSync(
   path.join(__dirname, '..', 'prompts', 'WonderWorld.md'),
   'utf-8'
);
const instructions = template.replace('{{parkInfo}}', parkInfo);

export const chatService = {
   sendMessage: async (
      conversationId: string,
      prompt: string
   ): Promise<ChatResponse> => {
      const response = await client.responses.create({
         model: 'gpt-4o-mini',
         instructions,
         input: prompt,
         temperature: 0.3,
         max_output_tokens: 100,
         previous_response_id:
            conversationRepository.getLastResponseId(conversationId) ||
            undefined,
      });

      conversationRepository.setLastResponseId(conversationId, response.id);
      return {
         message: response.output_text,
         id: response.id,
      };
   },
};
