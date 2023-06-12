import { RecallFeedback, multiplyReviewTime } from "./multiplyReviewTime";
import { formatDate } from "./formatDate";

export const estimateNextReviewTime = (
  reviewAt: Date | null | undefined,
  reviewAwaitTime: number | null | undefined,
  recallFeedback: keyof RecallFeedback
) => {
  let estimatedTime;

  if (reviewAt && reviewAwaitTime) {
    estimatedTime = formatDate(
      multiplyReviewTime(reviewAwaitTime, recallFeedback)
    );
    return estimatedTime;
  }

  estimatedTime = formatDate(multiplyReviewTime(null, recallFeedback));

  return estimatedTime;
};
