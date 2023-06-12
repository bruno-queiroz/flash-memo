import { useFlashMemoStore } from "../context/zustandStore";

const { setIsUserLogged } = useFlashMemoStore.getState();

export const updateIsUserLogged = (cookie: string) => {
  if (cookie.endsWith("true")) {
    setIsUserLogged(true);
    return;
  }
  if (cookie.endsWith("false")) {
    setIsUserLogged(false);
    return;
  }

  setIsUserLogged(null);
};
