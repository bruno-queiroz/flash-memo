import {
  ONE_DAY_IN_MILLISENCONDS,
  ONE_HOUR_IN_MILLISECONDS,
  ONE_MONTH_IN_MILLISENCONDS,
  ONE_YEAR_IN_MILLISECONDS,
} from "./formatDate";

export interface RecallFeedback {
  easy: number;
  good: number;
  hard: number;
  reset: number;
}

const maxMultiplier = {
  hard: 2,
  good: 4,
  easy: 6,
};

const mediumMultiplier = {
  hard: 1.3,
  good: 1.5,
  easy: 1.8,
};

const minMultiplier = {
  hard: 0.3,
  good: 0.4,
  easy: 0.5,
};

const moreThanFourMonthsMultiplier = {
  hard: 3,
  good: 6,
  easy: 8,
};

const moreThanAYearMultiplier = {
  hard: 4,
  good: 7,
  easy: 9,
};

export const multiplyReviewTime = (
  reviewAwaitTime: number | null | undefined,
  feedback: keyof RecallFeedback
) => {
  let reviewTime = 0;
  if (reviewAwaitTime && feedback !== "reset") {
    if (reviewAwaitTime > ONE_YEAR_IN_MILLISECONDS) {
      return (
        ONE_MONTH_IN_MILLISENCONDS * moreThanAYearMultiplier[feedback] +
        ONE_YEAR_IN_MILLISECONDS
      );
    } else if (reviewAwaitTime > ONE_MONTH_IN_MILLISENCONDS * 4) {
      return (
        ONE_MONTH_IN_MILLISENCONDS * moreThanFourMonthsMultiplier[feedback]
      );
    } else if (reviewAwaitTime > ONE_MONTH_IN_MILLISENCONDS * 3) {
      return reviewAwaitTime * minMultiplier[feedback];
    } else if (reviewAwaitTime > ONE_MONTH_IN_MILLISENCONDS) {
      return reviewAwaitTime * mediumMultiplier[feedback];
    } else {
      return reviewAwaitTime * maxMultiplier[feedback];
    }
  }

  switch (feedback) {
    case "hard":
      reviewTime = ONE_HOUR_IN_MILLISECONDS;
      break;
    case "good":
      reviewTime = ONE_HOUR_IN_MILLISECONDS * 6;
      break;
    case "easy":
      reviewTime = ONE_DAY_IN_MILLISENCONDS;
      break;
    case "reset":
      reviewTime = 0;
  }
  return reviewTime;
};
