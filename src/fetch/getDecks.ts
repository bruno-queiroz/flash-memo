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

export interface DeckResponse {
  deck: DeckStatusType[];
}

export const getDecks = async () => {
  const response = await fetch(`http://localhost:3000/get-decks`, {
    credentials: "include",
  });

  const data: ServerResponse<DeckResponse> = await response.json();
  return data;
};
