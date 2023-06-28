export const setIsUserLoggedInitialState = () => {
  const isUserLogged = localStorage.getItem("is-user-logged");

  if (isUserLogged) {
    if (isUserLogged === "true") {
      return true;
    } else if (isUserLogged === "false") {
      return false;
    } else {
      return null;
    }
  }
  return null;
};
