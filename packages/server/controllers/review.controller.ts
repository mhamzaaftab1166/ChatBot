import type { Request, Response } from 'express';
import { reviewService } from '../services/review.service';
import { reviewRepository } from '../repositories/review.repositories';

export const reviewController = {
   getReviews: async (req: Request, res: Response) => {
      const productId = Number(req.params.id);

      if (isNaN(productId)) {
         return res.status(400).json({ error: 'Invalid product ID' });
      }
      const reviews = await reviewRepository.getReviews(productId);
      const summary = await reviewRepository.getReviewSummary(productId);

      res.json({ reviews, summary });
   },
   summarizeReviews: async (req: Request, res: Response) => {
      const productId = Number(req.params.id);

      if (isNaN(productId)) {
         return res.status(400).json({ error: 'Invalid product ID' });
      }
      const summary = await reviewService.summarizeReviews(productId);

      res.json(summary);
   },
};
