export const setIsUserLoggedInitialState = (cookie: string) => {
  if (cookie.endsWith("true")) {
    return true;
  }
  if (cookie.endsWith("false")) {
    return false;
  }

  return null;
};
