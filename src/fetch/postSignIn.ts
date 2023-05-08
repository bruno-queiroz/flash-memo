import { UserForm } from "../pages/SignUp";

interface SignInResponse {
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
  });

  const data: SignInResponse = await response.json();
  return data;
};
