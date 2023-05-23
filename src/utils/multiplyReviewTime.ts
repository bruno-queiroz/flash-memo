const oneHourInMilliseconds = 3600000;
const halfHourInMilliseconds = 1800000;
const tenMinutesInMilliseconds = 600000;

const recallFeedbackValues = {
  easy: 1.8,
  good: 1.5,
  hard: 1.3,
  reset: 0,
};

export type RecallFeedback = typeof recallFeedbackValues;

export const multiplyReviewTime = (
  reviewAwaitTime: number | null | undefined,
  recallFeedback: keyof RecallFeedback
) => {
  let reviewTime = 0;
  if (reviewAwaitTime) {
    reviewTime = reviewAwaitTime * recallFeedbackValues[recallFeedback];
    return reviewTime;
  }

  switch (recallFeedback) {
    case "hard":
      reviewTime = tenMinutesInMilliseconds;
      break;
    case "good":
      reviewTime = halfHourInMilliseconds;
      break;
    case "easy":
      reviewTime = oneHourInMilliseconds;
      break;
    case "reset":
      reviewTime = 0;
  }
  return reviewTime;
};
