import { baseUrl } from "./config";

export const getLogOut = async () => {
  const response = await fetch(`${baseUrl}/log-out`, {
    credentials: "include",
  });

  const data = await response.json();

  localStorage.removeItem("is-user-logged");

  return data;
};
