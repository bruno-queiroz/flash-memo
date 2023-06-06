import { handleSessionExpired } from "../utils/handleSessionExpired";
import { ServerResponse } from "./postSignIn";

export interface DeckForm {
  deckName: string;
}

export const postDeck = async (newDeck: DeckForm, isUserLogged: boolean) => {
  const response = await fetch(`http://localhost:3000/create-deck`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newDeck),
    credentials: "include",
  });

  const data: ServerResponse<null> = await response.json();

  if (data?.msg === "Session expired") {
    handleSessionExpired(isUserLogged);
    return;
  }

  return data;
};
