import { updateIsUserLogged } from "../utils/updateIsUserLogged";
import { baseUrl } from "./config";
import { ServerResponse } from "./postSignIn";

export interface CardForm {
  deckId: string;
  front: string;
  back: string;
}

export const createCard = async (newCard: CardForm) => {
  try {
    const response = await fetch(`${baseUrl}/card`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newCard),
      credentials: "include",
    });

    const data: ServerResponse<null> = await response.json();
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
