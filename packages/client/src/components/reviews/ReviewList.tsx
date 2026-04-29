import StarRatings from './StarRatings';
import Skeleton from 'react-loading-skeleton';
import { Button } from '../ui/button';
import { IoSparklesSharp } from 'react-icons/io5';

import { useReviews } from '../../hooks/useReviews';
import { useSummarizeReviews } from '../../hooks/useSummarizeReviews';

type Props = {
   productId: string;
};

const ReviewList = ({ productId }: Props) => {
   const { data, isLoading, error } = useReviews(productId);

   const {
      mutate: summarize,
      isPending,
      isError: isSummarizeError,
      error: summarizeError,
   } = useSummarizeReviews(productId);

   if (isLoading) {
      return (
         <div className="flex flex-col gap-5">
            {[1, 2, 3].map((i) => (
               <div key={i}>
                  <Skeleton width={150} />
                  <Skeleton width={100} />
                  <Skeleton count={2} />
               </div>
            ))}
         </div>
      );
   }

   if (error instanceof Error) {
      return <div className="text-red-500">{error.message}</div>;
   }

   if (!data || data.reviews.length === 0) {
      return <div>No reviews yet.</div>;
   }

   return (
      <>
         {/* Summary */}
         <div className="mb-5">
            {isPending ? (
               <div className="flex flex-col gap-2">
                  <Skeleton width={200} />
                  <Skeleton count={2} />
               </div>
            ) : isSummarizeError ? (
               <div className="flex items-center gap-3">
                  <span className="text-red-500 text-sm">
                     {(summarizeError as Error)?.message ||
                        'Failed to summarize'}
                  </span>
                  <Button onClick={() => summarize()}>Retry</Button>
               </div>
            ) : data.summary ? (
               <div className="font-semibold">{data.summary}</div>
            ) : (
               <Button onClick={() => summarize()} disabled={isPending}>
                  <IoSparklesSharp className="mr-2" />
                  Summarize
               </Button>
            )}
         </div>

         {/* Reviews */}
         <div className="flex flex-col gap-5">
            {data.reviews.map((review) => (
               <div key={review.id}>
                  <div className="font-semibold">{review.author}</div>
                  <StarRatings value={review.rating} />
                  <p className="py-2">{review.content}</p>
               </div>
            ))}
         </div>
      </>
   );
};

export default ReviewList;
