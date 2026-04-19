import { type KeyboardEvent } from 'react';
import { Button } from '../ui/button';
import { RiArrowUpLine } from 'react-icons/ri';
import { type UseFormRegister, type FieldValues } from 'react-hook-form';

type ChatInputProps<T extends FieldValues> = {
   register: UseFormRegister<T>;
   onSubmit: () => void;
   isValid: boolean;
   onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
};

const ChatInput = <T extends FieldValues>({
   register,
   onSubmit,
   isValid,
   onKeyDown,
}: ChatInputProps<T>) => {
   return (
      <form
         onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
         }}
         className="flex flex-col gap-2 items-end border-2 rounded-3xl p-4"
      >
         <textarea
            {...register('prompt' as any, {
               required: true,
               validate: (data: string) => data.trim().length > 0,
            })}
            autoFocus
            className="w-full border-0 focus:outline-0 resize-none"
            placeholder="ask anything"
            minLength={1}
            maxLength={500}
            onKeyDown={onKeyDown}
         />

         <Button
            disabled={!isValid}
            type="submit"
            className="w-9 h-9 rounded-full hover:bg-gray-300 cursor-pointer transition flex items-center justify-center"
         >
            <RiArrowUpLine />
         </Button>
      </form>
   );
};

export default ChatInput;
