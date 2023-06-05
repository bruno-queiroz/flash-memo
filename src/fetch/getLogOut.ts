export const getLogOut = async () => {
  const response = await fetch(`http://localhost:3000/get-log-out`, {
    credentials: "include",
  });

  const data = await response.json();
  return data;
};
