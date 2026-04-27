import fs from 'fs';
import path from 'path';
import { conversationRepository } from '../repositories/conversation.repositories';
import template from '../prompts/chatbot.txt';
import { llmClient } from '../llm/client';

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
      const response = await llmClient.generateText({
         model: 'gpt-4o-mini',
         instructions,
         prompt,
         temperature: 0.3,
         maxTokens: 100,
         previousResponseId:
            conversationRepository.getLastResponseId(conversationId) ||
            undefined,
      });

      conversationRepository.setLastResponseId(conversationId, response.id);
      return {
         message: response.text,
         id: response.id,
      };
   },
};
