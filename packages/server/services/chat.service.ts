import OpenAI from 'openai';
import { conversationRepository } from '../repositories/conversation.repositories';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
type ChatResponse = {
   message: string;
   id: string;
};

export const chatService = {
   sendMessage: async (
      conversationId: string,
      prompt: string
   ): Promise<ChatResponse> => {
      const response = await client.responses.create({
         model: 'gpt-4o-mini',
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
