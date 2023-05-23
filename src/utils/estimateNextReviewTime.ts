import moment from "moment";
import { RecallFeedback, multiplyReviewTime } from "./multiplyReviewTime";

export const estimateNextReviewTime = (
  reviewAt: Date | null | undefined,
  reviewAwaitTime: number | null | undefined,
  recallFeedback: keyof RecallFeedback
) => {
  let estimatedTime;
  const now = new Date().getTime();
  if (reviewAt && reviewAwaitTime) {
    estimatedTime = moment(
      now + multiplyReviewTime(reviewAwaitTime, recallFeedback)
    ).fromNow(true);
    return estimatedTime;
  }

  estimatedTime = moment(
    now + multiplyReviewTime(null, recallFeedback)
  ).fromNow(true);

  return estimatedTime;
};
