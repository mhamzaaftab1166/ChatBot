import { reviewRepository } from '../repositories/review.repositories';
import { llmClient } from '../llm/client';
import template from '../prompts/summarize-review.txt';

export const reviewService = {
   async summarizeReviews(productId: number): Promise<string> {
      const reviews = await reviewRepository.getReviews(productId, 10);

      if (reviews.length === 0) {
         return 'No reviews available for this product.';
      }

      const existingSummary =
         await reviewRepository.getReviewSummary(productId);

      if (existingSummary) {
         return existingSummary;
      }

      const joinedReviews = reviews.map((r) => r.content).join('\n\n');

      const prompt = template.replace('{{reviews}}', joinedReviews);

      const { text: summary } = await llmClient.generateText({
         model: 'gpt-4o-mini',
         prompt,
         temperature: 0.2,
         maxTokens: 500,
      });

      await reviewRepository.storeReviewSummary(productId, summary);
      return summary;
   },
};
