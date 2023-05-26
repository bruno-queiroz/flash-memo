import { Card } from "./getStudyDeck";
import { ServerResponse } from "./postSignIn";

export const getSingleCard = async (cardId: string) => {
  const response = await fetch(
    `http://localhost:3000/get-single-card/${cardId}`,
    {
      credentials: "include",
    }
  );
  const data: ServerResponse<Card> = await response.json();
  return data;
};
