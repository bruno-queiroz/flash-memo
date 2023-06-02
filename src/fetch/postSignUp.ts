import { UserForm } from "../pages/SignUp";
import { ServerResponse } from "./postSignIn";

export const postSignUp = async (user: UserForm) => {
  const response = await fetch(`http://localhost:3000/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
    credentials: "include",
  });

  const data: ServerResponse<UserForm> = await response.json();
  return data;
};
