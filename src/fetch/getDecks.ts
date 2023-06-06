import { handleSessionExpired } from "../utils/handleSessionExpired";
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

export const getDecks = async (isUserLogged: boolean) => {
  const response = await fetch(`http://localhost:3000/get-decks`, {
    credentials: "include",
  });

  const data: ServerResponse<DeckStatusType[]> = await response.json();

  if (data?.msg === "Session expired") {
    handleSessionExpired(isUserLogged);
  }
  return data;
};
