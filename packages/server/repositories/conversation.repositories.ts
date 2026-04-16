const conversations = new Map<string, any>();

export const conversationRepository = {
   getLastResponseId: (conversationId: string) => {
      return conversations.get(conversationId);
   },
   setLastResponseId: (conversationId: string, responseId: any) => {
      conversations.set(conversationId, responseId);
   },
};
