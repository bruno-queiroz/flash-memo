import React from "react";
import { Card } from "../fetch/getStudyDeck";

const SearchCard = ({ front, back, id }: Card) => {
  return (
    <article className="bg-gray-200 dark:bg-neutral-900 rounded px-4 pb-4">
      <div className="py-4">
        <h2>{front}</h2>
      </div>
      <div className="border-b-2 border-b-gray-400 dark:border-b-neutral-700" />
      <div className="py-4">
        <p>{back}</p>
      </div>
      <button className="bg-primary-yellow py-1 px-3 rounded font-semibold text-neutral-900">
        Edit
      </button>
    </article>
  );
};

export default SearchCard;
