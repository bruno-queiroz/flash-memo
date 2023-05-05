import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiDotsVerticalRounded as DotsIcon } from "react-icons/bi";

const DeckStatus = () => {
  const [isOptionsActive, setIsOptionsActive] = useState(false);

  useEffect(() => {
    const body = document.querySelector("body");

    const listener = (event: MouseEvent) => {
      const isOptionsClicked =
        (event.target as HTMLDivElement).id === "open-options";
      if (isOptionsClicked) return;
      setIsOptionsActive(false);
    };

    body?.addEventListener("click", listener);

    return () => body?.removeEventListener("click", listener);
  }, []);

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

        <div className="flex items-center relative">
          <button
            className="text-2xl text-dark-blue dark:text-aqua-blue relative"
            onClick={() => setIsOptionsActive(!isOptionsActive)}
            id="open-options"
          >
            <DotsIcon />
            <div
              className="absolute w-full h-full bg-transparent top-0"
              id="open-options"
            />
          </button>
          <div
            className={`absolute z-10 left-[50%] flex-col top-[100%] translate-x-[-50%] p-2 w-[120px] dark:bg-neutral-950 dark:text-white bg-dark-blue text-white rounded text-sm ${
              isOptionsActive ? "flex" : "hidden"
            }`}
            onClick={() => console.log("delete deck")}
          >
            <button className="p-2">Delete Deck</button>
            <button className="p-2">Rename Deck</button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default DeckStatus;
