import type { Request, Response } from 'express';
import { chatService } from '../services/chat.service';
import z from 'zod';

const chatSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, 'Prompt is required')
      .max(500, 'Prompt must be under 500 characters'),

   conversationId: z.uuid(),
});
export const chatController = {
   sendMessage: async (req: Request, res: Response) => {
      const result = chatSchema.safeParse(req.body);

      if (!result.success) {
         return res.status(400).json({
            error: z.treeifyError(result.error),
         });
      }

      try {
         const { prompt, conversationId } = req.body;
         const response = await chatService.sendMessage(conversationId, prompt);
         res.json({ response: response.message });
      } catch (error: any) {
         console.error('Gemini API Error:', error);
         res.status(500).json({ error: error.message });
      }
   },
};
