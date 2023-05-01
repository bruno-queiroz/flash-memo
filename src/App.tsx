import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import { useEffect } from "react";
import SignUp from "./pages/SignUp";

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
      </Routes>
    </>
  );
};

export default App;
