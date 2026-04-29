import axios from 'axios';

export type Review = {
   id: number;
   content: string;
   author: string;
   rating: number;
   createdAt: string;
   updatedAt: string;
};

export type ReviewListResponse = {
   reviews: Review[];
   summary: string | null;
};

export const fetchReviews = async (productId: string) => {
   const { data } = await axios.get<ReviewListResponse>(
      `/api/products/${productId}/reviews`
   );
   return data;
};

export const summarizeReviews = async (productId: string) => {
   const { data } = await axios.post<{ summary: string }>(
      `/api/products/${productId}/reviews/summarize`
   );
   return data;
};
