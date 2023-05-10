import { useState } from "react";
import DeckStatus from "../components/DeckStatus";
import CreateDeckModal from "../components/CreateDeckModal";

const Decks = () => {
  const [isCreateDeckModalOpen, setIsCreateDeckModalOpen] = useState(false);

  return (
    <section className="flex flex-col gap-6 items-center p-4 dark:text-gray-300">
      <CreateDeckModal
        {...{
          isModalOpen: isCreateDeckModalOpen,
          setIsModalOpen: setIsCreateDeckModalOpen,
        }}
      />
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
        onClick={() => setIsCreateDeckModalOpen(true)}
      >
        Create Deck
      </button>
    </section>
  );
};

export default Decks;
