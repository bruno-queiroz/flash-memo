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
  try {
    const response = await fetch(`${baseUrl}/get-decks`, {
      credentials: "include",
    });

    const data: ServerResponse<DeckStatusType[]> = await response.json();
    updateIsUserLogged(data);

    if (!data?.isOk) {
      throw new Error(data?.msg);
    }

    return data;
  } catch (err) {
    const errorMsg = (err as Error).message;

    throw new Error(errorMsg);
  }
};
