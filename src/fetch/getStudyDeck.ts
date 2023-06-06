import { handleSessionExpired } from "../utils/handleSessionExpired";
import { ServerResponse } from "./postSignIn";

export interface Card {
  front: string;
  back: string;
  createdAt: Date;
  id: string;
  reviewAt: Date | null;
  reviewAwaitTime: number;
  wasCardReseted: boolean;
}

export interface DeckStudy {
  createdAt: Date;
  id: string;
  name: string;
  userId: string;
  cards: Card[];
}

export const getStudyDeck = async (
  deckName: string | undefined,
  isUserLogged: boolean
) => {
  const response = await fetch(`http://localhost:3000/study-deck/${deckName}`, {
    credentials: "include",
  });
  const data: ServerResponse<Card[]> = await response.json();

  if (data?.msg === "Session expired") {
    handleSessionExpired(isUserLogged);
    return;
  }

  return data;
};
