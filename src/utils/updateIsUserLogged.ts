import { useFlashMemoStore } from "../context/zustandStore";
import { ServerResponse } from "../fetch/postSignIn";

const { setIsUserLogged } = useFlashMemoStore.getState();

export const updateIsUserLogged = (response: ServerResponse<unknown>) => {
  if (response.msg === "Session expired") {
    if (response?.wasUserLogged) {
      setIsUserLogged(false);
      localStorage.setItem("is-user-logged", "false");
    } else {
      setIsUserLogged(null);
      localStorage.setItem("is-user-logged", "null");
    }
    return;
  }
  setIsUserLogged(true);
  localStorage.setItem("is-user-logged", "true");
};
