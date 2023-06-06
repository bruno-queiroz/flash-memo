import { handleSessionExpired } from "../utils/handleSessionExpired";
import { ServerResponse } from "./postSignIn";

export const patchRenameDeck = async (
  deckId: string,
  deckName: string,
  isUserLogged: boolean
) => {
  try {
    const response = await fetch(
      `http://localhost:3000/rename-deck/${deckId}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ deckName }),
        credentials: "include",
      }
    );

    const data: ServerResponse<null> = await response.json();

    if (data?.msg === "Session expired") {
      handleSessionExpired(isUserLogged);
      return;
    }

    if (!data?.isOk) {
      throw new Error(data?.msg);
    }

    return data;
  } catch (err) {
    const errorMessage = (err as Error).message;
    throw new Error(errorMessage);
  }
};
