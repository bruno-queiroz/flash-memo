import { Card } from "./getStudyDeck";

export const patchCardDates = async (card: Card) => {
  const cardDates = {
    reviewAt: card.reviewAt,
    reviewAwaitTime: card.reviewAwaitTime,
  };
  const response = await fetch(
    `http://localhost:3000/patch-card-dates/${card.id}`,
    {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(cardDates),
      credentials: "include",
    }
  );
  const data = await response.json();
  return data;
};
