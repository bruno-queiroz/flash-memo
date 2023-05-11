import { ServerResponse } from "./postSignIn";

export interface Deck {
  createdAt: Date;
  id: string;
  name: string;
  userId: string;
}

export interface DeckResponse {
  deck: Deck[];
}

export const getDecks = async () => {
  const response = await fetch(`http://localhost:3000/get-decks`, {
    credentials: "include",
  });

  const data: ServerResponse<DeckResponse> = await response.json();
  return data;
};
