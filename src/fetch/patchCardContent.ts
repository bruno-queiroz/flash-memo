import { updateIsUserLogged } from "../utils/updateIsUserLogged";
import { baseUrl } from "./config";
import { Card } from "./getStudyDeck";
import { ServerResponse } from "./postSignIn";

export const patchCardContent = async (
  newCard: Pick<Card, "front" | "back">,
  cardId: string
) => {
  try {
    const response = await fetch(`${baseUrl}/patch-card-content/${cardId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newCard),
      credentials: "include",
    });
    const data: ServerResponse<null> = await response.json();
    if (!data?.isOk) {
      throw new Error(data?.msg);
    }

    return data;
  } catch (err) {
    const errorMsg = (err as Error).message;

    throw new Error(errorMsg);
  } finally {
    updateIsUserLogged(document.cookie);
  }
};
