import { useEffect, useState } from "react";
import DeckStatus from "../components/DeckStatus";
import CreateDeckModal from "../components/CreateDeckModal";
import { useQuery } from "react-query";
import { getDecks } from "../fetch/getDecks";

const Decks = () => {
  const { data: decks } = useQuery("decksData", getDecks);
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
        {decks?.data?.deck.map((deck) => (
          <DeckStatus {...deck} key={deck.id} />
        ))}
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
