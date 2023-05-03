import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  BsFillSunFill as SunIcon,
  BsFillMoonFill as MoonIcon,
} from "react-icons/bs";

const Header = () => {
  const isDarkThemePreferred = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const [isDarkMode, setIsDarkMode] = useState(isDarkThemePreferred);

  const changeTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDarkMode(!isDarkMode);
  };
  return (
    <header className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-6 items-center">
          <Link
            to="/"
            className="text-dark-blue dark:text-aqua-blue text-2xl font-bold"
          >
            Flash Memo
          </Link>

          <nav>
            <ul className="flex items-center dark:text-white">
              <li>
                <NavLink
                  to="/decks"
                  className={({ isActive }) =>
                    isActive
                      ? "dark:text-aqua-blue text-dark-blue font-semibold"
                      : ""
                  }
                >
                  <div className="p-3 relative after:h-[4px] after:w-[0px] after:bg-dark-blue after:dark:bg-aqua-blue after:absolute after:bottom-0 after:left-0 after:transition-all hover:after:w-full">
                    Decks
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/add"
                  className={({ isActive }) =>
                    isActive
                      ? "dark:text-aqua-blue text-dark-blue font-semibold"
                      : ""
                  }
                >
                  <div className="p-3 relative after:h-[4px] after:w-[0px] after:bg-dark-blue after:dark:bg-aqua-blue after:absolute after:bottom-0 after:left-0 after:transition-all hover:after:w-full">
                    Add
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/search"
                  className={({ isActive }) =>
                    isActive
                      ? "dark:text-aqua-blue text-dark-blue font-semibold"
                      : ""
                  }
                >
                  <div className="p-3 relative after:h-[4px] after:w-[0px] after:bg-dark-blue after:dark:bg-aqua-blue after:absolute after:bottom-0 after:left-0 after:transition-all hover:after:w-full">
                    Search
                  </div>
                </NavLink>
              </li>
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
        </div>
      </div>
    </header>
  );
};

export default Header;
