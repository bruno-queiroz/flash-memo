import { updateIsUserLogged } from "../utils/updateIsUserLogged";
import { baseUrl } from "./config";
import { ServerResponse } from "./postSignIn";

export const deleteCard = async (cardId: string) => {
  try {
    const response = await fetch(`${baseUrl}/delete-card/${cardId}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data: ServerResponse<null> = await response.json();

    if (!data?.isOk) {
      throw new Error(data?.msg);
    }

    return data;
  } catch (err) {
    const errorMessage = (err as Error).message;
    throw new Error(errorMessage);
  } finally {
    updateIsUserLogged(document.cookie);
  }
};
