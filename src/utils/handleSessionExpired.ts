import { useFlashMemoStore } from "../context/zustandStore";
import { history } from "./history";

const { setIsUserLogged, setIsSessionExpiredModalOpen } =
  useFlashMemoStore.getState();

export const handleSessionExpired = (isUserLogged: boolean) => {
  if (isUserLogged) {
    if (history.navigate) {
      history.navigate("/sign-in");
    }
    setIsUserLogged(false);
    setIsSessionExpiredModalOpen(true);
  } else {
    if (history.navigate) {
      history.navigate("/");
    }
  }
};
