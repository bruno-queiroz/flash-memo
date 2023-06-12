import { Card } from "./getStudyDeck";
import {
  RecallFeedback,
  multiplyReviewTime,
} from "../utils/multiplyReviewTime";
import { ServerResponse } from "./postSignIn";
import { updateIsUserLogged } from "../utils/updateIsUserLogged";

export const patchCardDates = async (
  card: Card,
  recallFeedback: keyof RecallFeedback
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
  updateIsUserLogged(document.cookie);

  return data;
};
