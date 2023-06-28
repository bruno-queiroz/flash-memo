import { Card } from "./getStudyDeck";
import {
  RecallFeedback,
  multiplyReviewTime,
} from "../utils/multiplyReviewTime";
import { ServerResponse } from "./postSignIn";
import { updateIsUserLogged } from "../utils/updateIsUserLogged";
import { baseUrl } from "./config";

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
  try {
    const response = await fetch(`${baseUrl}/patch-card-dates/${card?.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(cardDates),
      credentials: "include",
    });
    const data: ServerResponse<null> = await response.json();
    updateIsUserLogged(data);

    if (!data?.isOk) {
      throw new Error(data?.msg);
    }

    return data;
  } catch (err) {
    const errorMessage = (err as Error).message;
    throw new Error(errorMessage);
  }
};
