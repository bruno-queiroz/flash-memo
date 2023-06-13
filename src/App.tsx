import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import { useEffect } from "react";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Decks from "./pages/Decks";
import Add from "./pages/Add";
import Study from "./pages/Study";
import Search from "./pages/Search";
import { useFlashMemoStore } from "./context/zustandStore";

const App = () => {
  const setIsDarkMode = useFlashMemoStore((state) => state.setIsDarkMode);

  useEffect(() => {
    const themeSelected = localStorage.getItem("theme");

    if (themeSelected) {
      if (themeSelected === "dark") {
        document.documentElement.classList.add("dark");
        setIsDarkMode(true);
        return;
      }
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      const isDarkThemePreferred = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      if (isDarkThemePreferred) {
        setIsDarkMode(true);
        document.documentElement.classList.add("dark");
      } else {
        setIsDarkMode(false);
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/decks" element={<Decks />} />
        <Route path="/add" element={<Add />} />
        <Route path="/study/:deckName" element={<Study />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </>
  );
};

export default App;
