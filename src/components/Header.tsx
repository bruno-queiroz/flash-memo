import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="p-4">
      <div>
        <Link
          to="/"
          className="text-dark-blue dark:text-aqua-blue text-2xl font-bold"
        >
          Flash Memo
        </Link>
      </div>
    </header>
  );
};

export default Header;
