import { Card } from "../fetch/getStudyDeck";

export interface CardAmountGroups {
  resetedCards: number;
  newCards: number;
  reviewCards: number;
}

export const countCardAmountGroups = (cards: Card[] | undefined) => {
  let resetedCards = 0;
  let newCards = 0;
  let reviewCards = 0;

  if (cards) {
    cards.forEach((card) => {
      if (card?.wasCardReseted && card?.reviewAwaitTime === 0) {
        resetedCards++;
      } else if (!card?.wasCardReseted && card?.reviewAwaitTime === 0) {
        newCards++;
      } else {
        reviewCards++;
      }
    });
  }

  return {
    resetedCards,
    newCards,
    reviewCards,
  };
};
