import { useFlashMemoStore } from "../context/zustandStore";
import { history } from "./history";

const { setIsUserLogged, setIsSessionExpired } = useFlashMemoStore.getState();

export const handleSessionExpired = (isUserLogged: boolean) => {
  if (isUserLogged) {
    if (history.navigate) {
      history.navigate("/sign-in");
    }
    setIsUserLogged(false);
    setIsSessionExpired(true);
  } else {
    if (history.navigate) {
      history.navigate("/");
    }
  }
};
