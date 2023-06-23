import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  BsFillSunFill as SunIcon,
  BsFillMoonFill as MoonIcon,
} from "react-icons/bs";
import { IoCloseSharp as CloseIcon } from "react-icons/io5";
import { GiHamburgerMenu as MenuIcon } from "react-icons/gi";
import { useFlashMemoStore } from "../context/zustandStore";
import { getLogOut } from "../fetch/getLogOut";
import HeaderNavLink from "./HeaderNavLink";

const Header = () => {
  const [isNavActive, setIsNavActive] = useState(false);
  const isUserLogged = useFlashMemoStore((state) => state.isUserLogged);
  const setIsUserLogged = useFlashMemoStore((state) => state.setIsUserLogged);
  const setIsSessionExpiredModalOpen = useFlashMemoStore(
    (state) => state.setIsSessionExpiredModalOpen
  );
  const isDarkMode = useFlashMemoStore((state) => state.isDarkMode);
  const setIsDarkMode = useFlashMemoStore((state) => state.setIsDarkMode);

  const navigate = useNavigate();

  const changeTheme = () => {
    document.documentElement.classList.toggle("dark");

    localStorage.setItem("theme", !isDarkMode ? "dark" : "light");

    setIsDarkMode(!isDarkMode);
  };

  const logOut = async () => {
    await getLogOut();
    setIsUserLogged(null);
  };

  useEffect(() => {
    if (isUserLogged === false) {
      setIsSessionExpiredModalOpen(true);
      navigate("/sign-in");
    }
    if (isUserLogged === null) {
      navigate("/");
    }
  }, [isUserLogged]);

  return (
    <header className="max-w-[1100px] p-4 mx-auto">
      <div
        className={`${
          isNavActive ? "block" : "hidden"
        } fixed top-0 bottom-0 left-0 right-0 w-full h-full bg-[rgb(0,0,0,0.7)]`}
        onClick={() => setIsNavActive(false)}
      />
      <div className="flex items-center gap-4">
        <div
          className={`flex w-full gap-6 items-center ${
            !isUserLogged && "justify-between"
          }`}
        >
          <Link
            to="/"
            className="text-dark-blue dark:text-white text-2xl font-bold"
          >
            Flash Memo
          </Link>

          <nav
            className={`${
              isNavActive ? "translate-x-0" : "translate-x-[100%]"
            } flex flex-col transition-transform p-4 fixed right-0 h-full w-[50%] z-10 top-0 bottom-0 dark:bg-neutral-900 bg-gray-200 sm:dark:bg-neutral-800 reset-styles`}
          >
            <button
              className="text-primary-yellow text-3xl font-bold ml-auto sm:hidden"
              onClick={() => setIsNavActive(false)}
            >
              <CloseIcon />
            </button>
            <ul className="flex flex-col sm:flex-row dark:text-white">
              {isUserLogged ? (
                <>
                  <li onClick={() => setIsNavActive(false)}>
                    <HeaderNavLink name="Decks" path="/decks" />
                  </li>
                  <li onClick={() => setIsNavActive(false)}>
                    <HeaderNavLink name="Add" path="/add" />
                  </li>
                  <li onClick={() => setIsNavActive(false)}>
                    <HeaderNavLink name="Search" path="/search" />
                  </li>
                  <li
                    onClick={() => setIsNavActive(false)}
                    className="flex p-3"
                  >
                    <button onClick={logOut}>Log Out</button>
                  </li>
                </>
              ) : (
                <li
                  onClick={() => setIsNavActive(false)}
                  className="flex justify-end w-full"
                >
                  <HeaderNavLink name="Sign In" path="/sign-in" />
                </li>
              )}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-1">
          <MoonIcon className="text-dark-blue dark:text-white" />
          <button
            className="w-[40px] h-[23px] bg-gray-200 dark:bg-neutral-500 rounded-[100vh] p-[3px]"
            onClick={changeTheme}
          >
            <div
              className={`w-[50%] h-full transition-transform rounded-[100%] bg-aqua-blue ${
                isDarkMode ? "dark-theme-animation" : "light-theme-animation"
              }`}
            />
          </button>
          <SunIcon className="text-dark-blue dark:text-white" />

          <button
            className="text-3xl text-dark-blue dark:text-gray-300 ml-4 sm:hidden"
            onClick={() => setIsNavActive(true)}
          >
            <MenuIcon />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
