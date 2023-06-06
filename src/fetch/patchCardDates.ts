import { Card } from "./getStudyDeck";
import {
  RecallFeedback,
  multiplyReviewTime,
} from "../utils/multiplyReviewTime";
import { ServerResponse } from "./postSignIn";
import { handleSessionExpired } from "../utils/handleSessionExpired";

export const patchCardDates = async (
  card: Card,
  recallFeedback: keyof RecallFeedback,
  isUserLogged: boolean
) => {
  card.wasCardReseted;
  const cardDates = {
    reviewAt: card?.reviewAt,
    reviewAwaitTime: multiplyReviewTime(card?.reviewAwaitTime, recallFeedback),
    wasCardReseted: recallFeedback === "reset",
  };
  const response = await fetch(
    `http://localhost:3000/patch-card-dates/${card?.id}`,
    {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(cardDates),
      credentials: "include",
    }
  );
  const data: ServerResponse<null> = await response.json();

  if (data?.msg === "Session expired") {
    handleSessionExpired(isUserLogged);
    return;
  }

  return data;
};
