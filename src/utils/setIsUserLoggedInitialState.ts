export const setIsUserLoggedInitialState = () => {
  const isUserLogged = localStorage.getItem("is-user-logged");

  if (isUserLogged) {
    if (isUserLogged === "true") {
      return true;
    } else {
      return false;
    }
  }
  return null;
};
