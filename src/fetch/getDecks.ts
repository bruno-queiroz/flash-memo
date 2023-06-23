import { updateIsUserLogged } from "../utils/updateIsUserLogged";
import { baseUrl } from "./config";
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
  const response = await fetch(`${baseUrl}/get-decks`, {
    credentials: "include",
  });

  const data: ServerResponse<DeckStatusType[]> = await response.json();
  updateIsUserLogged(document.cookie);

  return data;
};
