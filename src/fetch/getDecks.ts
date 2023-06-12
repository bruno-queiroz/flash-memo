import { ServerResponse } from "./postSignIn";

export interface DeckStatusType {
  cards: {
    resetedCards: number;
    newCards: number;
    reviewCards: number;
  };
  createdAt: Date;
  id: string;
  name: string;
  userId: string;
}

export const getDecks = async () => {
  const response = await fetch(`http://localhost:3000/get-decks`, {
    credentials: "include",
  });

  const data: ServerResponse<DeckStatusType[]> = await response.json();
  return data;
};
