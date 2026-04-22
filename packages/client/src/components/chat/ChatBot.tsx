import { useForm } from 'react-hook-form';
import {
   useEffect,
   useRef,
   useState,
   type ClipboardEvent,
   type KeyboardEvent,
} from 'react';
import axios from 'axios';
import TypingIndicator from './TypingIndicator';
import ChatMessage from './ChatMessages';
import ChatInput from './ChatInput';
import popSound from '../../assets/sounds/pop.mp3';
import notificationSound from '../../assets/sounds/notification.mp3';

const popAudio = new Audio(popSound);
const notificationAudio = new Audio(notificationSound);

popAudio.volume = 0.5;
notificationAudio.volume = 0.5;

type FormData = {
   prompt: string;
};

type ChatResponse = {
   response: string;
};

type Message = {
   text: string;
   role: 'user' | 'bot';
};

const ChatBot = () => {
   const [messages, setMessages] = useState<Message[]>([]);
   const [isBotTyping, setIsBotTyping] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const conversationId = useRef(crypto.randomUUID());
   const bottomRef = useRef<HTMLDivElement | null>(null);
   const { register, handleSubmit, reset, formState } = useForm<FormData>();

   const onSubmit = async ({ prompt }: FormData) => {
      try {
         setMessages((prev) => [...prev, { text: prompt, role: 'user' }]);
         setIsBotTyping(true);
         setError(null);
         reset({ prompt: '' });
         popAudio.play();

         const { data } = await axios.post<ChatResponse>('/api/chat', {
            prompt,
            conversationId: conversationId.current,
         });
         setMessages((prev) => [...prev, { text: data.response, role: 'bot' }]);
         setIsBotTyping(false);
         notificationAudio.play();
      } catch (error) {
         console.error('Error fetching response:', error);
         setError('An error occurred while fetching the response.');
      } finally {
         setIsBotTyping(false);
      }
   };

   const OnKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         handleSubmit(onSubmit)();
      }
   };

   const OnCopy = (e: ClipboardEvent<HTMLParagraphElement>) => {
      const selection = window.getSelection();
      if (selection) {
         const selectedText = selection.toString().trim();
         if (selectedText) {
            e.clipboardData.setData('text/plain', selectedText);
            e.preventDefault();
         }
      }
   };

   useEffect(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
   }, [messages, isBotTyping]);

   return (
      <div className="flex  flex-col h-full">
         <div className="flex flex-1 flex-col gap-3 mb-5 overflow-y-auto">
            {messages.map((message, index) => (
               <ChatMessage key={index} message={message} onCopy={OnCopy} />
            ))}

            {isBotTyping && <TypingIndicator />}

            {error && (
               <div className="px-3 py-2 rounded-2xl bg-red-100 text-red-800 self-start">
                  {error}
               </div>
            )}

            <div ref={bottomRef} />
         </div>
         <ChatInput
            register={register}
            onSubmit={handleSubmit(onSubmit)}
            isValid={formState.isValid}
            onKeyDown={OnKeyDown}
         />
      </div>
   );
};

export default ChatBot;
