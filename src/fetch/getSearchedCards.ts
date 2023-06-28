import { updateIsUserLogged } from "../utils/updateIsUserLogged";
import { baseUrl } from "./config";
import { DeckStudy } from "./getStudyDeck";
import { ServerResponse } from "./postSignIn";

export const getSearchedCards = async (
  deckId: string | undefined,
  query: string | undefined
) => {
  if (!deckId || !query) {
    return;
  }
  try {
    const response = await fetch(`${baseUrl}/search-cards/${deckId}/${query}`, {
      credentials: "include",
    });

    const data: ServerResponse<DeckStudy> = await response.json();
    updateIsUserLogged(data);

    if (data?.data.cards.length === 0) {
      throw new Error("Card not found");
    }
    return data;
  } catch (err) {
    const errorMessage = (err as Error).message;
    throw new Error(errorMessage);
  }
};
