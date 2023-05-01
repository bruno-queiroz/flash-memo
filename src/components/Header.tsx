import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  BsFillSunFill as SunIcon,
  BsFillMoonFill as MoonIcon,
} from "react-icons/bs";

const Header = () => {
  const isDarkThemePreferred = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const [isDarkMode, setIsDarkMode] = useState(isDarkThemePreferred);
  console.log(isDarkMode);
  const changeTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDarkMode(!isDarkMode);
  };
  return (
    <header className="p-4">
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="text-dark-blue dark:text-aqua-blue text-2xl font-bold"
        >
          Flash Memo
        </Link>

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
