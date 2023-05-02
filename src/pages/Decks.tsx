import React from "react";
import DeckStatus from "../components/DeckStatus";

const Decks = () => {
  return (
    <section className="flex flex-col gap-6 items-center p-4 dark:text-gray-300">
      <h1 className="font-bold text-center text-4xl text-dark-blue dark:text-aqua-blue">
        Decks
      </h1>

      <div className="flex flex-col gap-2 max-w-[900px] w-full">
        <DeckStatus />
        <DeckStatus />
        <DeckStatus />
        <DeckStatus />
        <DeckStatus />
        <DeckStatus />
        <DeckStatus />
      </div>

      <button
        type="button"
        className="bg-primary-yellow py-2 px-4 rounded w-[max-content] mx-auto mt-4 text-white"
      >
        Create Deck
      </button>
    </section>
  );
};

export default Decks;
