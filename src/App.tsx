import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import { useEffect } from "react";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Decks from "./pages/Decks";
import Add from "./pages/Add";

const App = () => {
  useEffect(() => {
    const isDarkThemePreferred = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (isDarkThemePreferred) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
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
      </Routes>
    </>
  );
};

export default App;
