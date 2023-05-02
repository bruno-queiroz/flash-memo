import React from "react";
import { Link } from "react-router-dom";
import { BiDotsVerticalRounded as DotsIcon } from "react-icons/bi";

const DeckStatus = () => {
  return (
    <article className="flex items-center  rounded-lg dark:bg-neutral-900 shadow-sm bg-gray-200">
      <Link
        to=""
        className="flex-1 p-4 dark:hover:bg-neutral-950 hover:bg-gray-300 transition-colors rounded-tl-lg rounded-bl-lg"
      >
        English
      </Link>

      <div className="flex gap-6 p-4">
        <div className="flex gap-1">
          <span>0</span>
          <span>0</span>
          <span>0</span>
        </div>

        <div className="flex items-center">
          <button
            className="text-2xl text-dark-blue dark:text-aqua-blue"
            onClick={() => console.log("oi")}
          >
            <DotsIcon />
          </button>
        </div>
      </div>
    </article>
  );
};

export default DeckStatus;
