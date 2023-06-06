import { handleSessionExpired } from "../utils/handleSessionExpired";
import { ServerResponse } from "./postSignIn";

export const deleteDeck = async (deckId: string, isUserLogged: boolean) => {
  try {
    const response = await fetch(
      `http://localhost:3000/delete-deck/${deckId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    const data: ServerResponse<null> = await response.json();

    if (!data?.isOk) {
      if (data?.msg === "Session expired") {
        handleSessionExpired(isUserLogged);
        return;
      }
      throw new Error(data?.msg);
    }

    return data;
  } catch (err) {
    const errorMessage = (err as Error).message;
    throw new Error(errorMessage);
  }
};
