import { type ClipboardEvent } from 'react';
import ReactMarkdown from 'react-markdown';

type Message = {
   text: string;
   role: 'user' | 'bot';
};

type ChatMessageProps = {
   message: Message;
   onCopy: (e: ClipboardEvent<HTMLDivElement>) => void;
};

const ChatMessage = ({ message, onCopy }: ChatMessageProps) => {
   return (
      <div
         onCopy={onCopy}
         className={`px-3 py-1 max-w-md rounded-2xl ${
            message.role === 'user'
               ? 'bg-blue-500 text-white self-end'
               : 'bg-gray-200 text-gray-800 self-start'
         }`}
      >
         <ReactMarkdown>{message.text}</ReactMarkdown>
      </div>
   );
};

export default ChatMessage;
