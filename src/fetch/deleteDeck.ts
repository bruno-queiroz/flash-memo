import { updateIsUserLogged } from "../utils/updateIsUserLogged";
import { baseUrl } from "./config";
import { ServerResponse } from "./postSignIn";

export const deleteDeck = async (deckId: string) => {
  try {
    const response = await fetch(`${baseUrl}/delete-deck/${deckId}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data: ServerResponse<null> = await response.json();
    updateIsUserLogged(data);

    if (!data?.isOk) {
      throw new Error(data?.msg);
    }

    return data;
  } catch (err) {
    const errorMessage = (err as Error).message;
    throw new Error(errorMessage);
  }
};
