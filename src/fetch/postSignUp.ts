import { UserForm } from "../pages/SignUp";
import { baseUrl } from "./config";
import { ServerResponse } from "./postSignIn";

export const postSignUp = async (user: UserForm) => {
  try {
    const response = await fetch(`${baseUrl}/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      credentials: "include",
    });

    const data: ServerResponse<UserForm> = await response.json();

    if (!data?.isOk) {
      throw new Error(data?.msg);
    }

    localStorage.setItem("is-user-logged", "true");

    return data;
  } catch (err) {
    const errorMessage = (err as Error)?.message;
    throw new Error(errorMessage);
  }
};
