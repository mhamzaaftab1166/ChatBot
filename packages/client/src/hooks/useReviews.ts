import { useQuery } from '@tanstack/react-query';
import { fetchReviews } from '../api/reviews';

export const useReviews = (productId: string) => {
   return useQuery({
      queryKey: ['reviews', productId],
      queryFn: () => fetchReviews(productId),
   });
};
