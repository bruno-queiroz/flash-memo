import { UserForm } from "../pages/SignUp";

export interface ServerResponse<T> {
  isOk: boolean;
  msg: string;
  data: T;
}

export const postSignIn = async (user: UserForm) => {
  try {
    const response = await fetch(`http://localhost:3000/sign-in`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
      credentials: "include",
    });

    const data: ServerResponse<UserForm> = await response.json();

    if (!data?.isOk) {
      throw new Error(data?.msg);
    }

    return data;
  } catch (err) {
    const errorMessage = (err as Error)?.message;
    throw new Error(errorMessage);
  }
};
