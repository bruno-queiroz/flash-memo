import { handleSessionExpired } from "../utils/handleSessionExpired";
import { DeckStudy } from "./getStudyDeck";
import { ServerResponse } from "./postSignIn";

export const getSearchedCards = async (
  deckId: string | undefined,
  query: string | undefined,
  isUserLogged: boolean
) => {
  if (!deckId || !query) {
    return;
  }
  try {
    const response = await fetch(
      `http://localhost:3000/search-cards/${deckId}/${query}`,
      {
        credentials: "include",
      }
    );

    const data: ServerResponse<DeckStudy> = await response.json();

    if (data?.msg === "Session expired") {
      handleSessionExpired(isUserLogged);
      return;
    }
    if (data?.data.cards.length === 0) {
      throw new Error("Card not found");
    }
    return data;
  } catch (err) {
    const errorMessage = (err as Error).message;
    throw new Error(errorMessage);
  }
};
