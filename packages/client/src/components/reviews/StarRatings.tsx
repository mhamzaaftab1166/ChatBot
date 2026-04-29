import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

type Props = { value: number };
const StarRatings = ({ value }: Props) => {
   const placeholders = [1, 2, 3, 4, 5];
   return (
      <div className="flex gap-1">
         {placeholders.map((p) =>
            p < value ? (
               <FaStar key={p} className="text-yellow-500" />
            ) : (
               <FaRegStar key={p} className="text-gray-300" />
            )
         )}
      </div>
   );
};

export default StarRatings;
