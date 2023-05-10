import { UserForm } from "../pages/SignUp";

export interface ServerResponse {
  isOk: boolean;
  msg: string;
  data: UserForm;
}

export const postSignIn = async (user: UserForm) => {
  const response = await fetch(`http://localhost:3000/sign-in`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(user),
    credentials: "include",
  });

  const data: ServerResponse = await response.json();
  return data;
};
