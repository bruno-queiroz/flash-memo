import { baseUrl } from "./config";

export const getLogOut = async () => {
  const response = await fetch(`${baseUrl}/get-log-out`, {
    credentials: "include",
  });

  const data = await response.json();
  return data;
};
