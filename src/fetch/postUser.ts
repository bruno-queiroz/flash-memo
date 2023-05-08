import { UserForm } from "../pages/SignUp";

export const postUser = async (user: UserForm) => {
  console.log(user);
  const response = await fetch(`http://localhost:3000/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();
  return data;
};
