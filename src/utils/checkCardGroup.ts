import { Card } from "../fetch/getStudyDeck";
import { CardAmountGroups } from "./countCardAmountGroups";

export const checkCardGroup = (card: Card) => {
  if (card.wasCardReseted && card.reviewAwaitTime === 0) {
    return "resetedCards" as keyof CardAmountGroups;
  } else if (!card.wasCardReseted && card.reviewAwaitTime === 0) {
    return "newCards" as keyof CardAmountGroups;
  } else {
    return "reviewCards" as keyof CardAmountGroups;
  }
};
