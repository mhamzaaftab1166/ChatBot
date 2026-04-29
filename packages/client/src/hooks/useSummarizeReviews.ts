import { useMutation, useQueryClient } from '@tanstack/react-query';
import { summarizeReviews } from '../api/reviews';

export const useSummarizeReviews = (productId: string) => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: () => summarizeReviews(productId),
      onSuccess: () => {
         queryClient.invalidateQueries({
            queryKey: ['reviews', productId],
         });
      },
   });
};
