import { handleSessionExpired } from "../utils/handleSessionExpired";
import { ServerResponse } from "./postSignIn";

export interface CardForm {
  deckId: string;
  front: string;
  back: string;
}

export const createCard = async (newCard: CardForm, isUserLogged: boolean) => {
  try {
    const response = await fetch(`http://localhost:3000/create-card`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newCard),
      credentials: "include",
    });

    const data: ServerResponse<null> = await response.json();

    if (!data?.isOk) {
      if (data.msg === "Session expired") {
        handleSessionExpired(isUserLogged);
        return;
      }
      throw new Error(data?.msg);
    }
    return data;
  } catch (err) {
    const errorMsg = (err as Error).message;
    throw new Error(errorMsg);
  }
};
